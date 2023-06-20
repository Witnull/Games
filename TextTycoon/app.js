const cashDp = document.querySelector('#cashDp')
const goldDp = document.querySelector('#goldDp')
const icbDp = document.querySelector('#icbDp')
const timeDp = document.querySelector('#timeDp')
const ascDp = document.querySelector('#ascbonus')
const ascProgbar = document.querySelector('#ascprg')


const facLs = document.querySelector('#factory .list')
const prodLs = document.querySelector('#product .list')
const contLs = document.querySelector('#contract .list')


let clockid = null

let cash =0, gold = 0, cash_s =0 ,gold_s =0
let totalAscLv =0;
const default_delay = 1000
let currDelay = default_delay, changed_delay
let default_income_bonus = 0

let Factory =[
    {
        pname: 'Family garage',
        cost: 0,
        cash_s: 10,
        level: 0,
        max_level: 10,
        cash_s_level: 6,
        inc_levelup_cost: 10, // 10% per lvl
        des: 'small and kinda dirty',
        owned: false, ascend: 0,
    },
    {
        pname: 'Rented warehouse',
        cost: 1500,
        cash_s: 70,
        level: 0,
        max_level: 100,
        cash_s_level: 40,
        inc_levelup_cost: 10,
        des: 'bigger and better',
        owned: false, ascend: 0,
    },
    {
        pname: 'S factory',
        cost: 10000,
        cash_s: 150,
        level: 0,
        max_level: 100,
        cash_s_level: 120,
        inc_levelup_cost: 10,
        des: 'i am a entrepeneur',
        owned: false, ascend: 0,
    },
    {
        pname: 'M factory',
        cost: 55000,
        cash_s: 500,
        level: 0,
        max_level: 100,
        cash_s_level: 300,
        inc_levelup_cost: 10,
        des: 'now it time to expand',
        owned: false, ascend: 0,
    },
    {
        pname: 'L factory',
        cost: 150000,
        cash_s: 1500,
        level: 0,
        max_level: 500,
        cash_s_level: 700,
        inc_levelup_cost: 10,
        des: 'the golden empire has come',
        owned: false, ascend: 0,
    },
    {
        pname: 'XL factory',
        cost: 1500000,
        cash_s: 15000,
        level: 0,
        max_level: 500,
        cash_s_level: 7100,
        inc_levelup_cost: 10,
        des: 'BIG',
        owned: false, ascend: 0,
    },
    {
        pname: 'XXL factory',
        cost: 6500000,
        cash_s: 45000,
        level: 0,
        max_level: 500,
        cash_s_level: 27100,
        inc_levelup_cost: 15,
        des: 'Very BIG',
        owned: false, ascend: 0,
    },
    {
        pname: 'XXXL factory',
        cost: 16500000,
        cash_s: 105000,
        level: 0,
        max_level: 1500,
        cash_s_level: 67100,
        inc_levelup_cost: 15,
        des: 'my shirt size',
        owned: false, ascend: 0,
    },
    {
        pname: 'Global-size factory',
        cost: 100500000,
        cash_s: 1500000,
        level: 0,
        max_level: 5000,
        cash_s_level: 710000,
        inc_levelup_cost: 1,
        des: 'eez pezy',
        owned: false, ascend: 0,
    },
    
]

