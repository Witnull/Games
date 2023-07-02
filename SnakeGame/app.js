const gridd = document.querySelector('.grid')
const scoreDP =document.querySelector('#scoreDp')
const diffModeBtn =document.querySelector('.diffMode')
const restartBtn = document.querySelector('.restart')
const wallModeBtn = document.querySelector('.wallMode')
const gameModeBtn = document.querySelector('.gameMode')
const desDP = document.querySelector('#des')
const snakeModeBtn = document.querySelector('.snakeMode')
const speedModeBtn = document.querySelector('.speedMode')
const colorModeBtn = document.querySelector('.colorMode')


const gridSize = 550
const diff_set=[
    {
        speed: 1, // 0
        mapSize: 11,
        clName: 'ez',
        dpClName: 'cell-forDP-ez',
    },
    {
        speed: 3, // 1
        mapSize: 25,
        clName: 'med',
        dpClName: 'cell-forDP-med',
    },
    {
        speed: 5, // 2
        mapSize: 55,
        clName: 'hard',
        dpClName: 'cell-forDP-hard',
    },
]

class Queue {
    constructor() {
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    enqueue(item) {
        this.items[this.backIndex] = item
        this.backIndex++
    }
    dequeue() {
        const item = this.items[this.frontIndex]
        delete this.items[this.frontIndex]
        this.frontIndex++
        return item
    }
    peek() {
        return this.items[this.frontIndex]
    }
    size(){
        return this.backIndex-this.frontIndex
    }
    clear(){
        this.items = {}
        this.frontIndex = 0
        this.backIndex = 0
    }
    get printQueue() {
        return this.items;
    }
}


const snakeTag ='snake'
const appleTag = 'fruit'
const bodyTag = 'tail'
const colorBTag = 'color' // + 1,2,3,n
const wallTag = 'wall'
const G_appleTag = 'Gapple'
const bombTag = 'bomb'
const meteorTag = 'meteor'

const default_diff = 1
const max_diffMode = 3
const default_dir = 0
const default_meteorSpawn = 1000 // 5s
const default_meteorDespawn = 7000 
const default_wallMode = 0 // 0:off 1:ring 2:random
const max_WallMode = 4
const default_gameMode = 0 // 0:Classic 1:Bonus fruit + 1pts   2:Banquet 5%  3:Banquet 10% 4:meteor 5:Bomb 3%
const max_gameMode = 7
const default_snakeMode = 0 // 0:normal 1:slow growth 2:forever small
const max_snakeMode = 3
const default_maxSnakeLength = 120

const default_speedMode = 2
const speedMode_set=[1500,1000,700,500,300]

const default_colorMode = 0
const max_colorMode = 7 // 0:color1,1:color2,2:color3,3:rainbow

let hi_ez =0
let hi_med =0
let hi_hard =0

let diff = default_diff
let currPlrIdx
let currDirection = default_dir // 0:freeze 1:up 2:down 3:left 4:right
let inptDirection = default_dir
let tailArr= new Queue()
let timerId_autoMove = null 
let score = 0
let cellArray 
let wallMode = 0
let gameMode = 0 
let meteor_timerId = null
let snakeLength = 3
let snakeMode = default_snakeMode
let max_snakeLength = default_maxSnakeLength
let speedMode = default_speedMode
let colorMode = default_colorMode

let currBtag = 1 // for effect

function play_collectSFX(){
   console.log('ding!')
}

function generateMap(){
    gridd.innerHTML=''
    for(let i = 0; i < diff_set[diff].mapSize * diff_set[diff].mapSize ; i++){
        let cell = document.createElement('div')
        cell.classList.add('cell')
        cell.classList.add(diff_set[diff].clName)
        cell.classList.add(i)
        
        let ran = Math.random()*100

        if(wallMode === 1){
            if( i < diff_set[diff].mapSize ||    // top
                i % diff_set[diff].mapSize  == 0 || // left side
                i % diff_set[diff].mapSize == diff_set[diff].mapSize -1 || // right side
                i > (diff_set[diff].mapSize* diff_set[diff].mapSize - diff_set[diff].mapSize) ){// bottom
                cell.classList.add(wallTag)     
                max_snakeLength--
            }
        }
        else if(wallMode === 2){
            if( ran >= 40 && ran <= 45){
                cell.classList.add(wallTag)
                max_snakeLength--
            }
        }
        else if(wallMode === 3){
            if( ran >= 40 && ran <= 51){
                cell.classList.add(wallTag)
                max_snakeLength--
            }
        }
        
        gridd.appendChild(cell)
    }
    cellArray = gridd.querySelectorAll('.cell')
}

function updCells(){
    cellArray.forEach(()=>{
        let ran = Math.random()*100

        if(gameMode ===2){
            if( ran >= 40 && ran <= 45){
                spawnApple()
            }
        }
        if(gameMode ===3 || gameMode === 6){
            if( ran >= 40 && ran <= 50){
                if(ran >= 45 && ran <= 46)
                    spawnApple(99)
                else
                    spawnApple()
            }
        }
        if(gameMode ===5 || gameMode === 6){
            if( ran >= 40 && ran <= 43){
                spawnApple(8038)
                max_snakeLength--
            }
        }
    })
}
function initGame(){
    // reset
    currDirection = default_dir
    inptDirection = default_dir
    tailArr.clear()
    cellArray = {}
    score =0
    max_snakeLength = diff_set[diff].mapSize*diff_set[diff].mapSize - 2
    clearInterval(timerId_autoMove)
    clearInterval(meteor_timerId)
    document.removeEventListener('keyup',changeDirection)
    generateMap()
    updCells()
    if(gameMode === 4|| gameMode === 6){
        meteor_timerId = setInterval(spawnMeteor,default_meteorSpawn/diff_set[diff].speed)
    }


    // spawn player
    currPlrIdx = Math.floor(Math.random()*cellArray.length)
    do{
        currPlrIdx = Math.floor(Math.random()*cellArray.length)
    }
    while(cellArray[currPlrIdx].classList.contains(wallTag)) 

    cellArray[currPlrIdx].classList.add(snakeTag)
    ///////

    spawnApple()
    document.addEventListener('keyup',changeDirection)
    timerId_autoMove = setInterval(autoMove,speedMode_set[speedMode]/diff_set[diff].speed)
    DisplayStuff()
}
initGame()
restartBtn.addEventListener('click',initGame)
wallModeBtn.addEventListener('click',()=>{
    wallMode++
    if(wallMode > max_WallMode-1)
        wallMode = 0
    initGame()
})
gameModeBtn.addEventListener('click',()=>{
    gameMode++
    if(gameMode > max_gameMode-1)
        gameMode = 0
    initGame()
})
snakeModeBtn.addEventListener('click',()=>{
    snakeMode++
    if(snakeMode > max_snakeMode-1)
        snakeMode = 0
    initGame()
})
diffModeBtn.addEventListener('click',()=>{
    diff++
    if(diff > max_diffMode-1)
        diff = 0
    initGame()
})
speedModeBtn.addEventListener('click',()=>{
    speedMode++
    if(speedMode > speedMode_set.length-1)
        speedMode = 0
    initGame()
})

colorModeBtn.addEventListener('click',()=>{
    colorMode++
    if(colorMode > max_colorMode-1)
        colorMode = 0
    //initGame()
    DisplayStuff()
})

function autoMove(){
    currDirection = inptDirection
    if(currDirection != 0){
        cellArray[currPlrIdx].classList.remove(snakeTag)
        cellArray[currPlrIdx].classList.add(bodyTag)
        cellArray[currPlrIdx].classList.add(colorBTag+'-'+currBtag)
        if(colorMode < max_colorMode-1) currBtag = colorMode+1
        else currBtag++
        tailArr.enqueue(currPlrIdx)
        if(currBtag > max_colorMode -1) currBtag = 1

        if(currDirection === 1){
            currPlrIdx -= diff_set[diff].mapSize
        }
        if(currDirection === 2){
            currPlrIdx += diff_set[diff].mapSize
        }
        if(currDirection === 3){
            currPlrIdx -= 1
        }
        if(currDirection === 4){
            currPlrIdx += 1    
        }

        
        if(currDirection === 1 && currPlrIdx < 0)
            currPlrIdx += cellArray.length
        if(currDirection === 2 && currPlrIdx > cellArray.length)
            currPlrIdx -= cellArray.length
        if(currDirection === 3 && currPlrIdx% diff_set[diff].mapSize ===  diff_set[diff].mapSize - 1 )
            currPlrIdx += diff_set[diff].mapSize
        if(currDirection === 4  && currPlrIdx% diff_set[diff].mapSize == 0 )
            currPlrIdx -= diff_set[diff].mapSize
        cellArray[currPlrIdx].classList.add(snakeTag)
       // console.log(tailArr.size())

       /// eat apple
        if(cellArray[currPlrIdx].classList.contains(appleTag)){         
            cellArray[currPlrIdx].classList.remove(appleTag)
            updScore()
            spawnApple()

            if((gameMode === 1|| gameMode === 4)&& score%10 == 0)
                spawnApple(99)
            
            let ran = Math.random()*100
            if((gameMode >= 2)&& (ran >= 38 && ran <= 48))
                spawnApple(99)
        }
        if(cellArray[currPlrIdx].classList.contains(G_appleTag)){         
            cellArray[currPlrIdx].classList.remove(G_appleTag)
            updScore(5)
        }
        if(cellArray[currPlrIdx].classList.contains(bombTag)){         
            cellArray[currPlrIdx].classList.remove(bombTag)
            updScore(-3)
            spawnApple(8038)
        }
        if(cellArray[currPlrIdx].classList.contains(meteorTag)){         
            cellArray[currPlrIdx].classList.remove(meteorTag)
            updScore(-7)
            spawnApple(99)
        }
        if(cellArray[currPlrIdx].classList.contains(wallTag) || cellArray[currPlrIdx].classList.contains(bodyTag)){
            YouLose()
        }
        if(snakeMode == 1) snakeLength = Math.floor((score)/10)+1
        else if(snakeMode == 2) snakeLength = 3
        else snakeLength = score + 1
        if(tailArr.size()> snakeLength){
            let clist = cellArray[tailArr.dequeue()].classList
            clist.remove(bodyTag)
            clist.forEach(clsi=>{
                if(clsi.slice(0,5) == 'color')
                    clist.remove(clsi)
            })

        }
        if(snakeLength >= max_snakeLength){
            YouWin()
        }
    }
}
function changeDirection(e){
    if((e.key == 'w' || e.key == 'ArrowUp') && currDirection != 2)
        inptDirection = 1
    if((e.key == 's' || e.key == 'ArrowDown')&& currDirection != 1)
        inptDirection = 2
    if((e.key == 'a' || e.key == 'ArrowLeft')&& currDirection != 4)
        inptDirection = 3
    if((e.key == 'd' || e.key == 'ArrowRight')&& currDirection != 3)
        inptDirection = 4
}
function spawnApple(code = 0){
    AplIdx = Math.floor(Math.random()*cellArray.length)
    let clist = cellArray[AplIdx].classList
    if(clist.contains(snakeTag) || 
    clist.contains(wallTag) ||  
    clist.contains(bodyTag) || 
    clist.contains(G_appleTag) ||  
    clist.contains(bombTag) ||  
    clist.contains(appleTag) ) {
        spawnApple()
    }

    if(code === 99){
        cellArray[AplIdx].classList.add(G_appleTag)
        setTimeout( ()=>{
            cellArray[AplIdx].classList.remove(G_appleTag)
        }, 10000)
    }
    else if(code === 8038)
        cellArray[AplIdx].classList.add(bombTag)
    else
        cellArray[AplIdx].classList.add(appleTag)
}
function spawnMeteor() {
    let ran =Math.floor(Math.random()*cellArray.length)
    let clist =cellArray[ran].classList
    if(clist.contains(snakeTag) || clist.contains(bodyTag)|| clist.contains(appleTag) || clist.contains(meteorTag)) spawnMeteor()
    /// remove class w expection
    clist.forEach(clsi=>{
        if(clsi == wallTag || clsi == G_appleTag )
            clist.remove(clsi)
    })
   // console.log(cellArray.length)
    clist.add(meteorTag)

    setTimeout( ()=>{
        cellArray[ran].classList.remove(meteorTag)
    }, default_meteorDespawn/diff_set[diff].speed)
}

function updScore(amt =1) {
    score+= amt
    play_collectSFX()
    if(diff == 0 &&  score >= hi_ez)
        hi_ez = score
    if(diff == 1 && score >= hi_med)
        hi_med = score
    if(diff == 2 && score >= hi_hard)
        hi_hard = score
    DisplayStuff()
    if(score <= -1)
        YouLose()
}

function DisplayStuff(){
    scoreDP.textContent = score + "| Hi: "
    let des_text =''

    if(diff == 0){
        diffModeBtn.textContent = 'Difficulty: Ez'
        scoreDP.textContent += hi_ez
    }
    else if(diff == 1){
        diffModeBtn.textContent = 'Difficulty: Normal'
        scoreDP.textContent += hi_med
    }
    else if(diff = 2){
        diffModeBtn.textContent = 'Difficulty: Hard'
        scoreDP.textContent += hi_hard
    }

    if( wallMode == 0)
        wallModeBtn.textContent = "Wall: Off"
    else if( wallMode == 1)
        wallModeBtn.textContent = "Wall: Ring"
    else if( wallMode == 2)
        wallModeBtn.textContent = "Wall: Random 5%"
    else if( wallMode == 3)
        wallModeBtn.textContent = "Wall: Random 10%"

    if(wallMode != 0) des_text = 'Wall = lose ('+ (wallMode) +'/'+ (max_WallMode-1) +').'

    if(snakeMode == 0){
        snakeModeBtn.textContent = "Snake: Normal growth"
        des_text += ' Normal growth'
    } else  if(snakeMode == 1){
        snakeModeBtn.textContent = "Snake: Slow growth"
        des_text += ' Slow growth'
    }else  if(snakeMode == 2){
        snakeModeBtn.textContent = "Snake: No growth"
        des_text += ' Forever small'
    }

    des_text +=' ('+ (snakeMode+1) +'/'+ max_snakeMode+').'

    if( gameMode == 0){
        gameModeBtn.textContent = "Game: Classic"
        des_text += ' Classic game.'
    }
    else if( gameMode == 1){
        gameModeBtn.textContent = "Game: Bonus"
        des_text +=' Each 10pts => special treat +5pts (despawn: 10s).'
    }
    else if( gameMode == 2){
        gameModeBtn.textContent =  "Game: Banquet 5%"
        des_text +=' All you can eat.'
    }
    else if( gameMode == 3){
        gameModeBtn.textContent = "Game: Banquet 10%"
        des_text +=' Want some more? here u are.'
    }
    else if( gameMode == 4){
        gameModeBtn.textContent = "Game: Meteor"
        des_text +=' Meteor hit = -7pts. Score < 0 = Lose'
    }
    else if( gameMode == 5){
        gameModeBtn.textContent = "Game: Bomb 3%"
        des_text +=' Bomb hit = -3pts. Score < 0 = Lose'
    }
    else if( gameMode == 6){
        gameModeBtn.textContent = "Game: Hell's paradise"
        des_text +=' Wonder how long can you survive...'
    }

    des_text +=' ('+ (gameMode+1) +'/'+ max_gameMode+').'

    if(speedMode == 0){
        speedModeBtn.textContent = "Speed: Sluggish"
    }else if(speedMode == 1){
        speedModeBtn.textContent = "Speed: Slow"
    } else if(speedMode == 2){
        speedModeBtn.textContent = "Speed: Normal"
    } else if(speedMode == 3){
        speedModeBtn.textContent = "Speed: Fast"
    } else if(speedMode == 4){
        speedModeBtn.textContent = "Speed: Too Fast"
    }

    
    colorModeBtn.textContent = "Color: Type "+ colorMode

    desDP.textContent = des_text 
}

function YouLose(){
    alert('You lose :(')
    initGame()
}
function YouWin(){
    alert('You win :)')
    initGame()
}