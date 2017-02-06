//********************************************************************************//
//* Name :                                                                       *//
//* zenit login : int222_161                                                     *//
//********************************************************************************//
//********************************************************************************//
//*   Do not modify any statements in detailPaymentCalculation function          *//
//********************************************************************************//

function detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) {

//********************************************************************************//
//*   This function calculates the monthly payment based on the following:       *//
//*                                                                              *//
//*               M = P [ i(1 + i)n ] / [ (1 +  i)n - 1]                         *//
//*                                                                              *//
//*   Note: This function also updates the payment amount on the form            *//
//********************************************************************************//
 var paymentError = "";
 var v = mortAmount * 1;
 var d = mortDownPayment * 1;
 var i = mortRate * 1;
 var y = mortAmortization * 1;
 var a = v - d;
     i = i/100/12;
     n = y * 12;
 var f = Math.pow((1+i),n);

 var p = (a * ((i*f)/(f-1))).toFixed(2);

 if (p=="NaN" || p=="Infinity") {
     document.forms[0].payment.value = "";
 }
 else {
       document.forms[0].payment.value = p;
 }

} // End of detailPaymentCalculation function


function calculatePayment() {

//********************************************************************************//
//*   You will need to call the functions that validate the following:           *//
//********************************************************************************//
//*        (1)              (2)              (3)             (4)                 *//
//********************************************************************************//
//*   Property value  -  Down payment  -  Interest rate -  Amortization          *//
//********************************************************************************//
//*   If there are no errors, then call                                          *//
//*                                                                              *//
//*      detailPaymentCalculation(...., ......, ......, ......);                 *//
//*                                                                              *//
//*   and make sure to pass the four values in the order shown above.            *//
//*                                                                              *//
//********************************************************************************//
//*   If there are errors, present the client the following message in the       *//
//*   reserved area on the form:                                                 *//
//*                                                                              *//
//*   Please complete the form first and then click on Calculate Monthly Payment *//
//*                                                                              *//
//********************************************************************************//
var possibleErrs = "";

possibleErrs = validatePropValue(possibleErrs);
possibleErrs = validateDownPay(possibleErrs);
possibleErrs = validateIntRate(possibleErrs);
possibleErrs = validateAmortization(possibleErrs);

if (possibleErrs !== "") {
  possibleErrs += "<p>- Please complete the form first and then click on Calculate Monthly Payment</p>";
  showErrors(possibleErrs);
  return false;
}

else {
  clearShowErrors();
  var propValue = document.getElementById('propValue').value;
  var downPay = document.getElementById('downPay').value;
  var intRate = document.getElementById('intRate').value;
  var Amortization = document.getElementById('amortization').value;
  detailPaymentCalculation(propValue,downPay,intRate,Amortization);
  return true;

}

} // End of calculatePayment function



