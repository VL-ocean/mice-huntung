﻿## User goal/need

- Have fun!
- Feed the cat!
- Make the right choice!
- Use your sixth sense

## App steps/functionality

### 1. User clicks on the link. The home area opens.
### 2. User can see:
* The game title
* A small paragraph with instructions
* The area to choose a character (2-5 cat illustrations)
* The field to enter the name
* The “Start game” button

### 3. User clicks on “Start game”. The game area opens.

### 4. The game area has:
* Game field (clickable objects are displayed)
* Area where user`s character and name are displayed
* The number of tries displayed.
* Current score displayed
* The “Restart” button. It acts as the “Start game” button. It allows the user to start the game again with the same character and name he has chosen before and anytime he wants. (For example if he understands that he will not win this game and he does not want to continue playing)
* The “Exit” button. It takes the user back to the home area. Where he can choose another character and name and start the game again.

### 5. User makes his choice and clicks the object. What happens next:
* The inside content is displayed.
* The try count is reduced by one.
* If it is the right choice, the score is updated. If it is the wrong/empty choice, the score is not updated.
* The message is displayed to the user. Kind of “You have found it! The cat is happy!” or “Bad luck this time. Try again!”. 
* The new round is ready and activated by the user clicking another choice object.

### 6. When the user makes his last choice, the new algorithm activates (game over function):
* After the last score is counted and the final message is displayed, the game area disappears.
* The result area opens at full screen.
* The user can see:
   * His character happy or sad
   * His name
   * The total score 
   * The button to Play again or Return to home area
   * Future features:
      * Bonus level “The mouse hunts the cats”. Revenge game


## JavaScript functions

### validateUsername()
(onchange="validateUsername()") backup plan
* It validates the user’s name to make sure it consists of letters only, no spaces, min 1 and max up to 20 symbols. If possible, use censor validation too. It displays a message if the input is invalid or such user’s name is forbidden.
* If the entered user’s name is valid, it gets assigned into the global variable username, which is used later throughout the game.

### assignCharacter()
Once the home page is loaded, it adds EventListener to the boxes containing the characters from characterArray. Once the user clicks the character image he likes, the function assigns the index of the object to the character value.

### startGame()
It reacts on the user`s click on the “Start Game”  button. 
* calls validateUsername()
* then checks if character is true, if not displays message: “Please choose the character”
* then if the username and character values both return true, it calls runGame(). It takes the user to the game area or a new page.
(The result is false if the argument is the empty String (its length is zero); otherwise the result is true)

### runGame() 
Starts when the user clicks the “Start game” button. It displays the game area and calls randomiseContentArray() function.
Add event listeners to the object boxes.

### randomiseContentArray()
Mixes the contentArray so that every new game has various layouts of mice inside the boxes.
Working example of code:
```
let contentArray = [{type: 'mouse', value: 1, image: 'image src1'}, {type: 'empty', value: 0, image: 'image src2'}, {type: 'mouse', value: 1, image: 'image src3'}, {type: 'empty', value: 0, image: 'image src4'}, {type: 'mouse', value: 1, image: 'image src5'}, {type: 'empty', value: 0, image: 'image src6'}, {type: 'mouse', value: 1, image: 'image src7'}, {type: 'empty', value: 0, image: 'image src8'}, {type: 'mouse', value: 1, image: 'image src9'}, {type: 'empty', value: 0, image: 'image src10'}];
console.log(contentArray);

function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
}

shuffleArray(contentArray);
console.log(contentArray);
```
**Reference:** https://stackoverflow.com/a/12646864 

