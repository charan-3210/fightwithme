// ============================================================
// CHARACTERS.JS
// 30 Naruto characters
// ============================================================

const characters = [

    // 1
    {
        id: 1,
        name: "Naruto Uzumaki",
        clan: "Uzumaki",
        hp: 950,
        chakra: 950,
        attack: 88,
        defense: 82,
        speed: 85,
        healing: 90,

        powers: [
            "Shadow Clone",
            "Rasengan",
            "Rasenshuriken",
            "Sage Mode",
            "Kurama Mode"
        ]
    },

    // 2
    {
        id: 2,
        name: "Sasuke Uchiha",
        clan: "Uchiha",
        hp: 900,
        chakra: 950,
        attack: 92,
        defense: 80,
        speed: 92,
        healing: 65,

        powers: [
            "Chidori",
            "Fireball",
            "Amaterasu",
            "Susanoo",
            "Indra Arrow"
        ]
    },

    // 3 - STRONGEST
    {
        id: 3,
        name: "Madara Uchiha",
        clan: "Uchiha",
        hp: 1200,
        chakra: 1300,
        attack: 100,
        defense: 100,
        speed: 95,
        healing: 95,

        powers: [
            "Fire Style",
            "Perfect Susanoo",
            "Limbo",
            "Rinnegan",
            "Meteor"
        ]
    },

    // 4
    {
        id: 4,
        name: "Hashirama Senju",
        clan: "Senju",
        hp: 1150,
        chakra: 1200,
        attack: 94,
        defense: 96,
        speed: 78,
        healing: 100,

        powers: [
            "Wood Style",
            "Wood Clone",
            "Wood Dragon",
            "Healing",
            "1000 Hands"
        ]
    },

    // 5
    {
        id: 5,
        name: "Tobirama Senju",
        clan: "Senju",
        hp: 850,
        chakra: 900,
        attack: 88,
        defense: 80,
        speed: 98,
        healing: 60,

        powers: [
            "Water Style",
            "Shadow Clone",
            "Water Dragon",
            "Flying Raijin",
            "Tandem Paper Bomb"
        ]
    },

    // 6
    {
        id: 6,
        name: "Minato Namikaze",
        clan: "Namikaze",
        hp: 900,
        chakra: 1000,
        attack: 94,
        defense: 82,
        speed: 100,
        healing: 70,

        powers: [
            "Rasengan",
            "Flying Raijin",
            "Teleport",
            "Barrier",
            "Sage Mode"
        ]
    },

    // 7
    {
        id: 7,
        name: "Itachi Uchiha",
        clan: "Uchiha",
        hp: 780,
        chakra: 900,
        attack: 94,
        defense: 76,
        speed: 88,
        healing: 45,

        powers: [
            "Sharingan",
            "Tsukuyomi",
            "Amaterasu",
            "Susanoo",
            "Totsuka Blade"
        ]
    },

    // 8
    {
        id: 8,
        name: "Obito Uchiha",
        clan: "Uchiha",
        hp: 1000,
        chakra: 1050,
        attack: 92,
        defense: 90,
        speed: 94,
        healing: 85,

        powers: [
            "Kamui",
            "Fire Style",
            "Wood Style",
            "Sharingan",
            "Ten Tails"
        ]
    },

    // 9
    {
        id: 9,
        name: "Kakashi Hatake",
        clan: "Hatake",
        hp: 760,
        chakra: 720,
        attack: 84,
        defense: 75,
        speed: 90,
        healing: 50,

        powers: [
            "Lightning Blade",
            "Sharingan",
            "Water Style",
            "Earth Style",
            "Kamui"
        ]
    },

    // 10
    {
        id: 10,
        name: "Might Guy",
        clan: "None",
        hp: 1050,
        chakra: 700,
        attack: 100,
        defense: 90,
        speed: 100,
        healing: 55,

        powers: [
            "Leaf Hurricane",
            "Primary Lotus",
            "Dynamic Entry",
            "Seventh Gate",
            "Eighth Gate"
        ]
    },

    // 11
    {
        id: 11,
        name: "Rock Lee",
        clan: "None",
        hp: 900,
        chakra: 500,
        attack: 90,
        defense: 82,
        speed: 96,
        healing: 45,

        powers: [
            "Leaf Whirlwind",
            "Front Lotus",
            "Reverse Lotus",
            "Sixth Gate",
            "Seventh Gate"
        ]
    },

    // 12
    {
        id: 12,
        name: "Jiraiya",
        clan: "None",
        hp: 900,
        chakra: 950,
        attack: 86,
        defense: 82,
        speed: 70,
        healing: 70,

        powers: [
            "Rasengan",
            "Toad Summoning",
            "Fire Style",
            "Oil Style",
            "Sage Mode"
        ]
    },

    // 13
    {
        id: 13,
        name: "Orochimaru",
        clan: "None",
        hp: 1000,
        chakra: 1000,
        attack: 84,
        defense: 88,
        speed: 75,
        healing: 98,

        powers: [
            "Snake Summoning",
            "Snake Sword",
            "Edo Tensei",
            "Regeneration",
            "Eight Branches"
        ]
    },

    // 14
    {
        id: 14,
        name: "Pain",
        clan: "Uzumaki",
        hp: 950,
        chakra: 1100,
        attack: 94,
        defense: 88,
        speed: 78,
        healing: 75,

        powers: [
            "Shinra Tensei",
            "Bansho Tenin",
            "Chibaku Tensei",
            "Animal Path",
            "Six Paths"
        ]
    },

    // 15
    {
        id: 15,
        name: "Nagato",
        clan: "Uzumaki",
        hp: 900,
        chakra: 1150,
        attack: 95,
        defense: 82,
        speed: 65,
        healing: 70,

        powers: [
            "Rinnegan",
            "Shinra Tensei",
            "Chibaku Tensei",
            "Soul Removal",
            "Six Paths"
        ]
    },

    // 16
    {
        id: 16,
        name: "Killer B",
        clan: "Eight-Tails Jinchuriki",
        hp: 1000,
        chakra: 1050,
        attack: 90,
        defense: 88,
        speed: 82,
        healing: 85,

        powers: [
            "Lightning Style",
            "Seven Swords",
            "Lariat",
            "Eight-Tails",
            "Bijuu Bomb"
        ]
    },

    // 17
    {
        id: 17,
        name: "Gaara",
        clan: "Kazekage",
        hp: 920,
        chakra: 1000,
        attack: 84,
        defense: 100,
        speed: 60,
        healing: 70,

        powers: [
            "Sand Bullet",
            "Sand Coffin",
            "Sand Shield",
            "Sand Tsunami",
            "Desert Burial"
        ]
    },

    // 18
    {
        id: 18,
        name: "Neji Hyuga",
        clan: "Hyuga",
        hp: 760,
        chakra: 650,
        attack: 84,
        defense: 86,
        speed: 92,
        healing: 45,

        powers: [
            "Byakugan",
            "Gentle Fist",
            "Eight Trigrams",
            "Rotation",
            "Air Palm"
        ]
    },

    // 19
    {
        id: 19,
        name: "Hinata Hyuga",
        clan: "Hyuga",
        hp: 720,
        chakra: 680,
        attack: 78,
        defense: 78,
        speed: 84,
        healing: 50,

        powers: [
            "Byakugan",
            "Gentle Fist",
            "Air Palm",
            "Protection",
            "Twin Lion Fists"
        ]
    },

    // 20
    {
        id: 20,
        name: "Shikamaru Nara",
        clan: "Nara",
        hp: 650,
        chakra: 720,
        attack: 70,
        defense: 65,
        speed: 65,
        healing: 40,

        powers: [
            "Shadow Possession",
            "Shadow Stitch",
            "Shadow Strangle",
            "Shadow Trap",
            "Shadow Imitation"
        ]
    },

    // 21
    {
        id: 21,
        name: "Deidara",
        clan: "Iwagakure",
        hp: 720,
        chakra: 850,
        attack: 92,
        defense: 65,
        speed: 82,
        healing: 40,

        powers: [
            "Clay Bird",
            "Clay Spider",
            "C2 Dragon",
            "C3 Bomb",
            "C4"
        ]
    },

    // 22
    {
        id: 22,
        name: "Sasori",
        clan: "Puppet Master",
        hp: 850,
        chakra: 800,
        attack: 88,
        defense: 80,
        speed: 70,
        healing: 90,

        powers: [
            "Puppet Army",
            "Poison",
            "Iron Sand",
            "Third Kazekage",
            "Hundred Puppets"
        ]
    },

    // 23
    {
        id: 23,
        name: "Kisame Hoshigaki",
        clan: "Hoshigaki",
        hp: 1000,
        chakra: 1050,
        attack: 92,
        defense: 92,
        speed: 70,
        healing: 80,

        powers: [
            "Water Style",
            "Samehada",
            "Water Shark",
            "Water Prison",
            "Super Shark Bomb"
        ]
    },

    // 24
    {
        id: 24,
        name: "Hidan",
        clan: "Jashin",
        hp: 950,
        chakra: 600,
        attack: 88,
        defense: 90,
        speed: 68,
        healing: 100,

        powers: [
            "Scythe",
            "Ritual",
            "Immortality",
            "Blood Curse",
            "Three-Blade Attack"
        ]
    },

    // 25
    {
        id: 25,
        name: "Kakuzu",
        clan: "Takigakure",
        hp: 1100,
        chakra: 950,
        attack: 92,
        defense: 95,
        speed: 62,
        healing: 98,

        powers: [
            "Earth Spear",
            "Fire Mask",
            "Wind Mask",
            "Lightning Mask",
            "Five Hearts"
        ]
    },

    // 26
    {
        id: 26,
        name: "Konan",
        clan: "Amegakure",
        hp: 700,
        chakra: 850,
        attack: 82,
        defense: 65,
        speed: 86,
        healing: 40,

        powers: [
            "Paper Shuriken",
            "Paper Clone",
            "Paper Wings",
            "Paper Spear",
            "Paper Ocean"
        ]
    },

    // 27
    {
        id: 27,
        name: "Temari",
        clan: "Sand",
        hp: 680,
        chakra: 750,
        attack: 84,
        defense: 65,
        speed: 72,
        healing: 40,

        powers: [
            "Wind Blade",
            "Wind Scythe",
            "Great Wind",
            "Summoning",
            "Wind Storm"
        ]
    },

    // 28
    {
        id: 28,
        name: "Kabuto Yakushi",
        clan: "None",
        hp: 900,
        chakra: 1000,
        attack: 86,
        defense: 82,
        speed: 85,
        healing: 95,

        powers: [
            "Medical Ninjutsu",
            "Snake Mode",
            "Regeneration",
            "Sage Mode",
            "Sound Genjutsu"
        ]
    },

    // 29
    {
        id: 29,
        name: "Kaguya Otsutsuki",
        clan: "Otsutsuki",
        hp: 1150,
        chakra: 1250,
        attack: 98,
        defense: 98,
        speed: 90,
        healing: 90,

        powers: [
            "Byakugan",
            "Dimension Shift",
            "Bone Ash",
            "Truth Seeking Balls",
            "Expansive Truth-Seeking Ball"
        ]
    },

    // 30
    {
        id: 30,
        name: "Momoshiki Otsutsuki",
        clan: "Otsutsuki",
        hp: 1050,
        chakra: 1200,
        attack: 96,
        defense: 90,
        speed: 94,
        healing: 80,

        powers: [
            "Chakra Absorption",
            "Rinnegan",
            "Elemental Attack",
            "Chakra Weapons",
            "Divine Tree Power"
        ]
    }

];


// ============================================================
// GET CHARACTER
// ============================================================

function getCharacter(id) {
    return characters.find(
        character => character.id === id
    );
}


// ============================================================
// GET CHARACTER BY NAME
// ============================================================

function getCharacterByName(name) {
    return characters.find(
        character => character.name === name
    );
}


// ============================================================
// STRONGEST CHARACTER
// ============================================================

function getStrongestCharacter() {

    return characters.reduce(
        (strongest, character) => {

            const power =
                character.attack +
                character.defense +
                character.chakra;

            const strongestPower =
                strongest.attack +
                strongest.defense +
                strongest.chakra;

            return power > strongestPower
                ? character
                : strongest;

        }
    );
}


// ============================================================
// EXPORT
// ============================================================

console.log(
    "Loaded " +
    characters.length +
    " characters."
);

console.log(
    "Strongest:",
    getStrongestCharacter().name
);
