const Thedonut = document.querySelector('.ClickMe')
const donutDp = document.querySelector('#donutDp')
const donut_sDp = document.querySelector('#donut_s')
const UpgradeLs = document.querySelector('.upgradeUI .list')
const ManageLs = document.querySelector('.manageUI .list')


const iconHTML = '<img class="icon" src="./Images/donut.png">'
const iconHTML_Small = '<img class="icon-small" src="./Images/donut.png">'

let donut = 0, donut_s = 0, donut_per_click = 1;
let donut_before = donut, donut_after, donut_sec = 0;
let Manage=[ // powers
    {
        pname: 'Enchance click',
        cost: 100,
        des: 'Reduce stress for ur finger | x2 donut/click ',
        buff: [DPC = 2],
        inc_cost: .4, /// 10%
        amount: 0,
        icon:'./Images/happyFinger.png',
    },
    {
        pname: 'Enchance click II',
        cost: 10000,
        des: '2x Reduce stress for ur finger | x3 donut/click ',
        buff: [DPC = 3],
        inc_cost: .4,
        amount: 0,
        icon:'./Images/X2HF.png',
    },
    {
        pname: 'Auto clicker',
        cost: 10000,
        des: 'This thing click for you! | .1 click/sec ',
        buff: [CPS = .1],
        inc_cost: .4,
        amount: 0,
        icon:'./Images/cursor.png',
    },
    {
        pname: "Enchance: Finger",
        cost: 100,
        des: 'Increase efficient',
        buff: [MUL = 2],
        inc_cost: .3,
        amount: 0,
        icon:'./Images/X2Power/12.png',
    },
    {
        pname: "Enchance: Double fingers",
        cost: 300,
        des: 'Increase efficient',
        buff: [MUL = 2],
        inc_cost: .3,
        amount: 0,
        icon:'./Images/X2Power/1.png',
    },
    {
        pname: "Enchance: Burning finger",
        cost: 3000,
        des: 'Raging time!',
        buff: [MUL = 2],
        inc_cost: .3,
        amount: 0,
        icon:'./Images/X2Power/2.png',
    },
    {
        pname: "Enchance: Rolling pin",
        cost: 11000,
        des: 'Bonk!',
        buff: [MUL = 2],
        inc_cost: .3,
        amount: 0,
        icon:'./Images/X2Power/3.png',
    },
    {
        pname: "Enchance: Chef",
        cost: 35000,
        des: 'Mwah, bon appétit!',
        buff: [MUL = 2],
        inc_cost: .3,
        amount: 0,
        icon:'./Images/X2Power/4.png',
    },
    {
        pname: "Enchance: Coffee",
        cost: 65000,
        des: 'X2 Caffeine',
        buff: [MUL = 2],
        inc_cost: .3,
        amount: 0,
        icon:'./Images/X2Power/5.png',
    },
    {
        pname: "Enchance: Officer",
        cost: 115000,
        des: '...',
        buff: [MUL = 2],
        inc_cost: .3,
        amount: 0,
        icon:'./Images/X2Power/6.png',
    },
    {
        pname: "Enchance: Extra spinkles",
        cost: 265000,
        des: 'X2 Sprinkles',
        buff: [MUL = 2],
        inc_cost: .3,
        amount: 0,
        icon:'./Images/X2Power/7.png',
    },
    {
        pname: "Enchance: Chocolate",
        cost:655000,
        des: 'Sugar rush!',
        buff: [MUL = 2],
        inc_cost: .4,
        amount: 0,
        icon:'./Images/X2Power/8.png',
    },
    {
        pname: "Enchance: The ice donut",
        cost:1655000,
        des: 'As hard as rock',
        buff: [MUL = 2],
        inc_cost: .4,
        amount: 0,
        icon:'./Images/X2Power/9.png',
    },
    {
        pname: "Enchance: The void donut",
        cost:   2055000,
        des: 'More deeep, more daaarrrkk',
        buff: [MUL = 2],
        inc_cost: .4,
        amount: 0,
        icon:'./Images/X2Power/10.png',
    },
    {
        pname: "Enchance: The infinity donut",
        cost:   20000000,
        des: 'More surgar, more icing, more sprinkles',
        buff: [MUL = 2],
        inc_cost: .4,
        amount: 0,
        icon:'./Images/X2Power/11.png',
    },

]
let Upgrade =[
    {
        pname: 'Finger',
        cost: 15,
        donut_s: .1, // .1 donut /s
        des: 'Nah! | 0.1 donut/s',
        inc_cost: .1, /// 10%
        amount: 0,
        icon:'./Images/Finger.png',
    },
    {
        pname: 'Double fingers',
        cost: 100,
        donut_s: .2, // .1 donut /s
        des: 'Faster, fasterrrr! | 0.2 donut/s',
        inc_cost: .1, /// 10%
        amount: 0,
        icon:'./Images/1.png',
    },
    {
        pname: 'Burning finger',
        cost: 1000,
        donut_s: 1, // .1 donut /s
        des: 'Ahhhhhhh argggggg! | 1 donut/s',
        inc_cost: .1, /// 10%
        amount: 0,
        icon:'./Images/2.png',
    }, 
    {
        pname: 'Rolling pin',
        cost: 5000,
        donut_s: 2,
        des: 'Rooolll! | 2 donut/s',
        inc_cost: .1, 
        amount: 0,
        icon:'./Images/3.png',
    }, 
    {
        pname: 'Chef',
        cost: 15000,
        donut_s: 3,
        des: 'Mwah!  | 5 donut/s',
        inc_cost: .15, 
        amount: 0,
        icon:'./Images/4.png',
    }, 
    {
        pname: 'Coffee',
        cost: 30000,
        donut_s: 4,
        des: 'Perfect combination!  | 8 donut/s',
        inc_cost: .15, 
        amount: 0,
        icon:'./Images/5.png',
    }, 
    {
        pname: 'Officer',
        cost: 55000,
        donut_s: 10,
        des: 'U guessed it!  | 10 donut/s',
        inc_cost: .15, 
        amount: 0,
        icon:'./Images/6.png',
    }, 
    {
        pname: 'Extra sprinkles',
        cost: 115000,
        donut_s: 20,
        des: 'A heart attack amount  | 20 donut/s',
        inc_cost: .15, 
        amount: 0,
        icon:'./Images/7.png',
    }, 
    {
        pname: 'Chocolate',
        cost: 305000,
        donut_s: 50,
        des: 'Unhealthy vs healthy  | 50 donut/s',
        inc_cost: .15, 
        amount: 0,
        icon:'./Images/8.png',
    }, 
    {
        pname: 'The ice donut',
        cost: 750000,
        donut_s: 80,
        des: "It's art!  | 80 donut/s",
        inc_cost: .2, 
        amount: 0,
        icon:'./Images/9.png',
    }, 
    {
        pname: 'The void donut',
        cost: 1005000,
        donut_s: 333,
        des: 'Into the void  | 333 donut/s',
        inc_cost: .2, 
        amount: 0,
        icon:'./Images/10.png',
    }, 
    {
        pname: 'The infinity donut',
        cost: 11000000,
        donut_s: 999,
        des: 'One bite make 50% of universe creatures fat  | 999 donut/s',
        inc_cost: .2, 
        amount: 0,
        icon:'./Images/11.png',
    }, 
]

