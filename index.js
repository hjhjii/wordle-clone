const rows = document.querySelectorAll("#game-container .game-row");
let currentRow = 0;
let currentBox = 0;
document.addEventListener("keyup", keyPressHandler)
let answer = pickWord()
// add event listester for DEL and ENTER keys

function pickWord() {
    let word = db[Math.floor(Math.random() * db.length)]
    console.log("word choosen:", word)
    return word
}

async function keyPressHandler(e) {
    let row = rows[currentRow];
    console.log("before", row);
    let box; // if you set box as const the textContent cannot be changed (with const you can only change the content of Objects and Arrays)
    if (e.key === "Enter") {
        let word = assembleWord(row);
        console.log(word)
        if (currentRow + 1 != rows.length && word !== "") {
            let isAnswerCorrect = checkAnswer(word);
            if (isAnswerCorrect) {
                console.log("valid word");
                currentRow++;
            } else {
                console.log("invalid word")
                clearRow(row);
            }
            currentBox = 0;
        }
    } else if (e.key === "Backspace") {
        if (currentBox > 0) {
            currentBox--;
            box = row.querySelectorAll(".box")[currentBox];
            box.textContent = "";
        }
    } else if (e.keyCode > 64 && e.keyCode < 91) {
        console.log("inserted letter")
        if (currentBox < row.childElementCount) {
            let box = row.querySelectorAll(".box")[currentBox];
            box.textContent = e.key;
            currentBox++;
        }
    }
}

function clearRow(row) {
    let array = row.querySelectorAll(".box");
    array.forEach(element => element.textContent = "")
}


/**
 * 
 * @param {*} row the current row to assemble the word from
 * @returns true if user has filled all boxes, otherwise false
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


function checkAnswerAPI(word) {
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