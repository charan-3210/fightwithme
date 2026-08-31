// ============================================================
// NINJA ARENA BATTLE
// game.js
// ============================================================

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 650;

let gameState = "p1select";

let selectedP1 = null;
let selectedP2 = null;
let selectedArena = null;

let player1 = null;
let player2 = null;

let projectiles = [];
let effects = [];

let terrain = [];
let craters = [];
let waterSplits = [];

let winner = null;


// ============================================================
// KEYBOARD
// ============================================================

const keys = {};
const justPressed = {};

document.addEventListener("keydown", function (event) {

    const key = event.key.toLowerCase();

    if (!keys[key]) {
        justPressed[key] = true;
    }

    keys[key] = true;

});

document.addEventListener("keyup", function (event) {

    keys[event.key.toLowerCase()] = false;

});


// ============================================================
// MOUSE
// ============================================================

canvas.addEventListener("click", function (event) {

    const rect = canvas.getBoundingClientRect();

    const mouseX =
        (event.clientX - rect.left)
        * canvas.width / rect.width;

    const mouseY =
        (event.clientY - rect.top)
        * canvas.height / rect.height;


    handleMouseClick(
        mouseX,
        mouseY
    );

});


// ============================================================
// ARENAS
// ============================================================

const arenas = [

    {
        name: "HILL",
        type: "hill",
        color: "#77715b"
    },

    {
        name: "GRASS",
        type: "grass",
        color: "#3d963f"
    },

    {
        name: "FOREST",
        type: "forest",
        color: "#145c32"
    },

    {
        name: "WATER",
        type: "water",
        color: "#167bb5"
    }

];


// ============================================================
// PLAYER CREATION
// ============================================================

function createPlayer(
    character,
    x,
    y,
    color,
    controls
) {

    return {

        character: character,

        x: x,
        y: y,

        color: color,

        hp: character.hp,
        maxHp: character.hp,

        chakra: character.chakra,
        maxChakra: character.chakra,

        attack: character.attack,
        defense: character.defense,
        speed: character.speed,
        healing: character.healing,

        facing: color === "cyan"
            ? 1
            : -1,

        blocking: false,
        resting: false,

        attackCooldown: 0,
        dodgeCooldown: 0,
        invincible: 0,

        alive: true,

        controls: controls

    };

}


// ============================================================
// START BATTLE
// ============================================================

function startBattle() {

    player1 = createPlayer(

        selectedP1,

        180,

        320,

        "cyan",

        {

            up: "w",
            down: "s",
            left: "a",
            right: "d",

            attack: "f",
            power1: "g",
            power2: "h",
            ultimate: "j",

            block: "k",
            rest: "l",
            dodge: "q"

        }

    );


    player2 = createPlayer(

        selectedP2,

        920,

        320,

        "red",

        {

            up: "arrowup",
            down: "arrowdown",
            left: "arrowleft",
            right: "arrowright",

            attack: "1",
            power1: "2",
            power2: "3",
            ultimate: "4",

            block: "5",
            rest: "6",
            dodge: "0"

        }

    );


    projectiles = [];
    effects = [];
    terrain = [];
    craters = [];
    waterSplits = [];


    createTerrain();


    winner = null;

    gameState = "playing";

}


// ============================================================
// TERRAIN
// ============================================================

function createTerrain() {

    terrain = [];


    if (
        selectedArena.type === "hill" ||
        selectedArena.type === "forest"
    ) {

        for (
            let i = 0;
            i < 12;
            i++
        ) {

            terrain.push({

                type: "tree",

                x:
                    80 +
                    Math.random() * 940,

                y:
                    100 +
                    Math.random() * 470,

                size: 25,

                hp: 100,

                destroyed: false

            });

        }

    }


    if (
        selectedArena.type === "hill"
    ) {

        for (
            let i = 0;
            i < 8;
            i++
        ) {

            terrain.push({

                type: "rock",

                x:
                    80 +
                    Math.random() * 940,

                y:
                    100 +
                    Math.random() * 470,

                size: 22,

                hp: 100,

                destroyed: false

            });

        }

    }

}


// ============================================================
// CHARACTER SELECTION
// ============================================================

