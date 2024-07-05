// Global variables, arrays
let username = "";
let character = 3;
let characterArray = [{
    name: "grey",
    normal: "url('./assets/images/grey.webp')",
    happy: "url('./assets/images/grey-happy.webp')",
    sad: "url('./assets/images/grey-sad.webp')",
},
{
    name: "orange",
    normal: "url('./assets/images/orange.webp')",
    happy: "url('./assets/images/orange-happy.webp')",
    sad: "url('./assets/images/orange-sad.webp')",
},
{
    name: "spot",
    normal: "url('./assets/images/spot.webp')",
    happy: "url('./assets/images/spot-happy.webp')",
    sad: "url('./assets/images/spot-sad.webp')",
}];
let contentArray = [{
    type: "mouse",
    value: 1,
},
{
    type: "empty",
    value: 0,
},
{
    type: "mouse",
    value: 1,
},
{
    type: "mouse",
    value: 1,
},
{
    type: "empty",
    value: 0,
},
{
    type: "mouse",
    value: 1,
},
{
    type: "empty",
    value: 0,
},
{
    type: "mouse",
    value: 1,
},
{
    type: "mouse",
    value: 1,
}];

// Selection of elements from DOM
let characters = document.getElementsByClassName("character");
let gameCharacter = document.getElementById("game-area-character");
let objectsArray = document.getElementsByClassName("object");
let currentScore = document.getElementById("score");
let tryCount = document.getElementById("tries");
let resultCharacter = document.getElementById("result-area-character");
let totalScore = document.getElementById("total-score");


// Once the page loads, add event listeners to buttons and characters
document.addEventListener("DOMContentLoaded", function() {
    buttonReact();
    characterListen();
});

// Functions

/**
 * Adds Event Listener to all buttons, 
 * calls the function according to the id of the button
 */
function buttonReact() {
    let btnArray = document.getElementsByTagName('button');
    for (let button of btnArray) {
        button.addEventListener("click", function() {
            if(this.id === "start") {
                startGame();
            } else if (this.id === "restart-game") {
                restartGame("game-area", "game-area");
                console.log("calls restart function");
            } else if (this.id === "exit-game") {
                console.log("calls exit function");
            } else if (this.id === "restart-result") {
                restartGame("result-area", "game-area");
                console.log("calls restart function");
            } else if (this.id === "exit-result") {
                console.log("calls exit function");
            } else {
                alert("unknown button id");
            }
        });
    }
}

/**
 * Adds Event Listener to characters on start area, 
 * assigns index to character variable to use characterArray later
 */
function characterListen() {
    for (let option of characters) {
        option.addEventListener("click", function() {
            if (this.id === "grey") {
                borderChange(this);
                character = 0;
            } else if (this.id === "orange") {
                borderChange(this);
                character = 1;
            } else if (this.id === "spot") {
                borderChange(this);
                character = 2;
            } else {
                alert("unknown character id");
            }
        });
    }
}

/**
 * Removes border from all characters,
 * adds border to the last chosen character
 */
function borderChange(box) {
    for (let i of characters) {
        i.style.border = "none";
        i.style.boxShadow = "none";
    }
    box.style.border = "2px solid #BD6E2A";
    box.style.boxShadow = "#221916 2px 2px 2px";
}

/**
 * Runs the main game function, when valid username was created 
 * and a character was chosen
 */
function startGame() {
    let validUsername = false;
    let assignedCharacter = false;
    validUsername = validateUsername();
    if (validUsername) {
        assignedCharacter = assignCharacter();
        if (assignedCharacter) {
            runGame("start-area", "game-area");
        }
    }
}

/**
 * validates the username,
 * and assigns it to username variable
 */
function validateUsername() {
    let enteredUsername = document.getElementById('username').value;
    // The source https://stackoverflow.com/questions/9628879/javascript-regex-username-validation
    let usernamePattern = /^[a-zA-Z ]+$/;
    if (enteredUsername.length < 1) {
        alert("Please enter your name");
    } else if (enteredUsername.length > 20) {
        alert("You can use up to 20 characters only");
    } else if (enteredUsername.match(usernamePattern)) {
        username = enteredUsername;
        return true;
    } else {
        alert("Please use letters only");
    }
}

/**
 * Checks if the character was chosen,
 * sets the chosen character image for the game area
 */
function assignCharacter() {
    if (character < 3) {
        let chosenCharacter = characterArray[character].normal; 
        // The source https://stackoverflow.com/questions/19066638/insert-javascript-variable-as-background-image-source
        gameCharacter.style.backgroundImage = chosenCharacter;
        return true;
    } else {
        alert("Please choose a character");
    }
}

/**
 * The function prepares the game area, the clickable objects and the contentArray
 */
