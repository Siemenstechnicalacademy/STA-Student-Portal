
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

function getTcIncrement(tc) {
    if (!tc) return 0;
    const numericPart = tc.replace(/\D/g, '');
    if (!numericPart) return 0;

    const studentName = localStorage.getItem("currentStudent");
    let loginCount = 0;
    if (studentName) {
        loginCount = parseInt(localStorage.getItem(studentName + "_loginCount") || "0");
    }

    const idx = numericPart.length - 1 - (loginCount % numericPart.length);
    const digit = parseInt(numericPart[idx], 10);
    return isNaN(digit) ? 0 : digit;
}

function safeEval(expr, variables) {
    if (typeof expr !== 'string') return expr;
    let resolvedExpr = expr;
    
    // Sort keys by length descending so we replace longer variables first (e.g. RHS1 before RHS)
    const sortedKeys = Object.keys(variables).sort((a, b) => b.length - a.length);
    for (const key of sortedKeys) {
        const regex = new RegExp('\\b' + key + '\\b', 'g');
        resolvedExpr = resolvedExpr.replace(regex, variables[key]);
    }
    
    // Sanity / Security check: whitelist mathematical characters and Math functions only
    const cleanExpr = resolvedExpr
        .replace(/Math\.(pow|sqrt|cbrt|PI|round|floor|ceil|abs)/g, '')
        .replace(/\.toFixed\(\d+\)/g, '')
        .trim();
        
    const mathRegex = /^[0-9+\-*/().\s,]*$/;
    if (!mathRegex.test(cleanExpr)) {
        console.error("Unsafe math expression blocked:", expr, "Resolved to:", resolvedExpr);
        throw new Error("Security Violation: Unsafe mathematical expression");
    }
    
    try {
        return new Function('return (' + resolvedExpr + ')')();
    } catch (e) {
        console.error("Error evaluating math expression:", resolvedExpr, e);
        return 0;
    }
}

