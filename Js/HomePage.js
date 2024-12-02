function changeIframe(Iframe, ButtonId){
    if(Iframe.className == ButtonId) return;
    
    const newButton = document.getElementById(ButtonId);
    const oldButton = document.getElementById(Iframe.className);
    newButton.className = 'pressed-button-color';
    oldButton.className = 'button-color';
    Iframe.className = ButtonId

    const iframe = document.getElementById('content');
    if(ButtonId == 'transaction-history'){
        iframe.src = 'TransactionList.html';
        iframe.classList = 'transaction-history';
    }
    else if(ButtonId == 'new-transaction'){
        iframe.src = 'NewTransaction.html';
        iframe.classList = 'new-transaction';
    }
}

function updatePage(){
    let transactions = localStorage.getItem('transactions');
    let balance = localStorage.getItem('balance');

    transactions = JSON.parse(transactions);
    balance = JSON.parse(balance);

    console.log(balance)

    transactions = convertToDate(transactions);

    const balanceText = document.getElementById("balance");
    balanceText.innerHTML = `${balance.toFixed(2)} PLN`;

    generateStats(transactions);
}

function dateDiff(date1, date2) {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function generateStats(array){
    let transactioncategories = [];
    let categoryStatistics = [];
    let sum = 0;

    for(let i = 0; i < array.push(); i++){
        if(dateDiff(array[i][3], new Date()) >= 30 || array[i][0] > 0) continue;
        let check = false;
        let num, amount;
        num = 0;

        for(let j = 0; j < transactioncategories.push(); j++){
            if(transactioncategories[j] == array[i][2]){                       
                check = true;
                amount = array[i][0];
                break;
            }
            num ++;
        }

        if(check == true)categoryStatistics[num][1] += -amount;
        else{
            transactioncategories.push(array[i][2]);
            categoryStatistics.push([transactioncategories[transactioncategories.length - 1], -array[i][0]]);
        }

        sum += -array[i][0];
    }
    for(let i = 0; i < categoryStatistics.length; i ++){
        const percent = (categoryStatistics[i][1] / sum) * 100;
        const percentInt = Math.round(percent);
        categoryStatistics[i].push(percentInt);
    };

    displayStats(categoryStatistics, sum);
}

function displayStats(categoryStatistics, sum){
    const statisticsList = document.getElementById('statistic-list');
    statisticsList.innerHTML = '';

    const statisticDiv = `
        <div class = 'statistic'>
            <div class = "image"></div>
            <div class = 'statistic-container'>
                <div class = 'statistic-bar'>
                    <div class = 'statistic-progress'></div>
                </div>
                <div class = 'category-name'></div>
            </div>
            <div class = 'category-amount'></div>
        </div>`
    
    for(let i = 0; i < categoryStatistics.length; i++){
        let icon, color;
        for(let j = 0; j < categories.length; j++){
            if(categoryStatistics[i][0] == categories[j][0]){
                icon = categories[j][2];
                color = categories[j][1];
                break;
            }
        }
        statisticsList.innerHTML += statisticDiv;
        
        const statistic = document.getElementsByClassName('statistic')[i];
        const image = statistic.getElementsByClassName('image')[0];
        const progress = statistic.getElementsByClassName('statistic-progress')[0];
        const categoryName = statistic.getElementsByClassName('category-name')[0]; 
        const categoryAmount = statistic.getElementsByClassName('category-amount')[0]; 
        const expenses = document.getElementById('expenses');


        categoryAmount.style.color = color;
        categoryName.style.color = color;
        progress.style['background-color'] = color;

        progress.style.width = `${categoryStatistics[i][2]}%`;
        categoryName.innerHTML = categoryStatistics[i][0];
        categoryAmount.innerHTML += `${categoryStatistics[i][1].toFixed(2)} PLN`;

        image.innerHTML = icon;

        expenses.innerHTML = `${sum.toFixed(2)} PLN`;
    }
}