function formValidation() {

//***************************************************************************************//
//*                                                                                     *//
//* This function calls the different functions to validate all required fields         *//
//*                                                                                     *//
//* Once you have called and validated all field, determine if any error(s)             *//
//*  have been encountered                                                              *//
//*                                                                                     *//
//* If any of the required fields are in error:                                         *//
//*                                                                                     *//
//*    present the client with a list of all the errors in reserved area                *//
//*         on the form and                                                             *//
//*          don't submit the form to the CGI program in order to allow the             *//
//*          client to correct the fields in error                                      *//
//*                                                                                     *//
//*    Error messages should be meaningful and reflect the exact error condition.       *//
//*                                                                                     *//
//*    Make sure to return false                                                        *//
//*                                                                                     *//
//* Otherwise (if there are no errors)                                                  *//
//*                                                                                     *//
//*    Recalculate the monthly payment by calling                                       *//
//*      detailPaymentCalculation(mortAmount,mortDownPayment,mortRate,mortAmortization) *//
//*                                                                                     *//
//*    Change the 1st. character in the field called client to upper case               *//
//*                                                                                     *//
//*    Change the initial value in the field called jsActive from N to Y                *//
//*                                                                                     *//
//*    Make sure to return true in order for the form to be submitted to the CGI        *//
//*                                                                                     *//
//***************************************************************************************//

 var errMessages = "";                       // Initialize for each time the function is called
 errMessages = validateAmortization(errMessages);
 errMessages = validateIntRate(errMessages);
 errMessages = validateMortYear(errMessages);
 errMessages = validateMortMonth(errMessages);
 errMessages = validateUserID(errMessages);
 errMessages = validateClient(errMessages);
 errMessages = validatePropValue(errMessages);
 errMessages = validateDownPay(errMessages);
 errMessages = validateLocation(errMessages);
 errMessages = validateIncome(errMessages);
 errMessages = validatePropDetail(errMessages);


 // call other field validation functions if required

 if (errMessages !== "") {                  // if true - there is at least one error
                                            // Prepare to show the errors detected
   showErrors(errMessages);                 // Prepare to show the errors detected
   return false;                            // return false to the browser
                                            // in order for the form not be submitted
                                            // this will allow for corrections
 }
 else {
   clearShowErrors();
   var propValue = document.getElementById('propValue').value;
   var downPay = document.getElementById('downPay').value;
   var intRate = document.getElementById('intRate').value;
   var Amortization = document.getElementById('amortization').value;
   detailPaymentCalculation(propValue,downPay,intRate,Amortization);
   document.getElementById('jsActive').value = "Y";
   var clientName = document.getElementById('client').value;
   clientName = clientName.substr(0,1).toUpperCase() + clientName.substring(1);
   document.getElementById('client').value = clientName;
   return true;
 }

} // End of completeFormValidation

function showErrors(messages) {
  document.getElementById('messages').innerHTML = "<ol>" + messages + "</ol>";
}

function  clearShowErrors() {
  document.getElementById('messages').innerHTML = " ";
}

function validateAmortization(messages) {
  var Amortization = document.getElementById('amortization').value;
  var confirm = 0;
  var blankz = 0;
  for (var i = 0; i < Amortization.length; i++) {
    if (Amortization.charCodeAt(i) === 32) {
      blankz++;
      break;
    }
  }
  if (blankz) {
    messages += "<li>Amortization can't have a space</li>";
    confirm = 1;
  }
  if (Amortization.length === 0) {
    messages += "<li>Please enter a value for Amortization</li>";
    confirm = 1;
  }
  if (isNaN(Amortization)) {
    messages += "<li>Amortization must be numeric only</li>";
    confirm = 1;
  }
  if (confirm === 0) {
    if (Amortization > 20 || Amortization < 5) {
      messages += "<li>Amortization range is 5-20</li>";
    }
  }
  return messages;
}

function validateIntRate(messages) {
  var intRate = document.getElementById('intRate').value;
  var confirm = 0;
  var blankz = 0;
  for (var i = 0; i < intRate.length; i++) {
    if (intRate.charCodeAt(i) === 32) {
      blankz++;
      break;
    }
  }
  if (blankz) {
    messages += "<li>Interest Rate can't have a space</li>";
    confirm = 1;
  }
  if (intRate.length === 0) {
    messages += "<li>Please enter an Interest Rate</li>";
    confirm = 1;
  }
  if (isNaN(intRate)) {
    messages += "<li>Interst Rate must be numeric only</li>";
    confirm = 1;
  }
  if (confirm === 0) {
    if (intRate > 16 || intRate < 3) {
      messages += "<li>Interst Rate range is 3-16</li>";
    }
  }
  return messages;
}

function validateMortYear(messages) {
  var mortYear = document.getElementById('mortYear').value;
  var myDate = new Date();
  var myYear = myDate.getFullYear();
  var confirm = 0;
  var blankz = 0;
  for (var i = 0; i < mortYear.length; i++) {
    if (mortYear.charCodeAt(i) === 32) {
      blankz++;
      break;
    }
  }
  if (blankz) {
    messages += "<li>Mortgage Year can't have a space</li>";
    confirm = 1;
  }
  if (mortYear.length === 0) {
    messages += "<li>Please enter a Mortgage Year</li>";
    confirm = 1;
  }
  if (isNaN(mortYear)) {
    messages += "<li>Mortgage Year must be numeric only</li>";
    confirm = 1;
  }
  if (confirm === 0) {
    if (mortYear < myYear || mortYear > myYear+1) {
      messages += "<li>Mortgage Year must be this year or one year above</li>";
    }
  }
  return messages;
}

