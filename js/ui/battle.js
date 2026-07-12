alert("battle.js読み込み成功");
// ===============================
// バトル開始
// ===============================

function startBattle() {

alert("startBattle開始");

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

alert("味方生成完了");
// 敵生成
const enemy =
    enemies[gameState.selectedEnemy];
    
    alert("敵データ確認：" + enemy.name);

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

alert("デッキ処理開始");

    // デッキ作成
    gameState.drawPile = [...gameState.deck];

    gameState.drawPile.sort(() => Math.random() - 0.5);

alert("シャッフル完了");

    gameState.hand = [];
    gameState.graveyard = [];

alert("手札初期化完了");

// 初期手札5枚
for (let i = 0; i < 5; i++) {

    drawCard();

}

alert("手札作成完了");


// 行動状態リセット
gameState.battleCharacters.forEach(character => {

    character.hasActed = false;

});

alert("状態リセット完了");


// バトル画面表示
alert("showBattleScreen前");

showBattleScreen();

}
// ===============================
// バトル画面
// ===============================

function showBattleScreen() {
    
    alert("showBattleScreen");

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

// ===============================
// カードを引く
// ===============================

function drawCard(){

    alert("drawCard開始");

    if(gameState.drawPile.length === 0){

        alert("山札がありません");
        return;

    }


    const card =
        gameState.drawPile.shift();


    alert(
        "引いたカード：" + card.name
    );


    gameState.hand.push(card);

}
// ===============================
// 敵表示
// ===============================

function displayEnemyCharacters(){

    const area =
        document.getElementById("enemyCharacters");


    if(!area) return;


    area.innerHTML = "";


    gameState.enemyCharacters.forEach(enemy=>{

        area.innerHTML += `

        <div class="character">

            <h3>${enemy.name}</h3>

            <p>
                HP：
                ${enemy.currentHp}
                /
                ${enemy.maxHp}
            </p>

        </div>

        `;

    });

}


// ===============================
// 味方表示
// ===============================

function displayBattleCharacters(){

    const area =
        document.getElementById("playerCharacters");


    if(!area) return;


    area.innerHTML = "";


    gameState.battleCharacters.forEach(character=>{


        area.innerHTML += `

        <div class="character">

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
                /
                ${character.maxCursedPower}
            </p>


        </div>

        `;


    });

}


// ===============================
// 手札表示
// ===============================

function displayHand(){

    const area =
        document.getElementById("hand");


    if(!area) return;


    area.innerHTML = "";


    gameState.hand.forEach(card=>{


        area.innerHTML += `

        <div class="card">

            <h3>${card.name}</h3>

            <p>
                ${card.type}
            </p>

        </div>

        `;


    });

}