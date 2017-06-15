// List of possible words	
var possiblewords = ["apple", "orange", "strawberry", "pineapple"];

// chosen word will be stored here
var wordChosen = "";

// chosen word will be broken down into individual letters and stored here
var lettersInWordChosen = [];

// number of blanks based on chosen word
var numberBlanks = 0;

// will hold the current status of the work [a _ _ l e] for [a p p l e]
var blanksAndCorrectLetters = [];

// will store wrong letter guesses
var wrongGuesses = [];

// will store all letters guessed
var lettersGuessed = "";

// game counters
var winCounter = 0;
var lossCounter = 0;
var numberGuesses = 10;

// How to start/restart each game
function startGame() {

	// Reset Guesses back to 10
	numberGuesses = 10;

	// word chosen randomly from possibleWords
	wordChosen = possiblewords[Math.floor(Math.random() * possiblewords.length)];

	// chosen word is broken into individual letters
	lettersInWordChosen = wordChosen.split("");

	// determining number of blanks
	numberBlanks = lettersInWordChosen.length;

	// console log to see chosen word
	console.log(wordChosen);

	// setting blanksAndCorrectLetters = []
	blanksAndCorrectLetters = [];
	wrongGuesses = [];

	// filling blanksAndCorrectLetters with blanks of wordChosen
	for (var i = 0; i < numberBlanks; i++) {
		blanksAndCorrectLetters.push('_');
	}

	// print initial blanksAndCorrectLetters to console
	console.log(blanksAndCorrectLetters);

	// Reprint numberGuesses to 10
	document.getElementById("guesses-left").innerHTML = numberGuesses;

	// prints the blanks at each round on html
	document.getElementById("current-word").innerHTML = blanksAndCorrectLetters.join(" ");

	// clears wrong guesses
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");
}

// comparing lettersGuessed with letters in the word chosen
function checkLetters(letter) {

	// boolean to be toggled when a user guessed letter is found in the word
	var letterInWord = false;

	// check if the letter exists inside the array at all
	for (var i = 0; i < numberBlanks; i++) {

		if (wordChosen[i] === letter) {

			// if the letter exists, then toggle boolean to true
			letterInWord = true;
		}
	}

	// if the letter is in word, then find out which indicies its in
	if (letterInWord) {
		
		// loop through word
		for (var j = 0; j < numberBlanks; j++) {
				
			// populate the blanksAndCorrectLetters with every instance of the letter guessed
			if (wordChosen[j] === letter) {

				blanksAndCorrectLetters[j] = letter;
			
			}
		}

		// log current blanks and letters
		console.log(blanksAndCorrectLetters);
	}

	else {
		// add wrong guesses to list of wrong guesses
		wrongGuesses.push(letter);

		// subtract one from the guesses
		numberGuesses--;
	}

}

// new function to determine when round is over
function roundOver() {
	// log the current number of wins and losses and num of guesses left
	console.log("Wins: " + winCounter + " | Losses: " + lossCounter + " | Guesses Left: " + numberGuesses);

	// update html to reflect what happend in the previous round(s)
	document.getElementById("guesses-left").innerHTML = numberGuesses;

	// update new word blanks("_") on Html
	document.getElementById("current-word").innerHTML = blanksAndCorrectLetters.join(" ");

	// update page with wrong guesses
	document.getElementById("wrong-guesses").innerHTML = wrongGuesses.join(" ");

	// if the user guesses the hangman word correct: ...
	if (lettersInWordChosen.toString() === blanksAndCorrectLetters.toString()) {
		// increase number of wins
		winCounter++;

		// alert the user that they're correct
		alert("You're Correct!");

		// update html wins counter
		document.getElementById("number-wins").innerHTML = winCounter;

		// restart game
		startGame();
	}

	// else if the user runs out of guesses
	else if (numberGuesses === 0) {
		// increases losses by 1
		lossCounter++;

		// alert them that they are wrong
		alert("You're Incorrect!");

		// update html losses
		document.getElementById("number-losses").innerHTML = lossCounter;

		// Restart the game
		startGame();
	}

}

// CALLING THE FUNCTIONS
// Start the game
startGame();

// call the on key up function to capture letters
document.onkeyup = function(event) {
	// converts buttons clicked into lowercase letters
	lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();

	// Check for correct letters
	checkLetters(lettersGuessed);

	// run round over code
	roundOver();
};