let Product=[
    {
        pname:  'Hard candy',
        cost: 0,
        cash_s: 1,
        level: 0,
        max_level: 10,
        cash_s_level: 1,
        inc_levelup_cost: 10,
        des: 'hard but delicious',
        owned: false, ascend: 0,
    },
    {
        pname:  'Soft candy',
        cost: 100,
        cash_s: 8,
        max_level: 15,
        level: 0,
        cash_s_level: 4,
        inc_levelup_cost: 10,
        des: 'soft and sweet',
        owned: false, ascend: 0,
    },
    {
        pname:  'Gum',
        cost: 1000,
        cash_s: 100,
        level: 0,
        max_level: 25,
        cash_s_level: 13,
        inc_levelup_cost: 10,
        des: 'chew chew',
        owned: false, ascend: 0,
    },
    {
        pname: "Chocolate Bar",
        cost: 9000,
        cash_s: 150,
        level: 0,
        max_level: 25,
        cash_s_level: 18,
        inc_levelup_cost: 10,
        des: "Rich and creamy chocolate goodness",
        owned: false, ascend: 0,
    },
    {
        pname: "Ice Cream Cone",
        cost: 18000,
        cash_s: 280,
        level: 0,
        max_level: 25,
        cash_s_level: 100,
        inc_levelup_cost: 10,
        des: "Cool and refreshing frozen delight",
        owned: false, ascend: 0,
    },
    {
        pname: "Cupcake",
        cost: 31200,
        cash_s: 1100,
        level: 0,
        max_level: 25,
        cash_s_level: 700,
        inc_levelup_cost: 10,
        des: "Small, delicious cake with frosting on top",
        owned: false, ascend: 0,
    },
    {
        pname: "Caramel Apple",
        cost: 51500,
        cash_s: 3120,
        level: 0,
        max_level: 20,
        cash_s_level: 1500,
        inc_levelup_cost: 10,
        des: "Juicy apple covered in sweet caramel",
        owned: false, ascend: 0,
    },
    {
        pname: "Jelly Beans",
        cost: 86000,
        cash_s: 6660,
        level: 0,
        max_level: 15,
        cash_s_level: 3008,
        inc_levelup_cost: 15,
        des: "Colorful and chewy bite-sized candies",
        owned: false, ascend: 0,
    },
    {
        pname: "Cotton Candy",
        cost: 111000,
        cash_s: 8880,
        level: 0,
        max_level: 15,
        cash_s_level: 4410,
        inc_levelup_cost: 15,
        des: "Fluffy and sugary spun delight",
        owned: false, ascend: 0,
    },
    {
        pname: "Popsicle",
        cost: 200700,
        cash_s: 11070,
        level: 0,
        max_level: 15,
        cash_s_level: 6509,
        inc_levelup_cost: 15,
        des: "Frozen treat on a stick in various flavors",
        owned: false, ascend: 0,
    },
    {
        pname: "Fruit Gummies",
        cost: 900000,
        cash_s: 30090,
        level: 0,
        max_level: 15,
        cash_s_level: 15001,
        inc_levelup_cost: 20,
        des: "Chewy candies shaped like fruits",
        owned: false, ascend: 0,
    },
    {
        pname: "Honeycomb",
        cost: 8000000,
        cash_s: 160000,
        level: 0,
        max_level: 10,
        cash_s_level: 99999,
        inc_levelup_cost: 25,
        des: "Sweet and crunchy hexagonal honey treat",
        owned: false, ascend: 0,
    },
      
]


