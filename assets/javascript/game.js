// A game in javascript where the user guesses a letter to win or lose against the computer
// Known bug: can press "Play again" button before using up all attempts and get no "loss" penalty

"use strict";

const game = {
    // set up required variables
    alphabet: ["A","B","C","D","E","F","G","H","J", "I", "K","L","M","N","O","P","Q","R","S","R",
        "U","V", "W", "X","Y","Z"],
    wins: 0,
    losses: 0,
    won: false,
    guesses: [],
    // computerGuess: "",
    update: `Type a letter to get started!`,
    // playGame runs while the user has had 9 guesses or less 
    // adds to wins or losses if user wins / loses
    playGame(userGuess) {
        // allow user to guess 9 times
        if (this.guesses.length < 9) {
            if (userGuess === this.computerGuess) {
                this.wins++;
                this.update = `You win. Press Play Again for another round!`;
                this.won = true;
            } else {
                this.update = `Keep Guessing!`;
            }
        }
        // add guessed letter to array
        this.guesses.push(userGuess);
        if (this.guesses.length == 9) {
            this.update = `You have used all available guesses! The correct answer was <bold>` + 
            `${this.computerGuess}</bold> . Press Play Again for another round!`;
            this.losses++;
        }
        this.updateHTML();
    },
    //generate a random letter
    computerGuessGenerator() {
        this.computerGuess = this.alphabet[Math.floor(Math.random() * this.alphabet.length)];
        // console.log("computerGuess", this.computerGuess);
    },
    // display updated info to html
    updateHTML() {
        const progress = this.guesses.length / 9 * 100;
        document.getElementById("wins").innerHTML = (`Wins: ${this.wins}`);
        document.getElementById("losses").innerHTML = (`Losses: ${this.losses}`);
        document.getElementById("number-of-guesses").innerHTML = (`You have made ${this.guesses.length} ` + 
            `out of 9 guesses.`); 
        document.getElementById("guesses").innerHTML = (`Guessed Letters so far: ${this.guesses}`);
        document.getElementById("progress").innerHTML = `<div class="progress"><div class="progress-bar"` +
        `role="progressbar" style="width:${progress}%;" aria-valuenow="25"` +
        `aria-valuemin="0" aria-valuemax="100"></div></div>`; 
        document.getElementById("updates").innerHTML = this.update;
    },
    // new round same player, no reset of wins / losses
    newRound() {
        this.won = false;
        this.guesses = [];
        this.update = "Type a letter to get started!";
        this.computerGuessGenerator();
        this.updateHTML();
    },
    // reset all variables
    reset() {
        this.wins = 0;
        this.losses = 0;
        this.newRound();
    },
};   

// set up before user activity
game.computerGuessGenerator();
game.updateHTML();

// catches user input via keys
document.onkeyup = (event) => {
    // determine pressed key, comes in format "KeyA"
    let userGuess = event.code;
    // input other than letters will be undefined
    userGuess = userGuess.split("Key")[1];
    console.log("userGuess", userGuess);

    // checks if valid input and still valid to play (not won, not too many guesses)
    if (game.guesses.length < 9 && game.won == false) {
        if (userGuess && !game.guesses.includes(userGuess)) {
            game.playGame(userGuess);
        } else if (userGuess === undefined) {
            game.update = "Invalid Input. Letters Only.";
            game.updateHTML();
        } else if (game.guesses.includes(userGuess)) {
            game.update = `Invalid Input. You already used the letter ${userGuess}.`;
            game.updateHTML(); 
        }
    }  
};

// reset button
document.getElementById("reset-btn").onclick = function() {
    // document.getElementById("updates").parentNode.style.visibility = "visible";
    game.reset();
};

// play again button
document.getElementById("play-again-btn").onclick = function() {
    game.newRound();
};