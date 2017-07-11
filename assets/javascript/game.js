//Maike Scherer
//Homework 3
//Issues: var userGuess = event.key gives feedback Uncaught ReferenceError: userGuess is not defined
// at <anonymous>:1:1 --> the win statement will never become true
var wins = 0;
var losses = 0;
var guessNumber = 9;
var computerChoices = ["a","b","c","d","e","f","g","h","j", "i", "k","l","m","n","o","p","q","r","s","t","u","v","x","y","z"];
var guesses = "";

// Randomly chooses a letter
var computerGuess = computerChoices[Math.floor(Math.random() * computerChoices.length)];
console.log("computerGuess: " + computerGuess);

//for (var i=guessNumber; i > 0; i--) {

document.onkeyup = function(event) {

// Determines which key was pressed.
var userGuess = event.key;


// if (!/[a-zA-Z]/.test(userGuess)) {
//           alert("Only choose letters!")
//           return;               
//       }; 

//userGuess = String.fromCharCode(userGuess);

console.log("userGuess: " + userGuess)     

if (guessNumber > 0) {

    console.log("userguess: " + userGuess);
    console.log("computerguess: " + computerGuess);
    console.log(userGuess === computerGuess);
    

    if (userGuess === computerGuess) {
        wins++;
        guessNumber = 0;
        console.log(wins);
        console.log("You Win!");
        alert("You Win!");
        computerGuess = computerChoices[Math.ceil(Math.random() * computerChoices.length)];
        console.log("computerGuess: " + computerGuess);
        guesses = "";
    }

    else {
        guesses += userGuess;
        console.log("keep guessing")
        
        console.log("guessNumber:" + guessNumber);
        console.log(guesses);
        document.getElementById("guessDone").innerHTML = ("Your guesses so far: " + guesses);
        guessNumber--;
    }
        
    document.getElementById("wins").innerHTML = ("Wins: " + wins);
    document.getElementById("losses").innerHTML = ("Losses: " + losses);
    document.getElementById("guessNumber").innerHTML = ("Guesses left: " + guessNumber); 
}

if (guessNumber === 0) {
        losses++;
        guessNumber = 9;
        computerGuess = computerChoices[Math.ceil(Math.random() * computerChoices.length)];
        console.log("computerGuess: " + computerGuess);
        guesses = "";
        alert("You Lose! Try again!");
    
}
  
};

    



    

//function that takes all variables that need to be reset
//}