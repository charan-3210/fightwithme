// ============================================================
// GAME.JS
// Naruto-style 2 Player Arena Battle
// Works with characters.js
// ============================================================


// ============================================================
// CANVAS
// ============================================================

const canvas = document.getElementById("game");

const ctx = canvas.getContext("2d");

canvas.width = 1100;
canvas.height = 650;

const WIDTH = canvas.width;
const HEIGHT = canvas.height;


// ============================================================
// GAME STATE
// ============================================================

let gameState = "characterSelect";

let selectedP1 = null;
let selectedP2 = null;

let arena = null;

let winner = null;

let message = "PLAYER 1: SELECT YOUR CHARACTER";

let messageTimer = 0;


// ============================================================
// KEYBOARD
// ============================================================

const keys = {};

const pressed = {};

document.addEventListener("keydown", function (e) {

    const key = e.key.toLowerCase();

    if (!keys[key]) {
        pressed[key] = true;
    }

    keys[key] = true;

    // Prevent browser scrolling
    if (
        key === "arrowup" ||
        key === "arrowdown" ||
        key === "arrowleft" ||
        key === "arrowright" ||
        key === " "
    ) {
        e.preventDefault();
    }
});


document.addEventListener("keyup", function (e) {

    keys[e.key.toLowerCase()] = false;

});


// ============================================================
// ARENAS
// ============================================================

const arenas = [

    {
        id: "hill",
        name: "Rocky Hill",
        color: "#77745c",
        description: "Rocks and trees can fall or break."
    },

    {
        id: "grass",
        name: "Grass Land",
        color: "#3d9b42",
        description: "Powerful attacks damage the soil."
    },

    {
        id: "forest",
        name: "Deep Forest",
        color: "#176b38",
        description: "Trees and soil can be destroyed."
    },

    {
        id: "water",
        name: "Water Valley",
        color: "#207db5",
        description: "Powerful attacks split the water."
    }

];


// ============================================================
// TERRAIN
// ============================================================

let terrainObjects = [];

let craters = [];

let waterSplits = [];


// ============================================================
// PLAYERS
// ============================================================

let player1 = null;

let player2 = null;


// ============================================================
// PROJECTILES
// ============================================================

let projectiles = [];


// ============================================================
// EFFECTS
// ============================================================

let effects = [];


// ============================================================
// CHARACTER SELECTION
// ============================================================

function drawCharacterSelect() {

    ctx.fillStyle = "#111";

    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );


    ctx.fillStyle = "#ffd700";

    ctx.font = "bold 36px Arial";

    ctx.textAlign = "center";

    ctx.fillText(
        "🥷 NINJA ARENA BATTLE",
        WIDTH / 2,
        45
    );


    ctx.font = "20px Arial";

    ctx.fillStyle = "#00ccff";

    ctx.fillText(
        message,
        WIDTH / 2,
        80
    );


    const columns = 5;

    const cardWidth = 190;

    const cardHeight = 85;

    const startX = 25;

    const startY = 105;


    characters.forEach((character, index) => {

        const col = index % columns;

        const row = Math.floor(index / columns);

        const x =
            startX +
            col * 215;

        const y =
            startY +
            row * 88;


        let selected = false;


        if (
            selectedP1 &&
            selectedP1.id === character.id
        ) {
            selected = true;
        }

        if (
            selectedP2 &&
            selectedP2.id === character.id
        ) {
            selected = true;
        }


        ctx.fillStyle =
            selected
            ? "#555"
            : "#222";


        ctx.fillRect(
            x,
            y,
            cardWidth,
            cardHeight
        );


        ctx.strokeStyle =
            character.id === 3
            ? "#ff0000"
            : "#777";


        ctx.lineWidth =
            character.id === 3
            ? 4
            : 2;


        ctx.strokeRect(
            x,
            y,
            cardWidth,
            cardHeight
        );


        ctx.textAlign = "left";

        ctx.fillStyle =
            character.id === 3
            ? "#ff4444"
            : "white";


        ctx.font = "bold 15px Arial";


        ctx.fillText(
            (index + 1) +
            ". " +
            character.name,
            x + 8,
            y + 23
        );


        ctx.font = "12px Arial";

        ctx.fillStyle = "#ff5555";

        ctx.fillText(
            "HP: " + character.hp,
            x + 8,
            y + 44
        );


        ctx.fillStyle = "#55aaff";

        ctx.fillText(
            "Chakra: " + character.chakra,
            x + 90,
            y + 44
        );


        ctx.fillStyle = "#aaa";

        ctx.fillText(
            "Power: " + character.attack,
            x + 8,
            y + 64
        );


        ctx.fillText(
            "Speed: " + character.speed,
            x + 90,
            y + 64
        );

    });


    ctx.textAlign = "center";

    ctx.fillStyle = "#aaa";

    ctx.font = "16px Arial";

    ctx.fillText(
        "P1: press 1-9 | P1 continued: Q,W,E,R,T,Y,U,I,O,P",
        WIDTH / 2,
        590
    );

    ctx.fillText(
        "P2: press Z,X,C,V,B,N,M,1,2,3... after P1 selection",
        WIDTH / 2,
        615
    );

    ctx.fillText(
        "The actual character selection is handled below with number keys.",
        WIDTH / 2,
        640
    );
}