function drawCharacterSelection() {

    ctx.fillStyle = "#111";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.textAlign = "center";

    ctx.fillStyle = "#ffd700";

    ctx.font =
        "bold 34px Arial";


    ctx.fillText(

        gameState === "p1select"
            ? "PLAYER 1 - CHOOSE CHARACTER"
            : "PLAYER 2 - CHOOSE CHARACTER",

        canvas.width / 2,
        45

    );


    const cardWidth = 205;
    const cardHeight = 72;

    const gap = 8;

    const startX = 20;
    const startY = 70;


    characters.forEach(
        (character, index) => {

            const column =
                index % 5;

            const row =
                Math.floor(index / 5);


            const x =
                startX +
                column *
                (cardWidth + gap);


            const y =
                startY +
                row *
                (cardHeight + gap);


            let color = "#252525";


            if (
                character.id === 3
            ) {

                color = "#401515";

            }


            if (
                selectedP1 &&
                selectedP1.id === character.id
            ) {

                color = "#004c66";

            }


            if (
                selectedP2 &&
                selectedP2.id === character.id
            ) {

                color = "#661515";

            }


            ctx.fillStyle =
                color;


            ctx.fillRect(
                x,
                y,
                cardWidth,
                cardHeight
            );


            ctx.strokeStyle =
                character.id === 3
                    ? "#ff3333"
                    : "#777";


            ctx.lineWidth =
                character.id === 3
                    ? 3
                    : 1;


            ctx.strokeRect(
                x,
                y,
                cardWidth,
                cardHeight
            );


            ctx.textAlign = "left";

            ctx.fillStyle = "white";

            ctx.font =
                "bold 14px Arial";


            ctx.fillText(

                (index + 1) +
                ". " +
                character.name,

                x + 8,
                y + 20

            );


            ctx.font =
                "11px Arial";


            ctx.fillStyle =
                "#ff5555";


            ctx.fillText(

                "HP " +
                character.hp,

                x + 8,
                y + 40

            );


            ctx.fillStyle =
                "#3399ff";


            ctx.fillText(

                "Chakra " +
                character.chakra,

                x + 75,
                y + 40

            );


            ctx.fillStyle =
                "#ffcc00";


            ctx.fillText(

                "ATK " +
                character.attack,

                x + 150,
                y + 40

            );


            ctx.fillStyle =
                "#aaa";


            ctx.fillText(

                character.powers[0],

                x + 8,
                y + 59

            );

        }
    );


    ctx.textAlign = "center";

    ctx.fillStyle = "#00ffff";

    ctx.font =
        "16px Arial";


    ctx.fillText(

        "CLICK A CHARACTER TO SELECT",

        canvas.width / 2,
        635

    );

}


// ============================================================
// ARENA SELECTION
// ============================================================

function drawArenaSelection() {

    ctx.fillStyle = "#111";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.textAlign = "center";

    ctx.fillStyle = "#ffd700";

    ctx.font =
        "bold 42px Arial";


    ctx.fillText(
        "CHOOSE BATTLE ARENA",
        canvas.width / 2,
        60
    );


    arenas.forEach(
        (arena, index) => {

            const x =
                70 +
                (index % 2) * 500;

            const y =
                110 +
                Math.floor(index / 2) * 230;


            ctx.fillStyle =
                arena.color;


            ctx.fillRect(
                x,
                y,
                430,
                180
            );


            ctx.strokeStyle =
                "white";

            ctx.lineWidth = 3;

            ctx.strokeRect(
                x,
                y,
                430,
                180
            );


            ctx.fillStyle = "white";

            ctx.font =
                "bold 30px Arial";


            ctx.fillText(

                (index + 1) +
                ". " +
                arena.name,

                x + 215,
                y + 70

            );


            ctx.font =
                "16px Arial";


            if (arena.type === "hill") {

                ctx.fillText(
                    "Rocks and trees break",
                    x + 215,
                    y + 110
                );

            }


            if (arena.type === "grass") {

                ctx.fillText(
                    "Soil takes damage",
                    x + 215,
                    y + 110
                );

            }


            if (arena.type === "forest") {

                ctx.fillText(
                    "Trees and soil break",
                    x + 215,
                    y + 110
                );

            }


            if (arena.type === "water") {

                ctx.fillText(
                    "Water splits",
                    x + 215,
                    y + 110
                );

            }

        }
    );

}


