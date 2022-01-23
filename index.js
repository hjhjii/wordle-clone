const rows = document.querySelectorAll("#game-container .game-row");
let currentRow = 0;
let currentBox = 0;
document.addEventListener("keyup", keyPressHandler)
let answer = pickWord()

function pickWord() {
    let word = db[Math.floor(Math.random() * db.length)]
    console.log("word choosen:", word)
    return word
}

async function keyPressHandler(e) {
    if (e.key === "Enter") {
        enterKeyHandler();
    } else if (e.key === "Backspace") {
        backspaceKeyHandler();
    } else if (e.keyCode > 64 && e.keyCode < 91) {
        letterKeyHandler(e);
    } else {
        console.error("invalid key press");
    }
}

function enterKeyHandler() {
    let row = rows[currentRow];
    let word = assembleWord(row);
    console.log(word)
    if (currentRow + 1 != rows.length && word !== "") {
        let correctLetterArray = checkAnswer(word);
        if (db.includes(word.toLowerCase())) {
            if (correctLetterArray.length === word.length) {
                console.log("Input is the Answer");
                return; // implement win logic
            } else {

            }
            currentRow++;
        } else {
            console.log("invalid word");
            clearRow(row);
        }
        currentBox = 0;
    } else {
        console.log("the word is not 5 letters!");
    }
}

function backspaceKeyHandler() {
    let row = rows[currentRow];
    if (currentBox > 0) {
        currentBox--;
        let box = row.querySelectorAll(".box")[currentBox];
        box.textContent = "";
    }
}

function letterKeyHandler(e) {
    let row = rows[currentRow];
    console.log(`inserted letter "${e.key.toUpperCase()}"`)
    if (currentBox < row.childElementCount) {
        let box = row.querySelectorAll(".box")[currentBox];
        box.textContent = e.key;
        currentBox++;
    }
}

function clearRow(row) {
    row.querySelectorAll(".box")
        .forEach(element => element.textContent = "")
}

/**
 * 
 * @param {*} row the current row to assemble the word from
 * @returns string of the assembled word or an empty string
 */
function assembleWord(row) {
    let array = row.querySelectorAll(".box")
    let word = "";
    array.forEach(element => {
        word += element.innerText;
    });
    return word.length == array.length ? word : "";
}

function checkAnswer(word) {
    console.log(`${word} === ${answer}`)
    if (word.toLowerCase() === answer) {
        console.log("word inputted is the answer")
        return true;
    }
    return false;
}

async function checkAnswerAPI(word) {
    return fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
        .then(res => {
            if (res.ok) {
                return res.json
            }
            else if (res.status === 404) {
                return Promise.reject("error 404")
            }
            else {
                return Promise.reject("another error");
            }
        })
        .catch(error => error);
}

/**
 * 
 * @param {*} word word
 * @param {*} toCompare string to compare to 
 * @returns array with letters that are included in toCompare 
 */
function wordComparison(word, toCompare) {
    let compArray = toCompare.split("");
    let result = word.split("");
    result.filter(letter => compArray.includes(letter));
    return result;
}

function getSetLetters(word) {
    return new Set(word.split(""));
}

