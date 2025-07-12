// Simple Platformer Game

// Game setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Canvas size
canvas.width = 800;
canvas.height = 600;

// Player object
const player = {
  x: 100,
  y: 500,
  width: 50,
  height: 50,
  speed: 5,
  dx: 0,
  dy: 0,
  gravity: 0.5,
  jumpPower: -15,
  grounded: false,
};

// Floor and boundaries
const floor = canvas.height - 50;

// Keyboard input
const keys = {
  right: false,
  left: false,
  up: false,
};

// Event listeners for player input
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") keys.right = true;
  if (e.key === "ArrowLeft") keys.left = true;
  if (e.key === "ArrowUp" && player.grounded) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") keys.right = false;
  if (e.key === "ArrowLeft") keys.left = false;
});

// Update player position
function movePlayer() {
  if (keys.right) player.dx = player.speed;
  if (keys.left) player.dx = -player.speed;

  // Apply gravity
  player.dy += player.gravity;
  
  // Update player position
  player.x += player.dx;
  player.y += player.dy;

  // Check for ground collision
  if (player.y > floor - player.height) {
    player.y = floor - player.height;
    player.dy = 0;
    player.grounded = true;
  }

  // Boundaries check (left and right)
  if (player.x < 0) player.x = 0;
  if (player.x > canvas.width - player.width) player.x = canvas.width - player.width;
}

// Draw player on the canvas
function drawPlayer() {
  ctx.fillStyle = "#00F"; // Player color (blue)
  ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Update the game state
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

  movePlayer();
  drawPlayer();

  requestAnimationFrame(update); // Keep updating the game
}

// Start the game
update();