// ============================================================
// MOUSE SELECTION
// ============================================================

function handleMouseClick(
    mouseX,
    mouseY
) {


    // CHARACTER SELECTION

    if (
        gameState === "p1select" ||
        gameState === "p2select"
    ) {

        const cardWidth = 205;
        const cardHeight = 72;

        const gap = 8;

        const startX = 20;
        const startY = 70;


        for (
            let i = 0;
            i < characters.length;
            i++
        ) {

            const column =
                i % 5;

            const row =
                Math.floor(i / 5);


            const x =
                startX +
                column *
                (cardWidth + gap);


            const y =
                startY +
                row *
                (cardHeight + gap);


            if (

                mouseX >= x &&
                mouseX <= x + cardWidth &&
                mouseY >= y &&
                mouseY <= y + cardHeight

            ) {

                if (
                    gameState === "p1select"
                ) {

                    selectedP1 =
                        characters[i];

                    gameState =
                        "p2select";

                }

                else {

                    selectedP2 =
                        characters[i];

                    gameState =
                        "arenaSelect";

                }


                return;

            }

        }

    }


    // ARENA SELECTION

    if (
        gameState === "arenaSelect"
    ) {

        for (
            let i = 0;
            i < arenas.length;
            i++
        ) {

            const x =
                70 +
                (i % 2) * 500;

            const y =
                110 +
                Math.floor(i / 2) * 230;


            if (

                mouseX >= x &&
                mouseX <= x + 430 &&
                mouseY >= y &&
                mouseY <= y + 180

            ) {

                selectedArena =
                    arenas[i];

                startBattle();

                return;

            }

        }

    }

}


// ============================================================
// MOVEMENT
// ============================================================

function updateMovement(player) {

    if (!player.alive)
        return;


    let moving = false;


    if (
        keys[player.controls.up]
    ) {

        player.y -=
            player.speed / 12;

        moving = true;

    }


    if (
        keys[player.controls.down]
    ) {

        player.y +=
            player.speed / 12;

        moving = true;

    }


    if (
        keys[player.controls.left]
    ) {

        player.x -=
            player.speed / 12;

        player.facing = -1;

        moving = true;

    }


    if (
        keys[player.controls.right]
    ) {

        player.x +=
            player.speed / 12;

        player.facing = 1;

        moving = true;

    }


    player.x =
        Math.max(
            25,
            Math.min(
                canvas.width - 25,
                player.x
            )
        );


    player.y =
        Math.max(
            80,
            Math.min(
                canvas.height - 50,
                player.y
            )
        );


    player.blocking =
        keys[player.controls.block];


    player.resting =
        keys[player.controls.rest];


    // CHAKRA RECOVERY

    if (
        player.resting &&
        !moving
    ) {

        player.chakra +=
            2;


        player.chakra =
            Math.min(
                player.maxChakra,
                player.chakra
            );

    }

}


// ============================================================
// DISTANCE
// ============================================================

function distance(a, b) {

    return Math.hypot(
        a.x - b.x,
        a.y - b.y
    );

}


// ============================================================
// BASIC ATTACK
// ============================================================

function basicAttack(
    attacker,
    opponent
) {

    if (
        attacker.attackCooldown > 0
    )
        return;


    attacker.attackCooldown =
        20;


    if (
        distance(
            attacker,
            opponent
        ) < 70
    ) {

        let damage =
            attacker.attack *
            0.4;


        if (
            opponent.blocking
        ) {

            damage *= 0.2;

        }


        damagePlayer(
            opponent,
            damage
        );

    }

}


// ============================================================
// POWER
// ============================================================

