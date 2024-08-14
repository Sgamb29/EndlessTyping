
// Todo - add options to change letter generation: like only lowercase, no numbers, etc.
// toggle for different letter list


const textOutput = document.getElementById("output");

const statCorrect = document.getElementById("correct");
const statWrong = document.getElementById("wrong");
const statAccuracy = document.getElementById("accuracy");

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
        textOutput.innerText = getFillerString(textIndex) + textOutput.innerText.slice(textIndex);

        if (shouldAddCorrectPoint) {
            correctCount += 1;
        } else {
            shouldAddCorrectPoint = true;
        }


    } else {
        if (isNewLevel) {
            return;
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


function generateText(length) {
    const letters = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let levelString = "";
    for (let i = 0; i < length; i++) {
        // // Randomize the spaces later and add styling to make them pop out
        // if (i % 5 == 0) {
        //     levelString = levelString + " ";
        // }
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


