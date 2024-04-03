

    const score = JSON.parse(localStorage.getItem('score')) ||  {
            wins: 0,
            losses: 0,
            draw: 0
            
        }
        updateScoreElement();

       
            

/*
    if (!score) {
        score = {
            wins: 0,
            losses: 0,
            draw: 0
        };
    }
*/

let isAutoPlaying = false;
let intervalId;
   
function autoPlay(){

    if(!isAutoPlaying){
       intervalId = setInterval(() => {
            const playerMove = pickComMove();
            playGame(playerMove);
        }, 1000);

        isAutoPlaying = true;
       
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
    }   
}

document.querySelector('.js-rock-button')
.addEventListener('click', () => {
    playGame('rock');
} );

document.querySelector('.js-paper-button')
.addEventListener('click', () => {
    playGame('paper');
} );


document.querySelector('.js-scissors-button')
.addEventListener('click', () => {
    playGame('scissors');
} );



document.body.addEventListener('keydown', (event) => {
   if (event.key === 'r'){
    playGame('rock');
   } else if (event.key === 'p'){
    playGame('paper');
   } else if (event.key === 's'){
    playGame('scissors');
   } else if (event.key === 'a'){
    autoPlay()
   }
});



function playGame(playerMove){
    let compMove = pickComMove()
    let result = '';

    if (playerMove === 'rock'){
        if (compMove === 'paper'){
            result = 'You loose';
        } else if (compMove = 'rock'){
            result = 'Draw';
        } else if (compMove === 'scissors'){
            result = 'You win';
        }
    }

    if (playerMove === 'paper'){
        if (compMove === 'rock'){
            result = 'You win';
        } else if (compMove === 'paper'){
            result = 'Draw';
        } else if (compMove === 'scissors'){
            result = 'You loose';
        }
    }

    if (playerMove === 'scissors'){
        if (compMove === 'rock'){
            result = 'You loose';
        } else if (compMove === 'paper'){
            result = 'You win';
        } else if (compMove === 'scissors'){
            result = 'Draw'
        }
    }

    if (result === 'You win'){
        score.wins += 1;
    } else if (result === 'You loose'){
        score.losses +=1;
    } else if (result === 'Draw'){
        score.draw += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

   updateScoreElement();

   document.querySelector('.js-result').innerHTML = result;
   document.querySelector('.js-move').innerHTML = 
   
   `You
   <img src="images/${playerMove}-emoji.png" class="icon">
   <img src="images/${compMove}-emoji.png" class="icon">
   Computer`
}  


function updateScoreElement(){
    document.querySelector('.js-score')
    .innerHTML = `wins: ${score.wins}, losses: ${score.losses}, draw: ${score.draw}`;
}


function pickComMove(){
    const randNum = Math.random();
    let compMove = '';

    if(randNum >= 0 && randNum < 0.333){
        compMove = 'rock';
    } else if (randNum >= 0.333 && randNum < 0.666){
        compMove = 'paper';
    } else if (randNum >= 0.666 && randNum < 1){
        compMove = 'scissors';
    }
    return compMove;
}