### checkChoice()
It controls the response to the user`s click by calling the appropriate function. It gets the attr of the box the user clicked and uses this number to access the type of the object under this index from the Array:
* calls removeEventListener(attr/index number) function
* If it is a “mouse” value, it calls positiveChoice(attr/index number) function
* If it is an “empty” value, it calls negativeChoice(attr/index number) function
* If it is an “invalid” value, it throws an alert message that this value is invalid.

### removeEventListener(attr/index number)
This function removes the Event Listener from the box that has already been clicked. So that 2-nd … n-th click on that box would not call the checkChoice() function again.

### positiveChoice(attr/index number)
This function:
* Displays mouse picture (add Class with new background to the corresponding box, exit & entry animation, plays sound effect)
* calls displayMessage(object.type) function
* calls incrementScore() function
* calls countTries() function

### negativeChoice(attr/index number)
This function:
* Displays empty picture (add Class with new background to the corresponding box, exit & entry animation, plays sound effect)
* calls displayMessage(object.type) function
* calls countTries() function

### displayMessage(object.type)
This function takes the object`s type as a parameter. It displays a praising message for guessing right or an encouraging message to try again if guessed wrong. It shows a pop up that vanishes in 5-7 seconds.

### incrementScore()
This function increases the total score by adding one each time it is called. It reads the current value, then adds one, then reassigns the value back using the innerHTML method.

### countTries()
* It reduces the amount of maxTries by one each time it is called..
* Then it checks whether the amount of tries is greater than 0, and the game continues. If not:
   * It calls countResult() function
* Then it checks if the score value equals the winValue, if it does, the displayWin() function is called. If not: 
   * The game continues until the user uses all his choices or gets enough scores to win.

### countResult()
It compares the score with the win value, and calls the function based on the result of comparison:
* displayWin() function
* displayLoss() function

### displayWin()
This function takes the user to the result area. It displays the username, happy character (character.happy - returns image src), the tries used (optional) and the total score. It starts the sound/animation of the win.

### displayLoss()
This function takes the user to the result area. It displays the username, sad character (character.sad - returns image src), the tries used (optional) and the total score. It starts the sound/animation of the loss.

### restartGame() (one page layout)
* change background of all boxes back to main one;
* reassign currentTries with maxTries 
* call removeEventListener(attr/index number) in a loop
* call runGame()

### exitGame() (one page layout)
* reassign username to empty value;
* reassign character to empty value;


## JavaScript global variables

let **username** 
- stores the user`s name (Tom)

let **character** 
- stores the chosen character index (characterArray[1])

let **characterArray** 
- contains objects with images of characters. For example:
   - [{name: ‘orange cat’, normal: ‘image src’, happy: ‘image src’, sad: ‘image src’}, {name: ‘red cat’, normal: ‘image src’, happy: ‘image src’, sad: ‘image src’}, {name: ‘green cat’, normal: ‘image src’, happy: ‘image src’, sad: ‘image src’}, {name: ‘blue cat’, normal: ‘image src’, happy: ‘image src’, sad: ‘image src’}]

let **contentArray** 
- contains the data for the game. The Array length depends on the amount of the boxes. For example:
   - [{type: 'mouse', value: 1}, {type: 'empty', value: 0}, {type: 'mouse', value: 1}, {type: 'empty', value: 0}, {type: 'mouse', value: 1}, {type: 'empty', value: 0}, {type: 'mouse', value: 1}, {type: 'empty', value: 0}, {type: 'mouse', value: 1}, {type: 'empty', value: 0}]

let **winValue** 
 - a number of required points to win

let **maxTries** 
 - a number of tries the user has when the game starts


## Buttons

### 1. Restart 
- refreshes the page, so that the game area reloads and the user can start again. If one page layout, call restartGame() function
### 2. Exit 
- opens the Home page, all progress is lost. The user can start again, choose name and character. If one page layout, call exitGame() function
### 3. Start game 
- calls startGame() function


## Other

### Instructions:
* Find 5 mice behind the doors to feed the cat
* Click on the door to open it
* Be careful! You have only 6 tries
* Test your luck!

### Settings
- 9 doors (6 mice, 3 empty)
- 5 mice to win
- 6 tries


## Design

### Fonts:

- **Title** - Caudex normal
- **Headings** - Comfortaa
- **Text** - Caudex

### Colours
- `#BD6E2A` orange 
- `#221916` brown
- `#fff` white; 