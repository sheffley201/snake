//keyboard key codes(left,right,down,up)
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

//pull snake from html
const snake = Array.from(document.querySelectorAll('.snake-section'));
const positions = [{xPos: 260, yPos: 240}, {xPos: 250, yPos: 240}, {xPos: 240, yPos: 240}];

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

window.addEventListener('keydown', changeDir);
//pull apple element from HTML
const apple = document.querySelector('.apple');

const newApple = function() {
  //random x coordinate
  let x = Math.floor(Math.random() * 50) * 10;
  //random y coordinate
  let y = Math.floor(Math.random() * 50) * 10;
  //set new coordinates for apple
  apple.style.top = y + 'px';
  apple.style.left = x + 'px';
  console.log(x + ", " + y);
}
newApple();
moveSnake();