let Contract =[
    {
        pname:  'Employee: Dave',
        cost: 1500,
        cash_s: 50,
        level: 0,
        max_level: 10,
        cash_s_level: 25,
        inc_levelup_cost: 10,
        income_bonus: 10,
        gold_s: 0,
        time_decrease: 0,
        des: 'hard working guy',
        owned: false, ascend: 0,
    },
    {
        pname:  'Employee: Mike',
        cost: 9500,
        cash_s: 150,
        level: 0,
        max_level: 15,
        cash_s_level: 30,
        inc_levelup_cost: 10,
        income_bonus: 7,
        gold_s: 1,
        time_decrease: 0,
        des: 'normal guy',
        owned: false, ascend: 0,
    },
    {
        pname:  'Employee: Hiiro',
        cost: 18500,
        cash_s: 500,
        level: 0,
        max_level: 30,
        cash_s_level: 250,
        inc_levelup_cost: 15,
        income_bonus: 15,
        gold_s: 1,
        time_decrease: .05,
        des: 'very hard working guy',
        owned: false, ascend: 0,
    },
    {
        pname:  'Manager: Dave',
        cost: 50500,
        cash_s: 1670,
        level: 0,
        max_level: 50,
        cash_s_level: 555,
        inc_levelup_cost: 20,
        income_bonus: 0,
        gold_s: 2,
        time_decrease: .05,
        des: 'manager guy',
        owned: false, ascend: 0,
    },
    {
    pname: 'Employee: Sakura',
    cost: 70000,
    cash_s: 5550,
    level: 0,
    max_level: 30,
    cash_s_level: 2750,
    inc_levelup_cost: 16,
    income_bonus: 10,
    gold_s: 1,
    time_decrease: 0.1,
    des: 'efficient and detail-oriented',
    owned: false, ascend: 0,
    },
    {
    pname: 'Manager: Ryu',
    cost: 122000,
    cash_s: 6500,
    level: 0,
    max_level: 30,
    cash_s_level: 3020,
    inc_levelup_cost: 17,
    income_bonus: 19,
    gold_s: 2,
    time_decrease: 0.1,
    des: 'highly skilled and adaptable',
    owned: false, ascend: 0,
    },
    {
    pname: 'Manager: Luna',
    cost: 240000,
    cash_s: 8650,
    level: 0,
    max_level: 50,
    cash_s_level: 4325,
    inc_levelup_cost: 18,
    income_bonus: 21,
    gold_s: 2,
    time_decrease: 0,
    des: 'creative and innovative thinker',
    owned: false, ascend: 0,
    },
    {
    pname: 'Employee: Theresa',
    cost: 626000,
    cash_s: 11700,
    level: 0,
    max_level: 30,
    cash_s_level: 6350,
    inc_levelup_cost: 19,
    income_bonus: 23,
    gold_s: 1,
    time_decrease: 0.1,
    des: 'excellent problem solver',
    owned: false, ascend: 0,
    },
    {
    pname: 'Director: Josh',
    cost: 1128000,
    cash_s: 20750,
    level: 0,
    max_level: 50,
    cash_s_level: 375,
    inc_levelup_cost: 20,
    income_bonus: 25,
    gold_s: 1,
    time_decrease: 0.1,
    des: 'great team player',
    owned: false, ascend: 0,
    },
    {
    pname: 'Director: Takeshi',
    cost: 3000000,
    cash_s: 30800,
    level: 0,
    max_level: 80,
    cash_s_level: 15400,
    inc_levelup_cost: 21,
    income_bonus: 27,
    gold_s: 1,
    time_decrease: 0.1,
    des: 'strong leadership skills',
    owned: false, ascend: 0,
    },
    {
    pname: 'CEO: Thanh',
    cost: 10032000,
    cash_s: 50850,
    level: 0,
    max_level: 80,
    cash_s_level: 25425,
    inc_levelup_cost: 22,
    income_bonus: 30,
    gold_s: 1,
    time_decrease: 0.1, /// total .7
    des: 'excellent communication skills',
    owned: false, ascend: 0,
    },
]

const totalAscendBonus = {
    10: 100,
    20: 100,
    30: 100,
    40: 150,
    50: 150,
    60: 150,
    70: 250,
    80: 250,
    90: 250,
    100: 350,
    200: 999,
    300: 999,
    400: 999,
    500: 1888,
};
function updAscBonus() {
    let highestBonusMark = 0;
    let nextMilestone = 0;
  
    for (const level in totalAscendBonus) {
      const milestone = parseInt(level);
  
      if (totalAscLv >= milestone) {
        highestBonusMark = totalAscendBonus[level];
      } else {
        nextMilestone = milestone;
        break;
      }
    }
    
    default_income_bonus += highestBonusMark
    ascDp.innerHTML =  "<span id='ascendlv'> +" + totalAscendBonus[nextMilestone] + "% [" + totalAscLv + '/' + nextMilestone + "] </span>"
    ascProgbar.value = totalAscLv
    ascProgbar.max = nextMilestone
  }

function updCash_s(){
    cash_s = 0
    totalAscLv = 0
    default_income_bonus = 0
    changed_delay = default_delay
    gold_s =0




    Factory.forEach( info =>{if(info.owned){
        cash_s += info.cash_s 
        totalAscLv += info.ascend
    }})
    Product.forEach( info =>{if(info.owned){
        cash_s += info.cash_s 
        totalAscLv += info.ascend}})
    Contract.forEach( info =>{if(info.owned){
        cash_s += info.cash_s 
        totalAscLv += info.ascend
        default_income_bonus += info.income_bonus
        changed_delay -= info.time_decrease*1000
        gold_s += info.gold_s
    }})
    updAscBonus()

    if(currDelay !== changed_delay ){ 
        currDelay = changed_delay
        clearInterval(clockid)
        clockid = setInterval(updDp,currDelay)
    }
}