function usePower(
    attacker,
    opponent,
    index
) {

    if (
        attacker.attackCooldown > 0
    )
        return;


    const power =
        attacker.character.powers[index];


    if (!power)
        return;


    let cost;


    if (index === 1)
        cost = 100;

    else if (index === 2)
        cost = 250;

    else
        cost = 500;


    if (
        attacker.chakra < cost
    ) {

        // Chakra too low
        basicAttack(
            attacker,
            opponent
        );

        return;

    }


    attacker.chakra -=
        cost;


    let damage =
        attacker.attack *
        (index === 1
            ? 1.2
            : index === 2
                ? 2
                : 3.5);


    // HIGH CHAKRA BONUS

    if (
        attacker.chakra >
        attacker.maxChakra * 0.7
    ) {

        damage *= 1.25;

    }


    attacker.attackCooldown =
        40;


    projectiles.push({

        x:
            attacker.x +
            attacker.facing * 30,

        y:
            attacker.y,

        vx:
            attacker.facing * 9,

        damage:
            damage,

        owner:
            attacker,

        color:
            index === 3
                ? "#ff00ff"
                : "#00ffff",

        size:
            index === 3
                ? 28
                : 15,

        power:
            power,

        life:
            120

    });

}


// ============================================================
// PROJECTILES
// ============================================================

function updateProjectiles() {

    for (
        let i = projectiles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            projectiles[i];


        p.x += p.vx;

        p.life--;


        const target =
            p.owner === player1
                ? player2
                : player1;


        // TERRAIN

        for (
            let object of terrain
        ) {

            if (
                object.destroyed
            )
                continue;


            const d =
                Math.hypot(
                    p.x - object.x,
                    p.y - object.y
                );


            if (
                d <
                object.size
            ) {

                object.hp -=
                    p.damage;


                if (
                    object.hp <= 0
                ) {

                    object.destroyed =
                        true;

                    createExplosion(
                        object.x,
                        object.y,
                        "#aa7722"
                    );

                }


                break;

            }

        }


        // PLAYER

        if (

            target.alive &&
            distance(p, target) < 35

        ) {

            let damage =
                p.damage;


            if (
                target.blocking
            ) {

                damage *= 0.2;

            }


            damagePlayer(
                target,
                damage
            );


            createExplosion(
                p.x,
                p.y,
                p.color
            );


            projectiles.splice(
                i,
                1
            );


            continue;

        }


        if (
            p.life <= 0 ||
            p.x < 0 ||
            p.x > canvas.width
        ) {

            projectiles.splice(
                i,
                1
            );

        }

    }

}


// ============================================================
// DAMAGE
// ============================================================

function damagePlayer(
    player,
    damage
) {

    if (
        player.invincible > 0
    )
        return;


    const defenseReduction =
        player.defense / 250;


    damage *=
        1 - defenseReduction;


    player.hp -=
        damage;


    player.invincible =
        10;


    // Opponent missing/damage event
    // gives some chakra to defender

    player.chakra += 5;


    player.chakra =
        Math.min(
            player.maxChakra,
            player.chakra
        );


    if (
        player.hp <= 0
    ) {

        player.hp = 0;

        player.alive = false;


        winner =
            player === player1
                ? player2
                : player1;


        gameState =
            "gameOver";

    }

}


// ============================================================
// DODGE
// ============================================================

function dodge(player) {

    if (
        player.dodgeCooldown > 0
    )
        return;


    if (
        player.chakra < 30
    )
        return;


    player.chakra -= 30;


    player.dodgeCooldown =
        50;


    player.invincible =
        30;


    player.x +=
        player.facing * 80;


    player.x =
        Math.max(
            30,
            Math.min(
                canvas.width - 30,
                player.x
            )
        );

}


// ============================================================
// ACTIONS
// ============================================================

function handleActions(
    player,
    opponent
) {

    if (!player.alive)
        return;


    if (
        justPressed[
            player.controls.attack
        ]
    ) {

        basicAttack(
            player,
            opponent
        );

    }


    if (
        justPressed[
            player.controls.power1
        ]
    ) {

        usePower(
            player,
            opponent,
            1
        );

    }


    if (
        justPressed[
            player.controls.power2
        ]
    ) {

        usePower(
            player,
            opponent,
            2
        );

    }


    if (
        justPressed[
            player.controls.ultimate
        ]
    ) {

        usePower(
            player,
            opponent,
            3
        );

    }


    if (
        justPressed[
            player.controls.dodge
        ]
    ) {

        dodge(
            player
        );

    }

}


