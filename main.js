//keyboard key codes(left,right,down,up)
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

//pull snake from html
const snake = Array.from(document.querySelectorAll('.snake-section'));
const positions = [{xPos: 260, yPos: 240}, {xPos: 250, yPos: 240}, {xPos: 240, yPos: 240}];
//grab any other necessary elements
const gameArea = document.querySelector('.game-container');
const gameOver = document.querySelector('.game-over');
const resetButton = document.querySelector('.reset-game');

// Set snake direction initially to left, so user can't go left at first
let initialDir = RIGHT_DIR;
let newDir;
let moveTime;
let gameLost = false;
//create a variable for score
let score=0;
let displayscore = document.querySelector('.score');
let highScore = document.querySelector('.high-score');
let highScoreAmount = 0;

const changeDir = () => {
  // Change the direction of the snake
  //set newDir to the keykode pressed
  newDir = event.keyCode;
  //only if the key pressed is not the same as the previous key pressed
  if (newDir != initialDir) {
    //don't allow the snake to go the opposite direction as it's alread going
    if (newDir == LEFT_DIR && initialDir != RIGHT_DIR) {
      initialDir = newDir;
    } else if (newDir == UP_DIR && initialDir != DOWN_DIR) {
      initialDir = newDir;
    } else if (
      newDir == RIGHT_DIR &&
      initialDir != LEFT_DIR
    ) {
      initialDir = newDir;
    } else if (newDir == DOWN_DIR && initialDir != UP_DIR) {
      initialDir = newDir;
    }
    //clear timeout to stop previous snake direction from continuing
    clearTimeout(moveTime);
    //move the snake with the new direction
    moveSnake();
  }


};
//create funtion to move the snake
const moveSnake = () => {
  //if the player has not lost the game
  if (!gameLost) {
    //check for apple
    didEatApple();
    //pull necessary values from arrays
    let firstPos = positions[0];
    let lastPos = positions[positions.length - 1];
    let lastSnake = snake[snake.length - 1];
    //set new coordinates for the ending snake section, and send it to the front of the array
    if (initialDir == RIGHT_DIR) {
      lastPos.xPos = firstPos.xPos + 10;
      lastPos.yPos = firstPos.yPos;
      positions.unshift(lastPos);
      positions.pop();
      lastSnake.style.left = lastPos.xPos + 'px';
      lastSnake.style.top = lastPos.yPos + 'px';
      snake.unshift(lastSnake);
      snake.pop();
    } else if (initialDir == LEFT_DIR) {
      lastPos.xPos = firstPos.xPos - 10;
      lastPos.yPos = firstPos.yPos;
      positions.unshift(lastPos);
      positions.pop();
      lastSnake.style.left = lastPos.xPos + 'px';
      lastSnake.style.top = lastPos.yPos + 'px';
      snake.unshift(lastSnake);
      snake.pop();
    } else if (initialDir == UP_DIR) {
      lastPos.yPos = firstPos.yPos - 10;
      lastPos.xPos = firstPos.xPos;
      positions.unshift(lastPos);
      positions.pop();
      lastSnake.style.top = lastPos.yPos + 'px';
      lastSnake.style.left = lastPos.xPos + 'px';
      snake.unshift(lastSnake);
      snake.pop();
    } else if (initialDir == DOWN_DIR) {
      lastPos.yPos = firstPos.yPos + 10;
      lastPos.xPos = firstPos.xPos;
      positions.unshift(lastPos);
      positions.pop();
      lastSnake.style.top = lastPos.yPos + 'px';
      lastSnake.style.left = lastPos.xPos + 'px';
      snake.unshift(lastSnake);
      snake.pop();
    }
    //check for collision
    checkCollision();
    //move the snake every tenth of a second
    moveTime = setTimeout(() => {
      moveSnake();
    }, 100);
  }
}
//create function to add the snake longer
const longerSnake = () => {
  //create new snake section
  const newSnake = document.createElement('div');
  newSnake.className = 'snake-section';
  snake.push(newSnake);
  let lastCoords = positions[positions.length - 1];
  //set coordinates for new section as the same as the end
  newSnake.style.top = lastCoords.xPos + 'px';
  newSnake.style.left = lastCoords.yPos + 'px';
  positions.push({xPos: lastCoords.xPos, yPos: lastCoords.yPos});
  gameArea.appendChild(newSnake);
}

//create function to check if the player has run into the wall or itself
const checkCollision = () => {
  //take record of where the head of the snake is
  const snakeHead = positions[0];
  //if the snake head goes out of bounds, the player loses the game
  if (snakeHead.xPos >= 500 || snakeHead.xPos < 0 || snakeHead.yPos >= 500 || snakeHead.yPos < 0) {
    gameLost = true;
    gameOver.style.display = 'block';
    resetButton.style.display = 'block';
  }
  //loop over the positions array, execpt for the first one
  for (let section = 1; section < positions.length; section++) {
    let currentPos = positions[section];
    //if the head of the snake has the same coordinates as one of the trailing snake sections, then the snake has run into itself and the game is over
    if (snakeHead.xPos == currentPos.xPos && snakeHead.yPos == currentPos.yPos) {
      gameLost = true;
      gameOver.style.display = 'block';
      resetButton.style.display = 'block';
    }
  }
}

const resetGame = () => {
  resetButton.style.display = 'none';
  score = 0;
  displayscore.textContent = score;
  gameLost = false;
  gameOver.style.display = 'none';
  for (let section = snake.length - 1; section >= 3; section--) {
    gameArea.removeChild(snake[section]);
    snake.pop();
    positions.pop();
  }
  positions[0].xPos = 260;
  positions[1].xPos = 250;
  positions[2].xPos = 240;
  positions[0].yPos = 240;
  positions[1].yPos = 240;
  positions[2].yPos = 240;
  for (let section = 0; section < 3; section++) {
    snake[section].style.top = positions[section].yPos + 'px';
    snake[section].style.left = positions[section].xPos + 'px';
  }
  initialDir = RIGHT_DIR;
  moveSnake();
}
window.addEventListener('keydown', changeDir);
resetButton.addEventListener('click', resetGame);
//pull apple element from HTML
const apple = document.querySelector('.apple');
let appleX;
let appleY;
let validPos = false;
//function to randomly place the apple
const newApple = function() {
  do {
    //random x coordinate
    appleX = Math.floor(Math.random() * 50) * 10;
    //random y coordinate
    appleY = Math.floor(Math.random() * 50) * 10;
    //check if the new coordinates are good
    isValid();
  } while (!validPos);
  //set new coordinates for apple
  apple.style.top = appleY + 'px';
  apple.style.left = appleX + 'px';
  validPos = false;
}
//function to check if the position of the apple is not where the snake is
const isValid = () => {
  for (let coord of positions) {
    if (appleX == coord.xPos && appleY == coord.yPos) {
      validPos = false;
      return;
    } else {
      validPos = true;
    }
  }
}
//create function to check if the user has gotten an apple
const didEatApple = () => {
  snakePos = positions[0];
  if (snakePos.xPos == appleX && snakePos.yPos == appleY) {
    // increase the score whenever the snake eats an apple
    displayscore.innerHTML= ++score;
    //if the current score is higher than the high score, set the high score to the current score
    if (score > highScoreAmount) {
      highScoreAmount = score;
      highScore.textContent = highScoreAmount;
    }
    newApple();
    longerSnake();
  }
}

// more code
//place an apple randomly and start the snake moving
newApple();
moveSnake();
