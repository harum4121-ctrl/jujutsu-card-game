function startBattle() {

    gameState.selectedActors = [];

    // バトル用キャラクター作成
    gameState.battleCharacters = [];

    gameState.selectedCharacters.forEach(id => {

        const char = characters[id];

        gameState.battleCharacters.push({

            id: id,

            name: char.name,

            maxHp: char.hp,
            currentHp: char.hp,

            maxCursedPower: char.maxCursedPower,
            currentCursedPower: char.cursedPower,

            cursedPowerRecovery: char.cursedPowerRecovery,

            hasActed: false,

            equipment: [],

            cooldowns: {}

        });
        
    });

// 敵キャラクター作成
gameState.enemyCharacters = [];

for (const id in enemies) {

    const enemy = enemies[id];

    gameState.enemyCharacters.push({

        id: id,

        name: enemy.name,

        maxHp: enemy.hp,
        currentHp: enemy.hp

    });

}

console.log(gameState.enemyCharacters);

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
            
            <h2>敵チーム</h2>

            <div id="enemyCharacters"></div>

            <hr>

            <p>
                山札：
                <span id="deckCount"></span>枚
            </p>

            <h2>味方キャラクター</h2>

            <p>
                行動選択：
                <span id="actorCount">0</span>/2
            </p>

            <div id="playerCharacters"></div>

            <button id="startAction">
                行動開始
            </button>

            <h2>手札</h2>

            <div id="hand"></div>

            <br>

            <button id="endTurn">
                ターン終了
            </button>

        </div>
    `;

  displayEnemyCharacters();
  displayBattleCharacters();
  displayHand();
  updateDeckCount();

    document
        .getElementById("endTurn")
        .addEventListener("click", endTurn);

    document
        .getElementById("startAction")
        .addEventListener("click", () => {

            if (gameState.selectedActors.length !== 2) {
                alert("行動するキャラクターを2人選択してください");
                return;
            }

            startActionPhase();

        });

}
function drawCard() {

    if (gameState.drawPile.length === 0) {
        return;
    }

    gameState.hand.push(gameState.drawPile.shift());

}

function endTurn() {

    drawCard();

    gameState.battleCharacters.forEach(character => {

        character.currentCursedPower = Math.min(
            character.currentCursedPower + character.cursedPowerRecovery,
            character.maxCursedPower
        );

        character.hasActed = false;

    });

    gameState.selectedActors = [];

    displayEnemyCharacters();
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

    const area = document.getElementById("playerCharacters");

    area.innerHTML = "";

    document.getElementById("actorCount").textContent =
        gameState.selectedActors.length;

    gameState.battleCharacters.forEach(character => {

        const div = document.createElement("div");

        div.className = "character";

        if (gameState.selectedActors.includes(character)) {
            div.classList.add("selected");
        }

        div.innerHTML = `
            <h3>${character.name}</h3>

            <p>HP：${character.currentHp}/${character.maxHp}</p>

            <p>呪力：${character.currentCursedPower}/${character.maxCursedPower}</p>

            <button>
                ${gameState.selectedActors.includes(character) ? "選択解除" : "選択"}
            </button>
        `;

        div.querySelector("button").onclick = () => {

            if (gameState.selectedActors.includes(character)) {

                gameState.selectedActors =
                    gameState.selectedActors.filter(c => c !== character);

            } else {

                if (gameState.selectedActors.length >= 2) {
                    alert("行動できるのは2人までです");
                    return;
                }

                gameState.selectedActors.push(character);

            }

            displayBattleCharacters();

        };

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

function displayEnemyCharacters() {

    const area = document.getElementById("enemyCharacters");

    area.innerHTML = "";

    gameState.enemyCharacters.forEach(enemy => {

        const div = document.createElement("div");

        div.className = "character";

        div.innerHTML = `
            <h3>${enemy.name}</h3>

            <p>
                HP：
                ${enemy.currentHp}
                /
                ${enemy.maxHp}
            </p>
        `;

        area.appendChild(div);

    });

}