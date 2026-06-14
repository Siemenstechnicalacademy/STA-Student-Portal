// --- 61st BATCH QUESTION BANK ---
const questionBank = {
    "volume": [
        {
            isDynamic: true,
            template: "The perimeter of one face of a cube is {P} cm, its volume (in cm³) will be .............",
            base_values: { P: 20 },
            formula: function(base, inc) {
                const P = base.P + inc * 4;
                const side = P / 4;
                const volume = Math.pow(side, 3);
                return {
                    values: { P: P },
                    answer: volume.toString()
                };
            },
            distractors: function(correctAnswer, base, inc) {
                const P = base.P + inc * 4;
                const side = P / 4;
                const d1 = (side * side).toString();
                const d2 = (P * 2).toString();
                const d3 = (side * side * side * 2).toString();
                return [d1, d2, d3];
            }
        },
        { "q": "What is the volume V (in cm³) of the container which can hold 5.28 litre of oil?", "options": ["V = 5.28 cm³", "V = 52.8 cm³", "V = 528 cm³", "V = 5280 cm³"], "answer": "V = 5280 cm³" },
        { "q": "What is the total capacity V in litre of a cubical coolant tank of sides 500 mm?", "options": ["V = 12.5 litre", "V = 25.0 litre", "V = 125.0 litre", "V = 250.0 litre"], "answer": "V = 125.0 litre" },
        {
            isDynamic: true,
            template: "Calculate the volume of the cube whose side is {S} cm.",
            base_values: { S: 9 },
            formula: function(base, inc) {
                const S = base.S + inc;
                const volume = Math.pow(S, 3);
                return {
                    values: { S: S },
                    answer: volume + " cm\u00b3"
                };
            },
            distractors: function(correctAnswer, base, inc) {
                const S = base.S + inc;
                const v = Math.pow(S, 3);
                const d1 = (S * S * 3) + " cm\u00b3";
                const d2 = (v - 50) + " cm\u00b3";
                const d3 = (v + 50) + " cm\u00b3";
                return [d1, d2, d3];
            }
        },
        { "q": "A cube has a volume of 7220 cm\u00b3. Find its side.", "options": ["19.32 cm", "22.5 cm", "25.00 cm", "1.932 cm"], "answer": "19.32 cm" },
        { "q": "Find the mass of cube whose side is 10 cm and density of the material is 6.9 gm/cc.", "options": ["6400 gm", "6700 gm", "6800 gm", "6900 gm"], "answer": "6900 gm" },
        { "q": "Find the mass of cube whose side is 5 cm and density of the material is 6.9 gm/cc.", "options": ["862.5 gm", "852.5 gm", "762.5 gm", "652.5 gm"], "answer": "862.5 gm" },
        { "q": "What will be the density iron cube, if mass (m) of metal = 5 kg, volume (V) = 685 cm\u00b3", "options": ["6.29 gram /cm\u00b3", "7.29 gram /cm\u00b3", "8.29 gram /cm\u00b3", "9.29 gram /cm\u00b3"], "answer": "7.29 gram /cm\u00b3" },
        { "q": "If an iron cube weighing 4.99 kg has a volume of 640 cc. What will be the density?", "options": ["7.2 gram /cm\u00b3", "7.5 gram /cm\u00b3", "7.8 gram /cm\u00b3", "8.0 gram /cm\u00b3"], "answer": "7.8 gram /cm\u00b3" },
        { "q": "What is the volume of a room of length 15 feet breadth, 10 feet and height 12 feet?", "options": ["1000 cu.feet", "1200 cu.feet", "1600 cu.feet", "1800 cu.feet"], "answer": "1800 cu.feet" },
        { "q": "The volume of a cuboid of sides 10m, 10cm, 10 cm is ............ ", "options": ["100 cm\u00b3", "1000 cm\u00b3", "10000 cm\u00b3", "100000 cm\u00b3"], "answer": "100000 cm\u00b3" },
        { "q": "Find the weight of rectangular block of a cast iron casting of 100 x 9 x 12 cm, when the density is 7.8gm/cc.", "options": ["84.24 kg", "84.35 kg", "84.56 kg", "84.60 kg"], "answer": "84.24 kg" },
        { "q": "A casting of a rectangular block having 25 cm x 20 cm x 8 cm size. The density of C.I in 7.5 gm/cc. Calculate the weight.", "options": ["20 kg", "22 kg", "25 kg", "30 kg"], "answer": "30 kg" },
        { "q": "Find the weight of Rectangular block of a cast iron casting of 200cm x 18cm x 6cm. When the density is 7.8 gm/cc.", "options": ["1684.8 kg", "168.48 kg", "164.84 kg", "16.848 kg"], "answer": "168.48 kg" },
        { "q": "Calculate the mass (m) of a piece of metal in kg if Length (l) = 1000 mm ; Breadth (b) = 60 mm Height (h) = 10 mm ; Density (P) = 7.85 g/cm\u00b3", "options": ["1.71 kg", "2.71 kg", "3.71 kg", "4.71 kg"], "answer": "4.71 kg" },
        { "q": "Calculate the mass of steel plate length 1800 mm, width 65 mm, thickness 12 mm and density is 7.85 kg/dm\u00b3.", "options": ["14.02 kg", "12.02 kg", "11.03 kg", "10.03 kg"], "answer": "11.03 kg" },
        { "q": "Calculate the mass in kg of a rectangular steel plate of dimension 220m x 330m x 15m (density of plate is 7.85kg/dm\u00b3)", "options": ["855 kg", "723 kg", "7.25 kg", "8.55 kg"], "answer": "8.55 kg" },
        { "q": "To calculate the total surface area of cylinder which formula is used?", "options": ["(\u03c0r\u00b2/4) + L.S.A", "(\u03c0r\u00b2/2) + L.S.A", "(\u03c0d\u00b2/4) + L.S.A", "(\u03c0d\u00b2/2) + L.S.A"], "answer": "(\u03c0d\u00b2/2) + L.S.A" },
        { "q": "Volume of cylinder is equal to ...................", "options": ["\u03c0r\u00b2h", "(1/3)\u03c0r\u00b2h", "(2/3)\u03c0r\u00b2h", "(3/4)\u03c0r\u00b2h"], "answer": "\u03c0r\u00b2h" },
        { "q": "Which one of the following formulae is the correct one to be used to calculate the height (h) of the liquid column in a cylindrical vessel of inside diameter (d) and the volume of liquid (V)?", "options": ["h = (\u03c0 x V) / (d\u00b2 x \u03c0)", "h = (4 x V) / (d x \u03c0)", "h = (4 x V) / d\u00b2", "h = (4 x V) / (d\u00b2 x \u03c0)"], "answer": "h = (4 x V) / (d\u00b2 x \u03c0)" },
        { "q": "What is the formula for volume of a cylinder with its base diameter 'd' and height 'H'?", "options": ["d x H", "d\u00b2 x H", "(\u03c0d\u00b2/4) x H", "(\u03c0d\u00b2/4) x H\u00b2d"], "answer": "(\u03c0d\u00b2/4) x H" },
        { "q": "Calculate the volume of a cylinder whose base area is 120 cm\u00b2 and height of the cylinder is 16 cm.", "options": ["1600 cm\u00b3", "1920 cm\u00b3", "2240 cm\u00b3", "2420 cm\u00b3"], "answer": "1920 cm\u00b3" },
        { "q": "Find the total surface area of a cylinder of 14 cm diameter and 20 cm height. (Take \u03c0 = 22/7)", "options": ["1582 cm\u00b2", "1354 cm\u00b2", "1188 cm\u00b2", "1072 cm\u00b2"], "answer": "1188 cm\u00b2" },
        { "q": "Volume of cylinder whose height is 21cm & base radius is 14 cm is .........", "options": ["19404 cc", "4116 cc", "12936 cc", "181104 cc"], "answer": "12936 cc" },
        { "q": "The ratio of the respective heights and the respective radii of two cylinders are 1 : 2 and 2 : 1 respectively. Then their respective volumes are in the ratio ...................", "options": ["4 : 1", "2 : 1", "1 : 4", "1 : 2"], "answer": "2 : 1" },
        { "q": "Find the volume of the cylinder whose diameter is 20 cm and height is 40 cm.", "options": ["12571.14 cm\u00b3", "1257.14 cm\u00b3", "129.72 cm\u00b3", "12.972 cm\u00b3"], "answer": "12571.14 cm\u00b3" },
        { "q": "Base area and volume of a solid cylinder are 13.86cm\u00b2 and 69.3 cm\u00b3 respectively. Find its height.", "options": ["5 cm", "0.5 cm", "0.1 cm", "0.05 cm"], "answer": "5 cm" },
        { "q": "How many litre of water a cylinder of radius 75 cm and height 100 cm can hold?", "options": ["1767.38 litre", "1776.38 litre", "1767.857 litre", "1677.38 litre"], "answer": "1767.857 litre" }
    ],
    "algebra": [
        {
            isDynamic: true,
            template: "If 6x - 9x + 5x = {RHS1} - {RHS2} find the value of x.",
            base_values: { RHS1: 15, RHS2: 13 },
            formula: function(base, inc) {
                const RHS1 = base.RHS1 + inc * 2;
                const RHS2 = base.RHS2;
                const x = (RHS1 - RHS2) / 2;
                return {
                    values: { RHS1: RHS1, RHS2: RHS2 },
                    answer: x.toString()
                };
            },
            distractors: function(correctAnswer, base, inc) {
                const x = parseInt(correctAnswer);
                return [
                    (x + 1).toString(),
                    (x + 2).toString(),
                    (x + 3).toString()
                ];
            }
        },
        { "q": "If x = 3 and y = 2 find the value of x\u00b2 + xy + y\u00b2", "options": ["19","17","15","13"], "answer": "19" },
        { "q": "(a+b)\u00b2 = ...........", "options": ["a\u00b2 + b\u00b2 - 2ab","a\u00b2 + b\u00b2 + 2ab","a\u00b2 - b\u00b2 + ab","a\u00b2 - b\u00b2 - ab"], "answer": "a\u00b2 + b\u00b2 + 2ab" },
        { "q": "Choose the correct expansion of (a - b)\u00b2", "options": ["a\u00b2 - 2ab + b\u00b2","a\u00b2 + 2ab - b\u00b2","a\u00b2 + 2ab + b\u00b2","a\u00b2 - b\u00b2 - 2ab"], "answer": "a\u00b2 - 2ab + b\u00b2" },
        { "q": "Which one of the following is equal to (a + b)(a - b)?", "options": ["a\u00b2 + b\u00b2","a - b\u00b2","a\u00b2 - b\u00b2","a - b"], "answer": "a\u00b2 - b\u00b2" },
        { "q": "a\u00b3 - b\u00b3 = ....................", "options": ["a\u00b3 + b\u00b3 - 3ab","a\u00b2 - b\u00b2 - ab","(a - b)(a\u00b2 + ab + b\u00b2)","1.5"], "answer": "(a - b)(a\u00b2 + ab + b\u00b2)" },
        { "q": "(a + b)\u00b2 - 2ab =", "options": ["0","a\u00b2 + b\u00b2","a\u00b2 - b\u00b2","4ab"], "answer": "a\u00b2 + b\u00b2" },
        { "q": "The product of (3x + 4y)(3x - 4y) = .............", "options": ["9x\u00b2 + 16y\u00b2","9x\u00b2 + 12xy + 16y\u00b2","9x\u00b2 - 16y\u00b2","9x\u00b2 + 12xy - 16y\u00b2"], "answer": "9x\u00b2 - 16y\u00b2" },
        { "q": "The expansion of (a - b)\u00b3 is .........", "options": ["a\u00b3 - b\u00b3 - 3ab(a - b)","a\u00b3 + b\u00b3 + 3ab(a + b)","a\u00b3 - b\u00b3 - 3a\u00b2b - 3ab\u00b2","a\u00b3 - b\u00b3 - 3a\u00b2b\u00b2 - 3ab\u00b2"], "answer": "a\u00b3 - b\u00b3 - 3ab(a - b)" },
        { "q": "The expansion of (a + b)\u00b3 is .........", "options": ["a\u00b3 - b\u00b3 - 3ab(a - b)","a\u00b3 + b\u00b3 - 3ab(a - b)","a\u00b3 + b\u00b3 + 3ab(a + b)","a\u00b3 + b\u00b3 + 3ab\u00b2 - 3a\u00b2b"], "answer": "a\u00b3 + b\u00b3 + 3ab(a + b)" },
        { "q": "(a + b + c)\u00b2 = ...........", "options": ["a\u00b2 + b\u00b2 + c\u00b2 + 2(ab + bc + ca)","a\u00b2 + b\u00b2 + c\u00b2 + 2(a\u00b2b + b\u00b2c + c\u00b2a)","a\u00b2 + b\u00b2 + c\u00b2 + (ab + bc + ca)","a + b + c + (2a\u00b2b + 2b\u00b2c + 2c\u00b2a)"], "answer": "a\u00b2 + b\u00b2 + c\u00b2 + 2(ab + bc + ca)" },
        { "q": "Choose the correct expansion of a\u00b3 + b\u00b3", "options": ["(a + b)(a\u00b2 + b\u00b2 + ab)","(a + b)(a\u00b2 + b\u00b2 - ab)","(a - b)(a\u00b2 + b\u00b2 + ab)","(a + b)(a\u00b2 - b\u00b2 + ab)"], "answer": "(a + b)(a\u00b2 + b\u00b2 - ab)" },
        { "q": "Simplify: (a - b)\u00b2 / (a\u00b2 - 2ab + b\u00b2)", "options": ["(a - b)","(a + b)","0","1"], "answer": "1" },
        { "q": "Factorise : x\u00b2 - 25", "options": ["(x + 5)(x - 5)","(x - 10)(x + 10)","(x\u00b2 + 5)(x\u00b2 - 5)","(x\u00b2 + 10)(x\u00b2 - 10)"], "answer": "(x + 5)(x - 5)" },
        { "q": "Factorise : x\u00b2 - 49", "options": ["(x + 7)(x - 7)","(x + 7)(x + 7)","(x\u00b2 + 7)(x\u00b2 - 7)","(x\u00b2 - 7)(x\u00b2 - 7)"], "answer": "(x + 7)(x - 7)" },
        { "q": "Factorise : x\u2074 - 81", "options": ["(x + 3)(x - 3)","(x\u00b2 + 9)(x\u00b2 - 9)","(x\u00b2 + 9)(x + 3)(x - 3)","(x\u00b2 - 3)(x\u00b2 + 9)"], "answer": "(x\u00b2 + 9)(x + 3)(x - 3)" },
        { "q": "Solve the equation x\u00b2 - 2x - 8 = 0", "options": ["-2, 4","2, -4","2, 4","0, 4"], "answer": "-2, 4" },
        { "q": "One of the factors of x\u00b2 + 6x + 8 is ...........", "options": ["x + 6","x + 4","x + 1","x + 8"], "answer": "x + 4" },
        { "q": "Both (x\u00b2 - 1)(x\u00b2 + 1) are the factors of ...........", "options": ["(x\u2074 - 1)","(x\u2074 + 1)","(x\u00b2 + 2x + 1)","(x\u00b2 - 2x + 1)"], "answer": "(x\u2074 - 1)" },
        { "q": "Find the factors of x\u00b2 - 7x + 10 = 0", "options": ["x = +5 or +2","x = +5 or -2","x = -5 or -2","x = -5 or +2"], "answer": "x = +5 or +2" },
        { "q": "Find the factors of x\u00b2 - 10x + 24 = 0", "options": ["x = 4 or 6","x = -4 or -6","x = -4 or 6","x = 12 or -2"], "answer": "x = 4 or 6" },
        { "q": "Factorise the equation x\u00b2 - 3x + 2", "options": ["(x + 1)(x - 2)","(x - 2)(x - 1)","(x - 1)(x - 2)","(x + 1)(x + 2)"], "answer": "(x - 1)(x - 2)" },
        { "q": "Solve the equation x\u00b2 - 2x - 24 = 0", "options": ["x = 3 ; y = -8","x = 4 ; y = -6","x = 6 ; y = -4","x = 6 ; y = -3"], "answer": "x = 6 ; y = -4" },
        { "q": "x\u00b2 - 5x + 4 = 0 Solve the above equation", "options": ["x = 1 or 4","x = -1 or -4","x = +1 or -4","x = -1 or +4"], "answer": "x = 1 or 4" },
        { "q": "The general form of quadratic equation is", "options": ["ax\u00b2 + bx\u00b2 + c = 0","ax\u00b2 + bx + c = 0","(a + b)x + c = 0","ax\u00b3 + bx + c = 0"], "answer": "ax\u00b2 + bx + c = 0" },
        { "q": "If a < 0, then function f(x) = ax\u00b2 + bx + c has ......", "options": ["Maximum value","Minimum value","Constant value","Positive value"], "answer": "Maximum value" },
        { "q": "Which formula is used to solve the equation ax\u00b2 + bx + c = 0?", "options": ["x = (-b \u00b1 \u221a(b\u00b2 - 4ac)) / 2a","x = (-b \u00b1 \u221a(b\u00b2 + 4ac)) / 2a","x = (b \u00b1 \u221a(b\u00b2 - 4ac)) / 2a","x = (-b \u00b1 \u221a(b\u00b2 + 4ac)) / 2b"], "answer": "x = (-b \u00b1 \u221a(b\u00b2 - 4ac)) / 2a" },
        { "q": "If (a + b) = 6, ab = 9 find value of a\u00b2 + b\u00b2", "options": ["36","24","18","12"], "answer": "18" },
        { "q": "If a + b = 5 and a - b = 4, then the value of a\u00b2 - b\u00b2 is equal to :", "options": ["25","1","9","20"], "answer": "20" },
        { "q": "Solve : 11x + 3y = 50 ; 8x + 3y = 38", "options": ["4, -2","4, 2","4, 3","-4, -2"], "answer": "4, 2" }
    ],
    "mensuration": [
        { "q": "The perimeter 'U' and the breadth 'b' of the rectangular mid steel sheet are given. Which formula is used to calculate the length (l)?", "options": ["l = (U - 2b) / 2", "l = U - 2b", "l = (U - b) / 2", "l = U / 2 - b"], "answer": "l = (U - 2b) / 2" },
        { "q": "A rod 66 cm long is bent in the form of a rectangle such that its length is 7 cm greater than its breadth. Find length and breadth.", "options": ["18, 25", "16, 23", "12, 19", "20, 13"], "answer": "20, 13" },
        { "q": "Which one is the area of plate in m\u00b2? (200 mm x 100 mm)", "options": ["0.2 m\u00b2", "0.02 m\u00b2", "0.002 m\u00b2", "0.0002 m\u00b2"], "answer": "0.02 m\u00b2" },
        { "q": "The percentage increase in area of a rectangle if each side is increased by 20% is:", "options": ["44 %", "40 %", "42 %", "46 %"], "answer": "44 %" },
        { "q": "What is the thickness 'b' of the steel bar? (Area = 600 mm\u00b2, Length = 50 mm)", "options": ["550 mm", "120 mm", "100 mm", "12 mm"], "answer": "12 mm" },
        { "q": "The ratio of rectangle length and breadth is 6 : 4. If breadth is 28 cm, find length.", "options": ["32 cm", "42 cm", "52 cm", "62 cm"], "answer": "42 cm" },
        { "q": "If diagonals of a quadrilateral bisect at right angles, the shape is:", "options": ["Rhombus", "Rectangle", "Parallelogram", "Trapezium"], "answer": "Rhombus" },
        { "q": "A rhombus has side 4 m. Its perimeter is:", "options": ["10 m", "16 m", "32 m", "18 m"], "answer": "16 m" },
        { "q": "Quadrilateral with opposite sides parallel and equal but angles not 90\u00b0:", "options": ["Rhombus", "Parallelogram", "Rhomboid", "Trapezoid"], "answer": "Parallelogram" },
        { "q": "In a parallelogram, adjacent sides are equal 'a'. Diagonal length is:", "options": ["2a", "a\u221a3", "a\u221a2", "a"], "answer": "a\u221a2" },
        { "q": "Area of parallelogram formula:", "options": ["Base x height", "2 x base x height", "Semi-perimeter x base", "Base x height / 2"], "answer": "Base x height" },
        { "q": "Area of parallelogram (base=10 cm, height=5 cm):", "options": ["25 cm\u00b2", "50 cm\u00b2", "60 cm\u00b2", "75 cm\u00b2"], "answer": "50 cm\u00b2" },
        { "q": "Find height of parallelogram (base=10 cm, area=120 cm\u00b2):", "options": ["11 cm", "12 cm", "13 cm", "14 cm"], "answer": "12 cm" },
        { "q": "Area of trapezoid formula:", "options": ["(h / 2)(a + b)", "h(a + b)", "(h / 2)ab", "h(a - b)"], "answer": "(h / 2)(a + b)" },
        { "q": "Equal angles of an isosceles triangle are:", "options": ["30\u00b0", "45\u00b0", "60\u00b0", "90\u00b0"], "answer": "45\u00b0" },
        { "q": "In isosceles triangle, sum of two angles is 130\u00b0. Third angle is:", "options": ["55\u00b0", "60\u00b0", "50\u00b0", "45\u00b0"], "answer": "50\u00b0" },
        { "q": "Triangle with sides 5 cm, 9 cm, 12 cm is:", "options": ["Scalene triangle", "Equilateral triangle", "Isosceles triangle", "Right angle triangle"], "answer": "Scalene triangle" },
        { "q": "Isosceles triangle has:", "options": ["Three sides equal", "No sides equal", "Two sides equal", "Cannot say"], "answer": "Two sides equal" },
        { "q": "If \u2220A = \u2220B = \u2220C, triangle is:", "options": ["Acute", "Obtuse", "Isosceles", "Equilateral"], "answer": "Equilateral" },
        { "q": "Semi-perimeter formula (Heron\u2019s formula):", "options": ["s = (a + b + c)/2", "s = (a + b + c)/3", "s = a + b + c", "s = a + b - c"], "answer": "s = (a + b + c)/2" },
        { "q": "Area of triangle (20 cm, 15 cm, 10 cm):", "options": ["80.00 cm\u00b2", "79.24 cm\u00b2", "75.24 cm\u00b2", "72.24 cm\u00b2"], "answer": "72.24 cm\u00b2" },
        { "q": "Triangle area (base=6 cm, height=5 cm):", "options": ["11 cm\u00b2", "30 cm\u00b2", "15 cm\u00b2", "22 cm\u00b2"], "answer": "15 cm\u00b2" },
        { "q": "Triangle base 200 mm, area 2000 mm\u00b2 \u2192 height:", "options": ["10 mm", "15 mm", "20 mm", "200 mm"], "answer": "20 mm" },
        { "q": "Area of isosceles triangle (side=7 cm, base=5 cm):", "options": ["16.205 cm\u00b2", "15.225 cm\u00b2", "16.325 cm\u00b2", "16.350 cm\u00b2"], "answer": "16.350 cm\u00b2" },
        { "q": "Height of equilateral triangle:", "options": ["(\u221a3 / 4)a", "(\u221a3 / 2)a", "1/2 a", "(\u221a3 / 2)a\u00b2"], "answer": "(\u221a3 / 2)a" },
        { "q": "Area of equilateral triangle (side=20 cm):", "options": ["1732.0 cm\u00b2", "1640.0 cm\u00b2", "173.2 cm\u00b2", "164.0 cm\u00b2"], "answer": "173.2 cm\u00b2" },
        { "q": "AC\u00b2 = AB\u00b2 + BC\u00b2 represents:", "options": ["Pythagoras theorem", "Lami's theorem", "Bernoulli's theorem", "Thevenin's theorem"], "answer": "Pythagoras theorem" },
        { "q": "Triangle ABC: \u2220A=60\u00b0, \u2220C=30\u00b0, \u2220B=?", "options": ["30\u00b0", "45\u00b0", "60\u00b0", "90\u00b0"], "answer": "90\u00b0" },
        { "q": "Right triangle with two equal sides \u2192 other angles:", "options": ["45\u00b0, 60\u00b0", "30\u00b0, 60\u00b0", "60\u00b0, 60\u00b0", "45\u00b0, 45\u00b0"], "answer": "45\u00b0, 45\u00b0" }
    ],
    "Logarithm": [
        { "q": "Solve Using Log Table: 4517 x 3779", "options": ["17069723", "17069768", "17069743", "17069843"], "answer": "17069743", "type": "multiplication" },
        { "q": "Solve Using Log Table: 6526 \u00f7 5845", "options": ["1.2840", "1.1165", "1.2399", "1.0653"], "answer": "1.1165", "type": "division" },
        { "q": "Solve Using Log Table: 54\u2074", "options": ["8503056", "8502623", "8503064", "8503649"], "answer": "8503056", "type": "power" },
        { "q": "Solve Using Log Table: (672)\u00bc", "options": ["6.2149", "5.0915", "6.2625", "4.5792"], "answer": "5.0915", "type": "root" },
        { "q": "Solve Using Log Table: 3749 x 9439", "options": ["35386867", "35386731", "35387311", "35386811"], "answer": "35386811", "type": "multiplication" },
        { "q": "Solve Using Log Table: 1487 \u00f7 8926", "options": ["0.1916", "0.1154", "0.2900", "0.1666"], "answer": "0.1666", "type": "division" },
        { "q": "Solve Using Log Table: 91\u00b3", "options": ["753571", "752835", "754502", "753578"], "answer": "753571", "type": "power" },
        { "q": "Solve Using Log Table: (326)\u2153", "options": ["6.3701", "6.8824", "8.0058", "8.4653"], "answer": "6.8824", "type": "root" }
    ]
};
