const categories = [
    ['Online shopping', 'mediumpurple', '<img src="../Icons/Cart.png" style = "filter: invert(47%) sepia(84%) saturate(397%) hue-rotate(217deg) brightness(91%) contrast(88%); height: 55%; width: 55%;">'],
    ['Groceries', 'salmon', '<img src="../Icons/Apple.png" style = "filter: invert(69%) sepia(37%) saturate(2832%) hue-rotate(314deg) brightness(101%) contrast(96%); height: 45%; width: 45%;">'],
    ['Transport', 'powderblue', '<img src="../Icons/Canister.png" style = "filter: invert(91%) sepia(14%) saturate(577%) hue-rotate(140deg) brightness(97%) contrast(86%); height: 50%; width: 50%;">'],
    ['Clothing', 'turquoise', '<img src="../Icons/Shirt.png" style = "filter: invert(89%) sepia(17%) saturate(1592%) hue-rotate(107deg) brightness(93%) contrast(88%); height: 55%; width: 55%;">'],
    ['Footwear', 'chocolate', '<img src="../Icons/Boot.png" style = "filter: invert(48%) sepia(97%) saturate(1418%) hue-rotate(350deg) brightness(86%) contrast(89%); height: 60%; width: 60%;">'],
    ['Electrical appliances', 'gold','<img src="../Icons/Lightning.png" style = "filter: invert(79%) sepia(44%) saturate(922%) hue-rotate(359deg) brightness(102%) contrast(104%); height: height: 55%; width: 55%;">'],
    ['Cosmetics', 'plum', '<img src="../Icons/Lipstick.png" style = "filter: invert(88%) sepia(73%) saturate(873%) hue-rotate(210deg) brightness(87%) contrast(100%); height: 55%; width: 55%;">'],
    ['Internal transfer', 'lime', '<img src="../Icons/Banknote.png" style = "filter: invert(88%) sepia(20%) saturate(1864%) hue-rotate(66deg) brightness(99%) contrast(105%); height: 80%; width: 80%;">'],
    ['Other', 'Silver', '<img src="../Icons/Canister.png" style = "filter: invert(91%) sepia(14%) saturate(577%) hue-rotate(140deg) brightness(97%) contrast(86%); height: 55%; width: 55%;">'],
];

const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

const outgoingNames = [
    ['Steam', categories[0][0]],
    ['Lidl', categories[1][0]],
    ['Biedronka', categories[1][0]],
    ['Rossmann', categories[6][0]],
    ['Orlen', categories[2][0]],
    ['BP', categories[2][0]],
    ['Shell', categories[2][0]],
    ['Reserved', categories[3][0]],
    ['H&M', categories[3][0]],
    ['CCC', categories[4][0]],
    ['MediaMarkt', categories[5][0]],
    ['RTV Euro AGD', categories[5][0]],
    ['Hebe', categories[6][0]],
    ['Kaufland', categories[1][0]],
    ['Carrefour', categories[1][0]],
    ['Epic Games Store', categories[0][0]],
    ['Ubisoft Connect', categories[0][0]],
    ['BattleNet', categories[0][0]],
];

const incomingNames = [
    ['Babcia', categories[7][0]],
    ['Mama', categories[7][0]],
    ['Tata', categories[7][0]],
    ['Pracodawca', categories[7][0]],
];

function convertToDate(array){
    for(let i = 0; i < array.length; i++){
        array[i][3] = new Date(array[i][3]);
    }

    return array;
}