function dateDiff(date1, date2) {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function generateStats(array, category, amtOfDays, amt, divNum, dayLimit = false){
    let typesOfTransactions = [];
    let stats = [];
    let number;
    let moneySum = 0;
    if(category==='category')number=2;
    else if(category==='name')number=1;

    for(let i = 0; i < array.length; i++){
        if((dateDiff(array[i][3], new Date()) > amtOfDays && dayLimit == true) || array[i][0] > 0) continue;

        let check = false;
        let j, moneyAmt;
        j = 0;

        for(let k = 0; k < typesOfTransactions.length; k++){
            if(typesOfTransactions[k] == array[i][number]){
                check = true;
                moneyAmt = array[i][0];
                break;
            }
            j++;
        }
        if(check == true){
            stats[j][0] ++;
            stats[j][2] += -moneyAmt;
        }
        else{
            typesOfTransactions.push(array[i][number]);
            stats.push([1, typesOfTransactions[typesOfTransactions.length - 1], -array[i][0]]);
        }

        moneySum += -array[i][0];
    }
    

    sortArray(stats);
    displayStats(stats, divNum, amt, moneySum);
}

function buttonPressed(num, button){
    const buttons = document.getElementsByClassName('button');
    let id = 0;
    for(let i = 0; i < buttons.length; i++){
        if(buttons[i].classList[1] == 'pressed-button-color')break;
        id++;
    }

    if(num == id)return;

    const oldButton = buttons[id];
    button.className = 'button pressed-button-color';
    oldButton.className = 'button button-color';

    let amt, bool;
    switch(num){
        case 0:
            amt = 0;
            bool = false;
            break;
        case 1:
            amt = 30;
            bool = true;
            break;
        case 2:
            amt = 7;
            bool = true;
            break;
    }

    
    generateStats(transactions, 'name', amt, false, 0, bool);
    generateStats(transactions, 'name', amt, true, 1, bool);
    generateStats(transactions, 'category', amt, false, 2, bool);
    generateStats(transactions, 'category', amt, true, 3, bool);
}

function displayStats(stats, num, amt, moneySum){
    const list = document.getElementsByClassName('statistic-list')[num];
    list.innerHTML = '';

    let sum = 0;
    for(let i = 0; i < stats.length; i++){
        sum += parseFloat(stats[i][0]);
    }

    const statDiv = `
        <div class = 'statistic'>
            <div class = "image"></div>
            <div class = 'statistic-container'>
                <div class = 'statistic-bar'>
                    <div class = 'statistic-progress'></div>
                </div>
                <div class = 'name'></div>
            </div>
            <div class = 'amount'></div>
        </div>`;

    for(let i = 0; i < stats.length; i++){
        let icon, color, category = stats[i][1];

        for(let j = 0; j < outgoingNames.length; j++){
            if(stats[i][1] == outgoingNames[j][0]){
                category = outgoingNames[j][1];
                break;
            }
        }
        if(!category){
            for(let j = 0; j < incomingNames.length; j++){
                if(stats[i][1] == incomingNames[j][0]){
                    category = incomingNames[j][1];
                    break;
                }
            }
        }

        for(let j = 0; j < categories.length; j++){
            if(category == categories[j][0]){
                icon = categories[j][2];
                color = categories[j][1];
                break;
            }
        }
        list.innerHTML += statDiv;

        const stat = list.getElementsByClassName('statistic')[i];
        const image = stat.getElementsByClassName('image')[0];
        const progress = stat.getElementsByClassName('statistic-progress')[0];
        const name = stat.getElementsByClassName('name')[0]; 
        const amount = stat.getElementsByClassName('amount')[0]; 
        const expenses = document.getElementsByClassName('expenses')[num];

        let percent = moneySum > 0 ? (stats[i][2] / moneySum) * 100 : 0;
        if(amt == true){
            percent = sum > 0 ? (stats[i][0] / sum) * 100 : 0; 
        }
        
        const percentInt = Math.round(percent);

        amount.style.color = color;
        name.style.color = color;

        progress.style['background-color'] = color;

        progress.style.width = `${percentInt}%`;
        name.innerHTML = stats[i][1];

        if(amt==true)
        {
            amount.style["max-width"] = "2.5lvh";
            amount.innerHTML = `${(stats[i][0])} `;
        }
        else{
            amount.innerHTML = `${(stats[i][2]).toFixed(2)} PLN`;
        }

        image.innerHTML = icon;

        expenses.innerHTML = `Spend ${moneySum.toFixed(2)} PLN`; 

        if(amt == true){
            expenses.innerHTML = `in ${sum} transactions`; 
        }
    }
}

function sortArray(array){
    for(let i = 0; i < array.length; i ++){
        for(let j = 0; j < array.length - 1; j++){
            let num1 = array[j][0];
            let num2 = array[j + 1][0];
            if(num2 < num1)continue;

            const temp = array[j];
            array[j] = array[j+1];
            array[j+1] = temp;
        }
    }
}

function addButtons(){
    const buttonsDiv = document.getElementsByClassName('buttons-div');
    for(let i = 0; i < buttonsDiv.length; i++){
        const button = ``; 
    }
}
