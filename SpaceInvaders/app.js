const grid = document.querySelector('.grid')
const resDp = document.querySelector('#res')

let plrIdx = 200
const width = 15
let direction = 1
let invadersId
let goingRight = true
let clock = null
let score = 0
let alienRemoved =[]

for(let i = 0 ; i < 225; i++){
    const sq = document.createElement('div')
    grid.appendChild(sq)
}

const squares =Array.from(document.querySelectorAll('.grid div'))
const alienInvaders = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for(let i = 0 ; i < alienInvaders.length; i++){
        if(!alienRemoved.includes(i))
            squares[alienInvaders[i]].classList.add('invader')
    }
}
function remove(){
    for(let i = 0 ; i < alienInvaders.length; i++){
        squares[alienInvaders[i]].classList.remove('invader')
    }
}
draw()

squares[plrIdx].classList.add('plr')

function movePlr(e){
    squares[plrIdx].classList.remove('plr')
    if(e.key == 'a' || e.key =='ArrowLeft'){
        if(plrIdx % width != 0 ) plrIdx -=1
    }
    if(e.key == 'd' || e.key =='ArrowRight'){
        if(plrIdx % width < width -1 ) plrIdx +=1
    }
    squares[plrIdx].classList.add('plr')
}
document.addEventListener('keydown',movePlr)

function moveInvaders(){
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length-1] % width === width - 1
    remove()

    if(rightEdge && goingRight){
        for(let i = 0 ; i < alienInvaders.length; i++){
            alienInvaders[i] += width + 1
            direction = -1
            goingRight = false
        }
    }

    if(leftEdge && !goingRight){
        for(let i = 0 ; i < alienInvaders.length; i++){
            alienInvaders[i] += width-1
            direction = 1
            goingRight = true
        }
    }

    for(let i = 0 ; i < alienInvaders.length; i++){
        alienInvaders[i]+= direction
    }
    draw()

    if(squares[plrIdx].classList.contains('invader','plr')){
        console.log('Ya lose!')
        clearInterval(clock)
        resDp.innerHTML ='GAME OVER!'
    }else{
        resDp.innerHTML ='Score: ' + score
    }

    for (let i = 0; i < alienInvaders.length; i++) {
        if(alienInvaders[i] > (squares.length)) {
          resDp.innerHTML = 'GAME OVER'
          clearInterval(clock)
        }
    }

    if(alienRemoved.length == alienInvaders.length){
        resDp.innerHTML = 'YOU WIN! '
        clearInterval(clock)
    }



}
clock = setInterval(moveInvaders,500)

function shoot(e){
    let laserid
    let currLaserIdx = plrIdx

    function moveLaser(){
        squares[currLaserIdx].classList.remove('laser')
        currLaserIdx -= width
        squares[currLaserIdx].classList.add('laser')
        
        if(squares[currLaserIdx].classList.contains('invader')){
            squares[currLaserIdx].classList.remove('laser')
            squares[currLaserIdx].classList.remove('invader')
            squares[currLaserIdx].classList.add('boom')
            
            setTimeout(() => {
                squares[currLaserIdx].classList.remove('boom')
            }, 300);
            clearInterval(laserid)

            const alienRemoval = alienInvaders.indexOf(currLaserIdx)
            alienRemoved.push(alienRemoval)
            score++
        }
    }
    switch(e.key){
        case ' ':
            laserid = setInterval(moveLaser,100)
    }

}
document.addEventListener('keydown',shoot)