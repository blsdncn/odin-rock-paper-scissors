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

function playRound(){
  const humanChoice = getHumanChoice();
  const computerChoice = getComputerChoice();
  const roundResult = getPlayResult(humanChoice,computerChoice);

  if(roundResult === -1){
    console.log("Round inconclusive due to error.");
    return roundResult;
  }

  let resultString = '';

  switch (roundResult){
    case 0:
      resultString += 'Tied!';
      break;
    case 1:
      resultString += 'You won!';
      break;
    case 2:
      resultString += 'You lost!';
      break;
  }
  resultString += `\nYou played: ${firstUpper(humanChoice)} | Computer played: ${firstUpper(computerChoice)}`;
  console.log(resultString);
  return roundResult;
}

function playGame(numRounds = 5){
  let humanScore = 0;
  let computerScore = 0;
  let ties = 0;

/*
=============== Welcome to Rock-Paper-Scissors ===============
*/

  console.log('=============== Welcome to Rock-Paper-Scissors ===============\n===============          By: blsdncn           ===============');
  for(let i = 1; i <= numRounds; i++){
    console.log(`-------------- Round ${i} --------------`);
    switch(playRound()) {
      case 0: 
        ties ++;
        break;
      case 1:
        humanScore++;
        break;
      case 2:
        computerScore++;
        break;
    }
    console.log(`Wins: ${humanScore} | Losses: ${computerScore} | Ties: ${ties}`);
  }
  let resultString = `==== Game over! ====\nResult: `;
  if(humanScore === computerScore){
    resultString += 'Tie!';
  } else{
    resultString += `${humanScore > computerScore ? 'Player': 'Computer'} Wins!`
    resultString += '\n=============================================================='
  }
  console.log(resultString);
}

playGame();