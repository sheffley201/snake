//keyboard key codes(left,right,down,up)
const LEFT_DIR = 37;
const UP_DIR = 38;
const RIGHT_DIR = 39;
const DOWN_DIR = 40;

// Set snake direction initially to right
let initialDir = RIGHT_DIR;

const changeDir = (newDir) => {
  // Change the direction of the snake
  if (newDir == initialDir) return;

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
};
//pull apple element from HTML
const apple = document.querySelector('.apple');

const newApple = function() {
  //while x and y are not both equal to x and y of a snake section
  //random x coordinate
  let x = Math.floor(Math.random() * 50) * 10;
  //random y coordinate
  let y = Math.floor(Math.random() * 50) * 10;
  //set new coordinates for apple
  apple.style.top = y + 'px';
  apple.style.left = x + 'px';
  console.log(x + ", " + y);
}
<<<<<<< HEAD
=======

newApple();
>>>>>>> 030b7c3... Removed test event listener
