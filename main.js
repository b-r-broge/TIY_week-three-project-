// Need to build 2 lists, one of the adjusted numbers, one of the operators
// will only use the '^', '*', '%', and '+' operators
// numbers will be adjusted with - (n*-1), / (1/n), and sqrt (n**.5);

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