function validateMortMonth(messages) {
  var mortMonth = document.getElementById('mortMonth').value;
  var myDate = new Date();
  var myMonth = 1+ myDate.getMonth();
  var confirm = 0;
  var blankz = 0;
  for (var i = 0; i < mortMonth.length; i++) {
    if (mortMonth.charCodeAt(i) === 32) {
      blankz++;
      break;
    }
  }
  if (blankz) {
    messages += "<li>Mortgage Months can't have a space</li>";
    confirm = 1;
  }
  if (mortMonth.length === 0) {
    messages += "<li> Please enter a value for Mortage Months</li>";
    confirm = 1;
  }
  if (isNaN(mortMonth)) {
    messages += "<li> Mortage Months must be numeric only</li>";
    confirm = 1;
  }
  if (confirm === 0) {
    if (mortMonth > 12 || mortMonth < 1) {
      messages += "<li> Only months 1-12 are allowed for Mortgage Months</li>";
    }
    if (mortMonth <= 12 && mortMonth > 0) {
      if (mortMonth < myMonth || mortMonth > myMonth+1) {
        messages += "<li>Mortgage Month must be this month or one month above</li>";
      }
    }
  }
  return messages;
}

function validateUserID(messages) {
  var userid = document.getElementById("userId").value;
  userid = userid.trim();
  var confirm = 0;

  var idLength = userid.length;
  // Validate Length // Rule 1
  if (idLength < 10 ) {
    messages += "<li>Please enter a 10 digit user ID</li>";
    confirm = 1;
  }
  // Validate Hyphen // Rule 2
  var hyphen = userid.charAt(4);
  if (hyphen !== "-" && idLength > 9) {
    messages += "<li>Position 5 of 'User ID' must be a hyphen (-)</li>";
    confirm = 1;
  }
  // Validate Left // Rule 3
  if (confirm === 0) {
    var leftHalf = userid.substr(0,4);
    if (isNaN(leftHalf)) {
      messages += "<li>Positions 1-4 of 'User ID' must be digits</li>";
      confirm = 1;
    }
  }

  // Validate Right // Rule 4
  var rightHalf = userid.substr(5,10);
  if (isNaN(rightHalf)) {
    messages += "<li>Positions 6-10 of 'User ID' must be digits</li>";
    confirm = 1;
  }

  // Validate Sum of Left // Rule 5
  var leftHolder = 0;
  var rightHolder = 0;
  if (confirm === 0) {
    for (var i = 0; i < leftHalf.length; i++) {
      leftHolder += Number(leftHalf[i]);
    }
    for (var a = 0; a < rightHalf.length; a++) {
     rightHolder += Number(rightHalf[a]);
   }

   if (0 >= rightHolder) {
      messages += "<li>Positions 6-10 of User ID must greater than 0</li>";
    }
    if (0 >= leftHolder) {
      messages += "<li>Positions 1-4 of User ID must greater than 0</li>";
    }
    // Validate Sum // Rule 6
    var doubleRight = rightHolder / 2 -  1;
    if (leftHolder != doubleRight) {
      messages += "<li>The sum of Positions 1-4 of User ID must be double + 2 the sum of positoins 6-10</li>";
    }
  }
  return messages;
}

