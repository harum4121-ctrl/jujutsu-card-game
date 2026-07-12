// ===============================
// バトル開始
// ===============================

function startBattle() {

    // 初期化
    gameState.battleCharacters = [];
    gameState.enemyCharacters = [];
    gameState.selectedActors = [];
    gameState.currentActorIndex = 0;
    gameState.selectedSkill = null;
    gameState.currentField = null;

    // 味方生成
    gameState.selectedCharacters.forEach(id => {

        const data = characters[id];

        gameState.battleCharacters.push({

            id: id,
            name: data.name,
            type: data.type,

            maxHp: data.hp,
            currentHp: data.hp,

            maxCursedPower: data.maxCursedPower,
            currentCursedPower: data.cursedPower,

            cursedPowerRecovery: data.cursedPowerRecovery,

            cooldowns: {},
            equipment: [],

            attackBonus: 0,
            damageReduction: 0,

            hasActed: false

        });

    });

// 敵生成
const enemy =
    enemies[gameState.selectedEnemy];

gameState.enemyCharacters = [

    {

        id: gameState.selectedEnemy,

        name: enemy.name,

        maxHp: enemy.hp,
        currentHp: enemy.hp,

        attack: enemy.attack,

        skills: enemy.skills ?? [],
        ultimate: enemy.ultimate ?? null

    }

];

    // デッキ作成
    gameState.drawPile = [...gameState.deck];

    gameState.drawPile.sort(() => Math.random() - 0.5);

    gameState.hand = [];
    gameState.graveyard = [];

    // 初期手札5枚
    for (let i = 0; i < 5; i++) {

        drawCard();

    }

    // 行動状態リセット
    gameState.battleCharacters.forEach(character => {

        character.hasActed = false;

    });

    // バトル画面表示
    showBattleScreen();

}
// ===============================
// バトル画面
// ===============================

function showBattleScreen() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="battle">

            <h1>バトル</h1>

            <h2>敵</h2>
            <div id="enemyCharacters"></div>

            <hr>

            <h2>味方</h2>

            <p>
                行動選択
                <span id="actorCount">0</span>/2
            </p>

            <div id="playerCharacters"></div>

            <button id="startAction">
                行動開始
            </button>

            <hr>

            <h2>手札</h2>

            <div id="hand"></div>

            <button id="endTurn">
                ターン終了
            </button>

        </div>
    `;

    displayEnemyCharacters();
    displayBattleCharacters();
    displayHand();

    document.getElementById("startAction").onclick = () => {

        if (gameState.selectedActors.length === 0) {

            alert("行動するキャラクターを選択してください");
            return;

        }

        // 行動済みフラグをリセット
        gameState.selectedActors.forEach(character => {

            character.hasActed = false;

        });

        startActionPhase();

    };

    document.getElementById("endTurn").onclick = () => {

        enemyTurn();

    };

}