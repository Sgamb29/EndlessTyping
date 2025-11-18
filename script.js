

const textOutput = document.getElementById("output");

const statCorrect = document.getElementById("correct");
const statWrong = document.getElementById("wrong");
const statAccuracy = document.getElementById("accuracy");

// Toggle Elements - have to be added to getLetterString() params
const toggleUppercase = document.getElementById("toggleUppercase");
const toggleNumbers = document.getElementById("toggleNumbers");
const toggleSpecial = document.getElementById("toggleSpecial");
const toggleSpaces = document.getElementById("toggleSpaces");
const toggleElements = [toggleNumbers, toggleUppercase, toggleSpecial, toggleSpaces];

// Local Storage Keys
const fontSizeKey = "fontSizeSave";
const lenKey = "typeLength";

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
    // console.log(e.key);
    if (e.key === " ") {
        e.preventDefault();
        
    }
    handleKeyPress(e.key);
})



// Adding Initial Level Text and Font
let levelLength = 1000;
const savedLen = localStorage.getItem(lenKey);
if (savedLen !== null) {
    const tempLen = parseInt(savedLen);
    if (tempLen === 250 || tempLen === 500 || tempLen === 1000) {
        levelLength = tempLen;
    }
    document.getElementById("chooseLengthText").innerText = "Choose Text Length. Current: " + levelLength.toString();
}
const savedFont = localStorage.getItem(fontSizeKey);
changeFontSize(savedFont);
textOutput.innerText = generateText(levelLength);
document.getElementById("title").innerText = `${levelLength} Random Letters To Type`;
// Stats Variables
let correctCount = 0;
let wrongCount = 0;


let textIndex = 0;

let shouldAddCorrectPoint = true;

let isNewLevel = false;

function changeLength(num) {
    levelLength = parseInt(num);
    document.getElementById("chooseLengthText").innerText = "Choose Text Length. Current: " + num.toString();
    document.getElementById("title").innerText = `${levelLength} Random Letters To Type`;
    resetToNewLevel();
    localStorage.setItem(lenKey, levelLength.toString());
}

function handleKeyPress(k) {
    if (k === textOutput.innerText[textIndex]) {
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

        textOutput.style.border = "3px solid green";

        // Fix for special char text slice unwanted deletion::
        if (toggleSpecial.checked) {
            // const isQuote = k === "'" || k === "`" || k === '"';
            let tempText = textOutput.innerText;
            // Got to replace the first instance so if it's a quote the encoding doesn't spill through.
            tempText = tempText.replace(k, "*");
            tempText = encodeDecodeQuotes(false, tempText);
            tempText = getFillerString(textIndex) + tempText.slice(textIndex);
            tempText = encodeDecodeQuotes(true, tempText);
            textOutput.innerText = tempText;
        } else {
            textOutput.innerHTML = getFillerString(textIndex) + textOutput.innerText.slice(textIndex);
        }
        // console.log(textOutput.innerText.length);
        // End fix.



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
            textOutput.style.border = "3px solid red";
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

// Just generates the string for what characters to add to the text output.
// Based off what toggle elements are checked.
function getLetterString(useUppercase, useNumbers, useSpecial) {
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const special = "~!@#$%^&*()_-+=-?/|<>,.:;{}[]\\`'\""

    const letterStrs = {
        "lowers": lowercase,
        "uppers": lowercase.toUpperCase(),
        "numbers": numbers,
        "special": special
    }

    if (useSpecial) {
        document.getElementById("warning").innerText = "Tip: Careful of the * they're hard to see.";
    } else {
        document.getElementById("warning").innerText = "Click anywhere on the page, and then start typing!";
   
    }

    return letterStrs;
    
}

function generateText(length) {
    const letters = getLetterString(toggleUppercase.checked, toggleNumbers.checked, toggleSpecial.checked);
    let levelString = "";
    for (let i = 0; i < length; i++) {
        if (i % 15 === 0 && toggleUppercase.checked) {
            levelString = levelString + letters["uppers"][getRandomIntger(letters["uppers"].length)]
        } else if (i % 12 === 0 && toggleNumbers.checked) {
            levelString = levelString + letters["numbers"][getRandomIntger(letters["numbers"].length)]
        } else if (i % 20 === 0 && toggleSpecial.checked) {
            levelString = levelString + letters["special"][getRandomIntger(letters["special"].length)]
        } else if (i % 8 === 0 && toggleSpaces.checked) {
            levelString = levelString + " ";
        } else {
            levelString = levelString + letters["lowers"][getRandomIntger(letters["lowers"].length)];
        }
    }

    return levelString;

}

function encodeDecodeQuotes(decode=false, txt) {
    const chars = ["'", "`", '"'];
    const encodeStr = "QUT";
    let count = 1;
    if (!decode) {
        chars.forEach((c) => {
            txt = txt.replaceAll(c, encodeStr + count.toString());
            count += 1;
        });
    } else {
        chars.forEach((c) => {
            txt = txt.replaceAll(encodeStr + count.toString(), c);
            count += 1;
        })
    }
    return txt;

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


function changeFontSize(size) {
    const op1 = "large";
    const op2 = "larger";
    const op3 = "x-large";
    const op4 = "xx-large";
    switch (size) {
        case op1:
            saveStr = op1;
            break;
        case op2:
            saveStr = op2;
            break;
        case op3:
            saveStr = op3;
            break;
        case op4:
            saveStr = op4;
            break;
        default:
            size = op3;
            saveStr = op3;
            break;
    }
    document.getElementById("chooseSizeText").innerText = "Choose Font Size. Current: " + size.toString();
    textOutput.style.fontSize = size;
    localStorage.setItem(fontSizeKey, saveStr);
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
   "thumb": [" "],

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


// Traffic
const now = new Date();
const dotw = now.getDay();
const itemKey = "lastFetchTyping";
const lastFetch = localStorage.getItem(itemKey);

if (lastFetch !== dotw.toString()) {
    countVisit();
    localStorage.setItem(itemKey, dotw.toString());
}

function countVisit() {
    const request = new Request("https://server.sgambapps.com/?site=endlessTyping", {
        method: "POST",
    });
    fetch(request)
    .then(res => {
        if (res.ok) {
        console.log("visit counted");
        }
    })
    .catch(err => console.log(err));
}
