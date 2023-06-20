const CompChoiceDp  = document.getElementById("c-choice")
const UserChoiceDp  = document.getElementById("p-choice")
const resDp  = document.getElementById("res")

const LDp = document.getElementById('los')
const WDp = document.getElementById('win')
const DDp = document.getElementById('drw')
const TDp = document.getElementById('total')

let UserChoice
let CompChoice
let res

let active = false

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

let w = 0 ,l = 0 ,d = 0
const possibleChoices = document.querySelectorAll(".btn")

possibleChoices.forEach(possibleChoices => possibleChoices.addEventListener("click",(e) => {
    if(active == false){
        UserChoice = e.target.id
        UserChoiceDp.innerHTML = UserChoice
        genCompChoice()
        getResult()
    }
}))

const autoRoll = document.getElementById("Auto")

autoRoll.style.backgroundColor = '#858585'
autoRoll.addEventListener('click',function Roll(){
    if(active == false){
        active = true
        autoRoll.style.backgroundColor = '#4FFF33'
        const doSomething = async () => {
            while(active){
                await sleep(10)
                genUserChoice()
                genCompChoice()
                getResult()   
            }
        }
        doSomething()
    }
    else{
        active = false
        autoRoll.style.backgroundColor = '#858585'
    }
})

function genCompChoice(){
    const ranNum =Math.floor(Math.random() * 3)
    //console.log(ranNum)
    if(ranNum == 1) CompChoice = "Rock"
    if(ranNum == 2) CompChoice = "Paper"
    if(ranNum == 3) CompChoice = "Scissors"
    CompChoiceDp.innerHTML = CompChoice
}

function genUserChoice(){
    const ranNum =Math.floor(Math.random() * 3)
    //console.log(ranNum)
    if(ranNum == 1) UserChoice = "Rock"
    if(ranNum == 2) UserChoice = "Paper"
    if(ranNum == 3) UserChoice = "Scissors"
    UserChoiceDp.innerHTML = UserChoice
}

function getResult(){
    let los = "You lose! :("
    let win = "You win! :)"
    if(CompChoice == UserChoice)
        res = "Draw!"
    if(CompChoice == "Rock" && UserChoice == "Scissors")
        res = los
    if(CompChoice == "Rock" && UserChoice == "Paper")
        res = win
    if(CompChoice == "Paper" && UserChoice == "Scissors")
        res = win
    if(CompChoice == "Paper" && UserChoice == "Rock")
        res = los
    if(CompChoice == "Scissors" && UserChoice == "Rock")
        res = win
    if(CompChoice == "Scissors" && UserChoice == "Paper")
        res = los
    resDp.innerHTML = res


    if(res == los) l++
    else if(res == win) w++
    else d++
    LDp.innerHTML = l
    WDp.innerHTML = w
    DDp.innerHTML = d
    TDp.innerHTML = l + w + d

}
