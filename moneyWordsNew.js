var moneyWords = function (){

		//I'm using an object for the languages to use for the number name syntax
		//originally I used separate arrays for each piece of the object below, but it became
		//cumbersome and hard to keep track of.  I wrote the object below with readiblity for other
		//developers in mind.
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
			"19": "nineteen",
			/*"20": "twenty",
			"30": "thirty",
			"40": "forty",
			"50": "fifty",
			"60": "sixty",
			"70": "seventy",
			"80": "eight",
			"90": "ninty"*/
		}

		var numberNameObjectTens = {
			"2": "twenty",
			"3": "thirty",
			"4": "forty",
			"5": "fifty",
			"6": "sixty",
			"7": "seventy",
			"8": "eight",
			"9": "ninty"
		}

		var integerString = "";
		return function(inputNum){

			if(isNaN(inputNum)){
			//check if input is a number
				return "Please enter your number in numeric format without commas or letters.  For example 20632.2 works well.";
			}else if(inputNum >= 1000000000){
			//checking if input is less than one billion	
				return "Please enter a number that is less than one billion";
			}else{
			//this code runs when both the above conditions are met

				//rounds to two decimals or inserts decimals if none were supplied
				var num = inputNum.toFixed(2);
				console.log("rounded number is " + num);
				//I intentionally use the .split method so that the return values will be strings
				var numParts = num.split(".");
				var decimalPart = numParts[1];
				var integerPartArray = numParts[0].split("").reverse();
				if(integerPartArray.length>=1){
					//looping from top to bottom since I reversed the array
					for(var x = integerPartArray.length - 1; x >= 0; x --){
						//handling tens and ones in each subset of place values
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
							//this would be for x === 2, 5, or 8 
							integerString = integerString + numberNameObject[integerPartArray[x]];
						}

						//now we are adding the ending values such as hundred, million, thousand, hundred-thousand, etc
						if(x===5 || x ===8 || x===2){
							integerString = integerString + " hundred "
						}

						if(x>= 3 && x <= 5){
							integerString = integerString + " thousand ";
						}else if(x>=6 && x<= 9){
							integerString =integerString + " million ";
						}


					}
				}else{
					integerString = "zero";
				}

				return integerString + " and " + decimalPart + "/100 dollars";
			}
		}
}();

console.log(moneyWords(2345.62));