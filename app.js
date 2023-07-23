//variables below
let inputDir = { x: 0, y: 0 };
const foodS = new Audio("/sounds/food.mp3");
const gameOv = new Audio("/sounds/gameover.mp3");
const motionS = new Audio("/sounds/motion.mp3");
const themeS = new Audio("/sounds/theme.mp3");
let speed = 5;
let score = 0;
let lasttime = 0;
let snakearr = [{ x: 15, y: 15 }];
food = { x: 10, y: 8 };

//various functions below
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lasttime) / 1000 < 1 / speed) return;
  lasttime = ctime;
  gameEngine();
}

function isCollide(snake) {
  for (let i = 1; i < snakearr.length; i++) {
    //bumping into self
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    //bumping into walls
    if (
      snake[0].x >= 20 ||
      snake[0].x <= 0 ||
      snake[0].y >= 20 ||
      snake[0].y <= 0
    )
      return true;
  }
}

function gameEngine() {
  //Collision
  if (isCollide(snakearr)) {
    themeS.pause();
    gameOv.play();
    inputDir = { x: 0, y: 0 };
    alert("Game Over ! Press any Key to play Again !");
    snakearr = [{ x: 15, y: 15 }];
    themeS.play();
    score = 0;
  }

  //Updating Score on Eating
  if (snakearr[0].y === food.y && snakearr[0].x === food.x) {
    foodS.play();
    score += 1;
    if (score > val) {
      val = score;
      localStorage.setItem("hiscore", JSON.stringify(val));
      highscorebox.innerHTML = "HiScore: " + val;
    }
    scorebox.innerHTML = "Score: " + score;
    snakearr.unshift({
      x: snakearr[0].x + inputDir.x,
      y: snakearr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 17;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the Snake
  for (let i = snakearr.length - 2; i >= 0; i--) {
    snakearr[i + 1] = { ...snakearr[i] };
  }
  snakearr[0].x += inputDir.x;
  snakearr[0].y += inputDir.y;

  //Display Snake
  board.innerHTML = "";
  snakearr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) snakeElement.classList.add("head");
    else snakeElement.classList.add("snake");
    board.appendChild(snakeElement);
  });
  //Display Food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//main function below
let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  val = 0;
  localStorage.setItem("hiscore", JSON.stringify(val));
} else {
  val = JSON.parse(hiscore);
  highscorebox.innerHTML = "HiScore: " + hiscore;
}
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; //Game Starts
  themeS.play();
  motionS.play();
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
    default:
      break;
  }
});
