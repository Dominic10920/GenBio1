let currentQuestionIndex = 0;
let lives = 3;
let score = 0;
let questions = [];
let mistakes = [];  // Track the user's mistakes

const homeScreen = document.querySelector('.home-screen');
const quizScreen = document.querySelector('.quiz-screen');
const gameOverScreen = document.querySelector('.game-over');
const questionEl = document.getElementById('question');
const answersEl = document.getElementById('answers');
const livesEl = document.getElementById('lives');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const restartButton = document.getElementById('restart');
const nextQuestionButton = document.getElementById('next-question');
const mistakesList = document.getElementById('mistakes');

// Define questions for each difficulty level
const easyQuestions = [
    { question: "What is the basic unit of life?", answers: ["Cell", "Atom", "Organ", "Tissue"], correct: 0 },
    { question: "What organelle is responsible for protein synthesis?", answers: ["Ribosome", "Mitochondria", "Nucleus", "Golgi Apparatus"], correct: 0 },
    { question: "Which part of the cell contains genetic material?", answers: ["Nucleus", "Mitochondria", "Cytoplasm", "Ribosome"], correct: 0 },
    { question: "Who discovered that organisms are made up of cells?", answers: ["Mattias Schleiden", "Theodor Schwann", "Robert Hooke", "Rudolf Virchow"], correct: 2 },
    { question: "What is the structure that controls the movements of substances in and out of the cell?", answers: ["Cytoplasm", "Vesicles", "Cytoskeleton", "Cell Membrane"], correct: 3 },
    { question: "Cell Membrane is describes as a fluid-mosaic model composed of two layers of fat with proteins and carbohydrates scattered all over. The liquid layer is called?", answers: ["Phospholipid", "Cholesterol", "Nucleic Acid", "Cytosol"], correct: 0 },
    { question: "DNA stands for?", answers: ["Deoxynucleotinamide Acid", "Diribonucleic Adenosine", "Deoxynucleic Acid", "Deoxyribonucleic Acid"], correct: 3 },
    { question: "Which organelle is responsible for producing ATP, the cell’s energy currency?", answers: ["Nucleus", "Mitochondria", "Endoplasmic Reticulum", "Ribosome"], correct: 1 },
    { question: "Which organelle is responsible for packaging and modifying proteins for export from the cell?", answers: ["Mitochondria", "Endoplasmic Reticulum", "Golgi Bodies", "Lysosome"], correct: 2 },
    { question: "In which type of cells would you expect to find a large central vacuole?", answers: ["Animal Cells", "Plant Cells", "Bacterial Cells", "Fungal Cells"], correct: 1 },
    { question: "Which of the following organelles is only found in plant cells?", answers: ["Mitochondria", "Chloroplast", "Endoplasmic Reticulum", "Ribosome"], correct: 1 },
    { question: "Which of the following is a characteristic of prokaryotic cells?", answers: ["Membrane-bound nucleus", "Presence of mitochondria", "Lack of membrane-bound organelles", "Linear DNA structure"], correct: 2 },
    { question: "What molecule does a cell use as a source of energy?", answers: ["GTP", "ADP", "ATP", "GDP"], correct: 2 },
];

const mediumQuestions = [
    { question: "What structure controls the movement of substances into and out of the cell?", answers: ["Cell membrane", "Nucleus", "Endoplasmic Reticulum", "Golgi Apparatus"], correct: 0 },
    { question: "What organelle produces ATP, the energy currency of the cell?", answers: ["Mitochondria", "Chloroplast", "Nucleus", "Golgi Apparatus"], correct: 0 },
    { question: "Which part of the cell is involved in sorting and packaging proteins?", answers: ["Golgi Apparatus", "Nucleus", "Endoplasmic Reticulum", "Ribosome"], correct: 0 },
    { question: "Which of the following is not a postulate in Cell Theory?", answers: ["Most organisms are made of cells", "Cell is the basic and functional unit of life", "Cells are site of metabolic reactions", "Cells contain genetic materials"], correct: 0 },
    { question: "Which is not a common component among all cells?", answers: ["Golgi Apparatus", "Nucleus", "Endoplasmic Reticulum", "Ribosome"], correct: 1 },
    { question: "What fits the description of nucleolus?", answers: ["Little Nucleus", "Big Nucleus", "Site of Mitochondria Production", "Site of DNA translation"], correct: 0 },
    { question: "What is the primary component of the cell's cytoplasm?", answers: ["Lipids", "Water", "Nucleic Acid", "Proteins"], correct: 1 },
    { question: "Lysosome Functions as the ___ of the Cell", answers: ["Digestive System", "Skeletal System", "Excretory System", "Nervous System"], correct: 0 },
    { question: "Cell wall is made up of?", answers: ["Chitin", "Glucose", "Galactose", "Cellulose"], correct: 3 },
    { question: "It regulates the movement of materials (like RNA and proteins) between the nucleus and the cytoplasm.", answers: ["Cytoplasm", "Nuclear Envelope", "Nucleoulus", "Nucleus"], correct: 1 },
    { question: "What is the etymology of the word “Organelles”?", answers: ["Little Organs", "Big Organs", "Organ Classification", "Organ Type"], correct: 0 },
    { question: "At which type of organisms can prokaryotic cells be found?", answers: ["Bacteria and Archaea", "Plants and Animals", "Fungi and Protists", "Kingdom and Domain"], correct: 0 },
    { question: "What are animal’s source of energy?", answers: ["Mitochondria", "Mitochondria and Chloroplast", "Chloroplast", "Mitochondria and Chlorophyll"], correct: 0 },
];

