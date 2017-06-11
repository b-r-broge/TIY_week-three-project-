// Need to build 2 lists, one of the adjusted numbers, one of the operators
// will only use the '^', '*', '%', and '+' operators
// numbers will be adjusted with - (n*-1), / (1/n), and sqrt (n**.5);

// Adding a bunch of listeners for all the buttons
// let clear = document.querySelector('.clear');
// let output = document.querySelector('.output');
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
let buttons = document.querySelectorAll('button');

function rounding(number, precision) {
  // blatently stolen from MDN article on Math.round
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
