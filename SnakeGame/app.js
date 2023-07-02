const gridd = document.querySelector('.grid')
const scoreDP =document.querySelector('#scoreDp')
const diffDP =document.querySelector('#diffDp')
const diff_change =document.querySelector('.change-diff')
const restartBtn = document.querySelector('.restart')
const wallActiveBtn = document.querySelector('.isWall')
const gameModeBtn = document.querySelector('.gameMode')
const desDP = document.querySelector('#des')

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

const default_diff = 1
const default_dir = 0
const snakeTag ='snake'
const appleTag = 'fruit'
const bodyTag = 'tail'
const wallTag = 'wall'
const G_appleTag = 'Gapple'
const bombTag = 'bomb'
const meteorTag = 'meteor'


const default_speed = 700 // .7s per block
const default_meteorSpawn = 1000 // 5s
const default_meteorDespawn = 7000 
const default_wallMode = 0 // 0:off 1:ring 2:random
const max_WallMode = 4
const default_gameMode = 0 // 0:Classic 1:Bonus fruit + 1pts   2:Banquet 5%  3:Banquet 10% 4:meteor 5:Bomb 3%
const max_GameMode = 7

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
            }
        }
        else if(wallMode === 2){
            if( ran >= 40 && ran <= 45){
                cell.classList.add(wallTag)
            }
        }
        else if(wallMode === 3){
            if( ran >= 40 && ran <= 51){
                cell.classList.add(wallTag)
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
    timerId_autoMove = setInterval(autoMove,default_speed/diff_set[diff].speed)
    DisplayStuff()
}
initGame()
restartBtn.addEventListener('click',initGame)
wallActiveBtn.addEventListener('click',()=>{
    wallMode++
    if(wallMode > max_WallMode-1)
        wallMode = 0
    initGame()
})
gameModeBtn.addEventListener('click',()=>{
    gameMode++
    if(gameMode > max_GameMode-1)
        gameMode = 0
    initGame()
})

diff_change.querySelectorAll('.btn').forEach( item =>{
   item.addEventListener('click',() => {
        if(item.classList.contains('ez-btn') && diff != 0)
            diff = 0
        else if(item.classList.contains('med-btn') && diff != 1)
            diff = 1
        else if(item.classList.contains('hard-btn') && diff != 2)
            diff = 2

        initGame()
   })
})

function autoMove(){
    currDirection = inptDirection
    if(currDirection != 0){
        cellArray[currPlrIdx].classList.remove(snakeTag)
        cellArray[currPlrIdx].classList.add(bodyTag)
        tailArr.enqueue(currPlrIdx)

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

        if(tailArr.size()> score + 1){
            cellArray[tailArr.dequeue()].classList.remove(bodyTag)
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

    if(code === 99)
        cellArray[AplIdx].classList.add(G_appleTag)
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
        diffDP.innerHTML = '<span id="green">Ez</span>'
        scoreDP.textContent += hi_ez
    }
    else if(diff == 1){
        diffDP.innerHTML = '<span id="blue">Medium</span>'
        scoreDP.textContent += hi_med
    }
    else if(diff = 2){
        diffDP.innerHTML = '<span id="red">Hard</span>'
        scoreDP.textContent += hi_hard
    }

    if( wallMode == 0)
        wallActiveBtn.textContent = "Wall: Off"
    else if( wallMode == 1)
        wallActiveBtn.textContent = "Wall: Ring"
    else if( wallMode == 2)
        wallActiveBtn.textContent = "Wall: Random 5%"
    else if( wallMode == 3)
        wallActiveBtn.textContent = "Wall: Random 10%"

    if(wallMode != 0) des_text = 'Wall = lose. '

    if( gameMode == 0){
        gameModeBtn.textContent = "Classic"
        des_text += 'Classic game.'
    }
    else if( gameMode == 1){
        gameModeBtn.textContent = "Bonus"
        des_text +='Each 10pts => special treat +5pts.'
    }
    else if( gameMode == 2){
        gameModeBtn.textContent =  "Banquet 5%"
        des_text +='All you can eat.'
    }
    else if( gameMode == 3){
        gameModeBtn.textContent = "Banquet 10%"
        des_text +='Want some more? here u are.'
    }
    else if( gameMode == 4){
        gameModeBtn.textContent = "Meteor"
        des_text +='Meteor hit = -7pts. Score < 0 = Lose'
    }
    else if( gameMode == 5){
        gameModeBtn.textContent = "Bomb 3%"
        des_text +='Bomb hit = -3pts. Score < 0 = Lose'
    }
    else if( gameMode == 6){
        gameModeBtn.textContent = "Hell's paradise"
        des_text +='Wonder how long can you survive...'
    }



    desDP.textContent = des_text 


}

function YouLose(){
    alert('You lose :(')
    initGame()
}