// ============================================================
// UPDATE
// ============================================================

function updateGame() {

    if (
        gameState !== "playing"
    )
        return;


    updateMovement(
        player1
    );


    updateMovement(
        player2
    );


    handleActions(
        player1,
        player2
    );


    handleActions(
        player2,
        player1
    );


    updateProjectiles();


    if (
        player1.attackCooldown > 0
    )
        player1.attackCooldown--;


    if (
        player2.attackCooldown > 0
    )
        player2.attackCooldown--;


    if (
        player1.dodgeCooldown > 0
    )
        player1.dodgeCooldown--;


    if (
        player2.dodgeCooldown > 0
    )
        player2.dodgeCooldown--;


    if (
        player1.invincible > 0
    )
        player1.invincible--;


    if (
        player2.invincible > 0
    )
        player2.invincible--;


    for (
        let e of effects
    ) {

        e.life--;

    }


    effects =
        effects.filter(
            e => e.life > 0
        );

}


// ============================================================
// ARENA
// ============================================================

function drawArena() {

    ctx.fillStyle =
        selectedArena.color;


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    if (
        selectedArena.type === "water"
    ) {

        ctx.strokeStyle =
            "rgba(255,255,255,.2)";


        for (
            let y = 80;
            y < canvas.height;
            y += 45
        ) {

            ctx.beginPath();


            for (
                let x = 0;
                x < canvas.width;
                x += 20
            ) {

                ctx.lineTo(
                    x,
                    y +
                    Math.sin(x / 20) * 4
                );

            }


            ctx.stroke();

        }

    }


    if (
        selectedArena.type === "grass"
    ) {

        drawGrass();

    }


    drawTerrain();


    ctx.strokeStyle =
        "white";

    ctx.lineWidth = 5;


    ctx.strokeRect(
        5,
        5,
        canvas.width - 10,
        canvas.height - 10
    );

}


// ============================================================
// GRASS
// ============================================================

function drawGrass() {

    ctx.strokeStyle =
        "rgba(0,0,0,.15)";


    for (
        let x = 0;
        x < canvas.width;
        x += 30
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            70
        );

        ctx.lineTo(
            x + 5,
            canvas.height
        );

        ctx.stroke();

    }

}


// ============================================================
// TERRAIN DRAW
// ============================================================