function resolveDynamicQuestion(q, tc) {
    if (!q.isDynamic) return q;
    const increment = getTcIncrement(tc);
    
    try {
        // --- 1. LEGACY / FUNCTION-BASED SCHEMA ---
        if (q.formula || q.distractors) {
            let formulaFn = q.formula;
            if (typeof formulaFn === 'string') {
                let cleanFn = formulaFn.trim();
                if (!cleanFn.startsWith('function') && !cleanFn.startsWith('(') && !cleanFn.includes('=>')) {
                    cleanFn = 'function ' + cleanFn;
                }
                formulaFn = new Function('return ' + cleanFn)();
            }
            let distractorsFn = q.distractors;
            if (typeof distractorsFn === 'string') {
                let cleanFn = distractorsFn.trim();
                if (!cleanFn.startsWith('function') && !cleanFn.startsWith('(') && !cleanFn.includes('=>')) {
                    cleanFn = 'function ' + cleanFn;
                }
                distractorsFn = new Function('return ' + cleanFn)();
            }

            const result = formulaFn(q.base_values, increment);
            let questionText = q.template || q.q || q.question || "";
            for (const [key, val] of Object.entries(result.values)) {
                questionText = questionText.split('{' + key + '}').join(val);
            }
            const distractors = distractorsFn(result.answer, q.base_values, increment);
            
            const suffix = q.suffix || "";
            const finalAnswer = result.answer + suffix;
            const finalOptions = shuffle([
                finalAnswer,
                ...distractors.map(d => d + suffix)
            ]);

            return {
                ...q,
                q: questionText,
                options: finalOptions,
                answer: finalAnswer
            };
        }

        // --- 2. NEW JSON-SAFE SCHEMA ---
        // Build math evaluation context with increment and base values
        const variables = {
            inc: increment,
            ...q.base_values
        };
        
        // Evaluate dynamic variables if formulas are provided
        if (q.variable_formulas) {
            for (const [key, formula] of Object.entries(q.variable_formulas)) {
                variables[key] = safeEval(formula, variables);
            }
        }
        
        // Calculate the correct answer
        const rawAns = safeEval(q.formula_logic, variables);
        const formatRule = q.format_rule || "";
        let answerStr = "";
        if (formatRule !== "") {
            const dec = parseInt(formatRule, 10);
            answerStr = typeof rawAns === 'number' ? rawAns.toFixed(dec) : rawAns.toString();
        } else {
            answerStr = rawAns.toString();
        }
        
        // Calculate distractors using the correct answer (ANS) and variable values
        const distContext = {
            ...variables,
            ANS: rawAns
        };
        
        const distractors = [];
        if (Array.isArray(q.distractor_rules)) {
            for (const rule of q.distractor_rules) {
                const rawDist = safeEval(rule, distContext);
                let distStr = "";
                if (formatRule !== "") {
                    const dec = parseInt(formatRule, 10);
                    distStr = typeof rawDist === 'number' ? rawDist.toFixed(dec) : rawDist.toString();
                } else {
                    distStr = rawDist.toString();
                }
                distractors.push(distStr);
            }
        }
        
        // Substitute variable values into the template
        let questionText = q.template || q.q || q.question || "";
        for (const [key, val] of Object.entries(variables)) {
            if (key !== 'inc') {
                questionText = questionText.split('{' + key + '}').join(val);
            }
        }
        
        const suffix = q.suffix || "";
        const finalAnswer = answerStr + suffix;
        const finalOptions = shuffle([
            finalAnswer,
            ...distractors.map(d => d + suffix)
        ]);
        
        return {
            ...q,
            q: questionText,
            options: finalOptions,
            answer: finalAnswer
        };
    } catch (e) {
        console.error("Error resolving dynamic question:", e);
        return q;
    }
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
        const tc = localStorage.getItem("currentTC") || "";
        drawnQuestions.forEach(q => {
            const resolved = resolveDynamicQuestion(q, tc);
            finalQuestions.push({ ...resolved, topic: task.topic });
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

    // Fetch registered students from Firebase and merge
    database.ref('registered_students').once('value').then(snapshot => {
        let allStudents = [...students];
        const fbStudents = snapshot.val();
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

        const student = allStudents.find(s => {
            const dbName = s.name.split(' ')[0].toLowerCase();
            const inputName = name.split(' ')[0].toLowerCase();
            return dbName === inputName && s.pass === pass && s.batch === "61st";
        });

        if (student) {
            const safeName = getSafeName(student.name);
            const divKey = '61st_' + student.division;

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
                    localStorage.setItem("currentBatch", student.batch || "61st");
                    localStorage.setItem("currentDivision", student.division);

                    document.getElementById('login-section').style.display = 'none';
                    document.getElementById('instruction-section').style.display = 'block';

                    // --- Real-time updates ---
                    const loginCountKey = student.name + "_loginCount";
                    let loginCount = parseInt(localStorage.getItem(loginCountKey) || "0");
                    localStorage.setItem(loginCountKey, loginCount + 1);

                    // Setup real-time RTDB listener for exam activation
                    database.ref('exam_activation/' + divKey).on('value', activationSnap => {
                        const activationData = activationSnap.val();
                        const examActive = activationData && activationData.active === true;

                        // Setup real-time Firestore listeners for homework and exams
                        firestoreDb.collection('ActiveAssignments')
                            .where('active', '==', true)
                            .onSnapshot(homeworkSnap => {
                                let hasHomework = false;
                                let homeworkData = null;
                                homeworkSnap.forEach(doc => {
                                    const data = doc.data();
                                    const studentBatch = student.batch || "61st";
                                    const batchMatch = (data.batch && data.batch.includes(studentBatch)) ||
                                        (Array.isArray(data.batches) && data.batches.some(b => b.includes(studentBatch)));
                                    if (batchMatch) {
                                        hasHomework = true;
                                        homeworkData = { id: doc.id, ...data };
                                    }
                                });

                                firestoreDb.collection('ActiveExams')
                                    .where('active', '==', true)
                                    .onSnapshot(examSnap => {
                                        let hasExam = false;
                                        let assignedExamData = null;
                                        examSnap.forEach(doc => {
                                            const data = doc.data();
                                            const studentBatch = student.batch || "61st";
                                            const batchMatch = (data.batch && data.batch.includes(studentBatch)) ||
                                                (Array.isArray(data.batches) && data.batches.some(b => b.includes(studentBatch)));
                                            if (batchMatch) {
                                                hasExam = true;
                                                assignedExamData = { id: doc.id, ...data };
                                            }
                                        });

                                        // Update portal questions and buttons in real-time
                                        const examBtn = document.querySelector('#instruction-section button[onclick="startExam()"]');
                                        const examInstructions = document.querySelector('#instruction-section ul');
                                        const examTitle = document.querySelector('#instruction-section h2');
                                        const hwContainer = document.getElementById('homework-btn-container');

                                        if (examActive && hasExam && assignedExamData && assignedExamData.questions) {
                                            currentQuestions = assignedExamData.questions;
                                            currentQuestions = currentQuestions.map(q => resolveDynamicQuestion(q, tc));
                                        } else {
                                            currentQuestions = generateQuestionsByLogin(questionBank, loginCount, student.name);
                                        }

                                        if (examTitle) {
                                            if (examActive && hasExam && assignedExamData) {
                                                examTitle.innerText = "✍️ " + (assignedExamData.title || 'STA ONLINE EXAM');
                                            } else {
                                                examTitle.innerText = "⏳ Dashboard Status";
                                            }
                                        }

                                        if (examInstructions) {
                                            if (examActive && hasExam && assignedExamData) {
                                                examInstructions.innerHTML = `
                                                    <h3>Online Examination Instructions</h3>
                                                    <p>Read all instructions carefully before clicking Start.</p>
                                                    <ul>
                                                        <li>📝 <b>Total Questions:</b> ${currentQuestions.length} MCQs</li>
                                                        <li>🕐 <b>Exam Timer:</b> 90 Minutes</li>
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
                                    });
                            });
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

    // SEND TO FIREBASE (includes division)
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
        violations: violationCount
    });

    // UPDATE UI
    document.getElementById('question-section').style.display = 'none';
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('final-score').innerText = score;
    document.getElementById('final-total').innerText = currentQuestions.length;
    document.getElementById('result-percent').innerText = `Percentage: ${finalPercent}%`;

    const statusLabel = document.getElementById('result-status');
    if (finalPercent >= 70) {
        statusLabel.innerText = "PASSED";
        statusLabel.style.color = "#28a745";
    } else {
        statusLabel.innerText = "FAILED";
        statusLabel.style.color = "#d9534f";
    }
}

// Anti-Cheat
document.addEventListener("visibilitychange", function () {
    const isExamActive = document.getElementById('question-section').style.display === 'block';
    const isHomeworkActive = document.getElementById('homework-section').style.display === 'block';

    if (document.hidden && (isExamActive || isHomeworkActive)) {
        violationCount++;
        if (violationCount === 1) {
            alert("⚠️ Warning: Leaving the screen is not allowed!");
        } else if (violationCount >= 2) {
            alert("❌ Terminated: Multiple violations detected.");
            if (isExamActive) {
                calculateFinalScore();
            } else if (isHomeworkActive) {
                submitHomework();
            }
        }
    }
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
    const tc = localStorage.getItem("currentTC") || "";
    hwQuestions = hwQuestions.map(q => resolveDynamicQuestion(q, tc));

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
    const percent = Math.round((score / hwQuestions.length) * 100);

    // Save to Firestore
    try {
        await firestoreDb.collection('HomeworkResults').add({
            name: studentName,
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

    let detailHtml = '';
    details.forEach((d, i) => {
        const color = d.correct ? '#10b981' : '#ef4444';
        const bg = d.correct ? '#f0fdf4' : '#fef2f2';
        detailHtml += `
            <div style="margin-bottom:12px; padding:12px; border-radius:8px; background:${bg}; border:1px solid ${color}33;">
                <p style="font-weight:600; font-size:14px; margin-bottom:5px; color:#1e293b;">Q${i+1}: ${d.question}</p>
                <div style="font-size:13px; display:flex; gap:12px; flex-wrap:wrap;">
                    <span>Your answer: <strong style="color:${color};">${d.userAnswer}</strong></span>
                    ${!d.correct ? `<span>Correct: <strong style="color:#10b981;">${d.correctAnswer}</strong></span>` : ''}
                </div>
            </div>`;
    });
    document.getElementById('hw-result-detail').innerHTML = detailHtml;
}
