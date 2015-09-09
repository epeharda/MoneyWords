/*
Author: Erica Peharda
Date: September 9th, 2015
Comments: I chose to write this code in JavaScript.  I have included comments to explain 
	my thought process throughout most of the code but would be happy to clarify any questions 
	when I walk through the file with other developers.  Thank you for your time and 
	consideration.

Assumptions:
	1) We are accepting numbers in US dollar format without commas.
	2) I will go as far as the hundred million place value, 
	   assuming this situation is for creating personalized checks and 
	   above a million would likely be a rare case- but can easily be added 
	   if necessary.
	3) We are using JavaScript 1.8.5 (ECMAScript Version 5) which includes the 
	   'use strict' directive.
*/


/*
Problem Selected:
	Exercise 1
	Write some code that will accept an amount and convert it to the 
	appropriate string representation.
						
	Example: 
	Convert 2523.04 
	     to "Two thousand five hundred twenty-three and 04/100 dollars"
*/

'use strict'

/*
I chose a closure so that I could avoid the global namespace.
*/
var moneyWords = function (){
		//to be used for the ones and ten (teens) digits
		var numberNameObject = {
			"1": "one",
			"2": "two",
			"3": "three",
			"4": "four",
			"5": "five",
			"6": "six",
			"7": "seven",
			"8": "eight",
			"9": "nine",
			"10": "ten",
			"11": "eleven",
			"12": "twelve",
			"13": "thirteen",
			"14": "fourteen",
			"15": "fifteen",
			"16": "sixteen",
			"17": "seventeen",
			"18": "eighteen",
			"19": "nineteen"
		};
		//to be used for the tens digits above the teens
		var numberNameObjectTens = {
			"2": "twenty",
			"3": "thirty",
			"4": "forty",
			"5": "fifty",
			"6": "sixty",
			"7": "seventy",
			"8": "eighty",
			"9": "ninety"
		};

		return function(inputNum){
			var integerString = "";

			if(typeof inputNum !== "number"){
				return "Please enter your number in numeric format without commas or letters.  For example 20632.2 works well.";
			
			}else if(inputNum >= 1000000000 || inputNum < 0){
				return "Please enter a positive number that is less than one billion";

			}else{
				var num = inputNum.toFixed(2);
				//I intentionally use the .split method so that the return values will be strings
				var numParts = num.split(".");
				var decimalPart = numParts[1];
				var integerPartArray = numParts[0].split("").reverse();

				if(integerPartArray.length>1){
					for(var x = integerPartArray.length - 1; x >= 0; x --){
						//if-else statement handles tens and ones in each subset of place values
						if(x===1| x===4|x===7){
							if(integerPartArray[x]==="1"){
								integerString = integerString + numberNameObject[integerPartArray[x]+""+integerPartArray[x-1]];
							
							}else if(integerPartArray[x]==="0"){
								integerString =  integerString + numberNameObject[integerPartArray[x-1]];
							
							}else{
								integerString = integerString + numberNameObjectTens[integerPartArray[x]] + "-" + numberNameObject[integerPartArray[x-1]];
							
							}
							//decrementing since we took two digits into account
							x = x -1;

						}else{
								integerString = integerString + numberNameObject[integerPartArray[x]];

						}

						//handling adding the ending values such as hundred, million, thousand, hundred-thousand, etc
						if(x===2 || x ===5 || x===8){
							integerString = integerString + " hundred "
						}

						if(x===3){
							integerString = integerString + " thousand ";

						}else if(x===6){
							integerString =integerString + " million ";

						}
					}
				}else{
					//this is in the case that there is no integer dollar amount
					integerString = "zero";
				}
				return integerString + " and " + decimalPart + "/100 dollars";
			}
		}
}();


//below is for testing (I ran this from the terminal using node)
console.log("Testing input 3525234.13342: " + moneyWords(3525234.13342));
console.log("Testing input \"402.251\": " + moneyWords("402.251"));
console.log("Testing input \"13fdsa\": " + moneyWords("13fdsa"));
console.log("Testing input 0: " + moneyWords(0));
console.log("Testing input 1000000000000: " + moneyWords(1000000000000));
console.log("Testing input -3: "+ moneyWords(-3));
console.log("Testing input 5234.1: " + moneyWords(5234.1));
console.log("Testing input 1,234.1: " + moneyWords("1,234.1"));
