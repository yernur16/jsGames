const grid = document.querySelector(".grid");
const scoreDisplay = document.querySelector("#score");
const blockWidth = 100;
const blockHeight = 20;
const boardWidth = 780;
const boardHeight = 600;
const ballDiameter = 20;
let xDirection = -2;
let yDirection = 2;

let timerId;
let score = 0;

const userStart = [300, 10];
let currentPosition = userStart;

const ballStart = [340, 50];
let ballCurrentPosition = ballStart;

//create Block
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis, yAxis];
    this.bottomRight = [xAxis + blockWidth, yAxis];
    this.topLeft = [xAxis, yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth, yAxis + blockHeight];
  }
}

//all my blocks
const blocks = [
  // new Block(230, 500),
  // new Block(340, 500),
  // new Block(450, 500),
  // new Block(120, 460),
  // new Block(230, 460),
  // new Block(340, 460),
  // new Block(450, 460),
  // new Block(560, 460),
  new Block(10, 420),
  // new Block(120, 420),
  // new Block(230, 420),
  // new Block(340, 420),
  // new Block(450, 420),
  // new Block(560, 420),
  new Block(670, 420),
  // new Block(120, 380),
  // new Block(230, 380),
  // new Block(340, 380),
  // new Block(450, 380),
  // new Block(560, 380),
  // new Block(230, 340),
  // new Block(340, 340),
  // new Block(450, 340),
];

//draw all my blocks function
function addBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = document.createElement("div");
    block.classList.add("block");
    block.style.left = blocks[i].bottomLeft[0] + "px";
    block.style.bottom = blocks[i].bottomLeft[1] + "px";
    grid.appendChild(block);
  }
}

addBlocks();

//draw the user
function drawUser() {
  user.style.left = currentPosition[0] + "px";
  user.style.bottom = currentPosition[1] + "px";
}

//add user
const user = document.createElement("div");
user.classList.add("user");
drawUser();
grid.appendChild(user);

//move user
function moveUser(e) {
  switch (e.key) {
    case "ArrowLeft":
      if (currentPosition[0] > 0) {
        currentPosition[0] -= 10;
        drawUser();
      }
      break;
    case "ArrowRight":
      if (currentPosition[0] < boardWidth - blockWidth) {
        currentPosition[0] += 10;
        drawUser();
      }
      break;
  }
}

document.addEventListener("keydown", moveUser);

//draw the ball
function drawBall() {
  ball.style.left = ballCurrentPosition[0] + "px";
  ball.style.bottom = ballCurrentPosition[1] + "px";
}

//add ball
const ball = document.createElement("div");
ball.classList.add("ball");
drawBall();
grid.appendChild(ball);

//move ball
function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollisions();
  // requestAnimationFrame(moveBall);
}

timerId = setInterval(moveBall, 10);
// requestAnimationFrame(moveBall);
// request = requestAnimationFrame(moveBall)

//check for collisions
function checkForCollisions() {
  //check for block collisions
  for (let i = 0; i < blocks.length; i++) {
    if (
      ballCurrentPosition[0] > blocks[i].bottomLeft[0] &&
      ballCurrentPosition[0] < blocks[i].bottomRight[0] &&
      ballCurrentPosition[1] + ballDiameter > blocks[i].bottomLeft[1] &&
      ballCurrentPosition[1] < blocks[i].topLeft[1]
    ) {
      const allBlocks = Array.from(document.querySelectorAll(".block"));
      allBlocks[i].classList.remove("block");
      blocks.splice(i, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;

      //check for win
      if (blocks.length === 0) {
        scoreDisplay.innerHTML = "You win!!!";
        clearInterval(timerId);
        // cancelAnimationFrame(moveBall)
        document.removeEventListener("keydown", moveUser);
      }
    }
  }
  //check for wall collisions
  if (
    ballCurrentPosition[0] >= boardWidth - ballDiameter ||
    ballCurrentPosition[1] >= boardHeight - ballDiameter ||
    ballCurrentPosition[0] <= 0
  ) {
    changeDirection();
  }
  //check for user collisions
  if (
    ballCurrentPosition[0] > currentPosition[0] &&
    ballCurrentPosition[0] < currentPosition[0] + blockWidth &&
    ballCurrentPosition[1] > currentPosition[1] &&
    ballCurrentPosition[1] < currentPosition[1] + blockHeight
  ) {
    changeDirection();
  }
  if (ballCurrentPosition[1] <= 0) {
    //check for game over
    clearInterval(timerId);
    scoreDisplay.innerHTML = " Ooopsie!!! You lose";
    document.removeEventListener("keydown", moveUser);
  }
}

function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }
}
