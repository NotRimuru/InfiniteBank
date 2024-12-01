function filterTransactions() {
    let array = localStorage.getItem('transactions');
    array = JSON.parse(array);
    let filteredTransactions = JSON.parse(JSON.stringify(array));

    const amount = document.getElementById("amount");
    if(amount.value != ""){
        const valueCheckboxes = document.getElementsByClassName('checkboxes')[0];
        for(const checkboxDiv of valueCheckboxes.children){
            const checkbox = checkboxDiv.children[0];
            if(checkbox.checked == true)continue;
            for(let i = 0; i < filteredTransactions.length; i++){
                if(eval(`filteredTransactions[i][0] ${checkbox.value} amount.value`)){
                    filteredTransactions.splice(i, 1);
                    i--;
                }
            }
        }
    }

    const name = document.getElementById("name-filter");
    const nameCheckboxes = name.getElementsByClassName("checkboxes")[0];
    for(const checkboxDiv of nameCheckboxes.children){
        const checkbox = checkboxDiv.children[0];
        if(checkbox.checked == true)continue;
        for(let i = 0; i < filteredTransactions.length; i++){
            if(checkbox.value == filteredTransactions[i][1]){
                filteredTransactions.splice(i, 1);
                i--;
            }
        }
    }

    const category = document.getElementById("category-filter");
    const categoryCheckboxes = category.getElementsByClassName("checkboxes")[0];
    for(const checkboxDiv of categoryCheckboxes.children){
        const checkbox = checkboxDiv.children[0];
        if(checkbox.checked == true)continue;
        for(let i = 0; i < filteredTransactions.length; i++){
            if(checkbox.value == filteredTransactions[i][2]){
                filteredTransactions.splice(i, 1);
                i--;
            }
        }
    }

    const dateInput = document.getElementById("date");
    if(dateInput.value != ""){
        const dateCheckboxes = document.getElementsByClassName('checkboxes')[3];
        for(const checkboxDiv of dateCheckboxes.children){
            const checkbox = checkboxDiv.children[0];
            if(checkbox.checked == true)continue;
            for(let i = 0; i < filteredTransactions.length; i++){
                const date1 = Date.parse(filteredTransactions[i][3]);
                const date2 = Date.parse(dateInput.value);
                if(eval(`date1 ${checkbox.value} date2`)){
                    filteredTransactions.splice(i, 1);
                    i--;
                }   
            }
        }
    }

    filteredTransactions = convertToDate(filteredTransactions)
    return filteredTransactions;
}

function color(array, num){
    let color = '#666';

    for(let k = 0; k < categories.length; k++){
        if(categories[k][0] == array[num][1]){
            color = categories[k][1];
            break;
        }
    }
    
    const checkboxHtml = `
        <div class = "checkbox-input" style = "color: ${color}">
            <input type="checkbox" id="${array[num][0]}" value = "${array[num][0]}" class = "checkbox" style = "accent-color: ${color}" checked/>${array[num][0]}
        </div>
    `
    return checkboxHtml;
}

function showCheckboxes(checkbox, expanded) {
    if(!expanded) {
        checkbox.style.display = "flex";
        checkbox.style['z-index'] = 1;
        expanded = true;
    }else{
        checkbox.style.display = "none";
        checkbox.style['z-index'] = 0;
        expanded = false;
    }
}

function forEachCheckbox(selectBox, checkbox, num){
    let expanded = false;

    switch(num){
        case 1:
            for(let j = 0; j < outgoingNames.length; j++){
                checkbox.innerHTML += color(outgoingNames, j);
            } 
            for(let j = 0; j < incomingNames.length; j++){
                checkbox.innerHTML += color(incomingNames, j);
            } 
            break;
        case 2:
            for(let j = 0; j < categories.length; j++){
                checkbox.innerHTML += `
                    <div class = "checkbox-input" style = "color: ${categories[j][1]}">
                        <input type="checkbox" value = "${categories[j][0]}"  id="${categories[j][0]}" class = "checkbox" style = "accent-color: ${categories[j][1]}" checked/>${categories[j][0]}
                    </div>
                `
            }
            break;
        
        default:
            checkbox.innerHTML +=`
                    <div class = "checkbox-input">
                        <input type="checkbox" class="<" class = "checkbox" value = "<" checked/>Less than
                    </div>
                    <div class = "checkbox-input">
                        <input type="checkbox" class=">" class = "checkbox" value = ">" checked/>More than
                    </div>
                    <div class = "checkbox-input">
                        <input type="checkbox" class="=" class = "checkbox" value = "==" checked/>Equal to
                    </div>
                `
            break;
    }

    selectBox.addEventListener('click', () => {
        showCheckboxes(checkbox, expanded);
        expanded = !expanded;
    });

    checkbox.addEventListener('click', (e) => {
        e.stopPropagation();
    });

    checkbox.addEventListener('mouseleave', () => {
        document.body.addEventListener('click', onBodyClick);
    });

    selectBox.addEventListener('mouseleave', () => {
        document.body.addEventListener('click', onBodyClick);
    });

    function onBodyClick(){
        document.body.removeEventListener('click', onBodyClick);
        if(!expanded)return;
        showCheckboxes(checkbox, expanded);
        expanded = !expanded;
    }
}


