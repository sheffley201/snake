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
