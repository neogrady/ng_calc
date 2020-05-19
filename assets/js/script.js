"use strict"

//begyűjtjük az id-ket, classokat
var typeField = document.getElementById("typer");
var calcArea = document.getElementById("calcArea");
var operators = document.getElementsByClassName("operators");
var numbers = document.getElementsByClassName("numbers");
var dot = document.getElementById("dot");
var c = document.getElementById("c");
var eq = document.getElementById("equals");


var mainOperands = [];

//hoozzáadjuk az eventlistenereket

document.addEventListener('keyup', pressed);


for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", function () {

        var a = typeField.value.toString();
        typeField.value = a + numbers[i].innerHTML;
    })
}

for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", function () {
        if (typeField.value == "") {
            mainOperands[mainOperands.length - 1] = operators[i].innerHTML;

        } else {
            mainOperands.push(typeField.value);
            mainOperands.push(operators[i].innerHTML);
        }
        updateCalcArea();
        typeField.value = "";

    })
}

dot.addEventListener("click", putDot);

c.addEventListener("click", deleteAll);

eq.addEventListener("click", final);


//függvények


function pressed(e) {
    switch (e.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            var a = typeField.value.toString();
            var num = e.key;
            typeField.value = a + num.toString();
            break;
        case "c":
        case "C":
        case "Escape":
            deleteAll();
            break;

        case ",":
        case ".":

            putDot();
            break;

        case "/":
        case "*":
        case "+":
        case "-":

            getOperandByKey(e.key);
            break;

        case "Enter":
            final();
            break;
    }
}


function getOperandByKey(e) {
    if (typeField.value == "") {
        mainOperands[mainOperands.length - 1] = e;

    } else {
        if (e == "*") e = "X";
        mainOperands.push(typeField.value);
        mainOperands.push(e);
    }
    updateCalcArea();
    typeField.value = "";
}




function putDot() {
    var a = typeField.value.toString();
    if (a.search(/\./) == -1)
        typeField.value = a + ".";

}


function deleteAll() {
    mainOperands = [];
    typeField.value = "";
    updateCalcArea();
    typeField.disabled = false;


}


function final() {


    if (typeField.value != "") mainOperands.push(typeField.value);

    updateCalcArea();

    var last = mainOperands.length - 1;
    if (
        mainOperands[last] == "X" ||
        mainOperands[last] == "/" ||
        mainOperands[last] == "+" ||
        mainOperands[last] == "-"
    )
        mainOperands[last] = "";

    var op = "";
    for (var item of mainOperands) {
        if (item == "X") item = "*";
        op += item;

    }
    var sum = eval(op);
    if (sum.toString().length > 12)        
    typeField.value = sum.toExponential(7);
        else 
           typeField.value = sum; 
        
        
    mainOperands = [];

}


function updateCalcArea() {
    var opLine = "";
    for (var item of mainOperands) {
        opLine += item;
    }

    calcArea.innerHTML = opLine;
}
