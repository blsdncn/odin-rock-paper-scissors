const VALID_CHOICES = ['rock','paper','scissors'];

function getComputerChoice(){
  return VALID_CHOICES[Math.floor(Math.random()*3)];
}

function getHumanChoice(){
  let choice = prompt("Type your move: 'rock', 'paper', or 'scissors'.").trim().toLowerCase(); 
  while(!VALID_CHOICES.includes(choice)){
    choice = prompt(`Invalid Choice. Type your move: 'rock', 'paper', or 'scissors'.`);
  }
  return choice;
}

function getChoiceNum(choice){
  const idxOfChoice = VALID_CHOICES.indexOf(choice);
  if(idxOfChoice === -1){
    return undefined;
  } else {
    return idxOfChoice;
  }
}

function getPlayResult(humanChoice,computerChoice){
  const humanChoiceNum = getChoiceNum(humanChoice);
  const computerChoiceNum = getChoiceNum(computerChoice);

  if(humanChoiceNum === undefined){
    console.error("Human Choice Invalid");
    return -1;
  }
  if(!computerChoiceNum === undefined){
    console.error("Computer Choice Invalid");
    return -1;
  }

  if(humanChoiceNum === computerChoiceNum){
    return 0; // tie
  }
  switch(humanChoiceNum){
    case 0: //played rock
      if(computerChoiceNum === 1){
        return 2; // pc played paper: loss
      } else {
        return 1; // pc played scissors: win
      }
    case 1: //played paper
      if(computerChoiceNum === 2){
        return 2; // pc played scissors: loss
      } else {
        return 1; // pc played rock: win
      }
    case 2: //played scissors
      if(computerChoiceNum === 0){
        return 2; // pc played rock: loss
      } else {
        return 1; // pc played paper: win
      }
    }
}

function firstUpper(str){
  return `${str.charAt(0).toUpperCase()}${str.slice(1)}`;
}

function playRound(humanChoice=undefined){
  if(humanChoice === undefined){
    const humanChoice = getHumanChoice();
  }
  const computerChoice = getComputerChoice();
  const roundResult = getPlayResult(humanChoice,computerChoice);
  const resultBox = document.querySelector('.result-box');
  let scoreBox = null;

  if(roundResult === -1){
    console.log("Round inconclusive due to error.");
    return roundResult;
  }

  let resultString = '';

  switch (roundResult){
    case 0:
      scoreBox = document.querySelector('.ties-box');
      resultString += 'Tied!';
      break;
    case 1:
      scoreBox = document.querySelector('.wins-box');
      resultString += 'You won!';
      break;
    case 2:
      scoreBox = document.querySelector('.losses-box');
      resultString += 'You lost!';
      break;
  }
  resultString += `\nYou played: ${firstUpper(humanChoice)} | Computer played: ${firstUpper(computerChoice)}`;
  resultBox.textContent = resultString; 
  incrementScoreBox(scoreBox);
  return roundResult;
}



const incrementScoreBox = (elm) => {
  const splitText = elm.textContent.split(' ');
  elm.textContent = `${splitText[0]} ${++splitText[1]}`;
}


const buttonsBox = document.getElementById("buttonsBox");
buttonsBox.addEventListener("click", (e) => {
  let choice = '';
  switch(e.target.id){
    case 'rock-button':
      choice = 'rock';
      break;
    case 'paper-button':
      choice = 'paper';
      break;
    case 'scissors-button':
      choice = 'scissors';
      break;
    default:
      return; 
  }
  playRound(choice);
});