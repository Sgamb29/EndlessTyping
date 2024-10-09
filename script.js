

const textOutput = document.getElementById("output");

const statCorrect = document.getElementById("correct");
const statWrong = document.getElementById("wrong");
const statAccuracy = document.getElementById("accuracy");


// Toggle Elements - have to be added to getLetterString() params
const toggleUppercase = document.getElementById("toggleUppercase");
const toggleNumbers = document.getElementById("toggleNumbers");
const toggleSpecial = document.getElementById("toggleSpecial");
const toggleElements = [toggleNumbers, toggleUppercase, toggleSpecial];

toggleElements.forEach((el) => {
    el.addEventListener("click", () => {
        handleOptsToggle();
    })
});


function handleOptsToggle() {
    correctCount = 0;
    wrongCount = 0;
    accuracy = 0;
    document.getElementById("timer").innerText = "Time: 0 minutes 0 seconds";
    if (isTimerStarted) {
        toggleTimer();
    }
    resetToNewLevel();
    updateStatsText();

}

document.addEventListener("keypress", (e) => {
    handleKeyPress(e.key);
})



// Adding Initial Level Text
let levelLength = 1000;
textOutput.innerText = generateText(levelLength);
document.getElementById("title").innerText = `${levelLength} Random Letters To Type`;
// Stats Variables
let correctCount = 0;
let wrongCount = 0;


let textIndex = 0;

let shouldAddCorrectPoint = true;

let isNewLevel = false;

function handleKeyPress(k) {
    if (k == textOutput.innerText[textIndex]) {
        if (!isTimerStarted) {
            toggleTimer();
        }
        if (isNewLevel) {
            correctCount = 0;
            wrongCount = 0;
            accuracy = 0;
            isNewLevel = false;
        }

        textIndex += 1
        
        displayCorrectFingerName(textOutput.innerText[textIndex]);

        textOutput.style.border = "1px solid green";

        textOutput.innerHTML = getFillerString(textIndex) + textOutput.innerText.slice(textIndex);

        if (shouldAddCorrectPoint) {
            correctCount += 1;
        } else {
            shouldAddCorrectPoint = true;
        }


    } else {
        if (isNewLevel) {
            return;
        }
        if (shouldAddCorrectPoint) {
            textOutput.style.border = "1px solid red";
        }
        wrongCount += 1;
        shouldAddCorrectPoint = false;
    }
    if (textIndex == textOutput.innerText.length) {
        toggleTimer();
        document.getElementById("timer").innerText = "Time Taken: " + getTimerString();
        resetToNewLevel();
    }

    updateStatsText();

}

function resetToNewLevel() {
    totalSeconds = 0;
    textOutput.innerText = generateText(levelLength);
    textIndex = 0;
    isNewLevel = true;
    document.getElementById("fingerIndicator").innerText = "Let's Type!";
}

function getFillerString(length) {
    let fillerString = "";
    for (let i = 0; i < length; i++) {
        fillerString = fillerString + "*";
    }

    return fillerString;
}

function updateStatsText() {
    statCorrect.innerText = `Correct Letters: ${correctCount}`;
    statWrong.innerText = `Incorrect Letters: ${wrongCount}`;
    let accuracy = correctCount / (correctCount + wrongCount);
    accuracy = Math.floor(accuracy * 100);
    if (correctCount + wrongCount == 0) {
        accuracy = 0;
    }
    statAccuracy.innerText = `Accuracy: ${accuracy}%`;
}

function getLetterString(useUppercase, useNumbers, useSpecial) {
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "~!@#$%^&*()_-+=-?/|<>,.:;{}[]\\`'\""
    if (useUppercase) {
        lowercase = lowercase + lowercase.toUpperCase();
    }
    if (useNumbers) {
        lowercase = lowercase + numbers;
    }

    if (useSpecial) {
        lowercase = lowercase + special;
        document.getElementById("warning").innerText = "Tip: Careful of the * they're hard to see.";
    } else {
        document.getElementById("warning").innerText = "Click anywhere on the page, and then start typing!";
   
    }

    return lowercase;
    
}

function generateText(length) {
    letters = getLetterString(toggleUppercase.checked, toggleNumbers.checked, toggleSpecial.checked);
    let levelString = "";
    for (let i = 0; i < length; i++) {
        levelString = levelString + letters[getRandomIntger(letters.length)];
    }

    return levelString;

}

function getRandomIntger(max) {
    return Math.floor(Math.random() * max); 
}


let totalSeconds = 0;

function getTimerString() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds - minutes * 60;
    return `${minutes} minutes ${seconds} seconds`;
}

let timer = 0;
let isTimerStarted = false;

function toggleTimer() {
    const timerButton = document.getElementById("timerButton");
    if (isTimerStarted) {
        clearInterval(timer);
        timerButton.innerText = "Start Timer";
        isTimerStarted = false;
        return;
    }
    timer = setInterval(() => {
        totalSeconds += 1;
    
        document.getElementById("timer").innerText = "Time: " + getTimerString();
    }, 1000)    

    isTimerStarted = true;
    timerButton.innerText = "Stop Timer";

}


const correctFingers = {
   "left hand pinkie": ["~", "`", "1", "!", "q", "a", "z"],
   "left hand ring": ["@", "2", "w", "s", "x"],
   "left hand middle": ["#", "3", "e", "d", "c"],
   "left hand index": ["$", "4", "r", "f", "v", "%", "5", "t", "g", "b"],
   "right hand index": ["^", "6", "y", "h", "n", "&", "7", "u", "j", "m"],
   "right hand middle": ["*", "8", "i", "k", "<", ","],
   "right hand ring": ["(", "9", "o", "l", ">", "."],
   "right hand pinkie": [")", "0", "p", ";", ":", "?", "/", '"', "'", "{", "}", "[", "]", "|", "\\", "+", "=", "-", "_"],

}


function displayCorrectFingerName(character) {
    let isFound = false;
    for (const finger in correctFingers) {
        if (isFound) {
            return;
        }
        correctFingers[finger].forEach((letter) => {
            if (letter == character || letter.toUpperCase() == character) {
                
                document.getElementById("fingerIndicator").innerText = finger;
                isFound = true;
                return;
            }
        })
    }
}


document.getElementById("toggleFingerIndicator").addEventListener("click", () => {
    const toggleButton = document.getElementById("toggleFingerIndicator");
    document.getElementById("fingerIndicator").hidden = !document.getElementById("fingerIndicator").hidden;
});

function toggleFingerIndicator() {

}