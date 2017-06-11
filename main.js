// Need to build 2 lists, one of the adjusted numbers, one of the operators
// will only use the '^', '*', '%', and '+' operators
// numbers will be adjusted with - (n*-1), / (1/n), and sqrt (n**.5);
// keep track if input isNum or operator.

var numb = [], oper = [], out = "", isNum = true;
var addSqrt = false, addNeg = false, addDen = false;

// Adding a bunch of listeners for all the buttons
// WAIT: May be able to use event Delegation to only have one listener on
// the calc-body section, and work from there.
// let clear = document.querySelector('.clear');
// let equal = document.querySelector('.equal');
// let plus = document.querySelector('.plus');
// let minus = document.querySelector('.minus');
// let multiply = document.querySelector('.multiply');
// let divide = document.querySelector('.divide');
// let raise = document.querySelector('.raise');
// let root = document.querySelector('.root');
// let dec = document.querySelector('.dec');
// let mod = document.querySelector('.mod');
// let one = document.querySelector('.one');
// let two = document.querySelector('.two');
// let three = document.querySelector('.three');
// let four = document.querySelector('.four');
// let five = document.querySelector('.five');
// let six = document.querySelector('.six');
// let seven = document.querySelector('.seven');
// let eight = document.querySelector('.eight');
// let nine = document.querySelector('.nine');
// let zero = document.querySelector('.zero');

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
    // console.log(event.target);
    // console.log("button pressed: ", target.value);
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
      // alert('Cannot have two operators consecutively')
    } else {
      // ensure next input is a number
      isNum = false;

      // determine how to add last values to the arrays, modfiying as necessary
      let operation = target.value;
      let outArr = output.value.split(" ")
      numb.push(parseFloat(outArr[outArr.length-1]));
      console.log(numb);
      if (addSqrt) {
        console.log('fixing shit');
        numb.push(.5);
        // oper.push("^");
        addSqrt = false;
      }
      if (addNeg) {
        numb[numb.length-2] *= -1
        addNeg = false;
      }
      if (addDen) {
        numb[numb.length-1] = 1/numb[numb.length-1];
        addDen = false;
      }
      switch (operation) {
        case "+":
          oper.push("+");
          break;
        case "-":
          addNeg = true;
          oper.push("+");
          break;
        case "X":
          oper.push("*");
          break;
        case "/":
          addDen = true;
          oper.push("*");
          break;
        case "^":
          oper.push("^")
          break;
        case "&radic;":
          console.log("RADICAL!");
          addSqrt = true;
          numb.splice(numb.length-1, 1);
          oper.push("^")
          break;
        default:
          break;
      }
    }
    // console.log(numb, oper);
    output.value += " " + event.target.value;
  } else
  if (target.matches('.equal')) {
    let outArr = output.value.split(" ");
    numb.push(parseFloat(outArr[outArr.length-1]));
    if (addSqrt) {
      numb.push(.5);
      oper.push("^");
      addSqrt = false;
    }
    if (addNeg) {
      numb[numb.length-2] *= -1
      addNeg = false;
    }
    if (addDen) {
      numb[numb.length-1] = 1/numb[numb.length-1];
      addDen = false;
    }
    console.log(numb, oper);
    calc(numb, oper);
    output.value = numb[0];
    console.log(numb[0]);
    numb = [], oper = [];
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
