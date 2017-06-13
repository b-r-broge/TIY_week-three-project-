// Need to build 2 lists, one of the adjusted numbers, one of the operators
// will only use the '^', '*', '%', and '+' operators
// numbers will be adjusted with - (n*-1), / (1/n), and sqrt (n**.5);
// keep track if input isNum or operator.
// Deprecated logic when eval("function") was discovered.

var numb = [], oper = [], out = "", isNum = true;
var addSqrt = false, addNeg = false, addDen = false;

let output = document.querySelector('.output');
let calculator = document.querySelector('.calc-body');
calculator.addEventListener('click', updateValues, false);

function updateValues(event) {
  // console.log('clicked');
  let target = event.target;
  // console.log(target);
  if (target.matches('.number')) {
    if (!isNum) {
      output.value += " ";
      isNum = true;
    }
    output.value += event.target.value;
  } else
  if (target.matches('.clear')) {
    console.log("clear button pressed");
    output.value = "";
    numb = [];
    oper = [];
  } else
  if (target.matches('.operator')) {
    // console.log("operator button pressed", target.value);
    if (!isNum && !target.matches('.minus') && !target.matches('.root')) {
      console.log("cannot start with an operator or have two operators consecutively");
    } else {
      // ensure next input is a number
      isNum = false;
      let operation = target.value;
      }
    output.value += " " + event.target.value;
  } else
  if (target.matches('.equal')) {

    console.log(output.value);
    let total = output.value;
    if (total.indexOf("X") > -1) {
      total = total.replace(/X/g , "*");
    } if (total.indexOf("^") > -1) {
      total = total.replace(/\^/g , "**");
    }
    console.log(total)
    output.value = eval(total);
  }
}

function rounding(number, precision) {
  // taken from MDN article on Math.round()
  var factor = Math.pow(10, precision);
  var tempNumber = number * factor;
  var roundedTempNumber = Math.round(tempNumber);
  return roundedTempNumber / factor;
}

function calc (numArray, operArr) {
  // console.log(numArray);
  // console.log(operArr);
  for (let i = operArr.length - 1; i >= 0 ; i--) {
    if (operArr[i] === '^') {
      let a = numArray[i], b = numArray[i+1];
      numArray[i] = a**b;
      numArray.splice(i+1, 1);
      operArr.splice(i, 1);
    }
  }
  for (let i = operArr.length - 1; i >= 0 ; i--) {
    if (operArr[i] === '*') {
      let a = numArray[i], b = numArray[i+1];
      numArray[i] = a*b;
      numArray.splice(i+1, 1);
      operArr.splice(i, 1);
    }
  }
  for (let i = operArr.length - 1; i >= 0 ; i--) {
    if (operArr[i] === '%') {
      let a = numArray[i], b = numArray[i+1];
      numArray[i] = a%b;
      numArray.splice(i+1, 1);
      operArr.splice(i, 1);
    }
  }
  for (let i = operArr.length - 1; i >= 0 ; i--) {
    if (operArr[i] === '+') {
      let a = numArray[i], b = numArray[i+1];
      numArray[i] = a+b;
      numArray.splice(i+1, 1);
      operArr.splice(i, 1);
    }
  }
  return rounding(numArray[0], 2);
}
