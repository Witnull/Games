const timerDp = document.querySelector('#timeleft')
const scoreDp = document.querySelector('#score')
const btn = document.querySelector('#start-pause') 
const squares = document.querySelectorAll('.grid div')
const logLeft = document.querySelectorAll('.log-left')
const logRight = document.querySelectorAll('.log-right')
const carLeft = document.querySelectorAll('.car-left')
const carRight = document.querySelectorAll('.car-right')

const startTime = 30
let timer = 0, score = 0

let isEnded = true

const startIndex = 76
let currIndex = 76

let autotimer = null

const cellW = 9

btn.textContent = "Start"

function initGame(){
    if(timer == 0 || isEnded){
        isEnded = false
        console.log('Init game')
        timer = startTime
        squares[currIndex].classList.remove('frog')
        currIndex = startIndex
        squares[startIndex].classList.add('frog')
        btn.textContent = "Pause"
        timerDp.textContent = timer
        scoreDp.textContent = score

        autotimer = setInterval(autoMove,999)
        document.addEventListener('keyup', moveFrog)

    } else{
        if(autotimer){
            console.log('paused')      
            clearInterval(autotimer)
            document.removeEventListener('keyup',moveFrog)
            btn.textContent = "Continue"
            autotimer = null
        }else{
            console.log('conitnued')
            autotimer = setInterval(autoMove,999)
            document.addEventListener('keyup', moveFrog)
            btn.textContent = "Pause"
        }
    }
}

btn.addEventListener('click',initGame)

function moveFrog(e){
    squares[currIndex].classList.remove('frog')
    if(e.key == 'w' || e.key == 'ArrowUp'){
        if(currIndex - cellW >=0){
            currIndex += -cellW
            score++
            scoreDp.textContent = score
        }
    }
    if(e.key == 's' || e.key == 'ArrowDown')
        if(currIndex + cellW  < cellW * cellW) currIndex += cellW
    if(e.key == 'a' || e.key == 'ArrowLeft')
        if(currIndex % cellW !== 0 ) currIndex += -1
    if(e.key == 'd' || e.key == 'ArrowRight')
        if(currIndex % cellW < cellW -1 ) currIndex += 1
    
    squares[currIndex].classList.add('frog')
}


function autoMove(){
    logLeft.forEach(log => moveLogLeft(log))
    logRight.forEach(log => moveLogRight(log))
    carLeft.forEach(car => moveCarLeft(car))
    carRight.forEach(car => moveCarRight(car))
    lose()
    win()
    timer--
    timerDp.textContent = timer
}
//autotimer =  setInterval(autoMove, 999)

function moveLogLeft(log){
    switch(true){
        case log.classList.contains('l1'):
            log.classList.remove('l1')
            log.classList.add('l2')
            break
        case log.classList.contains('l2'):
            log.classList.remove('l2')
            log.classList.add('l3')
            break
        case log.classList.contains('l3'):
            log.classList.remove('l3')
            log.classList.add('l4')
            break
        case log.classList.contains('l4'):
            log.classList.remove('l4')
            log.classList.add('l5')
            break
        case log.classList.contains('l5'):
            log.classList.remove('l5')
            log.classList.add('l1')
            break
    }
}
function moveLogRight(log){
    switch(true){
        case log.classList.contains('l1'):
            log.classList.remove('l1')
            log.classList.add('l5')
            break
        case log.classList.contains('l2'):
            log.classList.remove('l2')
            log.classList.add('l1')
            break
        case log.classList.contains('l3'):
            log.classList.remove('l3')
            log.classList.add('l2')
            break
        case log.classList.contains('l4'):
            log.classList.remove('l4')
            log.classList.add('l3')
            break
        case log.classList.contains('l5'):
            log.classList.remove('l5')
            log.classList.add('l4')
            break
    }
}

function moveCarRight(car){
    switch(true){
        case car.classList.contains('c1'):
            car.classList.remove('c1')
            car.classList.add('c2')
            break
        case car.classList.contains('c2'):
            car.classList.remove('c2')
            car.classList.add('c3')
            break
        case car.classList.contains('c3'):
            car.classList.remove('c3')
            car.classList.add('c1')
            break
    }
}
function moveCarLeft(car){
    switch(true){
        case car.classList.contains('c1'):
            car.classList.remove('c1')
            car.classList.add('c3')
            break
        case car.classList.contains('c2'):
            car.classList.remove('c2')
            car.classList.add('c2')
            break
        case car.classList.contains('c3'):
            car.classList.remove('c3')
            car.classList.add('c1')
            break
    }
}


function lose(){
    if(squares[currIndex].classList.contains('c1')||
    squares[currIndex].classList.contains('l4')||
    squares[currIndex].classList.contains('l5')||
    timer <= 0
    )
    {
        alert('Ya lose!')
        score = 0
        clearInterval(autotimer)
        squares[currIndex].classList.remove('frog')
        document.removeEventListener('keyup',moveFrog)
        isEnded = true
        btn.textContent = "Again"
    }
}

function win(){
    if(squares[currIndex].classList.contains('ending-block') && timer > 0){
        alert('Ya win! Congrats...')
        clearInterval(autotimer)
        document.removeEventListener('keyup',moveFrog)
        isEnded = true
        btn.textContent = "Again"
    }
}

