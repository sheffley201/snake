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

  newDir = event.keyCode;

  if (newDir != initialDir) {
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
    clearTimeout(moveTime);
    moveSnake();
  }


};

const moveSnake = () => {
  console.log('moving');
  let firstPos = positions[0];
  let lastPos = positions[positions.length - 1];
  let lastSnake = snake[snake.length - 1];
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

//changeDir(initialDir);
window.addEventListener('keydown', changeDir);
//window.addEventListener('keydown', )
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
