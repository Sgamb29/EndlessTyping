

const output = document.getElementById("output");
const input = document.getElementById("input");
const generationLength = 15;
let addNums = false;
let addUppers = false;
let hasStarted = false;

function generateText(length) {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let txt = "";
    for (let i = 0; i < length; i++) {
        let letterToAdd = letters[getRandInt(letters.length)];
        if (addUppers & i === 0 | addUppers & i === length - 1) {
           letterToAdd = letterToAdd.toUpperCase();
        }
        txt = txt + letterToAdd;
    }
    const nums = "0123456789";
    if (addNums) {
        for (let x = 0; x < 3; x++) {
            txt = txt + nums[getRandInt(nums.length)];
        }
    }
    output.innerText = txt;
}

function getRandInt(max) {
    return Math.floor(Math.random() * max);
} 

const uppercaseToggle = document.getElementById("toggleUppercase");
uppercaseToggle.addEventListener("click", (e) => {
    addUppers = uppercaseToggle.checked ? true : false;
    generateText(generationLength);
});
const numberToggle = document.getElementById("toggleNumbers");
numberToggle.addEventListener("click", (e) => {
    addNums = numberToggle.checked ? true : false;
    generateText(generationLength);
});

// Main texting handler
let timeStart = null;
input.addEventListener("input", (e) => {
    if (e.data === output.innerText[0]) {
        if (!hasStarted) {
            timeStart = Date.now();
            hasStarted = true;
        }
        if (output.innerText.length === 1) {
            let duration = Date.now() - timeStart;
            let msOrS = duration > 1000 ? "sec" : "ms";
            duration = duration > 1000 ? duration / 1000 : duration;
            document.getElementById("timeOutput").innerText = `Time Taken: ${duration.toFixed(2)}${msOrS}`;
            generateText(generationLength);
            hasStarted = false;
        } else {
            output.innerText = output.innerText.slice(1, output.innerText.length);
        }
    }
    input.value = "";
});

generateText(generationLength);