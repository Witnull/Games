const cardArray = [
    {
        name: "Banh Xeo",
        img: "images/BanhXeo.jpg",
    },
    {
        name: "Banh Khot",
        img: "images/BanhKhot.jpg",
    },
    {
        name: "Pho",
        img: "images/Pho.jpg",
    },
    {
        name: "Banh Mi",
        img: "images/BanhMi.jpg",
    },
    {
        name: "Hu Tieu",
        img: "images/HuTieu.jpg",
    },
    {
        name: "Goi Cuon",
        img: "images/GoiCuon.jpg",
    },
    {
        name: "Banh Trang Tron",
        img: "images/BanhTrangTron.jpg",
    },
    {
        name: "Cafe Trung",
        img: "images/CafeTrung.jpg",
    },
    {
        name: "Banh Xeo",
        img: "images/BanhXeo.jpg",
    },
    {
        name: "Banh Khot",
        img: "images/BanhKhot.jpg",
    },
    {
        name: "Pho",
        img: "images/Pho.jpg",
    },
    {
        name: "Banh Mi",
        img: "images/BanhMi.jpg",
    },
    {
        name: "Hu Tieu",
        img: "images/HuTieu.jpg",
    },
    {
        name: "Goi Cuon",
        img: "images/GoiCuon.jpg",
    },
    {
        name: "Banh Trang Tron",
        img: "images/BanhTrangTron.jpg",
    },
    {
        name: "Cafe Trung",
        img: "images/CafeTrung.jpg",
    },
]

cardArray.sort(() => 0.5 - Math.random())// shuffle
const gridDisplay = document.querySelector("#grid")
const scoreDisplay = document.querySelector('#res')
const winDisplay = document.querySelector('#win')
const annDisplay = document.querySelector('#ann')

let score = 0;
scoreDisplay.textContent = score
let cardChosen = []
let cardChosenId =[]
const cardsWon = []

function initBoard(){
    cleanGrid()
    for( let i = 0 ; i < cardArray.length; i++){
        const card = document.createElement('img')
        card.setAttribute('src','images/BC.jpg')
        card.setAttribute('dat-id',i)
        card.className = 'food-card'
        card.addEventListener('click',flipCard)
        gridDisplay.appendChild(card)
    }
}

function cleanGrid(){
    const gridItems = gridDisplay.querySelectorAll('.food-card');

// Iterate over the child elements and remove each one
    gridItems.forEach(function(item) {
        item.remove();
    });
}


function checkMatch(){
    const cards = document.querySelectorAll('img')
    const card1Id   = cardChosenId[0]
    const card2Id   = cardChosenId[1]
    if(cardChosen[0] == cardChosen[1]){
        score++
        scoreDisplay.textContent = score
        cards[card1Id].setAttribute('style','opacity:0')
        cards[card2Id].setAttribute('style','opacity:0')
        cards[card1Id].removeEventListener('click',flipCard)
        cards[card2Id].removeEventListener('click',flipCard)
        cardsWon.push(cardChosen)
        
    }else{
        cards[card1Id].setAttribute('src','images/BC.jpg')
        cards[card2Id].setAttribute('src','images/BC.jpg')
       
    }
    cardChosen = []
    cardChosenId = []
    if(cardsWon.length == cardArray.length/2){
        winDisplay.style.color = "#40A74B"
        winDisplay.textContent = "Congrats! You have found them all."
        setTimeout(() => {
            winDisplay.textContent = ""
        }, 2500); 
        initBoard()
    }
}

function flipCard(){
    const cardId = this.getAttribute('dat-id')
    if(cardChosenId[0] == cardId) return;
    cardChosen.push(cardArray[cardId].name)
    cardChosenId.push(cardId)
    this.setAttribute('src',cardArray[cardId].img)
    if(cardChosen.length === 2){
        setTimeout(checkMatch,300)
    }
}



initBoard()