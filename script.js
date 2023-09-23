//rock = 0 --- paper = 1 --- scissors = 2
const choiceArray = ['rock', 'paper', 'scissors'];

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
    const userChoiceCap = capitalize(choiceArray[userNum]);
    const computerChoiceCap = capitalize(choiceArray[computerNum]);
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



function round(){

    let userChoice = prompt('Choose: "rock", "paper" or "scissors"');
    //keeps prompting the user for input if the input didn't look anything like "rock", "PAPER" or "sCiSSorS"
    while(userChoice.toLowerCase() !== 'rock' && userChoice.toLowerCase() !== 'paper' && userChoice.toLowerCase() !== 'scissors'){
        userChoice = prompt('That was hilarious. Now choose "rock", "paper" or "scissors"');
    }
    //the computer makes a choice
    const computerChoice = computerChoose();

    //the choices are compared and an object containing the scores and the result description comes back
    const resultObj = compare(userChoice.toLowerCase(), computerChoice);
    return resultObj;
}

function game(){
    //the length of the game
    const rounds = 5;
    //initial score
    const score = {
        userScore: 0,
        computerScore: 0
    }

    //for each round, add the scores to the total and display the total score and the result description to the console
    for(let i = 0; i < rounds; i++){
        let roundResult = round();
        score.userScore += roundResult.userScore;
        score.computerScore += roundResult.computerScore;

        console.log(roundResult.text);
        console.log(`You: ${score.userScore} | Computer: ${score.computerScore}`);
    }

    //Decides the winner of the entire game
    if(score.userScore > score.computerScore){
        console.log('Yay, u r winnar!');
    } else if (score.userScore < score.computerScore) {
        console.log('You is lose, oh no...');
    } else {
        console.log('It would seem that a tie is what is happenning here.');
    }
}

game();