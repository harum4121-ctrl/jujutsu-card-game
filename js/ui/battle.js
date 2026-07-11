function startBattle() {

    // 山札を作る
    gameState.drawPile = [...gameState.deck];

    // 山札をシャッフル
    gameState.drawPile.sort(() => Math.random() - 0.5);

    // 手札を空にする
    gameState.hand = [];

    // 初期手札5枚
    for (let i = 0; i < 5; i++) {

        if (gameState.drawPile.length > 0) {
            gameState.hand.push(gameState.drawPile.shift());
        }

    }

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="battle">

            <h1>バトル開始</h1>

            <h2>味方キャラクター</h2>
            <div id="playerCharacters"></div>

            <h2>手札</h2>
            <div id="hand"></div>

            <p>山札：<span id="deckCount"></span>枚</p>

        </div>
    `;

    displayBattleCharacters();
    displayHand();

    document.getElementById("deckCount").textContent =
        gameState.drawPile.length;

}

function displayBattleCharacters() {

    const area = document.getElementById("playerCharacters");

    area.innerHTML = "";

    gameState.selectedCharacters.forEach(id => {

        const char = characters[id];

        const div = document.createElement("div");

        div.className = "character";

        div.innerHTML = `
            <h3>${char.name}</h3>
            <p>HP：${char.hp}</p>
            <p>呪力：${char.cursedPower}</p>
        `;

        area.appendChild(div);

    });

}

function displayHand() {

    const hand = document.getElementById("hand");

    hand.innerHTML = "";

    gameState.hand.forEach(card => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
            <h3>${card.name}</h3>
            <p>${card.type}</p>
        `;

        hand.appendChild(div);

    });

}