// ============================================================
// SIMPLE CHARACTER SELECTION
// ============================================================

let selectionKeys = [
    "1", "2", "3", "4", "5",
    "6", "7", "8", "9",
    "q", "w", "e", "r", "t",
    "y", "u", "i", "o", "p",
    "a", "s", "d", "f", "g",
    "h", "j", "k", "l", "z", "x"
];


function handleCharacterSelection() {

    if (gameState !== "characterSelect")
        return;


    for (
        let i = 0;
        i < selectionKeys.length;
        i++
    ) {

        const key = selectionKeys[i];

        if (pressed[key]) {

            const character =
                characters[i];

            if (!character)
                continue;


            if (!selectedP1) {

                selectedP1 =
                    character;

                message =
                    "PLAYER 2: SELECT YOUR CHARACTER";

            }

            else if (!selectedP2) {

                selectedP2 =
                    character;

                message =
                    "SELECT ARENA: 1-4";

                gameState =
                    "arenaSelect";
            }


            delete pressed[key];
        }
    }
}


// ============================================================
// ARENA SELECT
// ============================================================

function drawArenaSelect() {

    ctx.fillStyle = "#101010";

    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );


    ctx.textAlign = "center";

    ctx.fillStyle = "#ffd700";

    ctx.font =
        "bold 40px Arial";

    ctx.fillText(
        "SELECT ARENA",
        WIDTH / 2,
        70
    );


    arenas.forEach(
        (a, index) => {

            const x =
                80 +
                (index % 2) * 500;

            const y =
                130 +
                Math.floor(index / 2) * 220;


            ctx.fillStyle =
                a.color;

            ctx.fillRect(
                x,
                y,
                430,
                170
            );


            ctx.strokeStyle =
                "white";

            ctx.lineWidth = 3;

            ctx.strokeRect(
                x,
                y,
                430,
                170
            );


            ctx.fillStyle =
                "white";

            ctx.font =
                "bold 28px Arial";

            ctx.fillText(
                (index + 1) +
                ". " +
                a.name,
                x + 215,
                y + 50
            );


            ctx.font =
                "16px Arial";

            ctx.fillText(
                a.description,
                x + 215,
                y + 90
            );

        }
    );


    ctx.fillStyle =
        "#00ffff";

    ctx.font =
        "20px Arial";

    ctx.fillText(
        "Press 1, 2, 3 or 4",
        WIDTH / 2,
        600
    );
}


function handleArenaSelection() {

    if (gameState !== "arenaSelect")
        return;


    if (pressed["1"]) {

        startGame(arenas[0]);

        delete pressed["1"];
    }

    if (pressed["2"]) {

        startGame(arenas[1]);

        delete pressed["2"];
    }

    if (pressed["3"]) {

        startGame(arenas[2]);

        delete pressed["3"];
    }

    if (pressed["4"]) {

        startGame(arenas[3]);

        delete pressed["4"];
    }
}


// ============================================================
// CREATE PLAYER
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

        vx: 0,

        vy: 0,

        hp: character.hp,

        maxHp: character.hp,

        chakra: character.chakra,

        maxChakra: character.chakra,

        attack: character.attack,

        defense: character.defense,

        speed: character.speed,

        healing: character.healing,

        color: color,

        controls: controls,

        facing: color === "#00ccff"
            ? 1
            : -1,

        blocking: false,

        resting: false,

        cooldown: 0,

        attackCooldown: 0,

        dodgeCooldown: 0,

        invincible: 0,

        stunned: 0,

        combo: 0,

        alive: true

    };
}


