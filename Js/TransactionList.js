function clearTransactions(){
    const transactionList = document.getElementById('list');
    transactionList.innerHTML = '';
}

function dateDiff(date1, date2) {
    const diff = Math.abs(date1.getTime() - date2.getTime());
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function filterArray(array){
    let filteredArray = [];
    for(const transaction of array){
        if(dateDiff(transaction[3], new Date()) > 30)continue;
        filteredArray.push(transaction);
    }

    return filteredArray;
}

function displayTransactions(trasactions, filter = false) {
    clearTransactions();

    let array = trasactions;
    if(filter == true){
        array = filterArray(trasactions);
    }
    for(let i = 0; i < array.length; i++){
        const amount = array[i][0];
        const name = array[i][1];
        const category = array[i][2];
        const date = array[i][3];
        const currentDate = new Date; 

        let month = date.getMonth() + 1;
        let day = date.getDate();
        if(month < 10){
            month = `0${month}`;
        }
        if(date.getDate() < 10){
            day = `0${date.getDate()}`;
        }
        let dateStr;

        if(currentDate.getDate() - date.getDate() < 7 && (currentDate.getMonth() + 1) - month == 0 && currentDate.getFullYear() - date.getFullYear() == 0){
            if(currentDate.getDate() - date.getDate() == 0){
                dateStr = 'Today';
            }
            else if(currentDate.getDate() - date.getDate() == 1){
                dateStr = 'Yesterday';
            }
            else{
                dateStr = dayNames[date.getDay()];    
            }
        }
        else{
            dateStr = `${day}. ${month}.`;
            if(filter == false){dateStr += ` ${date.getFullYear()}.`}
        }

        let icon, color = 'black';
        for(let j = 0; j < categories.length; j++){
            const nameKategori = categories[j][0];
            if(nameKategori == category){
                color = categories[j][1];
                icon = categories[j][2];
            }
        }

        const trasaction = `
            <div class = "transaction">
                <div class = "date container">${dateStr}</div>
                <div class = "name container">${name}</div>
                <div class = "category container">
                    <div class = "image container">${icon}</div>${category}
                </div>
                <div class = "amount container">${amount.toFixed(2)} PLN</div>
            </div>`;
        const list = document.getElementById("list");

        list.innerHTML += trasaction;

        const amountDiv = document.getElementsByClassName("amount")[i+1];
        if(amount >= 0){
            amountDiv.style.color = "rgb(36, 255, 91)";
        }
        else{
            amountDiv.style.color = "black";
        }
        
        const categoryDiv = document.getElementsByClassName('category')[i+1];
        categoryDiv.style.color = color;
    }
}

function sortArray(array, params){
    let number;
    switch(params[0]){
        case 'amount':
            number = 0;
            break;
        case 'name':
            number = 1;
            break;
        case 'category':
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

function sortOnClick(div, params, list){
    const lastDiv = document.getElementsByClassName(params[0])[0];
    lastDiv.style.setProperty('--text', '')

    let containerClass = div.classList[0];
    let text;
    if(params[0] == containerClass){
        if(params[1] == 'descending'){
            params[1] = 'ascending';
            text = '▲';
        }
        else{
            params[1] = 'descending'
            text = '▼';
        }
    }
    else{
        params[1] = 'ascending'
        text = '▲';
    }
    div.style.setProperty('--text', `"${text}"`);
    params[0] = containerClass;

    sortArray(list, params);
}

function dragDiv(div){
    let click = false,
        startY,
        scrollTop;

    div.addEventListener('mousedown', (event) => {
        if(click) return;

        div.classList.add('active');
        startY = event.pageY - div.offsetTop;
        scrollTop = div.scrollTop;

        click = true;
    });

    document.body.addEventListener('mouseup', () => {
        if(!click) return;
        click = false;
    });

    document.body.addEventListener('mouseleave', () => {
        if(!click) return;
        click = false;
    });

    document.body.addEventListener('mousemove', (event) => {
        if(!click) return;

        const y = event.pageY - div.offsetTop;
        const diff = (y - startY) * 2;

        div.scrollTop = scrollTop - diff;
    });
}
