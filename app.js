//First Scene!!!
const firstScene = document.querySelector(".first-scene")
const firstOption = document.getElementById("x")
const secondOption = document.getElementById("o")


let circleTurn


firstOption.addEventListener("click", ()=> {
    circleTurn = false
    board.classList.remove(CIRCLE_CLASS)
    board.classList.add(X_CLASS)
    firstScene.style.display = "none"
    board.style.display = "grid"
})
secondOption.addEventListener("click", ()=> {
    circleTurn = true
    board.classList.remove(X_CLASS)
    board.classList.add(CIRCLE_CLASS)
    firstScene.style.display = "none"
    board.style.display = "grid"
})

// Actual game logic !!!

const X_CLASS = 'x'
const CIRCLE_CLASS = 'circle'
const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
const restartButton = document.getElementById("restartButton")
const winningMessageElement = document.getElementById("winningMessage")
const winningMessageText = document.querySelector('[data-winning-message-text]')
const cellElements = document.querySelectorAll("[data-cell]")
const board = document.getElementById("board")

console.dir(cellElements)

startGame()

restartButton.addEventListener("click", startGame)

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, { once : true })
})

function startGame() {
    // circleTurn = !circleTurn
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        cell.removeEventListener("click", handleClick)
        cell.addEventListener('click', handleClick, {once : true})
    })
    setBoardHoverClass()
    winningMessageElement.classList.remove("show")
}

function handleClick(e) {
   const cell = e.target
   const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS
   placeMark(cell, currentClass)


   if(checkWin(currentClass)) {
    endGame(false)
  } else if (isDraw()) {
    endGame(true)
  } else {
    swapTurns()
    setBoardHoverClass()
  }
   //place mark
   //check for win
   //check for draw
   //switch turns
}

function endGame(draw) {
    if(draw) {
    winningMessageText.innerText = "Draw!"
    } else {
        winningMessageText.textContent = `${circleTurn ? "O's" : "X's"} Win!`
        
    }
    winningMessageElement.classList.add("show")
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    if(circleTurn) {
        board.classList.add(CIRCLE_CLASS)
    } else {
        board.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return winningCombos.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}