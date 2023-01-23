
// choosing the divs
const table = document.querySelector(".game-table");
const player = document.querySelector(".player");
const computer = document.querySelector(".computer");
const pScore = document.querySelector(".player-score");
const cScore = document.querySelector(".computer-score");
const ball = document.querySelector(".ball");

// creating variables to choose the location of ball
let right = false;
let up = false;
// creating variables to catch goals
let isGoal = false;
// creating variables to increase the speed of the ball
let ballvelocity = 1.02;

// creating variables to catch scores
let scoreOfPlayer = 0;
let scoreOfComputer = 0;

// create condition structure to split the table in two
for (let i = 1; i <= 30; i++) {
  let net = document.createElement("div");
  net.classList.add("net");
  net.style.top = 16 * i + "px";
  table.appendChild(net);
}

// create variable to catch the position of ball
let tableBounds = table.getBoundingClientRect();

 // adding event listener to make the player move
window.addEventListener("mousemove", (e) => {

  // creating variables to take value of top
  let playerTop = parseInt(
    window.getComputedStyle(player).getPropertyValue("top")
  );

  let computerTop = parseInt(
    window.getComputedStyle(computer).getPropertyValue("top")
  );

  let playerBounds = player.getBoundingClientRect();
  tableBounds = table.getBoundingClientRect();

  // creating variables to take index of mouse in Y axis
  let playerY = e.clientY;
  // create condition structure to keep to player inside of table
  if (playerY >= 55 && playerY <= 440) {
    player.style.top = playerY + "px";
  }

  
});

// creating variables to randomly move the ball up and down
let leftRight = Math.floor(Math.random() * 2);
  let upDown = Math.floor(Math.random() * 2);

  leftRight ? (right = true) : (right = false);
  upDown ? (up = true) : (up = false);

let ballMove = setInterval(() => {

  // creating variables to catch bounds of player, computer and ball
  let playerBounds = player.getBoundingClientRect();
  let computerBounds = computer.getBoundingClientRect();
  let ballBound = ball.getBoundingClientRect();

  let ballLeft = parseInt(
    window.getComputedStyle(ball).getPropertyValue("left")
  );
  let ballTop = parseInt(window.getComputedStyle(ball).getPropertyValue("top"));

  let computerY = Math.floor(ballBound.top);
  computer.style.top = ballTop + 1.1 + "px";
  // making faster 
  if (right && up) {
    ball.style.left = ballLeft + 1 * ballvelocity + "px";
    ball.style.top = ballTop - 1 * ballvelocity + "px";
  } else if (right && !up) {
    ball.style.left = ballLeft + 1 * ballvelocity + "px";
    ball.style.top = ballTop + 1 * ballvelocity + "px";
  } else if (!right && up) {
    ball.style.left = ballLeft - 1 * ballvelocity + "px";
    ball.style.top = ballTop - 1 * ballvelocity + "px";
  } else if (!right && !up) {
    ball.style.left = ballLeft - 1 * ballvelocity + "px";
    ball.style.top = ballTop + 1 * ballvelocity + "px";
  }

  if (Math.floor(ballBound.bottom) > tableBounds.bottom && right) {
    up = true;
    right = true;
  }
  if (Math.floor(ballBound.bottom) > tableBounds.bottom && !right) {
    up = true;
    right = false;
  }
  if (Math.floor(ballBound.top) < tableBounds.top && !right) {
    up = false;
    right = false;
  }
  if (Math.floor(ballBound.top) < tableBounds.top && right) {
    up = false;
    right = true;
  }

  if (
    Math.floor(ballBound.left) < Math.floor(playerBounds.right) &&
    Math.floor(ballBound.top) >= Math.floor(playerBounds.top) &&
    Math.floor(ballBound.bottom) < Math.floor(playerBounds.bottom) &&
    !right
  ) {
    ballvelocity = ballvelocity + 0.32;
    let upDown = Math.floor(Math.random() * 2);
    up = upDown === 0 ? false : true;
    right = true;
  }

  if (
    Math.floor(ballBound.right) > Math.floor(computerBounds.left) &&
    Math.floor(ballBound.top) >= Math.floor(computerBounds.top) &&
    Math.floor(ballBound.bottom) <= Math.floor(computerBounds.bottom) &&
    right
  ) {
    ballvelocity = ballvelocity + 0.32;
    let upDown = Math.floor(Math.random() * 2);
    up = upDown === 0 ? false : true;
    right = false;
  }

  if (Math.floor(ballBound.right) >= tableBounds.right) {
    scoreOfPlayer++;
    pScore.textContent = scoreOfPlayer;
    isGoal = true;
  }
  if (Math.floor(ballBound.left) <= tableBounds.left) {
    scoreOfComputer++;
    cScore.textContent = scoreOfComputer;
    isGoal = true;
  }

  if (isGoal) {
    setTimeout(() => {
      isGoal = false;
    }, 1000);
    initialpositions();
  }
}, 1);

const initialpositions = () => {
    ball.style.left = "50%";
    ball.style.top = "50%";
    ballvelocity = 1.02;
    leftRight = Math.floor(Math.random() * 2);
    upDown = Math.floor(Math.random() * 2 );

    leftRight ? (right = true) : (right = false);
    upDown ? (up = true) : (up = false);
};