function validateClient(messages) {
  var userName = document.getElementById('client').value;
  userName = userName.toUpperCase();
  var numOfAlpha = "";
  var numOfApo = "";
  var atBegAtEnd = "";
  var numOfHyp = "";
  var numOfBlanks = "";
  var numOfNumz = "";
  if (userName.length === 0) {
    messages += "<li>Please enter a User Name</li>";
  }
  else {
    if (userName.length < 3) {
      messages += "<li>The User Name field must have at least 3 characters</li>";
    }
    else {
      for (var i = 0; i < userName.length; i++) {
        if (userName.charCodeAt(i) > 64 && userName.charCodeAt(i) < 91) {
          numOfAlpha++;
        }
        if (userName.charAt(0) === "'" || userName.substring(userName.length - 1) === "'") {
          atBegAtEnd++;
        }
        if (userName[i] === "'") {
          numOfApo++;
        }
        if (userName[i] === "-") {
          numOfHyp++;
        }
        if (userName.charCodeAt(i) === 32) {
          numOfBlanks++;
        }
        if (userName.charCodeAt(i) > 47 && userName.charCodeAt(i) < 58) {
          numOfNumz++;
        }
      }
      if (numOfAlpha === "") {
        messages += "<li>Only letters and an apostrophe are allowed for User Name";
      }
      if (atBegAtEnd) {
        messages += "<li>The User Name field can't have an apostrophe at the beginning or end of it</li>";
      }
      if (numOfApo > 1) {
        messages += "<li>The User Name field can only one apostrophe</li>";
      }
      if (numOfHyp > 0) {
        messages += "<li>The User Name field can't have hypens</li>";
      }
      if (numOfBlanks > 0) {
        messages += "<li>The User Name can't have spaces</li>";
      }
      if (numOfNumz > 0) {
        messages += "<li>The User Name can't have any numbers</li>";
      }
    }
  }
  return messages;
}

function validatePropValue(messages) {
  var propValue = document.getElementById('propValue').value;
  var confirm = 0;
  var blankz = 0;
  for (var i = 0; i < propValue.length; i++) {
    if (propValue.charCodeAt(i) === 32) {
      blankz++;
      break;
    }
  }
  if (blankz) {
    messages += "<li>Property Value can't have a space</li>";
    confirm = 1;
  }
  if (propValue.length === 0) {
    messages += "<li>Please enter a value for Property Value</li>";
    confirm = 1;
  }
  if (0 > propValue) {
    messages += "<li>Property Value must be a positive number</li>";
    confirm = 1;
  }
  if (isNaN(propValue)) {
    messages += "<li>Property Value must be numeric only</li>";
    confirm = 1;
  }
  if (confirm === 0) {
    var downPayment = +document.getElementById('propValue').value - +document.getElementById('downPay').value;
    if (downPayment < 65000) {
      messages += "<li>Property Value must be 65,000 more than downpayment</li>";
    }
  }
  return messages;
}

function validateDownPay(messages) {
  var downPay = document.getElementById('downPay').value;
  var confirm = 0;
  var blankz = 0;
  for (var i = 0; i < downPay.length; i++) {
    if (downPay.charCodeAt(i) === 32) {
      blankz++;
      break;
    }
  }
  if (blankz) {
    messages += "<li>Down Payment can't have a space</li>";
    confirm = 1;
  }
  if (downPay.length === 0) {
    messages += "<li>Please enter a value for Down Payment</li>";
    confirm = 1;
  }
  if (0 > downPay) {
    messages += "<li>Down Payment must be a positive number</li>";
    confirm = 1;
  }
  if (isNaN(downPay)) {
    messages += "<li>Down Payment must be numeric only</li>";
    confirm = 1;
  }
  if (confirm === 0) {
    var propValue = document.getElementById('propValue').value * 0.20;
    if (downPay < propValue) {
      messages += "<li>Down Payment must be at least 20% of Property Value</li>";
    }
  }
  return messages;
}

function validateLocation (messages) {
  var whichOneSelected = document.mortgage.propLocation.selectedIndex;
  if (whichOneSelected < 1) {
    messages += "<li>Please select a location</li>";
  }
  return messages;
}

function validateIncome(messages) {
  var whichOneSelected = document.mortgage.income.selectedIndex;
  if (whichOneSelected < 1) {
    messages += "<li>Please select an income range</li>";
  }
  return messages;
}

function validatePropDetail(messages) {
  var numOfProp = document.mortgage.propDetails.length;
  var checked = "";
  for (var i = 0; i < numOfProp; i++) {
    if (document.mortgage.propDetails[i].checked === true) {
      checked += 1;
    }
  }
  if (checked === "") {
    messages += "<li>Please select your Property Type</li>";
  }
  return messages;
}
