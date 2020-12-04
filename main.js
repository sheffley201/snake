//keyboard key codes(left,right,down,up)
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

//pull snake from html
const snake = Array.from(document.querySelectorAll('.snake-section'));
const positions = [{xPos: 260, yPos: 240}, {xPos: 250, yPos: 240}, {xPos: 240, yPos: 240}];
const gameArea = document.querySelector('.game-container');

// Set snake direction initially to left, so user can't go left at first
let initialDir = RIGHT_DIR;
let newDir;
let moveTime;

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
  moveTime = setTimeout(() => {
    moveSnake();
  }, 100);
}
//create function to add the snake longer
const longerSnake = () => {
  //create new snake section
  const newSnake = document.createElement('div');
  newSnake.className = 'snake-section';
  snake.push(newSnake);
  let lastCoords = positions[positions.length - 1];
  //set determined coordinates
  newSnake.style.top = lastCoords.xPos + 'px';
  newSnake.style.left = lastCoords.yPos + 'px';
  positions.push({xPos: lastCoords.xPos, yPos: lastCoords.yPos});
  gameArea.appendChild(newSnake);
}

window.addEventListener('keydown', changeDir);
//pull apple element from HTML
const apple = document.querySelector('.apple');
let appleX;
let appleY;
let validPos = false;

const newApple = function() {
  do {
    //random x coordinate
    appleX = Math.floor(Math.random() * 50) * 10;
    //random y coordinate
    appleY = Math.floor(Math.random() * 50) * 10;
    isValid();
    console.log(appleX + " " + appleY);
  } while (!validPos);
  //set new coordinates for apple
  apple.style.top = appleY + 'px';
  apple.style.left = appleX + 'px';
  validPos = false;
}
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
    newApple();
    longerSnake();
  }
}
newApple();
moveSnake();
for (let i = 0; i < 500; i++) {
  longerSnake();
}
