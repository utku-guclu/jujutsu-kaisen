const character = document.getElementById("character");
const jutsu = document.getElementById("fire");
const score = document.getElementById("score");
// sound
const kai = document.getElementById("kai");

// enemies
const yuji = document.getElementById("yuji");
const block = document.getElementById("block");
const fushi = document.getElementById("fushi");

const playBtn = document.querySelector("button");

let hitCount = 0;
let speed = 5;
let enemy;

let enemies = [yuji, block, fushi];
let stack = [];

window.onload = function () {
  document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
      jump();
    }
  });

  document.addEventListener("click", function (event) {
    fire();
  });

  playBtn.addEventListener("click", function (event) {
    renderGame();
  });
};

function chooseEnemy() {
  const randomIndex = Math.floor(Math.random() * enemies.length);
  return enemies[randomIndex];
}

function jump() {
  if (!character.classList.contains("jump")) {
    character.classList.add("jump");
  }
  setTimeout(() => character.classList.remove("jump"), 500);
}

function fire() {
  if (!jutsu.classList.contains("fire")) {
    jutsu.classList.add("fire");
    setTimeout(() => jutsu.classList.remove("fire"), 500 * 5);
  }
}

let checkDeadInterval;

function checkDead(enemy) {
  checkDeadInterval = setInterval(() => {
    const characterTop = parseInt(
      window.getComputedStyle(character).getPropertyValue("top")
    );
    const blockLeft = parseInt(
      window.getComputedStyle(enemy).getPropertyValue("left")
    );
    if (blockLeft < 40 && blockLeft > 20 && characterTop >= 120) {
      endGame();
      clearInterval(checkDeadInterval);
      alert("You LOSE!");
    }
  }, 10);
}

let checkHitInterval;

function checkHit(enemy) {
  checkHitInterval = setInterval(() => {
    const jutsuLeft = parseInt(
      window.getComputedStyle(jutsu).getPropertyValue("left")
    );
    const enemyLeft = parseInt(
      window.getComputedStyle(enemy).getPropertyValue("left")
    );

    const isJutsu = jutsu.classList.contains("fire");
    const isHit = Math.abs(jutsuLeft - enemyLeft) < 30;

    if (isJutsu && isHit) {
      score.textContent = ++hitCount;
      speed -= hitCount * 0.1;
      checkWin();

      jutsu.classList.remove("fire");
      enemy.style.animation = "none";
      enemy.style.display = "none";

      // Respawn the enemy after a delay
      enemy = chooseEnemy();
      console.log(enemy);
      setTimeout(() => {
        enemy.style.animation = `block ${speed}s infinite linear`;
        enemy.style.display = "block";
      }, 1000); // Adjust the delay as needed
    }
  }, 60);
}

function checkWin() {
  if (hitCount >= 10) {
    // Compare hitCount with 5
    endGame();
    alert("You WIN!");
  }
}

function renderGame() {
  playBtn.style.display = "none";
  kai.play();
  enemy = chooseEnemy();
  checkDead(enemy);
  checkHit(enemy);
}

function endGame() {
  // Reset variables and game elements
  kai.pause();
  hitCount = 0;
  speed = 5;
  score.textContent = 0;
  block.style.animation = "block 1s infinite linear";
  block.style.display = "block";
  playBtn.style.display = "block";
}