function updDP_100ms(){
    donutDp.innerHTML = Math.floor(donut) +iconHTML
    donut_sDp.innerHTML ='+ '+donut_sec.toPrecision(2) +'/s'
}
setInterval(updDP_100ms,100)

function updDP_1s(){
    donut += donut_s
}
setInterval(updDP_1s,1000)

setInterval(()=>{
    donut_after = donut;
    donut_sec = (donut_after - donut_before)/3
    donut_before = donut_after;
    if(donut_sec < 0) donut_sec = 0

},3000)

Thedonut.addEventListener('click', (e) => {
  const mouseX = e.pageX;
  const mouseY = e.pageY;

  donut += donut_per_click;

  Thedonut.classList.add('bounce');

  setTimeout(() => {
    Thedonut.classList.remove('bounce');
  }, 100);

  const popUp = document.createElement('div');
  popUp.innerHTML = '+' + donut_per_click;
  popUp.style.pointerEvents = "none"
  popUp.classList.add('pop-up', 'donutNumberColor', 'not-selectable');
  popUp.innerHTML = '+'+ donut_per_click+' '+iconHTML;

  popUp.style.top = `${mouseY}px`;
  popUp.style.left = `${mouseX}px`;

  document.body.appendChild(popUp);

  setTimeout(() => {
    popUp.classList.add('fade-out');
  }, 800);

  setTimeout(() => {
    popUp.remove();
  }, 1000);
});


function upddonut_s(){
    donut_s = 0
    Upgrade.forEach(info => { donut_s += info.amount * info.donut_s})
}

function updCell(cell,info,ls){

    const nameDp = cell.querySelector('.name')
    const desDp = cell.querySelector('.des')
    const iconDp = cell.querySelector('.icon')
    const amountDp = cell.querySelector('.amt')
    
    nameDp.innerHTML = info.pname + " | <span class='donutNumberColor' style='font-size: large'>"+ info.cost +' '+ iconHTML_Small +"</span>";
    desDp.textContent = info.des;
    iconDp.src = info.icon;
    amountDp.textContent = info.amount;

    cell.addEventListener('click',()=> BuyUpgrade(cell,info , ls))
}

function addItem(info,ls){
        // Create the list item element
    const listItem = document.createElement('li');
    listItem.classList.add('cell');

    // Create the frame div
    const frameDiv = document.createElement('div');
    frameDiv.classList.add('frame');
    listItem.appendChild(frameDiv);

    // Create the image element
    const image = document.createElement('img');
    image.classList.add('icon')
    frameDiv.appendChild(image);

    // Create the content div
    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    listItem.appendChild(contentDiv);

    // Create the name div
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name');
    contentDiv.appendChild(nameDiv);

    // Create the description div
    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('des');
    contentDiv.appendChild(descriptionDiv);

    // Create the number div
    const numberDiv = document.createElement('div');
    numberDiv.classList.add('amt');
    listItem.appendChild(numberDiv);

    // Append the list item to the desired parent element
    updCell(listItem,info,ls)
    ls.appendChild(listItem);
    
}

function init(){
    Upgrade.forEach(info => {
        addItem(info, UpgradeLs)
    })
    Manage.forEach(info => {
        addItem(info, ManageLs)
    })
}

function BuyUpgrade(cell, info, ls){
    if(donut >= info.cost){
        donut -= info.cost
        info.amount++
        info.cost += Math.floor(info.cost* info.inc_cost)
        upddonut_s()
        updCell(cell, info, ls)
       // saveDataToCookie()
    }
}


  
init()
    //    loadDataFromCookie()
   //     upddonut_s()
   //     setInterval(()=>{saveDataToCookie()},50000)//save data after 50s