function runGame(a, b) {
    randomiseContentArray(contentArray);
    objectsListen();
    changeArea(a, b);
    displayMessage("Feed me", "game-area-message");
}

/**
 * Manages the area transfer, the current area disappears,
 * the next area arrives
 */
function changeArea(a, b) {
    document.getElementById(a).style.display = "none";
    document.getElementById(b).style.display = "block";
}

/**
 * Mixes the contentArray, which is passed as a parameter, 
 * so that every new game has various layouts of mice inside the boxes.
 */
function randomiseContentArray(array) {
    // The source https://stackoverflow.com/a/12646864 
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Adds event listeners to objects, works once
 */
function objectsListen() {
    for (let object of objectsArray) {
        object.addEventListener("click", checkChoice, {
            once: true,
          });
    }
}

/**
 * Reads data-attr of the clicked box and saves it as index number,
 * reads type property of the object from contentArray under that index,
 * checks the user's choice and calls the function to display the outcome
 */
function checkChoice() {
    let indexNum = this.getAttribute("data-attr");
    let choice = contentArray[indexNum].type;
    if (choice === "mouse") {
        positiveChoice(indexNum);
    } else if (choice === "empty") {
        negativeChoice(indexNum);
    } else {
        alert(`Invalid type: ${choice}`);
    }
}

/**
 * Changes the background of the clicked object to the mouse picture,
 * displays a message, increaments the score
 * and reduces the tries
 */
function positiveChoice(indexNum) {
    objectsArray[indexNum].style.backgroundImage = "url('./assets/images/mouse.webp')";
    displayMessage("Excellent", "game-area-message");
    incrementScore();
    countTries();
    checkValues();
}

/**
 * Changes the background of the clicked object to the empty picture,
 * displays a message and reduces the tries
 */
function negativeChoice(indexNum) {
    objectsArray[indexNum].style.backgroundImage = "url('./assets/images/empty.webp')";
    displayMessage("Don't worry", "game-area-message");
    countTries();
    checkValues();
}

/**
 * Displays message to the user, after each choice
 */
function displayMessage(message, id) {
    document.getElementById(id).innerHTML = message + ', ' + username + '!';
}

/**
 * Reads current score, increases it by one
 * and assigns the new number into the score box
 */
function incrementScore() {
    let oldScore = parseInt(currentScore.innerHTML);
    let newScore = ++oldScore;
    currentScore.innerHTML = newScore;
}

/**
 * Reads the current number of attempts, decreases it by one
 * and assigns the new number into its box
 */
function countTries() {
    let oldAmount = parseInt(tryCount.innerHTML);
    let newAmount = --oldAmount;
    tryCount.innerHTML = newAmount;
}

/**
 * Reads and checks current number of attempts and score,
 * proceeds to countResult if tries equal zero 
 * or the score equals six
 */
function checkValues() {
    if (parseInt(tryCount.innerHTML) === 0) {
        objectsReset();
        countResult();
    } else if (parseInt(currentScore.innerHTML) === 6) {
        objectsReset();
        window.setTimeout(displayWin, 1500);
    }
}

/**
 * Compares user score with win score,
 * calls next functions to display the result to the user
 */
function countResult() {
    let winValue = 5;
    let userScore = parseInt(currentScore.innerHTML);
    if (userScore === winValue) {
        window.setTimeout(displayWin, 1500);
    } else if (userScore < winValue) {
        window.setTimeout( displayLoss, 1500);
    } else {
        alert("Invalid user score");
    }
}

/**
 * Takes the user to the result area, shows the happy character,
 * displays the message and the total score
 */
function displayWin() {
    changeArea("game-area", "result-area");
    resultCharacter.style.backgroundImage = characterArray[character].happy;
    displayMessage("Well done", "result-area-message");
    totalScore.innerHTML = currentScore.innerHTML;
}

/**
 * Takes the user to the result area, shows the sad character,
 * displays the message and the total score
 */
function displayLoss() {
    changeArea("game-area", "result-area");
    resultCharacter.style.backgroundImage = characterArray[character].sad;
    displayMessage("Better luck next time", "result-area-message");
    totalScore.innerHTML = currentScore.innerHTML;
}

/**
 * Removes event listeners from objects
 */
function objectsReset() {
    for (let object of objectsArray) {
        object.removeEventListener("click", checkChoice);
    }
}

/**
 * Reacts to user`s click on restart and play again buttons,
 * prepares the game area for a new game/round
 */
function restartGame(a, b) {
    objectsReset();
    currentScore.innerHTML = 0;
    tryCount.innerHTML = 6;
    resetBackground();
    runGame(a, b);
}

/**
 * Removes event listeners from all boxes
 */
function resetBackground() {
    for (let object of objectsArray) {
        object.style.backgroundImage = "url('./assets/images/door.webp')";
    }
}

