// - Tính tổng của 2 tham số truyền vào nếu truyền vào ít hơn 2 tham số  thì sẽ mặc định là 0
var result = function(number1, number2){
    return (!number1 || !number2) ? 0 : number1+number2;
}

function sum(number1, number2){
    return (!number1 || !number2) ? 0 : number1+number2;
}

const sum = (number1, number2) => { return (!number1 || !number2) ? 0 : number1+number2; }

// - In ra chuỗi tất  cả các tham số truyền vào - định nghĩa hàm không có tham số truyền vào
const showString = function(){
    if(arguments.length > 0){
        for (let i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
    }
}
showString("Nhất", "Khang");

const showString = () => {
    if (arguments.length > 0) {
        for (let i = 0; i < arguments.length; i++) {
            console.log(arguments[i]);
        }
    }
};

function showString(){
    if(arguments.length > 0){
        for (const iterator of arguments) {
            console.log(iterator)
        }
    }
}
// - In ra ID của tất cả các phần tử của mảng được truyền vào 
console.log(showItem);
const showItem = (array) => {
    for (const key in array) {
        return key;
    }
};

function showItem(array){
    for (const key in array) {
        console.log(key);
    }
}

var result = function(array){
    for (const key in array) {
        console.log(key);
    }
}
// - In ra giá trị cuả tất cả các phần tử trong mảng được truyền vào
console.log(showItem);
const showItem = (array) => {
    for (const value of array) {
        return value;
    }
};

function showItem(array){
    for (const value of array) {
        console.log(value);
    }
}

var result = function(array){
    for (const value of array) {
        console.log(value);
    }
}