function drawTerrain() {

    for (
        let object of terrain
    ) {

        if (
            object.destroyed
        )
            continue;


        if (
            object.type === "tree"
        ) {

            ctx.fillStyle =
                "#593819";


            ctx.fillRect(
                object.x - 6,
                object.y,
                12,
                35
            );


            ctx.fillStyle =
                "#08702e";


            ctx.beginPath();

            ctx.arc(
                object.x,
                object.y,
                object.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }


        if (
            object.type === "rock"
        ) {

            ctx.fillStyle =
                "#555";


            ctx.beginPath();

            ctx.arc(
                object.x,
                object.y,
                object.size,
                0,
                Math.PI * 2
            );

            ctx.fill();

        }

    }

}


// ============================================================
// PLAYER DRAW
// ============================================================

function drawPlayer(
    player
) {

    if (
        !player.alive
    )
        return;


    ctx.fillStyle =
        player.color === "cyan"
            ? "#00d9ff"
            : "#ff3030";


    ctx.beginPath();

    ctx.arc(
        player.x,
        player.y,
        25,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.strokeStyle =
        "white";

    ctx.lineWidth = 3;

    ctx.stroke();


    // eye

    ctx.fillStyle =
        "white";


    ctx.beginPath();

    ctx.arc(
        player.x +
        player.facing * 8,
        player.y - 5,
        5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // BLOCK

    if (
        player.blocking
    ) {

        ctx.strokeStyle =
            "#ffff00";

        ctx.lineWidth = 6;


        ctx.beginPath();

        ctx.arc(
            player.x,
            player.y,
            38,
            0,
            Math.PI * 2
        );

        ctx.stroke();

    }


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "white";


    ctx.font =
        "bold 14px Arial";


    ctx.fillText(
        player.character.name,
        player.x,
        player.y - 40
    );

}


// ============================================================
// PROJECTILE DRAW
// ============================================================

function drawProjectiles() {

    for (
        let p of projectiles
    ) {

        ctx.fillStyle =
            p.color;


        ctx.shadowColor =
            p.color;

        ctx.shadowBlur =
            20;


        ctx.beginPath();

        ctx.arc(
            p.x,
            p.y,
            p.size,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.shadowBlur = 0;

    }

}


// ============================================================
// HUD
// ============================================================

function drawBar(
    x,
    y,
    width,
    height,
    value,
    max,
    color
) {

    ctx.fillStyle =
        "#222";


    ctx.fillRect(
        x,
        y,
        width,
        height
    );


    ctx.fillStyle =
        color;


    ctx.fillRect(
        x,
        y,
        width *
        Math.max(
            0,
            value / max
        ),
        height
    );


    ctx.strokeStyle =
        "white";


    ctx.strokeRect(
        x,
        y,
        width,
        height
    );

}


function drawHUD() {

    ctx.textAlign =
        "left";


    ctx.fillStyle =
        "white";


    ctx.font =
        "bold 16px Arial";


    ctx.fillText(
        "P1: " +
        player1.character.name,
        20,
        25
    );


    drawBar(
        20,
        35,
        350,
        18,
        player1.hp,
        player1.maxHp,
        "#e60000"
    );


    drawBar(
        20,
        58,
        350,
        12,
        player1.chakra,
        player1.maxChakra,
        "#008cff"
    );


    ctx.textAlign =
        "right";


    ctx.fillText(
        "P2: " +
        player2.character.name,
        canvas.width - 20,
        25
    );


    drawBar(
        canvas.width - 370,
        35,
        350,
        18,
        player2.hp,
        player2.maxHp,
        "#e60000"
    );


    drawBar(
        canvas.width - 370,
        58,
        350,
        12,
        player2.chakra,
        player2.maxChakra,
        "#008cff"
    );


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "white";


    ctx.font =
        "bold 18px Arial";


    ctx.fillText(
        selectedArena.name,
        canvas.width / 2,
        25
    );


    ctx.font =
        "13px Arial";


    ctx.fillText(
        "P1: WASD + F/G/H/J/K/L/Q    |    P2: Arrows + 1/2/3/4/5/6/0",
        canvas.width / 2,
        canvas.height - 12
    );

}


// ============================================================
// GAME OVER
// ============================================================

function drawGameOver() {

    ctx.fillStyle =
        "rgba(0,0,0,.75)";


    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "#ffd700";


    ctx.font =
        "bold 55px Arial";


    ctx.fillText(
        winner.character.name +
        " WINS!",
        canvas.width / 2,
        280
    );


    ctx.fillStyle =
        "white";


    ctx.font =
        "24px Arial";


    ctx.fillText(
        "Press R to return to character selection",
        canvas.width / 2,
        340
    );

}


// ============================================================
// RESTART
// ============================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key.toLowerCase() === "r" &&
            gameState === "gameOver"
        ) {

            selectedP1 = null;
            selectedP2 = null;
            selectedArena = null;

            gameState =
                "p1select";

        }

    }
);


// ============================================================
// DRAW
// ============================================================

function draw() {

    if (
        gameState === "p1select" ||
        gameState === "p2select"
    ) {

        drawCharacterSelection();

        return;

    }


    if (
        gameState === "arenaSelect"
    ) {

        drawArenaSelection();

        return;

    }


    if (
        gameState === "playing" ||
        gameState === "gameOver"
    ) {

        drawArena();

        drawPlayer(player1);
        drawPlayer(player2);

        drawProjectiles();

        drawHUD();


        if (
            gameState === "gameOver"
        ) {

            drawGameOver();

        }

    }

}


// ============================================================
// MAIN LOOP
// ============================================================

function gameLoop() {

    updateGame();

    draw();


    for (
        const key in justPressed
    ) {

        delete justPressed[key];

    }


    requestAnimationFrame(
        gameLoop
    );

}


gameLoop();
