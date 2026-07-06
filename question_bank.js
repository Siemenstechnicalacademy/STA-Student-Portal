// --- UNIFIED GLOBAL SHARDED QUESTION BANK ---
const questionBank = {
    "units": [
        { "q": "The length, mass and time units are classified as .........", "options": ["fundamental units", "derived units", "basic units", "fundamental and derived units"], "answer": "fundamental units" },
        { "q": "In metric system the letters M.K.S stands for ............", "options": ["millimetre, kilowatt, second", "metre, kilogram, second", "mass, kilogram, second", "metre, kelvin, second"], "answer": "metre, kilogram, second" },
        { "q": "The unit of length as per SI standard is ............", "options": ["millimetre", "centimetre", "metre", "kilometre"], "answer": "metre" },
        { "q": "Unit of length in C.G.S system is ......", "options": ["kilometre", "centimetre", "millimetre", "metre"], "answer": "centimetre" },
        { "q": "Unit of time in CGS system is ........", "options": ["day", "hour", "minute", "second"], "answer": "second" },
        { "q": "The unit metre is for .............", "options": ["mass", "time", "length", "heat"], "answer": "length" },
        { "q": "In MKS/SI system which unit is the absolute unit of weight?", "options": ["Newton", "1 Dyne", "1 Poundal", "1 Kilogram"], "answer": "Newton" },
        { "q": "Unit of length in F.P.S system is ........", "options": ["millimetre", "centimetre", "metre", "foot"], "answer": "foot" },
        { "q": "Mass of a body is the quantity of metal contained in a body. The unit of mass in MKS system is .................", "options": ["gram", "kilogram", "ton", "mg"], "answer": "kilogram" },
        { "q": "The unit of mass in CGS system is .............", "options": ["litre", "gram", "kilogram", "pound"], "answer": "gram" },
        { "q": "What is the unit of weight in metric unit?", "options": ["gram", "kgm", "LbF", "KgmF"], "answer": "KgmF" },
        { "q": "The unit of weight in CGS system is ..........", "options": ["Newton", "kilogram", "dyne", "erg"], "answer": "dyne" },
        { "q": "Unit of mass in SI system is .........", "options": ["gram", "centigram", "milligram", "kilogram"], "answer": "kilogram" },
        { "q": "In FPS system which unit is the absolute unit of weight?", "options": ["Newton", "1 Pound", "1 dyne", "Gram"], "answer": "1 Pound" },
        { "q": "The unit of mass in FPS system is .........", "options": ["kilogram", "gram", "pound", "ton"], "answer": "pound" },
        { "q": "SI unit of time is .........", "options": ["day", "hour", "minute", "second"], "answer": "second" },
        { "q": "Radian is one of the SI unit. Which physical quantity is measured in radian?", "options": ["Angle", "Length", "Acceleration", "Wavelength"], "answer": "Angle" },
        { "q": "10\u00b3 is .............", "options": ["3 x 10", "3 x 100", "3 x 1000", "10 x 10 x 10"], "answer": "10 x 10 x 10" },
        { "q": "Which one of the following is equal to 10\u207b\u00b2?", "options": ["0.001", "0.01", "100", "- 20"], "answer": "0.01" },
        { "q": "The number 4.4 x 10\u2076 ohms expressed using a metric prefix is ..........", "options": ["4 k", "4.4 k", "4M", "4.4M"], "answer": "4.4M" },
        { "q": "1 micron is equal to .............", "options": ["0.001 mm", "1 mm", "0.01 mm", "0.1 mm"], "answer": "0.001 mm" },
        { "q": "The value of symbol \u03bc = ............", "options": ["10\u207b\u2076", "10\u207b\u00b3", "10\u2076", "10\u00b3"], "answer": "10\u207b\u2076" },
        { "q": "Choose the equivalent 20 cm.", "options": ["0.02 m", "0.2m", "2 m", "20 m"], "answer": "0.2m" },
        { "q": "7m 25 cm = ...........", "options": ["725 cm", "575 cm", "527 cm", "275 cm"], "answer": "725 cm" },
        { "q": "85 m 85 cm + 76 m 42 cm = .............", "options": ["172 m 26 cm", "126 m 27 cm", "129 m 72 cm", "162 m 27 cm"], "answer": "162 m 27 cm" },
        { "q": "Convert 1 inch into mm.", "options": ["2.54 mm", "25.4 mm", "25.9 mm", "26.5 mm"], "answer": "25.4 mm" },
        { "q": "1 inch is .................", "options": ["25.4 cm", "2.54 cm", "2.54 mm", "30 mm"], "answer": "2.54 cm" },
        { "q": "0.125 inch = .............", "options": ["3.2 mm", "3.15 mm", "3.175 mm", "None of these"], "answer": "3.175 mm" },
        {
            isDynamic: true,
            q: "Convert {INCH} inches into cm.",
            template: "Convert {INCH} inches into cm.",
            base_values: { INCH: 40 },
            formula: function(base, inc) {
                const INCH = base.INCH + inc * 10;
                const cm = (INCH * 2.54).toFixed(1);
                return {
                    values: { INCH: INCH },
                    answer: cm + " cm"
                };
            },
            distractors: function(correctAnswer, base, inc) {
                const INCH = base.INCH + inc * 10;
                const d1 = (INCH * 2.5).toFixed(1) + " cm";
                const d2 = (INCH * 2.54 + 5.2).toFixed(1) + " cm";
                const d3 = (INCH * 2.54 - 5.2).toFixed(1) + " cm";
                return [d1, d2, d3];
            }
        },
        { "q": "Convert 2.65 inch into millimetre", "options": ["67.310 mm", "6.731 mm", "673.10 mm", "63.710 mm"], "answer": "67.310 mm" },
        { "q": "Choose the correct value of 127 cm into inch.", "options": ["20 inch", "30 inch", "40 inch", "50 inch"], "answer": "50 inch" },
        { "q": "Convert 2 metre into inch.", "options": ["67.74", "77.84", "78.74", "87.74"], "answer": "78.74" },
        { "q": "Choose the correct value of 1 metre.", "options": ["29.32 inch", "31.35 inch", "39.37 inch", "41.37 inch"], "answer": "39.37 inch" },
        { "q": "1 feet = .............", "options": ["8 inch", "12 inch", "15 inch", "17 inch"], "answer": "12 inch" },
        { "q": "Insulation tape is 10 metre long. What will be its length in feet?", "options": ["32.828 foot", "32.808 foot", "32.708 foot", "32.707 foot"], "answer": "32.808 foot" },
        { "q": "The convertion factor 1mm to convert inch is .............", "options": ["0.00393 inch", "0.03937 inch", "0.03793 inch", "0.03397 inch"], "answer": "0.03937 inch" },
        { "q": "Convert 12 feet into metre.", "options": ["37.5 metre", "36.5 metre", "3.65 metre", "2.179 metre"], "answer": "3.65 metre" },
        { "q": "Choose the correct equal value of 1km.", "options": ["1.609 mile", "0.633 mile", "0.622 mile", "0.609 mile"], "answer": "0.622 mile" },
        { "q": "Distance between Delhi and Bhopal is 705 km. Choose the equivalent in mile.", "options": ["428 mile", "438 mile", "528 mile", "538 mile"], "answer": "438 mile" },
        { "q": "1 mile = .................", "options": ["1.760 km", "1.609 km", "1.530 km", "1.304 km"], "answer": "1.609 km" },
        { "q": "1 Nautical mile =", "options": ["1852 metre", "7420 metre", "1000 metre", "10000 metre"], "answer": "1852 metre" },
        { "q": "Convert 5850 gram into kilogram", "options": ["585 kg", "58.50 kg", "5.850 kg", "0.5850 kg"], "answer": "5.850 kg" },
        { "q": "Convertion of gram to milligram. How many milligram are in 0.27g?", "options": ["2.7 mg", "27.0 mg", "270.0 mg", "2700.0 mg"], "answer": "270.0 mg" },
        { "q": "Kg is the unit of .........", "options": ["Weight", "Acceleration", "Speed", "Length"], "answer": "Weight" },
        { "q": "How many g are 4152.4 kg?", "options": ["41524 gram", "415240 gram", "4152400 gram", "41524000 gram"], "answer": "4152400 gram" },
        { "q": "Convert 650g = ............ kg", "options": ["0.065", "0.0065", "0.605", "0.65"], "answer": "0.65" },
        { "q": "How many kg is 0.58 mg?", "options": ["0.00000058 kg", "0.0000058 kg", "0.000058 kg", "0.00058 kg"], "answer": "0.00000058 kg" },
        { "q": "The total permissible mass of a truck is 7.5 tonne. Express this in kilogram.", "options": ["750 kg", "7500 kg", "75000 kg", "750000 kg"], "answer": "7500 kg" },
        { "q": "A workshop crane can lift a maximum mass of 2.5 tonne, express this in kg.", "options": ["2500 kg", "25000 kg", "250000 kg", "2500000 kg"], "answer": "2500 kg" },
        { "q": "Change 2 Metric ton into kilogram.", "options": ["2000 kg", "200 kg", "250 kg", "25 kg"], "answer": "2000 kg" }
    ],

    "fraction": [
        { "q": "Which one set of numbers is called prime number?", "options": ["3, 5, 7, 11, 13, 17", "1, 2, 3, 4, 5, 6", "0, 1, 2, 3, 4, 5", "0, 2, 4, 6, 8, 10"], "answer": "3, 5, 7, 11, 13, 17" },
        { "q": "The number which are divisible by 2 are known as .........", "options": ["Odd numbers", "Even numbers", "Prime number", "None of these"], "answer": "Even numbers" },
        { "q": "If any whole number is divided by zero, its quotient value is equal to .............", "options": ["zero", "same number", "infinity", "one"], "answer": "infinity" },
        { "q": "The numerical value of \u03c0 is equal to .............", "options": ["3.14", "1.414", "2", "0.003"], "answer": "3.14" },
        { "q": "Find the value of 57 + 69 + 107 + 70 = .................", "options": ["203", "303", "410", "304"], "answer": "303" },
        { "q": "Find the value of 7361 - 6998 = .............", "options": ["363", "562", "364", "460"], "answer": "363" },
        { "q": "Find out the correct answer 4543 + 73 + 14 - 206", "options": ["4524", "4424", "4426", "4428"], "answer": "4424" },
        { "q": "Solve : 5624 + 9672 - 4100 + 6542", "options": ["17732", "17736", "17738", "17740"], "answer": "17738" },
        { "q": "Find the value of 301 x 108", "options": ["30508", "25308", "32508", "32506"], "answer": "32508" },
        { "q": "Simplify (5+2) (9-5) = ...........", "options": ["91", "82", "28", "12"], "answer": "28" },
        { "q": "Solve the brackets and choose the correct answer. (243 + 268) x (371 - 208)", "options": ["83,291", "83,292", "83,293", "83,294"], "answer": "83,293" },
        { "q": "Simplify : (30 x 3) + (5 x 7) ...........", "options": ["102", "125", "137", "237"], "answer": "125" },
        { "q": "(6 + 2) (9 - 5) (2 + 1) = .................", "options": ["96", "69", "36", "26"], "answer": "96" },
        { "q": "Divide : 625 / 10", "options": ["0.00625", "0.0625", "6.25", "62.5"], "answer": "62.5" },
        { "q": "Find the value of 1040 \u00f7 16 ...........", "options": ["66", "65", "60", "72"], "answer": "65" },
        { "q": "(6 x 9) \u00f7 (3 x 2) = .............", "options": ["12", "9", "6", "3"], "answer": "9" },
        { "q": "What is the largest 4 digit number exactly divisible by 88?", "options": ["9944", "9999", "9988", "9900"], "answer": "9944" },
        { "q": "12 bags of rice weight 600 kg. Find the weight of one bag.", "options": ["70 kg", "60 kg", "50 kg", "40 kg"], "answer": "50 kg" },
        { "q": "96 Metre long rope is to be cut into equal lengths. Find the number of pieces, if one piece is equal to 6 metre.", "options": ["32", "30", "16", "10"], "answer": "16" },
        { "q": "If the generator set is running 24 days in a month. If the consumption of diesel per month is 192 litre. Calculate number of litre per day.", "options": ["16", "12", "10", "8"], "answer": "8" },
        { "q": "A bus carries 64 passengers in a trip. How many trip it can make to clear 1664 passengers?", "options": ["24", "26", "28", "30"], "answer": "26" },
        { "q": "124 tables and 192 chairs were bought for a department, The cost of table is Rs.256/- and the cost of chair is Rs.112/- Find the total cost involved in this purchase.", "options": ["51,048", "52,128", "53,248", "53,428"], "answer": "53,248" },
        { "q": "LCM of 2, 4, 6, 8, 10 is .............", "options": ["40", "80", "120", "240"], "answer": "120" },
        { "q": "LCM of 2, 3 and 4 = .................", "options": ["24", "16", "12", "10"], "answer": "12" },
        { "q": "LCM of 3, 5, 15 is .............", "options": ["15", "30", "5", "None of these"], "answer": "15" },
        { "q": "Lowest common multiple (LCM) of 30, 36, 48 and 60 is .........", "options": ["60", "120", "240", "720"], "answer": "720" },
        { "q": "HCF of 2, 3, 5, 10 is .............", "options": ["1", "2", "30", "300"], "answer": "1" },
        { "q": "HCF of 2, 3 and 4 is .........", "options": ["1", "6", "12", "24"], "answer": "1" },
        { "q": "Which one is the greater of the fraction? 4/6, 3/8, 4/9, 5/12", "options": ["5/12", "4/9", "4/6", "3/8"], "answer": "4/6" },
        { "q": "Which fraction is bigger?", "options": ["5/12", "5/3", "15/18", "10/12"], "answer": "5/3" },
        { "q": "Which fraction is biggest?", "options": ["7/9", "7/3", "7/18", "7/12"], "answer": "7/3" },
        { "q": "Find which fraction is biggest from the following.", "options": ["3/8", "2/5", "1/3", "5/12"], "answer": "5/12" },
        { "q": "The simplified form of 48/64 is .............", "options": ["3/4", "4/3", "4/5", "1 3/4"], "answer": "3/4" },
        { "q": "Reduce the fraction 144/256", "options": ["16/9", "9/16", "1/2", "3/5"], "answer": "9/16" },
        { "q": "The reciprocal of 7 2/3 is .......", "options": ["21/3", "23/3", "3/21", "3/23"], "answer": "3/23" },
        { "q": "Example of proper fraction is .........", "options": ["1 1/3", "3/5", "4/3", "10/3"], "answer": "3/5" },
        { "q": "Which one is a proper fraction?", "options": ["8/3", "2/5", "3 1/5", "20/35"], "answer": "2/5" },
        { "q": "Which one of the following is proper fraction?", "options": ["5/3", "2 2/3", "2/3", "1 1/3"], "answer": "2/3" },
        { "q": "Which one is the improper fraction?", "options": ["2/3", "9/5", "5/6", "2 3/4"], "answer": "9/5" },
        { "q": "Convert 3 1/3 into improper fraction", "options": ["4/3", "7/3", "10/3", "12/3"], "answer": "10/3" },
        { "q": "Which one is the improper fraction?", "options": ["3/8", "5/3", "3 1/3", "2 3/5"], "answer": "5/3" },
        { "q": "Which one is a improper fraction?", "options": ["2/3", "3/2", "4/5", "1 1/4"], "answer": "3/2" },
        { "q": "Which one is the mixed fraction?", "options": ["2/3", "9/5", "5 5/6", "2/3/4"], "answer": "5 5/6" },
        { "q": "Convert 5 1/3 into fraction.", "options": ["16/3", "4/75", "9/75", "3/16"], "answer": "16/3" },
        { "q": "Convert 18/16 into mixed fraction.", "options": ["2 1/8", "1 1/8", "2 3/4", "3 1/9"], "answer": "1 1/8" },
        { "q": "Convert 7 3/7 Into improper fraction.", "options": ["7/17", "46/7", "52/7", "72/7"], "answer": "52/7" },
        { "q": "Improper fraction of 16 3/5 is .............", "options": ["16/5", "83/5", "36/5", "38/5"], "answer": "83/5" },
        { "q": "1/4 + 1/2 = ?", "options": ["4/3", "3/4", "1/6", "1/8"], "answer": "3/4" },
        { "q": "2/5 + 4/9 is .............", "options": ["10/23", "8/45", "6/13", "38/45"], "answer": "38/45" },
        { "q": "Add : 3/4 + 7/12", "options": ["1 1/12", "4/3", "1/4", "1/6"], "answer": "4/3" },
        { "q": "1/3 + 2/3 =", "options": ["2", "1", "3", "4"], "answer": "1" },
        { "q": "Add : 3/4 + 2/3", "options": ["1 1/12", "1 5/12", "1 7/12", "1 11/12"], "answer": "1 5/12" },
        { "q": "Find the missing number of the factor 3/5 = 42/x", "options": ["140", "70", "60", "40"], "answer": "70" },
        { "q": "Find the value of 3 1/8 + 7 9/16 = ........", "options": ["10 5/16", "10 11/16", "10 5/14", "10 3/16"], "answer": "10 11/16" },
        { "q": "Add : 1/2 + 1/8 + 5/12", "options": ["2 1/24", "1 1/24", "1 1/12", "2 1/12"], "answer": "1 1/24" },
        { "q": "3/5 + 7/15 + 4/3 =", "options": ["1 2/5", "2 2/5", "5 2/5", "2/5"], "answer": "2 2/5" },
        { "q": "Add : 2/5 + 5/8 + 7/10", "options": ["1 29/40", "2 29/40", "3 19/40", "4 9/40"], "answer": "1 29/40" },
        { "q": "2 1/5 + 2 1/3 + 7/15 = ?", "options": ["2", "3", "4", "5"], "answer": "5" },
        { "q": "Subtract : 7/16 from 17/32", "options": ["3/32", "5/32", "7/32", "9/32"], "answer": "3/32" },
        { "q": "Subtract : 5 - 3/7", "options": ["7/32", "32/7", "30/7", "16/3"], "answer": "32/7" },
        { "q": "Solve 5/3 - 5/8 - 2/3 = .........", "options": ["9/8", "3/8", "5/8", "7/8"], "answer": "3/8" },
        { "q": "Multiply: 5/6 by 12/25", "options": ["1/3", "1/5", "2/5", "3/5"], "answer": "2/5" },
        { "q": "A conduit pipe weight 0.6 kg per metre. Find the weight of 9 conduit pipes each measuring 4.3 metre.", "options": ["23.23 kg", "23.22 kg", "23.21 kg", "23.20 kg"], "answer": "23.22 kg" },
        { "q": "If standard bolts of the same size are being produced on a machine and the mass of 65 bolts is 1250 gm. Find out the mass of 120 bolts.", "options": ["2257.6 gm", "2307.7 gm", "2327.7 gm", "2357.7 gm"], "answer": "2307.7 gm" },
        { "q": "Simplify the following 2 + 1 / (1 - 2 / (2 + 2/3))", "options": ["8", "6", "4", "2 2/3"], "answer": "6" },
        { "q": "On dividing a number by 357, we get 39 as remainder. On dividing the same number by 17. What will be the remainder?", "options": ["2", "3", "4", "5"], "answer": "5" },
        { "q": "The sum of three consecutive numbers is 57. Find the numbers", "options": ["18, 19, 20", "10, 11, 12", "14, 15, 16", "21, 22, 23"], "answer": "18, 19, 20" },
        { "q": "Which will be next term in the series? 4, 16, 24, 32 .........", "options": ["36", "48", "40", "36"], "answer": "40" },
        { "q": "By adding 60 to a number we get three times of the number, the number is .........", "options": ["55", "45", "60", "15"], "answer": "15" },
        { "q": "Which will be next term in the series? 24, 18, 13, 9 .........", "options": ["5", "7", "6", "1"], "answer": "6" },
        { "q": "If the average of 3 numbers is 17 and that is first two are 16, the third number is .............", "options": ["19", "1", "16", "17"], "answer": "19" },
        { "q": "Simplification of 1 / (\u221a3 - \u221a2) is .............", "options": ["31.46", "3.146", "0.3146", "0.03146"], "answer": "3.146" },
        { "q": "In pocket calculator what does CE denote?", "options": ["Clear totally", "Clear entry only", "Clear memory", "Sign change key"], "answer": "Clear entry only" },
        { "q": "Before starting the calculation in the calculator to press the 'ON' key, the display shows .............", "options": ["1", "11", "0", "00"], "answer": "0" },
        { "q": "Using calculator solve the following (1170 x 5390) / (13 x 2156)", "options": ["725", "532", "225", "124"], "answer": "225" }
    ],

    "squareroot": [
        { "q": "Find the square of 25", "options": ["125", "525", "625", "825"], "answer": "625" },
        { "q": "Find the square of 1.5", "options": ["225", "2.25", "2.025", "22.5"], "answer": "2.25" },
        { "q": "The value of 3\u2074 is .................", "options": ["81", "41", "9", "27"], "answer": "81" },
        { "q": "(15)\u00b2 - (13)\u00b2 = .................", "options": ["20", "30", "56", "130"], "answer": "56" },
        { "q": "Solve 5\u00b3 x 4\u00b3 = .................", "options": ["7800", "7900", "8000", "8100"], "answer": "8000" },
        { "q": "6\u00b3 x 5\u00b3 = .................", "options": ["26800", "26900", "27000", "28000"], "answer": "27000" },
        { "q": "35\u00b2 / 14\u00b2 = .................", "options": ["3.55", "4.45", "5.35", "6.25"], "answer": "6.25" },
        { "q": "Which one of the following is equal to \u221ax ?", "options": ["x", "1/2 x", "x^{1/2}", "x\u00b2"], "answer": "x^{1/2}" },
        { "q": "In the following example the root and the power of the radicand is same. Which one of the following is equal to \u207f\u221a{a\u207f} ?", "options": ["a", "a\u207f", "\u221aa", "n a"], "answer": "a" },
        { "q": "\u221a36 x \u221a36 is equal to ............", "options": ["36", "2 x \u221a36", "\u221a72", "72"], "answer": "36" },
        { "q": "Simplify : 5\u221a25 + \u221a25 - 5\u221a25 is ............", "options": ["2", "3", "4", "5"], "answer": "5" },
        { "q": "Square root of 169 is ............ ", "options": ["9", "10", "11", "13"], "answer": "13" },
        { "q": "Square root of 225 is .................", "options": ["25", "20", "15", "10"], "answer": "15" },
        { "q": "Square root of \u221a289 will be .................", "options": ["9", "17", "19", "21"], "answer": "17" },
        { "q": "Find the value of \u221a625", "options": ["50", "45", "35", "25"], "answer": "25" },
        { "q": "The square root of 2916 is ............", "options": ["45", "50", "52", "54"], "answer": "54" },
        { "q": "Find the value of \u221a1764", "options": ["42", "40", "39", "35"], "answer": "42" },
        { "q": "Find the length of the side of a square whose area is 441m\u00b2.", "options": ["41", "31", "21", "11"], "answer": "21" },
        { "q": "Find the square root of 5625.", "options": ["65", "75", "85", "95"], "answer": "75" },
        { "q": "Find the square root of 15376.", "options": ["414", "326", "214", "124"], "answer": "124" },
        { "q": "Find the square root of 18496.", "options": ["133", "134", "135", "136"], "answer": "136" },
        { "q": "Find the square root by using factorization method. \u221a16129", "options": ["117", "127", "137", "147"], "answer": "127" },
        { "q": "Find the square root of 45796.", "options": ["414", "326", "214", "124"], "answer": "214" },
        { "q": "Find the square root of 62500.", "options": ["25", "250", "50", "500"], "answer": "250" },
        { "q": "Square root of 0.09 is .................", "options": ["0.3", "0.03", "0.003", "0.0009"], "answer": "0.3" },
        { "q": "\u221a0.016 = .................", "options": ["0.04", "0.126", "0.162", "0.621"], "answer": "0.126" },
        { "q": "\u221a2.56 = .................", "options": ["1.06", "1.6", "1.26", "1.36"], "answer": "1.6" },
        { "q": "\u221a7.29 = .................", "options": ["5.7", "4.7", "3.7", "2.7"], "answer": "2.7" },
        { "q": "Simplify : \u221a49 + \u221a49 - \u221a49", "options": ["7", "47", "58", "174"], "answer": "7" },
        { "q": "\u221a21 x \u221a21 is ............", "options": ["\u221a42", "\u221a12", "21", "42"], "answer": "21" },
        { "q": "Find the value of \u221a25 x \u221a4", "options": ["10", "12", "14", "16"], "answer": "10" },
        { "q": "Find the value of \u221a{6\u00b2 + 8\u00b2}", "options": ["144", "100", "14", "10"], "answer": "10" },
        { "q": "Simplify the following \u221a0.0625 - \u221a0.0169", "options": ["0.25", "0.13", "0.12", "0.09"], "answer": "0.12" },
        { "q": "\u221a32 / \u221a2 = ?", "options": ["\u221a4", "4", "1/\u221a6", "2"], "answer": "4" },
        { "q": "\u221a{529 / 1764} = .................", "options": ["32/23", "23/24", "32/42", "23/42"], "answer": "23/42" },
        { "q": "\u221a{64 / 81} is equal to ............", "options": ["0.8889", "0.8698", "0.8988", "0.9888"], "answer": "0.8889" },
        { "q": "Cubic root of 8 .................", "options": ["1.2", "1.4", "1.6", "2.0"], "answer": "2.0" },
        { "q": "Find the cube root of 512.", "options": ["256", "128", "16", "8"], "answer": "8" },
        { "q": "Find the cube root of 3375", "options": ["15", "25", "35", "45"], "answer": "15" },
        { "q": "Find the cube root of 5832.", "options": ["18", "12", "9", "6"], "answer": "18" },
        { "q": "Find the value of 256\u2077\u2078", "options": ["2", "128", "255", "255.23"], "answer": "128" },
        { "q": "Find the value of 2401\u00bc", "options": ["3", "5", "7", "13"], "answer": "7" },
        { "q": "2\u00b2\u2070 = ?", "options": ["1048574", "1048576", "10481048", "10241024"], "answer": "1048576" },
        { "q": "If (265/153)\u00b2 < a < (1351/780)\u00b2, then a\u00bd = ?", "options": ["1.41", "1.732", "2", "3"], "answer": "1.732" },
        { "q": "An irrational number 'a' is such that 13 < a < 19. To find square root of 'a' by direct division a divisor, 'd' is selected. Then, a and d are respectively .................", "options": ["14, 5", "15, 5", "17, 4", "19, 4"], "answer": "17, 4" }
    ],

                "volume": [
        {
            isDynamic: true,
            q: "What is the volume V (in cmÂ³) of the container which can hold {L} litre of oil?",
            template: "What is the volume V (in cmÂ³) of the container which can hold {L} litre of oil?",
            base_values: { L: 5.28 },
            variable_formulas: { L: "L + inc * 0.1" },
            formula_logic: "L * 1000",
            format_rule: "1",
            suffix: " cmÂ³",
            distractor_rules: ["ANS / 10", "ANS / 100", "ANS * 10"]
        },
        {
            isDynamic: true,
            q: "What is the total capacity V in litre of a cubical coolant tank of sides {S} mm?",
            template: "What is the total capacity V in litre of a cubical coolant tank of sides {S} mm?",
            base_values: { S: 500 },
            variable_formulas: { S: "S + inc * 50" },
            formula_logic: "Math.pow(S/10, 3) / 1000",
            format_rule: "1",
            suffix: " litre",
            distractor_rules: ["ANS / 10", "ANS * 2", "ANS * 10"]
        },
        {
            isDynamic: true,
            q: "Calculate the volume of the cube whose side is {S} cm.",
            template: "Calculate the volume of the cube whose side is {S} cm.",
            base_values: { S: 9 },
            variable_formulas: { S: "S + inc" },
            formula_logic: "Math.pow(S, 3)",
            format_rule: "0",
            suffix: " cmÂ³",
            distractor_rules: ["Math.pow(S+1, 3)", "Math.pow(S-1, 3)", "Math.pow(S, 2) * 3"]
        },
        {
            isDynamic: true,
            q: "A cube has a volume of {V} cmÂ³. Find its side.",
            template: "A cube has a volume of {V} cmÂ³. Find its side.",
            base_values: { V: 7220 },
            variable_formulas: { V: "V + inc * 500" },
            formula_logic: "Math.cbrt(V)",
            format_rule: "2",
            suffix: " cm",
            distractor_rules: ["ANS + 2.5", "ANS + 5.0", "ANS - 3.0"]
        },
        {
            isDynamic: true,
            q: "Find the mass of a cube whose side is {S} cm and density of the material is {D} gm/cc.",
            template: "Find the mass of a cube whose side is {S} cm and density of the material is {D} gm/cc.",
            base_values: { S: 10, D: 6.9 },
            variable_formulas: { S: "S + inc", D: "D" },
            formula_logic: "Math.pow(S, 3) * D",
            format_rule: "0",
            suffix: " gm",
            distractor_rules: ["ANS - 200", "ANS + 100", "ANS - 500"]
        }
    ],

                "algebra": [
        {
            isDynamic: true,
            q: "If 6x - 9x + 5x = {RHS1} - {RHS2} find the value of x.",
            template: "If 6x - 9x + 5x = {RHS1} - {RHS2} find the value of x.",
            base_values: { RHS1: 15, RHS2: 13 },
            variable_formulas: { RHS1: "RHS1 + inc * 4", RHS2: "RHS2 + inc * 2" },
            formula_logic: "(RHS1 - RHS2) / 2",
            format_rule: "0",
            distractor_rules: ["ANS + 1", "ANS + 2", "ANS - 1"]
        },
        {
            isDynamic: true,
            q: "If (a + b) = {SUM}, ab = {PROD} find the value of aÂ² + bÂ²",
            template: "If (a + b) = {SUM}, ab = {PROD} find the value of aÂ² + bÂ²",
            base_values: { SUM: 6, PROD: 9 },
            variable_formulas: { SUM: "SUM + inc", PROD: "PROD + inc" },
            formula_logic: "Math.pow(SUM, 2) - 2 * PROD",
            format_rule: "0",
            distractor_rules: ["ANS + 6", "ANS - 6", "ANS * 2"]
        },
        {
            isDynamic: true,
            q: "If a + b = {SUM} and a - b = {DIFF}, then the value of aÂ² - bÂ² is equal to :",
            template: "If a + b = {SUM} and a - b = {DIFF}, then the value of aÂ² - bÂ² is equal to :",
            base_values: { SUM: 5, DIFF: 4 },
            variable_formulas: { SUM: "SUM + inc", DIFF: "DIFF + inc" },
            formula_logic: "SUM * DIFF",
            format_rule: "0",
            distractor_rules: ["ANS + 5", "ANS - 4", "ANS + 10"]
        },
        {
            isDynamic: true,
            q: "Factorise : xÂ² - {SQ}",
            template: "Factorise : xÂ² - {SQ}",
            base_values: { S: 5 },
            formula: function(base, inc) { const S = base.S + inc; return { values: { SQ: S * S }, answer: "(x + " + S + ")(x - " + S + ")" }; },
            distractors: function(correctAnswer, base, inc) { const S = base.S + inc; return [ "(x + " + (S+2) + ")(x - " + (S+2) + ")", "(xÂ² + " + S + ")(xÂ² - " + S + ")", "(x - " + (S*2) + ")(x + " + (S*2) + ")" ]; }
        },
        {
            isDynamic: true,
            q: "One of the factors of xÂ² + {MID}x + {LAST} is ...........",
            template: "One of the factors of xÂ² + {MID}x + {LAST} is ...........",
            base_values: { A: 4, B: 2 },
            formula: function(base, inc) { const A = base.A + inc; const B = base.B + inc; return { values: { MID: A + B, LAST: A * B }, answer: "x + " + A }; },
            distractors: function(correctAnswer, base, inc) { const A = base.A + inc; const B = base.B + inc; return [ "x + " + (A + B), "x - " + A, "x + 1" ]; }
        }
    ],

    "mensuration": [
        {
            isDynamic: true,
            q: "The sliding valve of a steam engine has dimensions {W} cm by {L} cm and the steam pressure on the back of the valve is {P} kg/cm². If the co-efficient of friction is {MU}. Calculate the force required to move the valve.",
            template: "The sliding valve of a steam engine has dimensions {W} cm by {L} cm and the steam pressure on the back of the valve is {P} kg/cm². If the co-efficient of friction is {MU}. Calculate the force required to move the valve.",
            base_values: { W: 20, L: 40, P: 20, MU: 0.1 },
            formula: function(base, inc) {
                const W = base.W + inc;
                const L = base.L + inc;
                const P = base.P + inc;
                const MU = parseFloat((base.MU + inc * 0.1).toFixed(2));
                const area = W * L;
                const force = MU * P * area;
                const answer = force % 1 === 0 ? force.toString() : force.toFixed(1);
                return {
                    values: { W: W, L: L, P: P, MU: MU },
                    answer: answer + " kg"
                };
            },
            distractors: function(correctAnswer, base, inc) {
                const W = base.W + inc;
                const L = base.L + inc;
                const P = base.P + inc;
                const MU = parseFloat((base.MU + inc * 0.1).toFixed(2));
                const area = W * L;
                const ansNum = parseFloat(correctAnswer);
                
                const d1 = (P * area).toFixed(1);
                const d2 = (MU * P * (W + L)).toFixed(1);
                const d3 = (ansNum * 0.8).toFixed(1);
                return [d1 + " kg", d2 + " kg", d3 + " kg"];
            }
        },
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

    "Average": [
        {
            isDynamic: true,
            q: "The average of three numbers is {AVG}. If the first two numbers are {N1} and {N2}, find the third number.",
            template: "The average of three numbers is {AVG}. If the first two numbers are {N1} and {N2}, find the third number.",
            base_values: { AVG: 154, N1: 180, N2: 160 },
            formula: function(base, inc) {
                const AVG = base.AVG + inc * 10;
                const N1 = base.N1 + inc * 10;
                const N2 = base.N2 + inc * 10;
                const third = 3 * AVG - (N1 + N2);
                return {
                    values: { AVG: AVG, N1: N1, N2: N2 },
                    answer: third.toString()
                };
            },
            distractors: function(correctAnswer, base, inc) {
                const ans = parseInt(correctAnswer);
                return [
                    (ans + 12).toString(),
                    (ans - 12).toString(),
                    (ans + 20).toString()
                ];
            }
        },
        {
            "q": " If the individual scores in a class with 6 students are 0, 15, 25, 35, 45 and 60 marks, calculate the average score and the total score.",
            "options": ["Avg: 30, Total: 180", "Avg: 35, Total: 210", "Avg: 25, Total: 150", "Avg: 30, Total: 160"],
            "answer": "Avg: 30, Total: 180"
        },
        {
            "q": " The average age of three boys A, B & C is 12. A is 5 years older than B and B is 1 year younger than C. Find the age of A.",
            "options": ["10 years", "11 years", "12 years", "15 years"],
            "answer": "15 years"
        },
        {
            "q": " If the load which a vehicle carries is 3000 kg and this load is 5/8 of the vehicle weight, what is the total weight of the vehicle?",
            "options": ["4800 kg", "7800 kg", "3000 kg", "5000 kg"],
            "answer": "7800 kg"
        },
        {
            "q": " A car runs until the tank is 1/8th full. The tank is then filled to its capacity by putting 21 litres. What is the capacity of the petrol tank?",
            "options": ["24 litre", "21 litre", "18 litre", "30 litre"],
            "answer": "24 litre"
        },
        {
            "q": " The average age of 15 trainees is 13.5 years. The average of the first seven is 14.5 years and the last seven is 12.5 years. Find the age of the eighth trainee.",
            "options": ["13.5 years", "14 years", "12.5 years", "15 years"],
            "answer": "13.5 years"
        },
        {
            "q": "The outside diameter (OD) and inside diameter (ID) of a pipe are 185 mm and 170 mm. Find the mean diameter and the thickness of the pipe.",
            "options": ["Mean: 177.5mm, Thick: 7.5mm", "Mean: 175mm, Thick: 15mm", "Mean: 180mm, Thick: 5mm", "Mean: 177.5mm, Thick: 15mm"],
            "answer": "Mean: 177.5mm, Thick: 7.5mm"
        },
        {
            "q": " Average diameter of 4 shafts is 30.6 cm. If a fifth shaft is included, the average becomes 29.2 cm. What is the diameter of the fifth shaft?",
            "options": ["23.6 cm", "25 cm", "28.2 cm", "22.4 cm"],
            "answer": "23.6 cm"
        },
        {
            "q": " A train runs at 30 km/hr. Find its speed in m/sec and the distance it covers in 4 hours in metres.",
            "options": ["8.33 m/s, 120,000m", "10 m/s, 100,000m", "8.33 m/s, 12,000m", "9 m/s, 120,000m"],
            "answer": "8.33 m/s, 120,000m"
        },
        {
            "q": " How many 73cm pieces can be cut from a 20.65m wire, and what is the remaining length?",
            "options": ["28 pieces, 21cm left", "25 pieces, 15cm left", "30 pieces, 5cm left", "28 pieces, 10cm left"],
            "answer": "28 pieces, 21cm left"
        },
        {
            "q": " A 100cm rod is cut into 20 equal pieces. If the hacksaw blade is 1mm thick, find the length of each piece and the number of cuts performed.",
            "options": ["49.05mm, 19 cuts", "50mm, 20 cuts", "48mm, 19 cuts", "49mm, 20 cuts"],
            "answer": "49.05mm, 19 cuts"
        }
    ],

    "Logarithm": [
        { "q": "Solve Using Log Table: 4517 x 3779", "options": ["17069723", "17069768", "17069743", "17069843"], "answer": "17069743", "type": "multiplication" },
        { "q": "Solve Using Log Table: 6526 \u00f7 5845", "options": ["1.2840", "1.1165", "1.2399", "1.0653"], "answer": "1.1165", "type": "division" },
        { "q": "Solve Using Log Table: 54\u2074", "options": ["8503056", "8502623", "8503064", "8503649"], "answer": "8503056", "type": "power" },
        { "q": "Solve Using Log Table: (672)\u00bc", "options": ["6.2149", "5.0915", "6.2625", "4.5792"], "answer": "5.0915", "type": "root" },
        { "q": "Solve Using Log Table: 3749 x 9439", "options": ["35386867", "35386731", "35387311", "35386811"], "answer": "35386811", "type": "multiplication" },
        { "q": "Solve Using Log Table: 1487 \u00f7 8926", "options": ["0.1916", "0.1154", "0.2900", "0.1666"], "answer": "0.1666", "type": "division" },
        { "q": "Solve Using Log Table: 91\u00b3", "options": ["753571", "752835", "754502", "753578"], "answer": "753571", "type": "power" },
        { "q": "Solve Using Log Table: (326)\u2153", "options": ["6.3701", "6.8824", "8.0058", "8.4653"], "answer": "6.8824", "type": "root" },
        { "q": "Solve Using Log Table: 2965 x 8566", "options": ["25398110", "25398271", "25398190", "25398490"], "answer": "25398190", "type": "multiplication" },
        { "q": "Solve Using Log Table: 2885 \u00f7 9223", "options": ["0.2616", "0.3128", "0.3597", "0.4362"], "answer": "0.3128", "type": "division" },
        { "q": "Solve Using Log Table: 91\u2074", "options": ["68575144", "68574964", "68574961", "68573974"], "answer": "68574961", "type": "power" },
        { "q": "Solve Using Log Table: (585)\u2155", "options": ["4.6997", "3.5763", "3.0640", "4.3988"], "answer": "3.5763", "type": "root" },
        { "q": "Solve Using Log Table: 5559 x 1292", "options": ["7182208", "7182278", "7182628", "7182228"], "answer": "7182228", "type": "multiplication" },
        { "q": "Solve Using Log Table: 9495 \u00f7 2682", "options": ["3.5403", "3.6637", "4.0713", "3.4891"], "answer": "3.5403", "type": "division" },
        { "q": "Solve Using Log Table: 50\u2074", "options": ["6250010", "6250000", "6249196", "6250739"], "answer": "6250000", "type": "power" },
        { "q": "Solve Using Log Table: (932)\u00bc", "options": ["5.5253", "6.7961", "6.6487", "5.0130"], "answer": "5.5253", "type": "root" },
        { "q": "Solve Using Log Table: 8621 x 1224", "options": ["10552044", "10552162", "10553004", "10552104"], "answer": "10552104", "type": "multiplication" },
        { "q": "Solve Using Log Table: 7651 \u00f7 5819", "options": ["1.2636", "1.5121", "1.3148", "1.4382"], "answer": "1.3148", "type": "division" },
        { "q": "Solve Using Log Table: 82\u00b3", "options": ["552116", "550888", "551371", "551368"], "answer": "551368", "type": "power" },
        { "q": "Solve Using Log Table: (283)\u2153", "options": ["8.0755", "6.5654", "6.0531", "7.6888"], "answer": "6.5654", "type": "root" },
        { "q": "Solve Using Log Table: 9938 x 7195", "options": ["71503910", "71503890", "71504710", "71503971"], "answer": "71503910", "type": "multiplication" },
        { "q": "Solve Using Log Table: 5847 \u00f7 6305", "options": ["1.0508", "1.0665", "0.9274", "0.8762"], "answer": "0.9274", "type": "division" },
        { "q": "Solve Using Log Table: 62\u00b3", "options": ["238331", "237656", "238328", "238928"], "answer": "238328", "type": "power" },
        { "q": "Solve Using Log Table: (472)\u2153", "options": ["9.5768", "7.2737", "7.7860", "8.9094"], "answer": "7.7860", "type": "root" },
        { "q": "Solve Using Log Table: 1696 x 7910", "options": ["13415360", "13415310", "13415418", "13415960"], "answer": "13415360", "type": "multiplication" },
        { "q": "Solve Using Log Table: 6984 \u00f7 8511", "options": ["0.9440", "0.9437", "0.8206", "0.7694"], "answer": "0.8206", "type": "division" },
        { "q": "Solve Using Log Table: 11\u2075", "options": ["161544", "160201", "161059", "161051"], "answer": "161051", "type": "power" },
        { "q": "Solve Using Log Table: (751)\u2153", "options": ["10.2130", "8.5773", "9.0896", "11.1803"], "answer": "9.0896", "type": "root" },
        { "q": "Solve Using Log Table: 9748 x 2950", "options": ["28756570", "28757400", "28756691", "28756600"], "answer": "28756600", "type": "multiplication" },
        { "q": "Solve Using Log Table: 8802 \u00f7 1237", "options": ["7.2390", "7.1156", "7.0644", "8.1829"], "answer": "7.1156", "type": "division" },
        { "q": "Solve Using Log Table: 29\u2075", "options": ["20511150", "20511879", "20511149", "20511000"], "answer": "20511149", "type": "power" },
        { "q": "Solve Using Log Table: (445)\u2155", "options": ["4.5093", "2.8736", "3.3859", "4.1646"], "answer": "3.3859", "type": "root" },
        { "q": "Solve Using Log Table: 3193 x 4138", "options": ["13212594", "13213334", "13212714", "13212634"], "answer": "13212634", "type": "multiplication" },
        { "q": "Solve Using Log Table: 2213 \u00f7 4120", "options": ["0.5371", "0.6605", "0.4859", "0.6177"], "answer": "0.5371", "type": "division" },
        { "q": "Solve Using Log Table: 66\u00b3", "options": ["288079", "287496", "287506", "287064"], "answer": "287496", "type": "power" },
        { "q": "Solve Using Log Table: (267)\u2153", "options": ["7.5627", "6.4393", "5.9270", "7.9203"], "answer": "6.4393", "type": "root" },
        { "q": "Solve Using Log Table: 5170 x 6872", "options": ["35528240", "35528440", "35528328", "35528180"], "answer": "35528240", "type": "multiplication" },
        { "q": "Solve Using Log Table: 3184 \u00f7 7231", "options": ["0.4403", "0.5064", "0.3891", "0.5637"], "answer": "0.4403", "type": "division" },
        { "q": "Solve Using Log Table: 49\u2074", "options": ["5764571", "5764801", "5764810", "5764942"], "answer": "5764801", "type": "power" },
        { "q": "Solve Using Log Table: (664)\u00bc", "options": ["4.5639", "6.1996", "5.0762", "6.2438"], "answer": "5.0762", "type": "root" }
    ],

    "LCM": [
        {
            "q": "Find the LCM of 6, 8, 4",
            "options": ["72", "12", "24", "48"],
            "answer": "24"
        },
        {
            "q": "Find the LCM of 24, 26, 6",
            "options": ["936", "1248", "314", "312"],
            "answer": "312"
        },
        {
            "q": "Find the LCM of 14, 4, 8",
            "options": ["54", "168", "56", "28"],
            "answer": "56"
        },
        {
            "q": "Find the LCM of 26, 40",
            "options": ["260", "1560", "2080", "520"],
            "answer": "520"
        },
        {
            "q": "Find the LCM of 9, 6, 8",
            "options": ["144", "288", "36", "72"],
            "answer": "72"
        },
        {
            "q": "Find the LCM of 34, 6, 20",
            "options": ["3060", "1022", "1020", "1018"],
            "answer": "1020"
        },
        {
            "q": "Find the LCM of 6, 9, 35",
            "options": ["630", "632", "1260", "628"],
            "answer": "630"
        },
        {
            "q": "Find the LCM of 25, 15",
            "options": ["75", "225", "77", "300"],
            "answer": "75"
        },
        {
            "q": "Find the LCM of 8, 6, 9",
            "options": ["216", "36", "72", "70"],
            "answer": "72"
        },
        {
            "q": "Find the LCM of 32, 9, 14",
            "options": ["2018", "4032", "6048", "2016"],
            "answer": "2016"
        },
        {
            "q": "Find the LCM of 6, 34, 9",
            "options": ["918", "612", "308", "306"],
            "answer": "306"
        },
        {
            "q": "Find the LCM of 34, 26",
            "options": ["440", "221", "1326", "442"],
            "answer": "442"
        },
        {
            "q": "Find the LCM of 6, 4, 9",
            "options": ["34", "36", "144", "38"],
            "answer": "36"
        },
        {
            "q": "Find the LCM of 4, 36, 28",
            "options": ["1008", "250", "504", "252"],
            "answer": "252"
        },
        {
            "q": "Find the LCM of 20, 6, 4",
            "options": ["240", "180", "60", "120"],
            "answer": "60"
        },
        {
            "q": "Find the LCM of 21, 36",
            "options": ["250", "252", "126", "254"],
            "answer": "252"
        },
        {
            "q": "Find the LCM of 6, 8, 9",
            "options": ["36", "70", "216", "72"],
            "answer": "72"
        },
        {
            "q": "Find the LCM of 8, 38, 27",
            "options": ["4106", "2052", "4104", "4102"],
            "answer": "4104"
        },
        {
            "q": "Find the LCM of 4, 32, 6",
            "options": ["96", "384", "192", "288"],
            "answer": "96"
        },
        {
            "q": "Find the LCM of 15, 21",
            "options": ["115", "210", "105", "103"],
            "answer": "105"
        },
        {
            "q": "Find the LCM of 6, 8, 9",
            "options": ["216", "70", "36", "72"],
            "answer": "72"
        },
        {
            "q": "Find the LCM of 30, 24, 6",
            "options": ["240", "118", "360", "120"],
            "answer": "120"
        },
        {
            "q": "Find the LCM of 35, 9, 4",
            "options": ["1260", "5040", "3780", "1258"],
            "answer": "1260"
        },
        {
            "q": "Find the LCM of 25, 24",
            "options": ["602", "2400", "1800", "600"],
            "answer": "600"
        },
        {
            "q": "Find the LCM of 9, 8, 4",
            "options": ["72", "36", "70", "216"],
            "answer": "72"
        },
        {
            "q": "Find the LCM of 14, 9, 35",
            "options": ["630", "315", "628", "632"],
            "answer": "630"
        },
        {
            "q": "Find the LCM of 16, 8, 4",
            "options": ["32", "16", "64", "18"],
            "answer": "16"
        },
        {
            "q": "Find the LCM of 40, 34",
            "options": ["680", "678", "1360", "2040"],
            "answer": "680"
        },
        {
            "q": "Find the LCM of 6, 4, 9",
            "options": ["36", "144", "18", "38"],
            "answer": "36"
        },
        {
            "q": "Find the LCM of 24, 8, 26",
            "options": ["310", "312", "156", "314"],
            "answer": "312"
        },
        {
            "q": "Find the LCM of 4, 9, 21",
            "options": ["252", "126", "1008", "756"],
            "answer": "252"
        },
        {
            "q": "Find the LCM of 21, 30",
            "options": ["105", "210", "840", "208"],
            "answer": "210"
        },
        {
            "q": "Find the LCM of 8, 9, 6",
            "options": ["216", "70", "288", "72"],
            "answer": "72"
        },
        {
            "q": "Find the LCM of 8, 18, 38",
            "options": ["5472", "1370", "1368", "684"],
            "answer": "1368"
        },
        {
            "q": "Find the LCM of 6, 9, 21",
            "options": ["128", "126", "63", "252"],
            "answer": "126"
        },
        {
            "q": "Find the LCM of 27, 32",
            "options": ["432", "1728", "864", "866"],
            "answer": "864"
        },
        {
            "q": "Find the LCM of 9, 6, 8",
            "options": ["72", "288", "74", "216"],
            "answer": "72"
        },
        {
            "q": "Find the LCM of 27, 10, 4",
            "options": ["540", "542", "1620", "2160"],
            "answer": "540"
        },
        {
            "q": "Find the LCM of 30, 6, 8",
            "options": ["120", "480", "60", "118"],
            "answer": "120"
        },
        {
            "q": "Find the LCM of 32, 10",
            "options": ["480", "160", "640", "162"],
            "answer": "160"
        }
    ]
};






