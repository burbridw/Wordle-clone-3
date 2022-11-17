
const threeLetterWordsObj = {
    "ice": "./images/desserts/img4.png", "big": "./images/conditions/img1.png", "car": "./images/vehicles/img2.png", "nut": "./images/fruitsvegetables/img18.png", 
    "old": "./images/conditions/img6.png", "red": "./images/colours/img8.png", "eve": "./images/yearlyevents/img10.png", "tea": "./images/drinks/img2.png", 
    "cat": "./images/animals/img18.png", "pen": "./images/stationary/img3.png", "leg": "./images/body/img11.png", "get": "./images/actions2/img9.png", "vet": "./images/jobs/img8.png", 
    "bed": "./images/commonitems/img26.png", "hat": "./images/clothes/img8.png", "toe": "./images/body/img12.png", "boy": "./images/people/img1.png", "gym": "./images/school/img4.png", 
    "pie": "./images/foods/img17.png", "cap": "./images/clothes/img7.png", "new": "./images/conditions/img5.png", "tag": "./images/activities/img12.png", 
    "fun": "./images/descriptions/img15.png", "box": "./images/commonitems/img7.png", "ear": "./images/body/img7.png", "hot": "./images/weather/img6.png", 
    "buy": "./images/actions1/img15.png", "eat": "./images/actions1/img10.png", "run": "./images/actions1/img2.png", "see": "./images/actions2/img4.png", 
    "ant": "./images/bugs/img1.png", "gas": "./images/buildings/img13.png", "ate": "./images/pastactions/img2.png", "bus": "./images/vehicles/img1.png", 
    "saw": "./images/pastactions/img3.png", "had": "./images/pastactions/img5.png", "cup": "./images/commonitems/img8.png", "egg": "./images/ingredients/img7.png", 
    "bat": "./images/commonitems/img2.png", "eye": "./images/body/img6.png", "dog": "./images/animals/img17.png", "sad": "./images/feelings/img5.png", "try": "./images/actions2/img7.png", 
    "ham": "./images/ingredients/img5.png", "and": "./images/subjects/img8.png", "cow": "./images/animals/img11.png", "bag": "./images/commonitems/img4.png", 
    "map": "./images/commonitems/img16.png", "art": "./images/clubactivities/img11.png", "sea": "./images/nature/img9.png", "day": "./images/yearlyevents/img2.png", 
    "zoo": "./images/buildings/img27.png", "pig": "./images/animals/img13.png", "one": "./images/numbers/img1.png", "two": "./images/numbers/img2.png", 
    "six": "./images/numbers/img6.png", "ten": "./images/numbers/img10.png"
}

const threeLetterWords = Object.keys(threeLetterWordsObj)

let word = ""
let randomSelectThree = "" 
let answerCount = 0
let round = 0
let correctGuess = 0
let gameActive = true
let inputArr = []
let answerArr = []
const dictionary = document.querySelector(".dictionary")
function buildDictionary(obj) {
    threeLetterWords.forEach( (x) => {
        dictionary.innerHTML += `<div class="dictionary-image">${x} <img src="${obj[x]}"></div>`
    })

}

buildDictionary(threeLetterWordsObj)
start(threeLetterWords)

function start(list) {
    randomSelectThree = Math.floor( Math.random()*list.length )
    word = list[randomSelectThree]
    answerArr = word.split("")
    answerCount = 0
    round = 0
    correctGuess = 0
    gameActive = true
    inputArr = []
    let allInputs = document.querySelectorAll(".answer-box")
    allInputs.forEach( (x) => {
        x.textContent = ""
        if (x.style.backgroundColor !== "rgb(243, 243, 231)")
        x.style.backgroundColor = "rgb(243, 243, 231)"
    })
    let allKeys = document.querySelectorAll(".key")
    allKeys.forEach( (x) => {
        if (x.style.backgroundColor !== "rgb(243, 243, 231)")
        x.style.backgroundColor = "rgb(243, 243, 231)"
    })
}

