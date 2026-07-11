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

    currentHp: enemy.hp,

    attack: enemy.attack,

    skills: enemy.skills,

    ultimate: enemy.ultimate

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


showBattleScreen();

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


    alert("敵のターン");

    enemyTurn();

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

    if (!hand) return;

    hand.innerHTML = "";

    gameState.hand.forEach((card, index) => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `

            <h3>${card.name}</h3>

            <p>${card.type}</p>

            <button>
                使用
            </button>

        `;


        div.querySelector("button").onclick = () => {

            useCard(index);

        };


        hand.appendChild(div);

    });

}
function useCard(index) {

    const card =
        gameState.hand[index];


    // 装備カードの場合
    if (card.type === "装備") {

        showEquipmentTarget(index);

        return;

    }


    alert(
        card.name +
        " を使用しました！"
    );


    applyCardEffect(card);


    gameState.graveyard.push(card);

    gameState.hand.splice(index,1);


    displayHand();

}
function showEquipmentTarget(cardIndex) {

    const app =
        document.getElementById("app");


    let html = `

        <div class="battle">

        <h2>装備するキャラクターを選択</h2>

    `;


    gameState.battleCharacters.forEach((character,index)=>{


        html += `

        <div class="character">

            <h3>${character.name}</h3>

            <button onclick="equipCard(${cardIndex},${index})">

                装備する

            </button>

        </div>

        `;


    });


    html += `</div>`;


    app.innerHTML = html;

}
function equipCard(cardIndex, characterIndex) {


    const card =
        gameState.hand[cardIndex];


    const character =
        gameState.battleCharacters[characterIndex];


    character.equipment.push(card);


    alert(
        character.name +
        " に " +
        card.name +
        " を装備しました！"
    );


    gameState.hand.splice(cardIndex,1);


    gameState.graveyard.push(card);


    showBattleScreen();

}

}
function applyCardEffect(card) {


    if (card.type === "装備") {

        alert(
            card.name + " を装備しました"
        );

    }


    else if (card.type === "領域") {

        alert(
            card.name + " を展開しました"
        );

    }


    else if (card.type === "サポート") {

        alert(
            card.name + " の効果発動！"
        );

    }


    else if (card.type === "必殺") {

        alert(
            card.name + " 必殺カードを使用！"
        );

    }


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
function showBattleScreen() {

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
function enemyTurn() {

    gameState.enemyCharacters.forEach(enemy => {

        if (enemy.currentHp <= 0) {
            return;
        }

        const aliveCharacters =
            gameState.battleCharacters.filter(
                character => character.currentHp > 0
            );

        if (aliveCharacters.length === 0) {
            return;
        }


        const target =
            aliveCharacters[
                Math.floor(
                    Math.random() *
                    aliveCharacters.length
                )
            ];


        const damage = 30;


        target.currentHp -= damage;


        if (target.currentHp < 0) {
            target.currentHp = 0;
        }


        alert(
            enemy.name +
            " の攻撃！\n\n" +
            target.name +
            " に " +
            damage +
            " ダメージ！"
        );

    });


setTimeout(() => {

    showBattleScreen();

    alert("味方のターン");

}, 500);
}