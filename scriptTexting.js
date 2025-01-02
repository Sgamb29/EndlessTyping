

const output = document.getElementById("output");
const input = document.getElementById("input");
const generationLength = 15;
let addNums = false;
let addUppers = false;
let hasStarted = false;
let useWords = false;

function generateText(length) {
    const letters = "abcdefghijklmnopqrstuvwxyz";
    let txt = "";
    if (useWords) {
        const letter = letters[getRandInt(letters.length)];
        txt = wordsByLetter[letter][getRandInt(wordsByLetter[letter].length)];
        if (addUppers) {
            txt = txt[0].toUpperCase() + txt.slice(1);
        }
    } else {
        for (let i = 0; i < length; i++) {
            let letterToAdd = letters[getRandInt(letters.length)];
            if (addUppers & i === 0 | addUppers & i === length - 1) {
            letterToAdd = letterToAdd.toUpperCase();
        }
        txt = txt + letterToAdd;
    }}
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
const toggleWords = document.getElementById("toggleWords");
toggleWords.addEventListener("click", (e) => {
    useWords = toggleWords.checked ? true : false;
    generateText(1);
})

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


const wordsByLetter = {
    a: ['apple', 'ant', 'anchor', 'arrow', 'atlas', 'angel', 'apron', 'alarm', 'army', 'amber'],
    b: ['ball', 'bat', 'bottle', 'bridge', 'breeze', 'button', 'beacon', 'badge', 'barn', 'branch'],
    c: ['cat', 'car', 'candle', 'circle', 'cloud', 'chain', 'chair', 'crate', 'crane', 'creek'],
    d: ['dog', 'door', 'diamond', 'dance', 'drum', 'dream', 'dove', 'daisy', 'desk', 'dart'],
    e: ['egg', 'ear', 'engine', 'eagle', 'earth', 'elbow', 'ember', 'echo', 'edge', 'event'],
    f: ['fish', 'fire', 'feather', 'fence', 'forest', 'fountain', 'frame', 'flame', 'fruit', 'field'],
    g: ['goat', 'garden', 'glove', 'glass', 'gold', 'grape', 'grain', 'gate', 'giant', 'grass'],
    h: ['hat', 'horse', 'house', 'heart', 'hammer', 'honey', 'harbor', 'herb', 'hill', 'hunter'],
    i: ['ice', 'iron', 'island', 'idea', 'insect', 'image', 'ivory', 'item', 'icon', 'input'],
    j: ['jar', 'jelly', 'jacket', 'jungle', 'jewel', 'jump', 'journey', 'judge', 'junior', 'jigsaw'],
    k: ['kite', 'key', 'king', 'knee', 'knife', 'kettle', 'kitten', 'knob', 'knot', 'kitchen'],
    l: ['lamp', 'leaf', 'laptop', 'ladder', 'lake', 'lamb', 'line', 'light', 'lion', 'loop'],
    m: ['mouse', 'moon', 'mountain', 'mirror', 'map', 'mask', 'mint', 'metal', 'music', 'motion'],
    n: ['nest', 'net', 'needle', 'night', 'north', 'name', 'note', 'number', 'noise', 'neck'],
    o: ['ocean', 'oven', 'orange', 'owl', 'object', 'orbit', 'option', 'olive', 'onion', 'order'],
    p: ['pen', 'pencil', 'paper', 'piano', 'plant', 'plate', 'phone', 'pillow', 'path', 'pocket'],
    q: ['quilt', 'queen', 'quiet', 'quail', 'query', 'quest', 'queue', 'quartz', 'quote', 'quick'],
    r: ['rain', 'river', 'rock', 'rabbit', 'rose', 'rope', 'radio', 'ring', 'road', 'ruler'],
    s: ['star', 'sand', 'shell', 'stone', 'sun', 'ship', 'snake', 'song', 'storm', 'shadow'],
    t: ['tree', 'table', 'train', 'tower', 'track', 'trail', 'tiger', 'torch', 'title', 'thread'],
    u: ['umbrella', 'uniform', 'union', 'user', 'utility', 'uncle', 'update', 'utensil', 'upward'],
    v: ['vase', 'violin', 'voice', 'valley', 'vehicle', 'vacuum', 'victory', 'village', 'vision', 'vintage'],
    w: ['water', 'wheel', 'window', 'wind', 'whale', 'wrist', 'wood', 'wing', 'wolf', 'writer'],
    x: ['x-ray', 'xylophone'],
    y: ['yarn', 'yard', 'year', 'yellow', 'youth', 'yoga', 'yolk', 'yawn', 'yield', 'yeti'],
    z: ['zebra', 'zoo', 'zero', 'zone', 'zinc', 'zest', 'zoom', 'zenith', 'zephyr', 'zigzag']
  };
  