// ============================================================
// START GAME
// ============================================================

function startGame(selectedArena) {

    arena =
        selectedArena;


    player1 =
        createPlayer(
            selectedP1,
            180,
            HEIGHT / 2,
            "#00ccff",
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


    player2 =
        createPlayer(
            selectedP2,
            WIDTH - 180,
            HEIGHT / 2,
            "#ff3333",
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


    terrainObjects = [];

    craters = [];

    waterSplits = [];

    projectiles = [];

    effects = [];


    createTerrain();


    winner = null;

    message =
        "FIGHT!";

    gameState =
        "playing";
}


// ============================================================
// TERRAIN CREATION
// ============================================================

function createTerrain() {

    terrainObjects = [];


    if (
        arena.id === "hill" ||
        arena.id === "forest"
    ) {

        for (
            let i = 0;
            i < 14;
            i++
        ) {

            terrainObjects.push({

                type: "tree",

                x:
                    80 +
                    Math.random() *
                    (WIDTH - 160),

                y:
                    80 +
                    Math.random() *
                    (HEIGHT - 160),

                size:
                    25 +
                    Math.random() * 20,

                health: 100,

                broken: false

            });

        }
    }


    if (arena.id === "hill") {

        for (
            let i = 0;
            i < 10;
            i++
        ) {

            terrainObjects.push({

                type: "rock",

                x:
                    80 +
                    Math.random() *
                    (WIDTH - 160),

                y:
                    80 +
                    Math.random() *
                    (HEIGHT - 160),

                size:
                    20 +
                    Math.random() * 20,

                health: 80,

                broken: false

            });

        }
    }
}


// ============================================================
// MOVEMENT
// ============================================================

function updatePlayerMovement(player) {

    if (!player.alive)
        return;


    if (player.stunned > 0) {

        player.stunned--;

        return;
    }


    let moving = false;


    if (
        keys[player.controls.up]
    ) {

        player.y -=
            player.speed / 18;

        moving = true;
    }


    if (
        keys[player.controls.down]
    ) {

        player.y +=
            player.speed / 18;

        moving = true;
    }


    if (
        keys[player.controls.left]
    ) {

        player.x -=
            player.speed / 18;

        player.facing = -1;

        moving = true;
    }


    if (
        keys[player.controls.right]
    ) {

        player.x +=
            player.speed / 18;

        player.facing = 1;

        moving = true;
    }


    /* Keep players inside arena */

    player.x =
        Math.max(
            30,
            Math.min(
                WIDTH - 30,
                player.x
            )
        );


    player.y =
        Math.max(
            60,
            Math.min(
                HEIGHT - 30,
                player.y
            )
        );


    player.resting =
        keys[player.controls.rest];


    player.blocking =
        keys[player.controls.block];


    /* Resting increases Chakra */

    if (
        player.resting &&
        !moving
    ) {

        player.chakra +=
            1.5 +
            player.healing / 100;

        player.chakra =
            Math.min(
                player.maxChakra,
                player.chakra
            );
    }


    /* Block */

    if (player.blocking) {

        player.chakra += 0.1;

        player.chakra =
            Math.min(
                player.maxChakra,
                player.chakra
            );
    }
}


// ============================================================
// BASIC ATTACK
// ============================================================

function basicAttack(
    attacker,
    opponent
) {

    if (
        attacker.attackCooldown > 0 ||
        !attacker.alive
    )
        return;


    attacker.attackCooldown =
        25;


    const range = 60;


    if (
        distance(
            attacker,
            opponent
        ) <= range
    ) {

        let damage =
            attacker.attack *
            0.35;


        if (opponent.blocking) {

            damage *= 0.25;

            message =
                opponent.character.name +
                " blocked!";
        }


        damagePlayer(
            opponent,
            damage
        );


        createHitEffect(
            opponent.x,
            opponent.y,
            "#ffffff"
        );
    }
    else {

        /* Missing gives attacker Chakra */

        attacker.chakra += 8;

        attacker.chakra =
            Math.min(
                attacker.maxChakra,
                attacker.chakra
            );

        message =
            attacker.character.name +
            " missed! Chakra recovered.";
    }
}


// ============================================================
// DISTANCE
// ============================================================

function distance(a, b) {

    return Math.sqrt(
        Math.pow(a.x - b.x, 2) +
        Math.pow(a.y - b.y, 2)
    );
}


// ============================================================
// POWER ATTACK
// ============================================================

function usePower(
    attacker,
    opponent,
    powerIndex
) {

    if (
        attacker.attackCooldown > 0 ||
        !attacker.alive
    )
        return;


    const power =
        attacker.character.powers[
            powerIndex
        ];


    if (!power)
        return;


    /*
       Chakra determines strength.
    */

    let chakraPercent =
        attacker.chakra /
        attacker.maxChakra;


    let cost;


    if (powerIndex === 1) {

        cost = 100;

    }
    else if (powerIndex === 2) {

        cost = 250;

    }
    else {

        cost = 500;

    }


    /* Not enough Chakra */

    if (
        attacker.chakra < cost
    ) {

        message =
            "Not enough Chakra for " +
            power +
            "!";


        basicAttack(
            attacker,
            opponent
        );

        return;
    }


    attacker.chakra -= cost;


    let damage =
        attacker.attack *
        1.2;


    if (
        powerIndex === 2
    ) {

        damage =
            attacker.attack *
            2.0;
    }


    if (
        powerIndex === 3
    ) {

        damage =
            attacker.attack *
            3.5;
    }


    /*
       High Chakra gives bonus.
    */

    if (
        chakraPercent > 0.75
    ) {

        damage *= 1.3;

    }


    attacker.attackCooldown =
        45;


    /*
       Projectile
    */

    projectiles.push({

        x:
            attacker.x +
            attacker.facing * 30,

        y:
            attacker.y,

        vx:
            attacker.facing *
            8,

        vy:
            0,

        damage:
            damage,

        owner:
            attacker,

        color:
            powerIndex === 3
            ? "#ff00ff"
            : "#00ffff",

        name:
            power,

        size:
            powerIndex === 3
            ? 30
            : 16,

        life:
            120

    });


    message =
        attacker.character.name +
        " used " +
        power +
        "!";
}


// ============================================================
// UPDATE PROJECTILES
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

        p.y += p.vy;

        p.life--;


        /* Terrain collision */

        checkTerrainCollision(p);


        let target =
            p.owner === player1
            ? player2
            : player1;


        if (
            target.alive &&
            distance(
                p,
                target
            ) < 35
        ) {

            let damage =
                p.damage;


            if (
                target.blocking
            ) {

                damage *= 0.25;

                message =
                    target.character.name +
                    " blocked " +
                    p.name;
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
            p.x > WIDTH ||
            p.y < 50 ||
            p.y > HEIGHT
        ) {

            projectiles.splice(
                i,
                1
            );
        }
    }
}


// ============================================================
// TERRAIN COLLISION
// ============================================================

function checkTerrainCollision(projectile) {

    for (
        let obj of terrainObjects
    ) {

        if (obj.broken)
            continue;


        const d =
            Math.hypot(
                projectile.x - obj.x,
                projectile.y - obj.y
            );


        if (
            d <
            obj.size
        ) {

            obj.health -=
                projectile.damage *
                0.5;


            if (
                obj.health <= 0
            ) {

                obj.broken = true;


                createExplosion(
                    obj.x,
                    obj.y,
                    "#c58b4a"
                );


                if (
                    obj.type === "tree"
                ) {

                    message =
                        "🌲 TREE DESTROYED!";
                }

                else {

                    message =
                        "🪨 ROCK BROKEN!";
                }
            }

            break;
        }
    }


    /*
       Grass / Forest soil damage
    */

    if (
        arena.id === "grass" ||
        arena.id === "forest"
    ) {

        if (
            projectile.damage > 120
        ) {

            craters.push({

                x:
                    projectile.x,

                y:
                    projectile.y,

                size:
                    Math.min(
                        70,
                        projectile.damage / 2
                    ),

                life: 600

            });
        }
    }


    /*
       Water splitting
    */

    if (
        arena.id === "water" &&
        projectile.damage > 150
    ) {

        waterSplits.push({

            x:
                projectile.x,

            y:
                projectile.y,

            size:
                Math.min(
                    100,
                    projectile.damage / 2
                ),

            life:
                300

        });
    }
}


// ============================================================
// DAMAGE
// ============================================================

function damagePlayer(
    target,
    damage
) {

    if (
        target.invincible > 0
    )
        return;


    /*
       Defense reduces damage.
    */

    const reduction =
        target.defense / 250;


    damage *=
        1 - reduction;


    target.hp -=
        damage;


    target.invincible =
        12;


    if (
        target.hp <= 0
    ) {

        target.hp = 0;

        target.alive = false;

        winner =
            target === player1
            ? player2
            : player1;


        gameState =
            "gameOver";


        message =
            winner.character.name +
            " WINS!";
    }
}


// ============================================================
// HEALING
// ============================================================

function healPlayer(player) {

    if (
        player.hp <= 0 ||
        player.hp >= player.maxHp
    )
        return;


    const amount =
        player.healing * 0.15;


    player.hp +=
        amount;


    player.hp =
        Math.min(
            player.maxHp,
            player.hp
        );


    message =
        player.character.name +
        " is healing!";
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
        60;

    player.invincible =
        30;


    player.x +=
        player.facing * 80;


    player.x =
        Math.max(
            30,
            Math.min(
                WIDTH - 30,
                player.x
            )
        );


    createHitEffect(
        player.x,
        player.y,
        "#ffff00"
    );
}


// ============================================================
// PLAYER ACTIONS
// ============================================================

function handlePlayerActions(
    player,
    opponent
) {

    if (!player.alive)
        return;


    if (
        pressed[
            player.controls.attack
        ]
    ) {

        basicAttack(
            player,
            opponent
        );
    }


    if (
        pressed[
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
        pressed[
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
        pressed[
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
        pressed[
            player.controls.rest
        ]
    ) {

        healPlayer(
            player
        );
    }


    if (
        pressed[
            player.controls.dodge
        ]
    ) {

        dodge(
            player
        );
    }
}


// ============================================================
// UPDATE GAME
// ============================================================

function updateGame() {

    if (
        gameState !== "playing"
    )
        return;


    updatePlayerMovement(
        player1
    );

    updatePlayerMovement(
        player2
    );


    handlePlayerActions(
        player1,
        player2
    );

    handlePlayerActions(
        player2,
        player1
    );


    updateProjectiles();


    /* Cooldowns */

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


    /* Craters */

    for (
        let crater of craters
    ) {

        crater.life--;
    }


    craters =
        craters.filter(
            c => c.life > 0
        );


    /* Water */

    for (
        let split of waterSplits
    ) {

        split.life--;
    }


    waterSplits =
        waterSplits.filter(
            s => s.life > 0
        );


    /* Effects */

    for (
        let effect of effects
    ) {

        effect.life--;
    }


    effects =
        effects.filter(
            e => e.life > 0
        );
}


// ============================================================
// DRAW ARENA
// ============================================================

function drawArena() {

    ctx.fillStyle =
        arena.color;

    ctx.fillRect(
        0,
        0,
        WIDTH,
        HEIGHT
    );


    /*
       Arena-specific background
    */

    if (
        arena.id === "grass"
    ) {

        drawGrass();

    }


    if (
        arena.id === "forest"
    ) {

        drawForest();

    }


    if (
        arena.id === "hill"
    ) {

        drawHill();

    }


    if (
        arena.id === "water"
    ) {

        drawWater();

    }


    /* Boundary */

    ctx.strokeStyle =
        "white";

    ctx.lineWidth = 5;

    ctx.strokeRect(
        5,
        5,
        WIDTH - 10,
        HEIGHT - 10
    );
}


// ============================================================
// GRASS
// ============================================================

function drawGrass() {

    ctx.strokeStyle =
        "rgba(255,255,255,.12)";

    for (
        let x = 0;
        x < WIDTH;
        x += 30
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            50
        );

        ctx.lineTo(
            x + 5,
            HEIGHT
        );

        ctx.stroke();
    }


    drawCraters();
}


// ============================================================
// FOREST
// ============================================================

function drawForest() {

    drawCraters();


    for (
        let obj of terrainObjects
    ) {

        if (
            obj.type === "tree" &&
            !obj.broken
        ) {

            drawTree(
                obj
            );
        }
    }
}


// ============================================================
// HILL
// ============================================================

function drawHill() {

    drawCraters();


    for (
        let obj of terrainObjects
    ) {

        if (
            obj.type === "tree" &&
            !obj.broken
        ) {

            drawTree(
                obj
            );
        }


        if (
            obj.type === "rock" &&
            !obj.broken
        ) {

            drawRock(
                obj
            );
        }
    }
}


// ============================================================
// WATER
// ============================================================

function drawWater() {

    ctx.strokeStyle =
        "rgba(255,255,255,.25)";

    ctx.lineWidth = 2;


    for (
        let y = 80;
        y < HEIGHT;
        y += 50
    ) {

        ctx.beginPath();

        for (
            let x = 0;
            x < WIDTH;
            x += 20
        ) {

            ctx.lineTo(
                x,
                y +
                Math.sin(x / 20) * 5
            );
        }

        ctx.stroke();
    }


    /*
       Split water
    */

    for (
        let split of waterSplits
    ) {

        ctx.strokeStyle =
            "white";

        ctx.lineWidth = 5;

        ctx.beginPath();

        ctx.arc(
            split.x,
            split.y,
            split.size,
            0,
            Math.PI * 2
        );

        ctx.stroke();
    }
}


// ============================================================
// DRAW TREE
// ============================================================

function drawTree(tree) {

    ctx.fillStyle =
        "#613719";

    ctx.fillRect(
        tree.x - 7,
        tree.y,
        14,
        tree.size
    );


    ctx.fillStyle =
        "#0a5426";

    ctx.beginPath();

    ctx.arc(
        tree.x,
        tree.y,
        tree.size,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// ============================================================
// DRAW ROCK
// ============================================================

function drawRock(rock) {

    ctx.fillStyle =
        "#555";

    ctx.beginPath();

    ctx.arc(
        rock.x,
        rock.y,
        rock.size,
        0,
        Math.PI * 2
    );

    ctx.fill();


    ctx.strokeStyle =
        "#aaa";

    ctx.stroke();
}


// ============================================================
// CRATERS
// ============================================================

function drawCraters() {

    for (
        let crater of craters
    ) {

        ctx.fillStyle =
            "rgba(50,25,10,.7)";


        ctx.beginPath();

        ctx.arc(
            crater.x,
            crater.y,
            crater.size,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }
}


// ============================================================
// DRAW PLAYERS
// ============================================================

function drawPlayer(
    player
) {

    if (!player.alive)
        return;


    /*
       Dodge glow
    */

    if (
        player.invincible > 0
    ) {

        ctx.fillStyle =
            "rgba(255,255,0,.3)";

        ctx.beginPath();

        ctx.arc(
            player.x,
            player.y,
            38,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }


    /* Body */

    ctx.fillStyle =
        player.color;

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


    /* Face direction */

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


    /* Blocking shield */

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


    /* Character name */

    ctx.textAlign =
        "center";

    ctx.fillStyle =
        "white";

    ctx.font =
        "bold 14px Arial";

    ctx.fillText(
        player.character.name,
        player.x,
        player.y - 38
    );
}


// ============================================================
// DRAW PROJECTILES
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


        ctx.shadowBlur =
            0;


        ctx.fillStyle =
            "white";

        ctx.font =
            "11px Arial";

        ctx.textAlign =
            "center";

        ctx.fillText(
            p.name,
            p.x,
            p.y - p.size - 5
        );
    }
}


// ============================================================
// EFFECTS
// ============================================================

function createExplosion(
    x,
    y,
    color
) {

    effects.push({

        x: x,

        y: y,

        color: color,

        size: 10,

        life: 30

    });
}


function createHitEffect(
    x,
    y,
    color
) {

    effects.push({

        x: x,

        y: y,

        color: color,

        size: 5,

        life: 15

    });
}


function drawEffects() {

    for (
        let effect of effects
    ) {

        ctx.strokeStyle =
            effect.color;

        ctx.lineWidth = 5;

        ctx.globalAlpha =
            effect.life / 30;


        ctx.beginPath();

        ctx.arc(
            effect.x,
            effect.y,
            effect.size +
            (30 - effect.life) * 2,
            0,
            Math.PI * 2
        );

        ctx.stroke();


        ctx.globalAlpha = 1;
    }
}


// ============================================================
// HEALTH BAR
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


    const percent =
        Math.max(
            0,
            value / max
        );


    ctx.fillStyle =
        color;

    ctx.fillRect(
        x,
        y,
        width * percent,
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


// ============================================================
// HUD
// ============================================================

function drawHUD() {

    /* P1 */

    ctx.textAlign =
        "left";


    ctx.fillStyle =
        "white";

    ctx.font =
        "bold 18px Arial";

    ctx.fillText(
        "🔵 " +
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
        14,
        player1.chakra,
        player1.maxChakra,
        "#008cff"
    );


    ctx.fillStyle =
        "white";

    ctx.font =
        "12px Arial";

    ctx.fillText(
        "HP",
        25,
        49
    );

    ctx.fillText(
        "CHAKRA",
        25,
        70
    );


    /* P2 */

    ctx.textAlign =
        "right";


    ctx.font =
        "bold 18px Arial";

    ctx.fillText(
        "🔴 " +
        player2.character.name,
        WIDTH - 20,
        25
    );


    drawBar(
        WIDTH - 370,
        35,
        350,
        18,
        player2.hp,
        player2.maxHp,
        "#e60000"
    );


    drawBar(
        WIDTH - 370,
        58,
        350,
        14,
        player2.chakra,
        player2.maxChakra,
        "#008cff"
    );


    /* Arena */

    ctx.textAlign =
        "center";

    ctx.fillStyle =
        "white";

    ctx.font =
        "bold 20px Arial";

    ctx.fillText(
        arena.name,
        WIDTH / 2,
        30
    );


    /* Message */

    ctx.font =
        "bold 18px Arial";

    ctx.fillStyle =
        "#ffff00";

    ctx.fillText(
        message,
        WIDTH / 2,
        HEIGHT - 45
    );


    /* Controls */

    ctx.fillStyle =
        "rgba(0,0,0,.65)";

    ctx.fillRect(
        0,
        HEIGHT - 35,
        WIDTH,
        35
    );


    ctx.fillStyle =
        "white";

    ctx.font =
        "12px Arial";

    ctx.textAlign =
        "center";


    ctx.fillText(
        "P1: WASD Move | F Attack | G Power | H Power | J Ultimate | K Block | L Rest/Heal | Q Dodge",
        WIDTH / 2,
        HEIGHT - 13
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
        WIDTH,
        HEIGHT
    );


    ctx.textAlign =
        "center";


    ctx.fillStyle =
        "#ffd700";

    ctx.font =
        "bold 55px Arial";


    ctx.fillText(
        "🏆 " +
        winner.character.name +
        " WINS!",
        WIDTH / 2,
        HEIGHT / 2 - 40
    );


    ctx.fillStyle =
        "white";

    ctx.font =
        "25px Arial";


    ctx.fillText(
        "Press R to restart",
        WIDTH / 2,
        HEIGHT / 2 + 20
    );
}


// ============================================================
// RESTART
// ============================================================

function restartGame() {

    selectedP1 = null;

    selectedP2 = null;

    player1 = null;

    player2 = null;

    arena = null;

    winner = null;

    projectiles = [];

    effects = [];

    terrainObjects = [];

    craters = [];

    waterSplits = [];

    gameState =
        "characterSelect";

    message =
        "PLAYER 1: SELECT YOUR CHARACTER";
}


document.addEventListener(
    "keydown",
    function (e) {

        if (
            e.key.toLowerCase() === "r" &&
            gameState === "gameOver"
        ) {

            restartGame();
        }

    }
);


// ============================================================
// DRAW
// ============================================================

function draw() {

    if (
        gameState === "characterSelect"
    ) {

        drawCharacterSelect();

        return;
    }


    if (
        gameState === "arenaSelect"
    ) {

        drawArenaSelect();

        return;
    }


    if (
        gameState === "playing" ||
        gameState === "gameOver"
    ) {

        drawArena();

        drawPlayer(
            player1
        );

        drawPlayer(
            player2
        );

        drawProjectiles();

        drawEffects();

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

    handleCharacterSelection();

    handleArenaSelection();

    updateGame();

    draw();


    /*
       Clear one-frame key presses.
    */

    for (
        let key in pressed
    ) {

        delete pressed[key];
    }


    requestAnimationFrame(
        gameLoop
    );
}


// ============================================================
// START
// ============================================================

gameLoop();
