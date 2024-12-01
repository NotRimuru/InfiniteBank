function generateTransactions(amount, array, balance) {
    for (let i = 0; i < amount; i++) {
        let sum;
        do{
            sum = (Math.random() * 1001) - 500;
        }while(sum == 0);
        
        if(balance + sum < 0){
            sum *= -1;
        }

        let name, kategory;
        if(sum > 0){
            const losowyNum = Math.floor(Math.random() * (incomingNames.length));
            name = incomingNames[losowyNum][0];
            kategory = incomingNames[losowyNum][1];
        }
        else{
            const losowyNum = Math.floor(Math.random() * (outgoingNames.length));
            name = outgoingNames[losowyNum][0];
            kategory = outgoingNames[losowyNum][1];
        }
        const data = randomDate(360);

        

        balance += sum;
        array.push([sum, name, kategory, data]);
    }
    return balance
}

function randomDate(daysAmt) {
    const data = new Date;
    return new Date(data.getTime() - Math.floor(Math.random()*daysAmt*24*60*60*1000));
}

function changePage(iframe, buttonId){
    if(iframe.className == buttonId) return;

    const nowyPrzycisk = document.getElementById(buttonId);
    const staryPrzycisk = document.getElementById(iframe.className);
    nowyPrzycisk.className = 'pressed-button-color';
    staryPrzycisk.className = 'button-color';

    iframe.className = buttonId;

    if(buttonId == 'home'){
        iframe.src = 'Html/HomePage.html';
    }
    else if(buttonId == 'transaction-history'){
        iframe.src = 'Html/HistoryPage.html';
    }
    else if(buttonId == 'transaction-statistics'){
        iframe.src = 'Html/StatisticsPage.html';
    }
}

function sortArray(array, params){
    let number;
    switch(params[0]){
        case 'sum':
            number = 0;
            break;
        case 'name':
            number = 1;
            break;
        case 'kategory':
            number = 2;
            break;
        case 'date':
            number = 3;
            break;
    }

    for(let i = 0; i < array.length; i ++){
        for(let j = 0; j < array.length - 1; j++){
            let check;
            let num1 = array[j][number];
            let num2 = array[j + 1][number];
            if(number == 3){
                switch(params[2]){
                    case 0:
                        num1 = num1.getSeconds();
                        num2 = num2.getSeconds();
                        break;
                    
                    case 1:
                        num1 = num1.getMinutes();
                        num2 = num2.getMinutes();
                        break;
                    
                    case 2:
                        num1 = num1.getHours();
                        num2 = num2.getHours();
                        break;
                    case 3:
                        num1 = num1.getDate();
                        num2 = num2.getDate();
                        break;
                    case 4:
                        num1 = num1.getMonth();
                        num2 = num2.getMonth();
                        break;
                    case 5:
                        num1 = num1.getFullYear();
                        num2 = num2.getFullYear();
                        break;
                }
            }

            check = num1 < num2;
            if(params[1] == 'ascending'){
                check = num1 > num2;
            }

            if(check == false)continue;
            
            const temp = array[j];
            array[j] = array[j+1];
            array[j+1] = temp;
        }
    }   
    params[2] ++;
    params[2] %= 6;
    if(params[2] != 0){
        sortArray(array, params);
    }
}