function updDp(){
    gold += gold_s
    cash += cash_s + Math.floor(cash_s*(default_income_bonus/100))
    cashDp.textContent = cash + '$ [' + cash_s+ '$/s ]'
    goldDp.textContent = gold + ' [' + gold_s+ '/s ]'
    icbDp.textContent = default_income_bonus +'%'
    timeDp.textContent = currDelay/1000
}
clockid = setInterval(updDp,currDelay)

function updCell(cell,info,ls){
    const des = cell.querySelector('.des')
    const btn = cell.querySelector('.btn')

    let destext = "<span id= 'pname'> "+ info.pname+ ": </span> " + info.des +" [<span id ='stats'> +"+info.cash_s +"$/s </span>]."
    destext += " <span id='level'>Lv." + info.level +"/ " + info.max_level + "</span>."
    if(info.ascend > 0) destext += " <span id='ascendlv'>Asc." + info.ascend+ "</span>."
    
    if(info.owned){
        if(info.level < info.max_level){
            destext += " Upgrade cost: <span id ='cost'>"+ info.cost+"$</span>."
            btn.classList.remove('asc-btn')
            btn.classList.remove('buy-btn')
            btn.classList.add('normal-btn')
            btn.innerHTML = "<span id='btn-text'>Upgrade</span>"
        }
        else{
            destext += " Upgrade cost: <span id ='cost-special'>"+ info.cost+"$ and " +(info.ascend*1000 + 1000) + " gold </span>."
            btn.classList.remove('normal-btn') 
            btn.classList.add('asc-btn')
            btn.innerHTML = "<span id='ascendlv'>Ascend</span>"
        }
    }else{
        destext += " Purchase cost: <span id ='cost'>"+ info.cost+"$</span>."
        btn.innerHTML = "<span id='btn-text'>Buy</span>"
    }

    if(ls == contLs){
        destext += "<span id='special-effect'> Income/s: "+ info.income_bonus+"% | Gold/s: "+ info.gold_s +" | reduce time(s): "+ info.time_decrease+"s </span>." 
    }
    des.innerHTML = destext
}

function addItem(info,ls){
    const cell = document.createElement('div')
    const btn = document.createElement('button')
    const des = document.createElement('h3')
    
    cell.classList.add('cell')
    des.classList.add('des')
    btn.classList.add('btn')

    

    btn.classList.add('buy-btn')
    cell.appendChild(btn)
    cell.appendChild(des)
    ls.appendChild(cell)


    btn.addEventListener('click',()=> BuyrUpgrade(cell,info,ls))
    updCell(cell,info,ls)
    //console.log(btn)

}

let deb = false
function BuyrUpgrade(cell,info,ls){
    if(!deb){
        deb = true

        if(cash >= info.cost  ){
            cash -= info.cost
            if(!info.owned){
                info.owned = true
                cell.classList.add('owned')
               
            }
            else if(info.level < info.max_level) {
                if(info.cost == 0) info.cost += info.inc_levelup_cost
                else info.cost += Math.ceil(info.cost*(info.inc_levelup_cost/100))
                info.level++
                info.cash_s += info.cash_s_level
            }
            else if(info.level >= info.max_level && gold >= ( 1000 + 1000*info.ascend)){
                gold -= 1000 + 1000*info.ascend
                if(info.cost == 0) info.cost += info.inc_levelup_cost*(info.ascend+1)
                else info.cost += Math.ceil(info.cost*(info.inc_levelup_cost/100))*(info.ascend+1)

                info.level=0
                info.max_level += 10
                info.cash_s += info.cash_s_level*(info.ascend+1)
                info.ascend++

                if(ls == contLs){
                    info.income_bonus += 10
                    info.gold_s += 1
                }
            }

            updCell(cell,info,ls)
            updCash_s()
        }else{
            alert("Not enough currencies")
        }
        
        deb = false
    }
}

function updLs(){
    Factory.forEach( info =>{addItem(info, facLs)})
    Product.forEach( info =>{addItem(info, prodLs)})
    Contract.forEach( info =>{addItem(info, contLs)})
}

updLs()