const delBtn = document.getElementById("delete")
const enterBtn = document.getElementById("enter")
const keyboardDiv = document.querySelector(".keyboard")
const messageBox = document.getElementById("message-box")
const endMessage = document.getElementById("end-message")
const endImage = document.getElementById("end-image")
const resetBtn = document.getElementById("reset-btn")
const endBox = document.querySelector(".reset-box")
const upperBox = document.querySelector(".upper-container")
const lowerBox = document.querySelector(".lower-container")
const imageBox = document.querySelector(".answer-image-container")
const dictionaryBtn = document.getElementById("dictionary-button")
const closeDictionaryBtn = document.getElementById("close-dictionary")
const answerBoxContainer = document.querySelector(".answer-box-container")

let answerInput = document.querySelector(".answer-active")
let answerBox0 = answerInput.children[0]
let answerBox1 = answerInput.children[1]
let answerBox2 = answerInput.children[2]

let allKeys = document.querySelectorAll(".key")
allKeys.forEach( (x) => {
    x.addEventListener("click",function() {
        let letter = x.textContent
        press(letter)
    })
})

window.addEventListener("keydown", (x) => {       
    if (gameActive) {
        if (x.key === "Enter") {
            checkGuess()
        } else if (x.key === "Backspace") {
            del()
        } else {
            if ( /[a-z]/.test(x.key) && x.key.length === 1) {
            press(x.key)
            }
        }
    } else {
        if (x.key === "Enter") {
            resetGame()
        }
    }
})


function press(key) {
    if (answerBox0.textContent === "") { 
    answerBox0.textContent = key
    answerCount = 1
    inputArr.push(key)
    } else if (answerBox1.textContent === "") {
        answerBox1.textContent = key
        answerCount = 2
        inputArr.push(key)
    } else if (answerBox2.textContent === "") {
        answerBox2.textContent = key
        answerCount = 3
        inputArr.push(key)
    }
}

function del() {
    if (gameActive) {
    if (answerBox2.textContent !== "") { 
        answerBox2.textContent = ""
        inputArr.pop()
        answerCount = 2
        } else if (answerBox1.textContent !== "") {
            answerBox1.textContent = ""
            inputArr.pop()
            answerCount = 1
        } else if (answerBox0.textContent !== "") {
            answerBox0.textContent = ""
            inputArr.pop()
            answerCount = 0
        }
    }
}

delBtn.addEventListener("click", function(){
    del()
})

enterBtn.addEventListener("click",function(){
    checkGuess()
})

resetBtn.addEventListener("click",function(){
    resetGame()
})

dictionaryBtn.addEventListener("click",function(){
    dictionary.classList.remove("dictionary-close")
})

closeDictionaryBtn.addEventListener("click",function() {
    dictionary.classList.add("dictionary-close")
})

function resetGame() {
    endBox.classList.add("hide-me")
    upperBox.classList.remove("go-transparent")
    lowerBox.classList.remove("go-transparent")
    answerInput.classList.remove("answer-active")
    let currentAnswerBox = answerBoxContainer.children[0]
    currentAnswerBox.classList.add("answer-active")
    answerInput = document.querySelector(".answer-active")
    answerBox0 = answerInput.children[0]
    answerBox1 = answerInput.children[1]
    answerBox2 = answerInput.children[2]
    let imageBoxes = document.querySelectorAll(".answer-image")
    imageBoxes.forEach( (x) => {
        x.textContent = ""
    })
    start(threeLetterWords)
}

function checkGuess() {
    let thisGuess = inputArr.join("")
    
    if (gameActive) {
        if (answerCount !== 3) {
            showMessage("Not enough letters")
        } else if ( !threeLetterWords.includes(thisGuess) ) {
            showMessage("Word not in list")
        } else {
            let currentImageBox = imageBox.children[round]
            let currentImage = threeLetterWordsObj[thisGuess]
            currentImageBox.innerHTML = `<img src=${currentImage}>`
            greenCheck()
        }
    }
}

