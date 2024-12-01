function randomValues(){
    const inputs = document.getElementsByClassName('input');
    for(let i = 0; i < inputs.length; i++){
        const input = inputs[i];
        switch(input.id){
            case 'name':
                input.value = incomingNames[Math.floor(Math.random() * incomingNames.length)][0];
                break;
            case 'amount':
                const randomNum = Math.random() * 500;
                input.min = null;
                input.value = randomNum == 0 ? (randomNum + 1).toFixed(2) : randomNum.toFixed(2); 
                break;
        }
    }
}

function changeTransactionType(form, buttonId){
    if(buttonId == form.className)return;

    const category = document.getElementById('category');
    const newButton = document.getElementById(buttonId);
    const oldButton = document.getElementById(form.className);
    newButton.className = 'pressed-button-color';
    oldButton.className = 'button-color';

    form.className = buttonId;
     
    if(buttonId == 'outgoing-transaction'){
        const submit = document.getElementById('submit');
        submit.classList.remove('incoming');
        submit.classList.add('outgoing');

        const randomButton = document.getElementById('random');
        if(randomButton){
            randomButton.remove();
        }
        const amount = document.getElementById('amount');
        amount.min = 0.01;

        category.selectedIndex  = 0;
        category.disabled = false;
    }
    else if(buttonId == 'incoming-transaction'){
        const randomButton = `<input type= "button" id = 'random' class = "input" onclick = "randomValues()" value = "random">`;
        const container = document.getElementById('submit-container');

        const submit = document.getElementById('submit');
        submit.classList.remove('outgoing');
        submit.classList.add('incoming');


        category.selectedIndex  = 8;
        category.disabled = true;

        container.innerHTML += randomButton;
    }
}

function handleForm(event){ 
    event.preventDefault();

    let transactions = localStorage.getItem('transactions');
    let balance = localStorage.getItem('balance');
    transactions = JSON.parse(transactions);
    balance = JSON.parse(balance);

    let transaction = [];
    for(let i = 0; i < 4; i++){
        if(i == 1)continue;
        const input = event.srcElement[i];

        const value = input.value;
        transaction.push(value);
    }
    const submit = document.getElementById('submit');
    if(submit.classList[1] == 'outgoing'){
        transaction[2] *= -1;
        if(balance + transaction[2] < 0){
            alert(`Balance can't be lower than 0`);
            return;
        }
    }
    transaction[2] = parseFloat(transaction[2]);

    transaction[3] = new Date();
    
    balance += transaction[2];
    
    transactions.unshift([transaction[2], transaction[0], transaction[1], transaction[3]]);

    transactions = JSON.stringify(transactions);
    localStorage.setItem('transactions', transactions);
    balance = JSON.stringify(balance);
    localStorage.setItem('balance', balance);

    window.parent.updatePage();
}