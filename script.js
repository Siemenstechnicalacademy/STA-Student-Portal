
// --- APPLICATION STATE ---
let currentQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];
let timeLeft = 5400; // 90 minutes
let timerInterval;
let violationCount = 0;

// Helper to shuffle
// Fisher-Yates (Knuth) Shuffle Algorithm - High-Performance & Truly Unbiased
function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Helper to sanitize names for Firebase paths
function getSafeName(name) {
    return name ? name.replace(/[.#$[\]]/g, "_") : "unknown_user";
}



// ===============================
// 🔥 STRICT RANDOMIZED NO-REPEAT SYSTEM
// ===============================
function generateQuestionsByLogin(bank, count, studentName) {
    // 61st Batch Topics (Total 25)
    const topicDistribution = {
        "volume": 8,
        "algebra": 8,
        "mensuration": 9
    };

    let drawTasks = [];

    // 1. Add normal topics
    Object.keys(topicDistribution).forEach(topic => {
        drawTasks.push({
            topic: topic,
            poolKeySuffix: topic,
            questions: bank[topic] || [],
            needed: topicDistribution[topic]
        });
    });

    let finalQuestions = [];

    // 2. Process each task independently to maintain strict distribution
    drawTasks.forEach(task => {
        let poolKey = studentName + "_pool_" + task.poolKeySuffix;
        let topicPool = [];

        try {
            let storedPool = localStorage.getItem(poolKey);
            if (storedPool) {
                topicPool = JSON.parse(storedPool);
            }
        } catch (e) {
            console.error("Error reading question pool", e);
        }

        const allTopicQuestions = task.questions;
        if (allTopicQuestions.length === 0) return; // Skip if no questions in bank

        const needed = task.needed;

        // Initialize/Refill pool if empty or too small
        if (!topicPool || topicPool.length < needed) {
            // "Don't repeat until the last one": Refill with all available questions, shuffled
            topicPool = shuffle([...allTopicQuestions]);
        }

        // Draw exactly what's needed
        let drawnQuestions = topicPool.splice(0, needed);

        // Add topic metadata and resolve dynamic templates
        drawnQuestions.forEach(q => {
            finalQuestions.push({ ...q, topic: task.topic });
        });

        // Save the remaining pool back
        localStorage.setItem(poolKey, JSON.stringify(topicPool));
    });

    // 4. Final shuffle so topics are mixed (Truly Randomized)
    finalQuestions = shuffle(finalQuestions);

    // 5. Shuffle the options within each question
    finalQuestions = finalQuestions.map(q => {
        return { ...q, options: shuffle([...q.options]) };
    });

    return finalQuestions;
}

// ===============================
// 🔑 LOGIN FUNCTION
// ===============================
function showInstructions() {
    const name = document.getElementById('studentName').value.trim();
    const tc = document.getElementById('tcNumber').value.trim();
    const pass = document.getElementById('studentPass').value.trim();
    const errorMsg = document.getElementById('login-error');

    if (name.toLowerCase() === "siemens" && pass === "1234") {
        localStorage.clear();
        alert("✅ Admin: Access has been RESET.");
        location.reload();
        return;
    }

    if (!name || !tc || !pass) {
        alert("Please fill in all details (Name, TC, and Password)!");
        return;
    }

    // Fetch registered students and activations from Firebase and merge
    Promise.all([
        database.ref('registered_students').once('value'),
        database.ref('exam_activation').once('value')
    ]).then(([studentsSnap, activationsSnap]) => {
        let allStudents = [...students];
        const fbStudents = studentsSnap.val();
        if (fbStudents) {
            Object.keys(fbStudents).forEach(bKey => {
                const batchData = fbStudents[bKey];
                if (batchData && typeof batchData === 'object') {
                    Object.keys(batchData).forEach(sId => {
                        allStudents.push(batchData[sId]);
                    });
                }
            });
        }

        const activations = activationsSnap.val() || {};

        const matches = allStudents.filter(s => {
            const dbName = s.name.split(' ')[0].toLowerCase();
            const inputName = name.split(' ')[0].toLowerCase();
            return dbName === inputName && s.pass === pass;
        });

        if (matches.length === 0) {
            errorMsg.style.display = 'block';
            return;
        }

        let student = null;
        if (matches.length === 1) {
            student = matches[0];
        } else {
            const inputUpper = name.toUpperCase();
            if (inputUpper.includes("EA") || inputUpper.includes("EB")) {
                student = matches.find(s => inputUpper.includes(s.division));
            }
            if (!student) {
                // Intelligently default to the division that has an active exam
                student = matches.find(s => {
                    const key = (s.batch || '') + '_' + s.division;
                    return activations[key] && activations[key].active === true;
                });
            }
            if (!student) {
                student = matches[0];
            }
        }

        if (student) {
            const safeName = getSafeName(student.name);
            const divKey = (student.batch || '') + '_' + student.division;

            // ── Step 2: Check session lock ──
            database.ref('student_sessions/' + safeName).once('value').then(snapshot => {
                const data = snapshot.val();
                if (data && data.locked) {
                    errorMsg.innerText = "❌ Account Locked: You have already logged in. Ask Admin to reset.";
                    errorMsg.style.display = 'block';
                    localStorage.setItem("currentStudent", student.name);
                    checkAndStartUserListener();
                } else {
                    database.ref('student_sessions/' + safeName).set({
                        locked: true,
                        timestamp: Date.now()
                    });

                    localStorage.setItem("currentStudent", student.name);
                    localStorage.setItem("currentTC", tc);
                    localStorage.setItem("currentBatch", student.batch || '');
                    localStorage.setItem("currentDivision", student.division);

                    document.getElementById('login-section').style.display = 'none';
                    document.getElementById('instruction-section').style.display = 'block';

                    // --- Real-time updates ---
                    const loginCountKey = student.name + "_loginCount";
                    let loginCount = parseInt(localStorage.getItem(loginCountKey) || "0");
                    localStorage.setItem(loginCountKey, loginCount + 1);

                    let examActive = false;
                    let activeExamId = null;
                    let activeHomeworkId = null;
                    let assignedExamData = null;
                    let homeworkData = null;
                    let hasExam = false;
                    let hasHomework = false;

                    function updatePortalUI() {
                        const examBtn = document.querySelector('#instruction-section button[onclick="startExam()"]');
                        const examInstructions = document.querySelector('#instruction-section ul');
                        const examTitle = document.querySelector('#instruction-section h2');
                        const hwContainer = document.getElementById('homework-btn-container');

                        let examDuration = 90;
                        if (examActive && hasExam && assignedExamData) {
                            if (assignedExamData.duration) {
                                examDuration = parseInt(assignedExamData.duration);
                            } else if (assignedExamData.examDuration) {
                                examDuration = parseInt(assignedExamData.examDuration);
                            }
                        }
                        timeLeft = examDuration * 60;

                        if (examActive && hasExam && assignedExamData && assignedExamData.questions) {
                            currentQuestions = assignedExamData.questions;
                        } else {
                            currentQuestions = generateQuestionsByLogin(questionBank, loginCount, student.name);
                        }

                        if (examTitle) {
                            if (examActive && hasExam && assignedExamData) {
                                const activeTitle = assignedExamData.title || 'STA ONLINE EXAM';
                                examTitle.innerText = "✍️ " + activeTitle;
                                localStorage.setItem('currentExamTitle', activeTitle); // store for result page
                                localStorage.setItem('currentExamFirestoreId', assignedExamData.id || ''); // store Firestore doc ID
                            } else {
                                examTitle.innerText = "⏳ Dashboard Status";
                                localStorage.removeItem('currentExamTitle');
                                localStorage.removeItem('currentExamFirestoreId');
                            }
                        }

                        if (examInstructions) {
                            if (examActive && hasExam && assignedExamData) {
                                examInstructions.innerHTML = `
                                    <h3>Online Examination Instructions</h3>
                                    <p>Read all instructions carefully before clicking Start.</p>
                                    <ul>
                                        <li>📝 <b>Total Questions:</b> ${currentQuestions.length} MCQs</li>
                                        <li>🕐 <b>Exam Timer:</b> ${examDuration} Minutes</li>
                                        <li>⚠️ <b>Warning:</b> Leaving the tab twice will auto-submit.</li>
                                    </ul>`;
                                if (examBtn) examBtn.style.display = 'block';
                                examInstructions.style.display = 'block';
                            } else {
                                if (examBtn) examBtn.style.display = 'none';
                                examInstructions.style.display = 'none';
                            }
                        }

                        userAnswers = new Array(currentQuestions.length).fill(null);

                        if (hasHomework && homeworkData) {
                            hwDocId = homeworkData.id;
                            hwDocTitle = homeworkData.title || 'Homework Assignment';
                            hwQuestions = homeworkData.questions;
                            if (hwContainer) hwContainer.style.display = 'block';
                        } else {
                            hwQuestions = [];
                            if (hwContainer) hwContainer.style.display = 'none';
                        }

                        // UI status message if nothing is active
                        if (!examActive && !hasHomework) {
                            if (examTitle) examTitle.innerText = "⏳ Dashboard Status";
                            if (examInstructions) {
                                examInstructions.innerHTML = `
                                    <div style="text-align:center; padding: 25px 0; color:#555;">
                                        <div style="display:inline-block; width:35px; height:35px; border:3px solid #f3f3f3; border-top:3px solid #00828c; border-radius:50%; animation:spin 1s linear infinite; margin-bottom:12px;"></div>
                                        <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
                                        <p style="font-weight:600; font-size:14px; margin-bottom:4px;">No Active Exam or Homework</p>
                                        <p style="font-size:12px; color:#777;">Please wait for your instructor to publish or activate one.</p>
                                    </div>`;
                                examInstructions.style.display = 'block';
                            }
                        }
                    }

                    // Listen for Exam Activation (RTDB)
                    database.ref('exam_activation/' + divKey).on('value', activationSnap => {
                        const activationData = activationSnap.val();
                        examActive = activationData && activationData.active === true;
                        updatePortalUI();
                    });

                    // Listen for Active Exam ID (RTDB)
                    let examUnsubscribe = null;
                    database.ref('active_exams/' + divKey).on('value', activeExamSnap => {
                        const activeExamData = activeExamSnap.val();
                        const newExamId = activeExamData ? activeExamData.firestoreId : null;
                        
                        if (examUnsubscribe) {
                            examUnsubscribe();
                            examUnsubscribe = null;
                        }

                        if (newExamId) {
                            activeExamId = newExamId;
                            examUnsubscribe = firestoreDb.collection('ActiveExams').doc(activeExamId)
                                .onSnapshot(doc => {
                                    if (doc.exists && doc.data().active === true) {
                                        hasExam = true;
                                        assignedExamData = { id: doc.id, ...doc.data() };
                                    } else {
                                        hasExam = false;
                                        assignedExamData = null;
                                    }
                                    updatePortalUI();
                                }, err => {
                                    console.error("Error fetching active exam from Firestore:", err);
                                    hasExam = false;
                                    assignedExamData = null;
                                    updatePortalUI();
                                });
                        } else {
                            activeExamId = null;
                            hasExam = false;
                            assignedExamData = null;
                            updatePortalUI();
                        }
                    });

                    // Listen for Active Homework ID (RTDB)
                    let homeworkUnsubscribe = null;
                    database.ref('active_homeworks/' + divKey).on('value', activeHwSnap => {
                        const activeHwData = activeHwSnap.val();
                        const newHwId = activeHwData ? activeHwData.firestoreId : null;

                        if (homeworkUnsubscribe) {
                            homeworkUnsubscribe();
                            homeworkUnsubscribe = null;
                        }

                        if (newHwId) {
                            activeHomeworkId = newHwId;
                            homeworkUnsubscribe = firestoreDb.collection('ActiveAssignments').doc(activeHomeworkId)
                                .onSnapshot(doc => {
                                    if (doc.exists && doc.data().active === true) {
                                        hasHomework = true;
                                        homeworkData = { id: doc.id, ...doc.data() };
                                    } else {
                                        hasHomework = false;
                                        homeworkData = null;
                                    }
                                    updatePortalUI();
                                }, err => {
                                    console.error("Error fetching active homework from Firestore:", err);
                                    hasHomework = false;
                                    homeworkData = null;
                                    updatePortalUI();
                                });
                        } else {
                            activeHomeworkId = null;
                            hasHomework = false;
                            homeworkData = null;
                            updatePortalUI();
                        }
                    });
                }
            }).catch(err => {
                console.error(err);
                alert("Could not connect to database. Check your internet.");
            });
        } else {
            errorMsg.style.display = 'block';
        }
    }).catch(err => {
        console.error("Firebase read students error:", err);
        alert("Could not read student registry. Check your internet.");
    });
}

function startExam() {
    violationCount = 0;
    document.getElementById('instruction-section').style.display = 'none';
    document.getElementById('question-section').style.display = 'block';

    timerInterval = setInterval(() => {
        timeLeft--;
        let min = Math.floor(timeLeft / 60);
        let sec = timeLeft % 60;
        document.getElementById('timer-display').innerText = `Time: ${min}:${sec < 10 ? '0' + sec : sec}`;
        if (timeLeft <= 0) calculateFinalScore();
    }, 1000);

    loadQuestion();
}

// ===============================
// 🎯 FIX: CAPTURING ANSWERS CORRECTLY
// ===============================
function loadQuestion() {
    const q = currentQuestions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.q || q.question;
    document.getElementById('question-number').innerText = currentQuestionIndex + 1;
    document.getElementById('total-questions').innerText = currentQuestions.length;
    document.getElementById('progress-bar').style.width = ((currentQuestionIndex + 1) / currentQuestions.length * 100) + "%";

    const container = document.getElementById('options-container');
    container.innerHTML = "";

    q.options.forEach(opt => {
        const isChecked = userAnswers[currentQuestionIndex] === opt;

        const optionBtn = document.createElement('label');
        optionBtn.className = "option-label";
        optionBtn.innerHTML = `
            <input type="radio" name="opt" value="${opt.replace(/"/g, '&quot;')}" ${isChecked ? 'checked' : ''}>
            ${opt}
        `;

        optionBtn.onclick = () => {
            userAnswers[currentQuestionIndex] = opt;
        };

        container.appendChild(optionBtn);
    });

    document.getElementById('prev-btn').style.visibility = currentQuestionIndex === 0 ? "hidden" : "visible";
    document.getElementById('next-btn').innerText = currentQuestionIndex === (currentQuestions.length - 1) ? "FINISH" : "NEXT";
}



function nextQuestion() {
    if (currentQuestionIndex < currentQuestions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        if (confirm("Submit Exam?")) calculateFinalScore();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// ===============================
// 📊 FIX: PREVENTING "UNDEFINED" IN REPORT
// ===============================
function calculateFinalScore() {
    clearInterval(timerInterval);
    localStorage.setItem("examStatus", "done");

    let score = 0;
    const reportDetails = currentQuestions.map((q, i) => {
        const isCorrect = userAnswers[i] === q.answer;
        if (isCorrect) score++;
        return {
            question: q.q || q.question,
            userSelection: userAnswers[i] || "Not Answered",
            correctAnswer: q.answer,
            status: isCorrect
        };
    });

    const studentName = localStorage.getItem("currentStudent") || "Unknown";
    const tcNo = localStorage.getItem("currentTC") || "N/A";
    const studentBatch = localStorage.getItem("currentBatch") || "N/A";
    const studentDivision = localStorage.getItem("currentDivision") || "N/A";
    const finalPercent = Math.round((score / currentQuestions.length) * 100);

    const examTitleToSave = localStorage.getItem('currentExamTitle') || 'STA Online Exam';
    const examFirestoreIdToSave = localStorage.getItem('currentExamFirestoreId') || null;

    // SEND TO FIREBASE (includes division, examTitle, and examFirestoreId for accurate admin mapping)
    database.ref('exam_results').push({
        name: studentName,
        tcNumber: tcNo,
        batch: studentBatch,
        division: studentDivision,
        score: score,
        totalQuestions: currentQuestions.length,
        percentage: finalPercent,
        details: reportDetails,
        submittedAt: new Date().toLocaleString(),
        violations: violationCount,
        examTitle: examTitleToSave,
        examFirestoreId: examFirestoreIdToSave
    });

    // UPDATE UI
    document.getElementById('question-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-total').innerText = currentQuestions.length;
    document.getElementById('result-percent').innerText = `Percentage: ${finalPercent}%`;

    const statusLabel = document.getElementById('result-status');
    if (finalPercent >= 70) {
        statusLabel.innerText = "✅ PASSED";
        statusLabel.style.color = "#28a745";
    } else {
        statusLabel.innerText = "❌ FAILED";
        statusLabel.style.color = "#d9534f";
    }

    // Build question-wise detail breakdown
    const examTitle = localStorage.getItem('currentExamTitle') || 'Exam';
    let examDetailHtml = `
        <div style="text-align:left; border-top:2px solid #e2e8f0; padding-top:16px; margin-top:12px;">
            <h3 style="font-size:16px; font-weight:700; color:#1e293b; margin:0 0 14px 0; padding:10px 14px; background:#f1f5f9; border-radius:8px; border-left:4px solid #00828c;">📋 ${examTitle}</h3>`;
    reportDetails.forEach((d, i) => {
        const color = d.status ? '#10b981' : '#ef4444';
        const bg = d.status ? '#f0fdf4' : '#fef2f2';
        const icon = d.status ? '✅' : '❌';
        examDetailHtml += `
            <div style="margin-bottom:14px; padding:14px; border-radius:10px; background:${bg}; border:1px solid ${color}44;">
                <p style="font-weight:700; font-size:14px; color:#222; margin:0 0 8px 0;">Q${i+1}: ${d.question}</p>
                <p style="font-size:13px; margin:2px 0; color:#555;">📝 Your Answer: <strong style="color:${color};">${d.userSelection}</strong></p>
                <p style="font-size:13px; margin:2px 0; color:#555;">✔️ Correct Answer: <strong style="color:#10b981;">${d.correctAnswer}</strong></p>
                <p style="font-size:12px; margin-top:6px; font-weight:700; color:${color};">${icon} ${d.status ? 'Correct' : 'Wrong'}</p>
            </div>`;
    });
    examDetailHtml += `</div>`;
    document.getElementById('result-detail').innerHTML = examDetailHtml;
}

// ===============================
// 🚨 ANTI-CHEAT SYSTEM
// ===============================

// Shared debounce — prevents double-counting when both blur + visibilitychange
// fire together (e.g. alt-tab triggers both simultaneously)
let lastViolationTime = 0;

function handleViolation() {
    const now = Date.now();
    if (now - lastViolationTime < 600) return; // debounce: ignore if fired within 600ms
    lastViolationTime = now;

    const isExamActive = document.getElementById('question-section').style.display === 'block';
    const isHomeworkActive = document.getElementById('homework-section').style.display === 'block';

    if (!(isExamActive || isHomeworkActive)) return;

    violationCount++;

    if (violationCount === 1) {
        alert("⚠️ WARNING: Do not leave the exam window! Your first violation has been recorded.");
    } else if (violationCount >= 2) {
        alert("❌ EXAM TERMINATED: Multiple focus violations detected. Your exam is being auto-submitted.");
        if (isExamActive) {
            calculateFinalScore();
        } else if (isHomeworkActive) {
            submitHomework();
        }
    }
}

// Trigger 1: Tab hidden (minimized, tab switch, etc.)
document.addEventListener("visibilitychange", function () {
    if (document.hidden) handleViolation();
});

// Trigger 2: Window lost focus (alt+tab, click on another app/window)
window.addEventListener("blur", function () {
    handleViolation();
});

// Remote Reset Timing Control
const pageLoadTime = Date.now();
let userResetListenerActive = false;

function handleResetSignal(firebaseTimestamp, type) {
    const localTimestamp = parseInt(localStorage.getItem("lastResetTimestamp") || "0");
    // Only reload if the reset signal is NEW (occurred after this page session started)
    if (firebaseTimestamp > localTimestamp && firebaseTimestamp > pageLoadTime) {
        localStorage.clear();
        localStorage.setItem("lastResetTimestamp", firebaseTimestamp.toString());
        location.reload();
    }
}

function listenForAdminResets() {
    if (typeof database !== 'undefined') {
        database.ref('account_resets/global').on('value', (snapshot) => {
            const data = snapshot.val();
            if (data && data.timestamp) {
                handleResetSignal(data.timestamp, "Global Reset");
            }
        });

        checkAndStartUserListener();
        setInterval(checkAndStartUserListener, 2000);
    }
}

function checkAndStartUserListener() {
    if (userResetListenerActive) return;
    const currentStudent = localStorage.getItem("currentStudent");
    if (currentStudent && typeof database !== 'undefined') {
        const safeName = getSafeName(currentStudent);
        database.ref('account_resets/users/' + safeName).on('value', (snapshot) => {
            const data = snapshot.val();
            if (data && data.timestamp) {
                handleResetSignal(data.timestamp, "User Reset");
            }
        });
        userResetListenerActive = true;
    }
}

// Initialize listener
listenForAdminResets();

// ===============================
// 📚 HOMEWORK SYSTEM
// ===============================

let hwQuestions = [];
let hwCurrentIndex = 0;
let hwAnswers = [];
let hwDocId = '';
let hwDocTitle = '';

async function checkForHomework(batch) {
    try {
        const snap = await firestoreDb.collection('ActiveAssignments')
            .where('active', '==', true)
            .get();

        let found = null;
        snap.forEach(doc => {
            const data = doc.data();
            // Match if batch string starts with the student's batch (e.g. "61st Batch" contains "61st")
            if (data.batch && data.batch.includes(batch)) {
                found = { id: doc.id, ...data };
            }
        });

        if (found && Array.isArray(found.questions) && found.questions.length > 0) {
            hwDocId = found.id;
            hwDocTitle = found.title || 'Homework Assignment';
            hwQuestions = found.questions;
            // Show the homework button
            const container = document.getElementById('homework-btn-container');
            if (container) container.style.display = 'block';
        }
    } catch (err) {
        console.error('Homework check error:', err);
    }
}

function openHomework() {
    if (hwQuestions.length === 0) {
        alert('No homework available right now.');
        return;
    }
    violationCount = 0;

    hwCurrentIndex = 0;
    hwAnswers = new Array(hwQuestions.length).fill(null);

    // Hide instruction section, show homework section
    document.getElementById('instruction-section').style.display = 'none';
    document.getElementById('homework-section').style.display = 'block';

    document.getElementById('hw-title').innerText = hwDocTitle;
    document.getElementById('hw-total-label').innerText = `of ${hwQuestions.length} questions`;

    hwLoadQuestion();
}

function hwLoadQuestion() {
    const q = hwQuestions[hwCurrentIndex];
    if (!q) return;

    const qText = q.q || q.question || q.questionText || '';
    document.getElementById('hw-question-text').innerText = qText;
    document.getElementById('hw-question-counter').innerText = `Q${hwCurrentIndex + 1}`;
    document.getElementById('hw-progress').style.width = ((hwCurrentIndex + 1) / hwQuestions.length * 100) + '%';

    const container = document.getElementById('hw-options-container');
    container.innerHTML = '';

    const options = Array.isArray(q.options) ? q.options : [];
    options.forEach(opt => {
        const isChecked = hwAnswers[hwCurrentIndex] === opt;
        const lbl = document.createElement('label');
        lbl.className = 'option-label';
        lbl.style.cssText = isChecked ? 'background:#eef2ff; border-color:#6366f1;' : '';
        lbl.innerHTML = `
            <input type="radio" name="hw-opt" value="${opt.replace(/"/g, '&quot;')}" ${isChecked ? 'checked' : ''} style="accent-color:#6366f1; width:18px; height:18px; flex-shrink:0;">
            ${opt}
        `;
        lbl.onclick = () => {
            hwAnswers[hwCurrentIndex] = opt;
            // Update styles
            container.querySelectorAll('.option-label').forEach(l => {
                l.style.background = '';
                l.style.borderColor = '';
            });
            lbl.style.background = '#eef2ff';
            lbl.style.borderColor = '#6366f1';
        };
        container.appendChild(lbl);
    });

    document.getElementById('hw-prev-btn').style.visibility = hwCurrentIndex === 0 ? 'hidden' : 'visible';
    const nextBtn = document.getElementById('hw-next-btn');
    nextBtn.innerText = hwCurrentIndex === hwQuestions.length - 1 ? 'SUBMIT' : 'NEXT';
    nextBtn.style.background = hwCurrentIndex === hwQuestions.length - 1 ? '#10b981' : '#6366f1';
}

function hwNext() {
    if (hwCurrentIndex < hwQuestions.length - 1) {
        hwCurrentIndex++;
        hwLoadQuestion();
    } else {
        // Last question — submit
        const unanswered = hwAnswers.filter(a => a === null).length;
        const msg = unanswered > 0
            ? `You have ${unanswered} unanswered question(s). Submit anyway?`
            : 'Submit your homework now?';
        if (confirm(msg)) submitHomework();
    }
}

function hwPrev() {
    if (hwCurrentIndex > 0) {
        hwCurrentIndex--;
        hwLoadQuestion();
    }
}

async function submitHomework() {
    let score = 0;
    const details = hwQuestions.map((q, i) => {
        const correct = q.answer || q.correctAnswer || q.correctOption || '';
        const isCorrect = hwAnswers[i] === correct;
        if (isCorrect) score++;
        return {
            question: q.q || q.question || q.questionText || '',
            userAnswer: hwAnswers[i] || 'Not Answered',
            correctAnswer: correct,
            correct: isCorrect
        };
    });

    const studentName = localStorage.getItem('currentStudent') || 'Unknown';
    const batch = localStorage.getItem('currentBatch') || '61st';
    const division = localStorage.getItem('currentDivision') || 'N/A';
    const tcNumber = localStorage.getItem('currentTC') || '';
    const percent = Math.round((score / hwQuestions.length) * 100);

    // Save to Firestore
    try {
        await firestoreDb.collection('HomeworkResults').add({
            name: studentName,
            tcNumber: tcNumber,
            batch: batch,
            division: division,
            homeworkId: hwDocId,
            homeworkTitle: hwDocTitle,
            score: score,
            total: hwQuestions.length,
            percentage: percent,
            details: details,
            submittedAt: new Date().toLocaleString(),
            violations: violationCount
        });
    } catch (err) {
        console.error('Homework submit error:', err);
    }

    // Show result
    document.getElementById('homework-section').style.display = 'none';
    document.getElementById('homework-result-section').style.display = 'block';
    document.getElementById('hw-final-score').innerText = `${score}/${hwQuestions.length}`;
    document.getElementById('hw-percent').innerText = `Score: ${percent}%`;

    // Set PASSED / FAILED status
    const hwStatus = document.getElementById('hw-status');
    if (hwStatus) {
        if (percent >= 70) {
            hwStatus.innerText = '✅ PASSED';
            hwStatus.style.color = '#28a745';
        } else {
            hwStatus.innerText = '❌ FAILED';
            hwStatus.style.color = '#d9534f';
        }
    }

    // Build question-wise detail breakdown (same as exam result)
    let detailHtml = `
        <div style="text-align:left; border-top:2px solid #e2e8f0; padding-top:16px; margin-top:12px;">
            <h3 style="font-size:16px; font-weight:700; color:#1e293b; margin:0 0 14px 0; padding:10px 14px; background:#f0f0ff; border-radius:8px; border-left:4px solid #6366f1;">📋 ${hwDocTitle || 'Assignment'}</h3>`;
    details.forEach((d, i) => {
        const color = d.correct ? '#10b981' : '#ef4444';
        const bg = d.correct ? '#f0fdf4' : '#fef2f2';
        const icon = d.correct ? '✅' : '❌';
        detailHtml += `
            <div style="margin-bottom:14px; padding:14px; border-radius:10px; background:${bg}; border:1px solid ${color}44;">
                <p style="font-weight:700; font-size:14px; color:#222; margin:0 0 8px 0;">Q${i+1}: ${d.question}</p>
                <p style="font-size:13px; margin:2px 0; color:#555;">📝 Your Answer: <strong style="color:${color};">${d.userAnswer}</strong></p>
                <p style="font-size:13px; margin:2px 0; color:#555;">✔️ Correct Answer: <strong style="color:#10b981;">${d.correctAnswer}</strong></p>
                <p style="font-size:12px; margin-top:6px; font-weight:700; color:${color};">${icon} ${d.correct ? 'Correct' : 'Wrong'}</p>
            </div>`;
    });
    detailHtml += `</div>`;
    document.getElementById('hw-result-detail').innerHTML = detailHtml;
}