function showMessage(message) {
    messageBox.textContent = message
    messageBox.classList.remove("hide-me")
    setTimeout( () => {
        messageBox.classList.add("hide-me")
    }, 3000)
}

function greenCheck() {
    for ( let i = 0; i < answerArr.length; i++ ) {
        if (answerArr[i] === inputArr[i]) {
            let currentAnswer = answerInput.children[i]
            currentAnswer.style.backgroundColor ="greenyellow"

            let allKeys = document.querySelectorAll(".key")
            allKeys.forEach ( (x) => {
                if (x.textContent === inputArr[i]) {
                    x.style.backgroundColor = "greenyellow"
                }
            })
            correctGuess++
            answerArr.splice( i, 1, "*")
            inputArr.splice( i, 1, "@")
            }
        }   
        if ( correctGuess === 3) {
            playerWins()
        } else {    
            yellowCheck()
    } 
}

function yellowCheck() {
    for ( let i = 0; i < answerArr.length; i++ ) {
        if (answerArr.includes(inputArr[i]) && answerArr[i] !== inputArr[i]) {
            let currentAnswer = answerInput.children[i]
            currentAnswer.style.backgroundColor ="yellow"

            let allKeys = document.querySelectorAll(".key")
            allKeys.forEach ( (x) => {
                if (x.textContent === inputArr[i] && x.style.backgroundColor !== "greenyellow") {
                    x.style.backgroundColor = "yellow"
                }
            })
        let cutIndex = answerArr.indexOf(`${inputArr[i]}`)

        inputArr.splice( i, 1, "@")
        
        answerArr.splice( cutIndex, 1, "*")
        
        } 
    }  for ( let i = 0; i < 3; i++ ) {
        let currentAnswer = answerInput.children[i]
        let allKeys = document.querySelectorAll(".key")
        if (currentAnswer.style.backgroundColor !== "greenyellow" && currentAnswer.style.backgroundColor !== "yellow") {
            currentAnswer.style.backgroundColor = "darkgray"
            allKeys.forEach ( (x) => {
                if (x.textContent === currentAnswer.textContent && x.style.backgroundColor !== "greenyellow" && x.style.backgroundColor !== "yellow") {
                    x.style.backgroundColor = "darkgray"
                }
            })
        }
    }   if ( round < 5) {
        resetRound()
    }  else if ( round === 5 && correctGuess < 3) {
        gameOver()
    }
}

function playerWins() {
    gameActive = false
    endMessage.textContent = "You Win!"
    let correctImage = threeLetterWordsObj[word]
    endImage.innerHTML = `It was "${word}" <img src=${correctImage}>`
    upperBox.classList.add("go-transparent")
    lowerBox.classList.add("go-transparent")
    setTimeout( () => {
        endBox.classList.remove("hide-me")
    }, 1000)
    
}

function gameOver() {
    gameActive = false
    endMessage.textContent = "You Lose!"
    let correctImage = threeLetterWordsObj[word]
    endImage.innerHTML = `It was "${word}" <img src=${correctImage}>`
    upperBox.classList.add("go-transparent")
    lowerBox.classList.add("go-transparent")
    setTimeout( () => {
        endBox.classList.remove("hide-me")
    }, 1000)
}

function resetRound() {
    answerArr = word.split("")
    let currentAnswerBox = answerBoxContainer.children[round]
    currentAnswerBox.classList.remove("answer-active")
    round++
    let nextAnswerBox = answerBoxContainer.children[round]
    nextAnswerBox.classList.add("answer-active")
    answerInput = document.querySelector(".answer-active")
    answerBox0 = answerInput.children[0]
    answerBox1 = answerInput.children[1]
    answerBox2 = answerInput.children[2]
    inputArr = []
    correctGuess = 0
    answerCount = 0
}

