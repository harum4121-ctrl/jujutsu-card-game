function startBattle() {

    // バトル用キャラクター作成
    gameState.battleCharacters = [];

    gameState.selectedCharacters.forEach(id => {

        const char = characters[id];

        gameState.battleCharacters.push({

            id: id,

            name: char.name,

            maxHp: char.hp,
            currentHp: char.hp,

            currentCursedPower: char.cursedPower,

            cursedPowerRecovery: char.cursedPowerRecovery,

            hasActed: false,

            equipment: [],

            cooldowns: {}

        });

    });

    // 山札作成
    gameState.drawPile = [...gameState.deck];

    gameState.drawPile.sort(() => Math.random() - 0.5);

    gameState.hand = [];
    gameState.graveyard = [];

    for (let i = 0; i < 5; i++) {
        drawCard();
    }

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="battle">

            <h1>バトル</h1>

            <p>
                山札：
                <span id="deckCount"></span>枚
            </p>

            <h2>味方キャラクター</h2>

            <div id="playerCharacters"></div>

            <h2>手札</h2>

            <div id="hand"></div>

            <br>

            <button id="endTurn">
                ターン終了
            </button>

        </div>
    `;

    displayBattleCharacters();
    displayHand();
    updateDeckCount();

    document
        .getElementById("endTurn")
        .addEventListener("click", endTurn);

}

function drawCard() {

    if (gameState.drawPile.length === 0) {
        return;
    }

    gameState.hand.push(
        gameState.drawPile.shift()
    );

}

function endTurn() {

    drawCard();

    gameState.battleCharacters.forEach(character => {

        character.currentCursedPower +=
            character.cursedPowerRecovery;

        character.hasActed = false;

    });

    displayBattleCharacters();
    displayHand();
    updateDeckCount();

    alert("次のターン開始");

}

function updateDeckCount() {

    document.getElementById("deckCount").textContent =
        gameState.drawPile.length;

}

function displayBattleCharacters() {

    const area =
        document.getElementById("playerCharacters");

    area.innerHTML = "";

    gameState.battleCharacters.forEach(character => {

        const div =
            document.createElement("div");

        div.className = "character";

        div.innerHTML = `
            <h3>${character.name}</h3>

            <p>
                HP：
                ${character.currentHp}
                /
                ${character.maxHp}
            </p>

            <p>
                呪力：
                ${character.currentCursedPower}
            </p>
        `;

        area.appendChild(div);

    });

}

function displayHand() {

    const hand =
        document.getElementById("hand");

    hand.innerHTML = "";

    gameState.hand.forEach(card => {

        const div =
            document.createElement("div");

        div.className = "card";

        div.innerHTML = `
            <h3>${card.name}</h3>

            <p>${card.type}</p>
        `;

        hand.appendChild(div);

    });

}