const hardQuestions = [
    { question: "WWhich of the following is NOT a function of the central vacuole in plant cells?", answers: ["Storing nutrients and waste products", "Maintaining turgor pressure", "Synthesizing proteins", "Detoxifying harmful substances"], correct: 2 },
    { question: "What structure in plant cells captures light energy for photosynthesis?", answers: ["Chloroplast", "Mitochondria", "Cell Membrane", "Nucleus"], correct: 0 },
    { question: "What is the main function of the rough endoplasmic reticulum?", answers: ["Protein synthesis", "Lipid synthesis", "Detoxification", "Energy production"], correct: 0 },
    { question: "In which organelle does the chemical reaction: 6CO2+6H20+light–>C6H1206+602 take place?", answers: ["Lysosomes", "Peroxisomes", "Mitchondria", "Chloroplast"], correct: 3 },
    { question: "Why is it called the Rough Endoplasmic Reticulum?", answers: ["It has a smooth surface due to the lack of ribosomes.", "It is rough due to the presence of ribosomes on its surface.", "It is rough because it contains a large amount of genetic material.", "It has a rough texture because of the presence of protein filaments."], correct: 1 },
    { question: "Which of the following synthesizes proteins?", answers: ["Rough E.R.", "Ribosomes", "All of the Above", "None of the Above"], correct: 2 },
    { question: "What is the only human cell that has flagellum?", answers: ["Lung Cell", "Mucous Cell", "Nerve Cell", "Sperm Cell"], correct: 3 },
    { question: "When did Matthias Schleiden discover plant tissues?", answers: ["1855", "1815", "1865", "1838"], correct: 3 },
    { question: "Where can ribosomes be found in the cell?", answers: ["Attached to Smooth Endoplastic Reticulum", "Found floating within the mitochondrion membrane", "All of the Above", "None of the Above"], correct: 3 },
    { question: "What is the type of pressure that maintains the rigidity of plant cell?", answers: ["Hydrostatic Pressure", "Turgor Pressure", "Surface Pressure", "Rigid Pressure"], correct: 1 },
    { question: "Up to what percentage of volume does the central vacuole take in plant cells?", answers: ["10%", "20%", "80%", "90%"], correct: 3 },
    
    
];

const difficultyButtons = document.querySelectorAll('.difficulty-btn');
difficultyButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const difficulty = e.target.id;
        startGame(difficulty);
    });
});

function startGame(difficulty) {
    homeScreen.style.display = 'none';
    quizScreen.style.display = 'block';
    gameOverScreen.style.display = 'none';
    
    loadQuestions(difficulty);
    shuffleQuestions();
    currentQuestionIndex = 0;
    lives = 3;
    score = 0;
    livesEl.textContent = `Lives: ${lives}`;
    mistakes = [];  // Reset mistakes when restarting the game
    nextQuestionButton.style.display = 'none';
    loadQuestion();
}

function loadQuestions(difficulty) {
    if (difficulty === 'easy') {
        questions = easyQuestions;
    } else if (difficulty === 'medium') {
        questions = mediumQuestions;
    } else if (difficulty === 'hard') {
        questions = hardQuestions;
    }
}

function shuffleQuestions() {
    questions = questions.sort(() => Math.random() - 0.5);
}

function loadQuestion() {
    if (currentQuestionIndex < questions.length && lives > 0) {
        const currentQuestion = questions[currentQuestionIndex];
        questionEl.textContent = currentQuestion.question;
        resultEl.textContent = '';

        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach((button, index) => {
            button.textContent = currentQuestion.answers[index];
            button.disabled = false;
            button.style.backgroundColor = '';
            button.onclick = () => checkAnswer(index, button);
        });
        
        nextQuestionButton.style.display = 'none'; // Hide the next button initially
    } else {
        endGame();
    }
}

function checkAnswer(selectedIndex, selectedButton) {
    const currentQuestion = questions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');
    
    if (selectedIndex === currentQuestion.correct) {
        score++;
        selectedButton.style.backgroundColor = '#4CAF50'; // Correct color
        resultEl.textContent = 'Correct!';
    } else {
        lives--;
        livesEl.textContent = `Lives: ${lives}`;
        selectedButton.style.backgroundColor = '#ff4d4d'; // Incorrect color
        resultEl.textContent = 'Incorrect!';
        
        // Save the mistake to show at the end
        mistakes.push({
            question: currentQuestion.question,
            userAnswer: currentQuestion.answers[selectedIndex],
            correctAnswer: currentQuestion.answers[currentQuestion.correct],
        });
        
        answerButtons[currentQuestion.correct].style.backgroundColor = '#4CAF50'; // Highlight correct answer
    }

    answerButtons.forEach(button => button.disabled = true); // Disable all buttons after selection
    nextQuestionButton.style.display = 'block'; // Show the next button
}

nextQuestionButton.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion();
});

function endGame() {
    quizScreen.style.display = 'none';
    gameOverScreen.style.display = 'block';
    scoreEl.textContent = score;
    document.body.style.backgroundColor = '#ffdddd'; // Red background for game over

    // Display the mistakes list
    const mistakesUl = document.getElementById('mistakes');
    mistakesUl.innerHTML = ''; // Clear previous mistakes
    mistakes.forEach(mistake => {
        const li = document.createElement('li');
        li.innerHTML = `
            <strong>Question:</strong> ${mistake.question} <br>
            <strong>Your Answer:</strong> ${mistake.userAnswer} <br>
            <strong>Correct Answer:</strong> ${mistake.correctAnswer}
        `;
        mistakesUl.appendChild(li);
    });
}

restartButton.addEventListener('click', () => {
    homeScreen.style.display = 'block';
    quizScreen.style.display = 'none';
    gameOverScreen.style.display = 'none';
    document.body.style.backgroundColor = '#e8f8f5'; // Reset background
});