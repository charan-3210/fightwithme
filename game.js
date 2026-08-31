// ===============================
// MOBILE + KEYBOARD GAME CONTROLS
// ===============================

const player = {
    x: 100,
    y: 100,
    width: 50,
    height: 50,

    speed: 5,
    jumpPower: 12,

    velocityY: 0,
    gravity: 0.6,

    onGround: false
};

// -------------------------------
// CONTROL VARIABLES
// -------------------------------

let leftPressed = false;
let rightPressed = false;
let jumpPressed = false;

// -------------------------------
// KEYBOARD CONTROLS
// -------------------------------

document.addEventListener("keydown", function (event) {

    if (
        event.key === "ArrowLeft" ||
        event.key === "a" ||
        event.key === "A"
    ) {
        leftPressed = true;
    }

    if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
    ) {
        rightPressed = true;
    }

    if (
        event.key === "ArrowUp" ||
        event.key === "w" ||
        event.key === "W" ||
        event.key === " "
    ) {
        jumpPressed = true;
    }
});

document.addEventListener("keyup", function (event) {

    if (
        event.key === "ArrowLeft" ||
        event.key === "a" ||
        event.key === "A"
    ) {
        leftPressed = false;
    }

    if (
        event.key === "ArrowRight" ||
        event.key === "d" ||
        event.key === "D"
    ) {
        rightPressed = false;
    }

    if (
        event.key === "ArrowUp" ||
        event.key === "w" ||
        event.key === "W" ||
        event.key === " "
    ) {
        jumpPressed = false;
    }
});

// ===============================
// MOBILE TOUCH CONTROLS
// ===============================

const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");
const jumpButton = document.getElementById("jump");

// LEFT BUTTON

if (leftButton) {

    leftButton.addEventListener("touchstart", function (event) {
        event.preventDefault();
        leftPressed = true;
    });

    leftButton.addEventListener("touchend", function (event) {
        event.preventDefault();
        leftPressed = false;
    });

    leftButton.addEventListener("touchcancel", function () {
        leftPressed = false;
    });
}

// RIGHT BUTTON

if (rightButton) {

    rightButton.addEventListener("touchstart", function (event) {
        event.preventDefault();
        rightPressed = true;
    });

    rightButton.addEventListener("touchend", function (event) {
        event.preventDefault();
        rightPressed = false;
    });

    rightButton.addEventListener("touchcancel", function () {
        rightPressed = false;
    });
}

// JUMP BUTTON

if (jumpButton) {

    jumpButton.addEventListener("touchstart", function (event) {
        event.preventDefault();
        jumpPressed = true;
    });

    jumpButton.addEventListener("touchend", function (event) {
        event.preventDefault();
        jumpPressed = false;
    });

    jumpButton.addEventListener("touchcancel", function () {
        jumpPressed = false;
    });
}

// ===============================
// GAME UPDATE
// ===============================

function updatePlayer() {

    // Move left
    if (leftPressed) {
        player.x -= player.speed;
    }

    // Move right
    if (rightPressed) {
        player.x += player.speed;
    }

    // Jump
    if (jumpPressed && player.onGround) {
        player.velocityY = -player.jumpPower;
        player.onGround = false;
    }

    // Gravity
    player.velocityY += player.gravity;

    player.y += player.velocityY;

    // Ground
    const groundY = 400;

    if (player.y + player.height >= groundY) {

        player.y = groundY - player.height;

        player.velocityY = 0;

        player.onGround = true;
    }

    // Screen boundaries
    if (player.x < 0) {
        player.x = 0;
    }

    if (player.x + player.width > window.innerWidth) {
        player.x = window.innerWidth - player.width;
    }
}

// ===============================
// DRAW PLAYER
// ===============================

function drawPlayer(ctx) {

    ctx.fillStyle = "blue";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

// ===============================
// GAME LOOP
// ===============================

function gameLoop(ctx) {

    updatePlayer();

    ctx.clearRect(
        0,
        0,
        ctx.canvas.width,
        ctx.canvas.height
    );

    drawPlayer(ctx);

    requestAnimationFrame(function () {
        gameLoop(ctx);
    });
}

// ===============================
// START GAME
// ===============================

const canvas = document.querySelector("canvas");

if (canvas) {

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = 450;

    gameLoop(ctx);
}

// ===============================
// PREVENT PHONE SCROLLING
// ===============================

document.addEventListener(
    "touchmove",
    function (event) {
        event.preventDefault();
    },
    { passive: false }
);