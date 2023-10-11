//rock = 0 --- paper = 1 --- scissors = 2
const choiceArray = ['rock', 'paper', 'scissors'];
//initial score
const globalScore = {
    userScore: 0,
    computerScore: 0,
    results: []
}
let round = 0;
let roundOld = 0;

const resultsDetails = document.querySelector('.results-details');
const resultsHeader = document.querySelector('.results-header');
const rockBtn = document.querySelector('#rock');
const paperBtn = document.querySelector('#paper');
const scissorsBtn = document.querySelector('#scissors');
const choicesElems = Array.from(document.querySelectorAll('.choice'));

//turns bruh into Bruh
function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//generates a random number between 0, 1 and 2
//then translates it into a word and returns it
function computerChoose(){
    const choice = Math.floor(Math.random() * 3);
    return choiceArray[choice];
}


//compares the user's choice and the computer's choice and decides the winner of the round
function compare(userChoice, computerChoice){
    
    //translates words to numbers, will save a lot of typing at the comparison stage
    const userNum = choiceArray.indexOf(userChoice);
    const computerNum = choiceArray.indexOf(computerChoice);

    //rock becomes Rock etc.
    const userChoiceCap = capitalize(userChoice);
    const computerChoiceCap = capitalize(computerChoice);
    let result;

    //same number, same word, it's a tie
    if(userNum === computerNum){
        result = {
            text: 'It is a tie',
            userScore: 0,
            computerScore: 0
        }
    }
    //every word in choiceArray beats the one to the left, so, if the number is 1 unit bigger, it's the winning one
    //except for "rock", it has no neighbor to its left. "rock" beats "scissors", which is the furthest to the right, or 2 units bigger
    else if(userNum - computerNum === 1 || userNum - computerNum === -2){
        result = {
            text: `You Win. ${userChoiceCap} beats ${computerChoiceCap}`,
            userScore: 1,
            computerScore: 0
        }
    }
    //if none of the above are true, computer wins
    else{
        result = {
            text: `Computer Wins. ${computerChoiceCap} beats ${userChoiceCap}`,
            userScore: 0,
            computerScore: 1
        }
    }
    return result;
}



function playRound(userChoice){

    //the computer makes a choice
    const computerChoice = computerChoose();
    console.log('playRound userchoice ', userChoice);

    //the choices are compared and an object containing the scores and the result description comes back
    const resultObj = compare(userChoice, computerChoice);
    return resultObj;
}

//adds the current score to the global score and to the frontend
function addRoundScore(choice){

    const roundScore = playRound(choice);
    globalScore.userScore += roundScore.userScore;
    globalScore.computerScore += roundScore.computerScore;
    globalScore.results.push(roundScore.text);
    round++;

    if(round > roundOld){
        const liRoundResult = document.createElement('li');
        liRoundResult.textContent = `Round ${round}: ${globalScore.results[round-1]}`;
        resultsDetails.appendChild(liRoundResult);
        roundOld = round;
    }
}

function checkForWin(){

    if(globalScore.computerScore < 5 && globalScore.userScore < 5)
        return false;

    if(globalScore.userScore > globalScore.computerScore){
        resultsHeader.textContent = 'Yay, u r winnar!';
    } else if (globalScore.userScore < globalScore.computerScore) {
        resultsHeader.textContent = 'You is lose, oh no...';
    } else {
        resultsHeader.textContent = 'It would seem that a tie is what is happenning here.';
    }
    return true;
}

function handleClickChoice(){
    addRoundScore(this.id);
    const win = checkForWin();
    if(win){
        endGame();
    }
}

function initGame(){

    choicesElems.forEach(choiceElem => {
        choiceElem.addEventListener('click', handleClickChoice);
    });
}

function endGame(){

    choicesElems.forEach(choiceElem => {
        choiceElem.removeEventListener('click', addRoundScore);
    });
}

initGame();