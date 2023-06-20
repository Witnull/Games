const squares = document.querySelectorAll(".square")
const mole = document.querySelector(".mole")
const scoreDP = document.querySelector("#score")
const timeDP = document.querySelector("#time")
const hiScoreDp = document.querySelector("#hiscore")

let score , time_left, hiScore = 0 ;
let hitPos = null
let timerId = null
let countDownTimerid = null


const moleimg = "https://sg.portal-pokemon.com/play/resources/pokedex/img/pm/583fa625d6fda586a5734f5f9e455952aa6af15f.png"
const dirtimg = "https://cdn-icons-png.flaticon.com/512/2515/2515447.png"
function initGame(){
    time_left = 60
    score = 0
    hitPos = null
    timerId = null
    scoreDP.textContent = score
    timeDP.textContent = time_left
    hiScoreDp.textContent = hiScore
    ranSquare()
    moveMole()
    countDownTimerid = setInterval(countDown,1000)
}


function ranSquare(){
    squares.forEach(sq =>{
        sq.classList.remove('mole')
        sq.querySelector('img').setAttribute('src',dirtimg)
    })
    let randSquarePos = squares[Math.floor(Math.random()*9)]
    randSquarePos.classList.add('mole')

    randSquarePos.querySelector('img').setAttribute('src',moleimg)
    hitPos = randSquarePos.id
}

squares.forEach(sq => {

    const img_ = document.createElement("img")
    img_.setAttribute('src',dirtimg)
    img_.className = "Img_Bg"
    img_.id = "img2change"
    sq.appendChild(img_)

    sq.addEventListener('mousedown', () => {
        if (sq.id === hitPos && time_left > 0) {
            score++
            scoreDP.textContent = score

            if(score >= hiScore){
                hiScore = score
                hiScoreDp.textContent = hiScore
            }

            hitPos = null
        }
    })
})

function moveMole(){
    timerId = setInterval(ranSquare,500)
}

function countDown(){
    timeDP.textContent = --time_left

    if(time_left <= -1 ){
        clearInterval(countDownTimerid)
        clearInterval(timerId)
        alert("Game Over! Final score: " + score )
        initGame()
    }
}
initGame()