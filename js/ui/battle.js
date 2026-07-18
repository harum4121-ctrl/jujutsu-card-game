
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
            nailStock: 0,

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

        maxCursedPower: enemy.maxCursedPower,
        currentCursedPower: enemy.cursedPower,
        cursedPowerRecovery: enemy.cursedPowerRecovery,

        skills: enemy.skills ?? [],
        ultimate: enemy.ultimate ?? null,

        cooldowns: {},

        turnCount: 0,

        attackBonus: 0,
        damageReduction: 0

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

// ===============================
// カードを引く
// ===============================

function drawCard(){


    if(gameState.drawPile.length === 0){

        return;

    }


    const card =
        gameState.drawPile.shift();


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

function displayBattleCharacters() {

    const area = document.getElementById("playerCharacters");

    if (!area) return;

    area.innerHTML = "";

    gameState.battleCharacters.forEach((character) => {

        const selected =
            gameState.selectedActors.includes(character);

        const disabled =
            character.currentHp <= 0 ||
            character.hasActed;

        area.innerHTML += `

        <div class="character">

            <h3>${character.name}</h3>

            <p>HP：${character.currentHp}/${character.maxHp}</p>

            <p>呪力：${character.currentCursedPower}/${character.maxCursedPower}</p>

            <button
                onclick="toggleActor('${character.id}')"
                ${disabled ? "disabled" : ""}
            >
                ${selected ? "選択解除" : "選択"}
            </button>

        </div>

        <br>

        `;

    });

    document.getElementById("actorCount").textContent =
        gameState.selectedActors.length;
}

// ===============================
// 行動キャラ選択
// ===============================

function toggleActor(id){

    const character =
        gameState.battleCharacters.find(c => c.id === id);

    if(!character) return;

    if(gameState.selectedActors.includes(character)){

        gameState.selectedActors =
            gameState.selectedActors.filter(c => c !== character);

    }else{

        if(gameState.selectedActors.length >= 2){

            alert("行動できるのは2人までです。");
            return;

        }

        gameState.selectedActors.push(character);

    }

    displayBattleCharacters();

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

    <p>${card.type}</p>

    <button onclick="useCard(${index})">

        使用

    </button>

</div>

        `;


    });

}

function useCard(index) {

    const card = gameState.hand[index];
    
    if (card.type === "サポート") {

    // サポートカード処理

}
else if (card.type === "呪具") {

    // 呪具カード処理

}
else if (card.type === "領域") {

    // 領域カード処理

}
else if (card.type === "呪物") {

    // 呪物カード処理

}

    alert(card.name + " を使用しました");

    // 墓地へ送る
    gameState.graveyard.push(card);

    // 手札から削除
    gameState.hand.splice(index, 1);

    // 手札を更新
    displayHand();

}

// ===============================
// 敵ターン
// ===============================

function enemyTurn() {


    const enemiesAlive =

        gameState.enemyCharacters.filter(

            enemy => enemy.currentHp > 0

        );


    const playersAlive =

        gameState.battleCharacters.filter(

            character => character.currentHp > 0

        );


    enemiesAlive.forEach(enemy => {

        enemy.turnCount++;


        let skill;

        // 5ターンごとに必殺技
        if (
            enemy.turnCount % 5 === 0 &&
            enemy.ultimate
        ) {

            skill = enemy.ultimate;

        } else {

            const r = Math.random() * 100;

if (r < 20) {

    skill = enemy.skills[2]; // 打撃

} else if (r < 60) {

    skill = enemy.skills[1]; // 捌

} else {

    skill = enemy.skills[0]; // 解

}

        }

        // 次はここから攻撃処理を書く
        // 攻撃対象
alert("宿儺は " + skill.name + " を選択");
        if (skill.target === "単体") {

            const target =
                playersAlive[
                    Math.floor(
                        Math.random() * playersAlive.length
                    )
                ];

            const damage =
                calculateDamage(enemy, target, skill);

            target.currentHp -= damage;

            if (target.currentHp < 0) {

                target.currentHp = 0;

            }

            applyEffects(
                enemy,
                target,
                skill.effects
            );

            alert(
                enemy.name +
                " の " +
                skill.name +
                "！\n\n" +
                target.name +
                " に " +
                damage +
                " ダメージ！"
            );

        }

        // 全体攻撃
        else if (skill.target === "全体") {

            playersAlive.forEach(target => {

                const damage =
                    calculateDamage(enemy, target, skill);

                target.currentHp -= damage;

                if (target.currentHp < 0) {

                    target.currentHp = 0;

                }

                applyEffects(
                    enemy,
                    target,
                    skill.effects
                );

            });

            alert(
                enemy.name +
                " の " +
                skill.name +
                "！\n\n味方全体に攻撃！"
            );

        }
    });
    // プレイヤー側ターン開始処理
    gameState.battleCharacters.forEach(character => {

        if (character.currentHp <= 0) return;

        // 呪力回復
        character.currentCursedPower +=
            character.cursedPowerRecovery;

        if (
            character.currentCursedPower >
            character.maxCursedPower
        ) {

            character.currentCursedPower =
                character.maxCursedPower;

        }

        // CT減少
        for (const skill in character.cooldowns) {

            if (character.cooldowns[skill] > 0) {

                character.cooldowns[skill]--;

            }

        }

        // 行動可能に戻す
        character.hasActed = false;

    });

drawCard();

showBattleScreen();


}

// ===============================
// 必殺カード枚数取得
// ===============================

function getUltimateCardCount() {

    return gameState.hand.filter(card =>
        card.type === "必殺"
    ).length;

}

// ===============================
// 必殺カード消費
// ===============================

function consumeUltimateCards(count) {

    let remain = count;

    gameState.hand = gameState.hand.filter(card => {

        if (remain > 0 && card.type === "必殺") {

            gameState.graveyard.push(card);
            remain--;

            return false;

        }

        return true;

    });

}