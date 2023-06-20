const gridd = document.querySelector('.grid')
const blockW = 50
const blockH = 30
const initPos = [10,10]

const canvasW = 560
const canvasH = 300


const userWidth = 100
const userHeight = 20

const startPos = [230 , 10]
const currPos = startPos

const ballStartPos = [startPos[0]+ userWidth*2,startPos[1]+30]
const currBallPos = ballStartPos

const ballD = 20
let timerId = null

let incX = 2
let incY = 2

let score = 0
const numberOfBlocks = 10

class Block{
    constructor(xAx,yAx){
        this.bottomLeft = [xAx,yAx]
        this.bottomRight = [xAx + blockW ,yAx]
        this.topLeft = [xAx, yAx + blockH]
        this.topRight = [ xAx + blockW, yAx = blockH]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),
    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210),

]

function add_block(){
    for( let i = 0 ; i < blocks.length ; i++){
        const block = document.createElement('div')
        block.classList.add('block')

        block.style.left = blocks[i].bottomLeft[0] +'px'
        block.style.bottom = blocks[i].bottomLeft[1] +'px'
        gridd.appendChild(block)
    }
}



const user = document.createElement('div')
user.classList.add('user')

gridd.appendChild(user)

function drawUser(){
    user.style.left = currPos[0] +'px'
    user.style.bottom = currPos[1] + 'px'
}
function drawBall(){
    ball.style.left = currBallPos[0] +'px'
    ball.style.bottom = currBallPos[1] + 'px'
    //console.log(currBallPos[0] +"-"+currBallPos[1])
}

function moveUser(e){
   // console.log(e.key)
    if( e.key == 'ArrowLeft' || e.key == 'a' || e.key == 'A'){
            if(currPos[0] >0){
                currPos[0] -= 10
                drawUser()
            }
    }
    if( e.key == 'ArrowRight' || e.key == 'd' || e.key == 'D'){
            if(currPos[0] + userWidth <canvasW){
                currPos[0] += 10
                drawUser()
            }
    }

}

document.addEventListener('keydown',moveUser)

const ball = document.createElement('div')
ball.classList.add('ball')

gridd.appendChild(ball)


function moveBall(){
    currBallPos[0] += incX
    currBallPos[1] += incY
    drawBall()
    collideCheck()
}

timerId = setInterval(moveBall,30)

function collideCheck(){
    //block coll
    for(let i = 0 ; i < blocks.length; i++){
        if(currBallPos[0] > blocks[i].bottomLeft[0] && 
            currBallPos[0] < blocks[i].bottomRight[0]&&
            currBallPos[1] + ballD > blocks[i].bottomLeft[1]&&
            currBallPos[1] < blocks[i].topLeft[1]
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            allBlocks[i].classList.remove('block')
            blocks.splice(i,1)
            changeDirection()
            score++

            if(blocks.length === 0){
                // win
                clearInterval(timerId)
                document.removeEventListener('keydown',moveUser)
            }
        }
    }


    if(
    currBallPos[0] >= (canvasW - ballD)||
    currBallPos[1] >= (canvasH - ballD)||
    currBallPos[0] <= 0
    ){
        changeDirection()
    }

    // check user coll
    if(currBallPos[0] > currPos[0]&&
        currBallPos[0] < currPos[0] + userWidth&&
        currBallPos[1] > currPos[1]&&
        currBallPos[1] < currPos[1] + userHeight ){
            changeDirection()
    }


    if(currBallPos[1] <= 0 ){
        clearInterval(timerId)
        document.removeEventListener('keydown',moveUser)
    }
}

function changeDirection(){
    if(incX == 2 && incY === 2){
       incY = -2
       return
    }
    if(incX == 2 && incY === -2){
        incX = -2
        return
     }
     if(incX == -2 && incY === -2){
        incY = 2
        return
     }
     if(incX == -2 && incY === 2){
        incX = 2
        return
     }
     
    
}


function initGame(){
    for( let i = 0 ; i < numberOfBlocks; i++){
        blocks.push(new Block(blockW * i+initPos,blockH*i+initPos))
    }
    console.log(blocks)
    add_block()
    drawUser()
    drawBall()
}
initGame()