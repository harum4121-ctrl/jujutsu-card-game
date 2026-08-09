
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
            cardImage:data.cardImage,
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

damageBuff: 0,
damageBuffTurn: 0,

doubleNextDamage: false,
doubleNextDamageStun: false,

damageReduction: 0,
damageReductionTurn: 0,

damageDown: 0,
damageDownTurn: 0,

damageTakenUp: 0,
damageTakenUpTurn: 0,
lastSingleDamage: 0,
ignoreInvincible: 0,

invincible: 0,
stun: 0,
taunt: 0,

// 火傷
burnDamage: 0,
burnTurn: 0,

skillCostDown: 0,
nextSkillFree: false,
freeUltimate: false,
            
hasActed: false,

extraAction: false,
extraActionUsed: false,
extraActionStun: false

        });

    });

// ===============================
// 敵生成
// ===============================

gameState.enemyCharacters = [];


// ===============================
// 通常バトル
// 3人のAIキャラクターを生成
// ===============================

if (gameState.battleMode === "normal") {

    gameState.normalEnemyTeam.forEach(id => {

        const data =
            characters[id];

        gameState.enemyCharacters.push({

            id: id,

            name: data.name,

            cardImage: data.cardImage,

            type: data.type,


            // ===============================
            // HP
            // ===============================

            maxHp: data.hp,

            currentHp: data.hp,


            // ===============================
            // 呪力
            // ===============================

            maxCursedPower:
                data.maxCursedPower,

            currentCursedPower:
                data.cursedPower,

            cursedPowerRecovery:
                data.cursedPowerRecovery,


            // ===============================
            // スキル
            // ===============================

            skills:
                data.skills ?? [],

            ultimate:
                data.ultimate ?? null,


            // ===============================
            // 行動関係
            // ===============================

            cooldowns: {},

            sealedSkills: {},

            turnCount: 0,

            hasActed: false,


            // ===============================
            // 攻撃補正
            // ===============================

            attackBonus: 0,

            damageBuff: 0,

            damageBuffTurn: 0,

            damageDown: 0,

            damageDownTurn: 0,


            // ===============================
            // 防御補正
            // ===============================

            damageReduction: 0,

            damageReductionTurn: 0,

            damageTakenUp: 0,

            damageTakenUpTurn: 0,


            // ===============================
            // その他
            // ===============================

            lastSingleDamage: 0,

            ignoreInvincible: 0,

            invincible: 0,

            stun: 0,

            taunt: 0,


            // ===============================
            // 火傷
            // ===============================

            burnDamage: 0,

            burnTurn: 0,

            burnChanceBonus: 0,

            burnChanceBonusTurn: 0,


            // ===============================
            // 呪力補正
            // ===============================

            skillCostDown: 0,


            // ===============================
            // 真人
            // ===============================

            transformation: null

        });

    });

}


// ===============================
// ボスバトル
// 今までの敵生成
// ===============================

else {

    const enemy =
        enemies[
            gameState.selectedEnemy
        ];


    gameState.enemyCharacters = [

        {

            id:
                gameState.selectedEnemy,

            name:
                enemy.name,


            // ===============================
            // HP
            // ===============================

            maxHp:
                enemy.hp,

            currentHp:
                enemy.hp,


            // ===============================
            // ボス攻撃力
            // ===============================

            attack:
                enemy.attack,


            // ===============================
            // 呪力
            // ===============================

            maxCursedPower:
                enemy.maxCursedPower,

            currentCursedPower:
                enemy.cursedPower,

            cursedPowerRecovery:
                enemy.cursedPowerRecovery,


            // ===============================
            // スキル
            // ===============================

            skills:
                enemy.skills ?? [],

            ultimate:
                enemy.ultimate ?? null,


            // ===============================
            // 行動関係
            // ===============================

            cooldowns: {},

            sealedSkills: {},

            turnCount: 0,

            hasActed: false,


            // ===============================
            // 攻撃補正
            // ===============================

            attackBonus: 0,

            damageBuff: 0,

            damageBuffTurn: 0,

            damageDown: 0,

            damageDownTurn: 0,


            // ===============================
            // 防御補正
            // ===============================

            damageReduction: 0,

            damageReductionTurn: 0,

            damageTakenUp: 0,

            damageTakenUpTurn: 0,


            // ===============================
            // その他
            // ===============================

            lastSingleDamage: 0,

            ignoreInvincible: 0,

            invincible: 0,

            stun: 0,

            taunt: 0,


            // ===============================
            // 火傷
            // ===============================

            burnDamage: 0,

            burnTurn: 0,

            burnChanceBonus: 0,

            burnChanceBonusTurn: 0,


            // ===============================
            // 呪力補正
            // ===============================

            skillCostDown: 0,


            // ===============================
            // 真人「変形」
            // ===============================

            transformation: null

        }

    ];

}

    // デッキ作成
    gameState.drawPile = [...gameState.deck];

    gameState.drawPile.sort(() => Math.random() - 0.5);


    gameState.hand = [];
    gameState.graveyard = [];

for (let i = 0; i < 5; i++) {

    if (!drawCard()) {

        showBattleResult("lose");
        return;

    }

}

// 行動状態リセット
gameState.battleCharacters.forEach(character => {

    character.hasActed = false;

});




// バトル画面表示


showBattleScreen();

}

function searchUltimateCard() {

    const app = document.getElementById("app");

    let html = `
        <div class="battle">

        <h2>手札に加える必殺カードを選択</h2>
    `;

    const ultimateCards =
        gameState.drawPile.filter(card => card.type === "必殺");

    if (ultimateCards.length === 0) {

        alert("山札に必殺カードがありません");
        showBattleScreen();
        return;

    }

    ultimateCards.forEach(card => {

        html += `

            <div class="card">

                <h3>${card.name}</h3>

                <button onclick="addUltimateCard('${card.id}')">

                    手札に加える

                </button>

            </div>

            <br>

        `;

    });

    html += `
        <button onclick="showBattleScreen()">

            戻る

        </button>

        </div>
    `;

    app.innerHTML = html;

}

function addUltimateCard(id) {

    const index =
        gameState.drawPile.findIndex(
            card => card.id === id
        );

    if (index === -1) return;

    const card =
        gameState.drawPile.splice(index, 1)[0];

    gameState.hand.push(card);

    // サポートカードを墓地へ
    gameState.graveyard.push(
        gameState.selectedCard
    );

    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );

    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;

    alert(card.name + " を手札に加えた！");

    showBattleScreen();

}

// ===============================
// バトル画面
// ===============================

function showBattleScreen() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="battle-screen">

            <!-- 上部情報 -->
            <header class="battle-header">

                <div class="field-panel">
                    <span class="field-label">領域</span>
                    <strong id="fieldName">なし</strong>
                </div>

                <h1 class="battle-title">
                    呪術カードバトル
                </h1>

                <div class="deck-info">
                    <span>
                        山札：
                        <strong id="drawPileCount">
                            ${gameState.drawPile.length}
                        </strong>
                    </span>

                    <span>
                        墓地：
                        <strong id="graveyardCount">
                            ${gameState.graveyard.length}
                        </strong>
                    </span>
                </div>

            </header>


            <!-- 敵エリア -->
            <section class="enemy-zone">

                <h2 class="zone-title enemy-title">
                    ENEMY
                </h2>

                <div id="enemyCharacters"
                     class="enemy-character-area">
                </div>

            </section>


            <!-- 中央ライン -->
            <div class="battle-divider">

                <span>
                    行動キャラ
                    <strong id="actorCount">0</strong>
                    / 2
                </span>

            </div>


            <!-- 味方エリア -->
            <section class="player-zone">

                <h2 class="zone-title player-title">
                    PLAYER
                </h2>

                <div id="playerCharacters"
                     class="player-character-area">
                </div>

            </section>


            <!-- 手札と操作 -->
            <footer class="battle-bottom">

                <div class="hand-section">

                    <h2>手札</h2>

                    <div id="hand"
                         class="hand-area">
                    </div>

                </div>


                <div class="battle-actions">

                    <button
                        id="startAction"
                        class="battle-button action-button"
                    >
                        行動開始
                    </button>

                    <button
                        id="endTurn"
                        class="battle-button end-button"
                    >
                        ターン終了
                    </button>

                </div>

            </footer>
            
            <div
    id="skillWindow"
    class="skill-window hidden"
></div>

<div
    id="targetWindow"
    class="skill-window hidden"
></div>

        </div>
    `;


    displayEnemyCharacters();
    displayBattleCharacters();
    displayHand();


    const fieldText =
        document.getElementById("fieldName");

    fieldText.textContent =
        gameState.currentField
            ? gameState.currentField.card.name
            : "なし";


    document
        .getElementById("startAction")
        .onclick = () => {

            if (
                gameState.selectedActors.length === 0
            ) {

                alert(
                    "行動するキャラクターを選択してください"
                );

                return;
            }

            startActionPhase();
        };


    document
        .getElementById("endTurn")
        .onclick = () => {

            enemyTurn();
        };
}



// ===============================
// カードを引く
// ===============================
function drawCard() {

    if (gameState.drawPile.length === 0) {
        return false;
    }

    const card = gameState.drawPile.shift();
    gameState.hand.push(card);

    return true;
}

// ===============================
// 敵表示
// ===============================

function displayEnemyCharacters() {

    const area =
        document.getElementById("enemyCharacters");

    if (!area) return;

    area.innerHTML = "";

gameState.enemyCharacters.forEach((enemy, index) => {

        const hpRate =
            Math.max(
                0,
                enemy.currentHp /
                enemy.maxHp *
                100
            );

        const maxCursedPower =
            enemy.maxCursedPower ?? 100;

        const currentCursedPower =
            enemy.currentCursedPower ?? 0;

        const cpRate =
            Math.max(
                0,
                currentCursedPower /
                maxCursedPower *
                100
            );

        const statuses =
            getStatusList(enemy)
                .map(status =>
                    `<span class="status">${status}</span>`
                )
                .join("");

        area.innerHTML += `

<div
    class="character-panel enemy-panel"
    id="enemy${index}"
>

                <div class="character-name">
                    ${enemy.name}
                </div>

                <div>
                    HP：
                    ${enemy.currentHp}
                    /
                    ${enemy.maxHp}
                </div>

                <div class="bar">
                    <div
                        class="bar-fill hp"
                        style="width:${hpRate}%"
                    ></div>
                </div>

                <div>
                    呪力：
                    ${currentCursedPower}
                    /
                    ${maxCursedPower}
                </div>

                <div class="bar">
                    <div
                        class="bar-fill cp"
                        style="width:${cpRate}%"
                    ></div>
                </div>

                <div class="status-list">
                    ${statuses}
                </div>

            </div>

        `;

    });

}

function getCardStatuses(character) {

    const statuses = [];

    if ((character.invincible ?? 0) > 0) {
        statuses.push({
            icon: "盾",
            name: "無敵",
            turn: character.invincible
        });
    }

    if ((character.stun ?? 0) > 0) {
        statuses.push({
            icon: "痺",
            name: "スタン",
            turn: character.stun
        });
    }

    if ((character.damageBuff ?? 0) > 0) {
        statuses.push({
            icon: "与↑",
            name: `与ダメージ+${character.damageBuff}`,
            turn: character.damageBuffTurn
        });
    }

    if ((character.damageDown ?? 0) > 0) {
        statuses.push({
            icon: "与↓",
            name: `与ダメージ-${character.damageDown}`,
            turn: character.damageDownTurn
        });
    }

    if ((character.damageTakenUp ?? 0) > 0) {
        statuses.push({
            icon: "被↑",
            name: `被ダメージ+${character.damageTakenUp}`,
            turn: character.damageTakenUpTurn
        });
    }

    if ((character.damageReduction ?? 0) > 0) {
        statuses.push({
            icon: "被↓",
            name: `被ダメージ-${character.damageReduction}`,
            turn: character.damageReductionTurn
        });
    }

    if ((character.taunt ?? 0) > 0) {
        statuses.push({
            icon: "挑",
            name: "攻撃引き付け",
            turn: character.taunt
        });
    }

    if (character.nextSkillFree) {
        statuses.push({
            icon: "零",
            name: "次の消費呪力0",
            turn: null
        });
    }

    if (character.freeUltimate) {
        statuses.push({
            icon: "必",
            name: "必殺カード消費なし",
            turn: null
        });
    }

if ((character.burnTurn ?? 0) > 0) {

    statuses.push({
        icon: "🔥",
        name:
            "火傷 " +
            character.burnDamage +
            "ダメージ",
        turn: character.burnTurn
    });

}

    return statuses;
}

// ===============================
// 味方表示
// ===============================

function displayBattleCharacters() {

    const area =
        document.getElementById("playerCharacters");

    if (!area) return;

    area.innerHTML = "";

gameState.battleCharacters.forEach((character, index) => {

        const selected =
            gameState.selectedActors.includes(character);

        const disabled =
            character.currentHp <= 0 ||
            character.hasActed ||
            character.stun > 0;

        const wrapper =
            document.createElement("div");

        wrapper.className =
    "character-card-wrapper";

wrapper.id =
    "player" + index;

        wrapper.innerHTML = `

            ${createCharacterCard(
                character,
                {
                    mode: "battle",
                    currentHp: character.currentHp,
                    currentCp: character.currentCursedPower,
                    statuses: getCardStatuses(character),
                    selected: selected,
                    acted: character.hasActed
                }
            )}

            <button
                class="character-card-button"
                ${disabled ? "disabled" : ""}
            >
                ${
                    selected
                        ? "選択解除"
                        : "選択"
                }
            </button>

        `;

        const button =
            wrapper.querySelector(
                ".character-card-button"
            );

        button.onclick = () => {

            toggleActor(character.id);

        };
        
        wrapper.querySelector(
    ".character-card"
).onclick = () => {

    openSkillWindow(character);

};

        area.appendChild(wrapper);

    });

    const actorCount =
        document.getElementById("actorCount");

    if (actorCount) {

        actorCount.textContent =
            gameState.selectedActors.length;

    }

}

// ===============================
// 行動キャラ選択
// ===============================

function toggleActor(id){

    const character =
        gameState.battleCharacters.find(c => c.id === id);

    if(!character) return;
    
    if (character.stun > 0) {

    alert(character.name + " は行動不能です！");

    return;

}

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


gameState.hand.forEach((card, index) => {


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
        
        // 対象不要カード
if (card.id === "not_words") {

    gameState.selectedCard = card;
    gameState.selectedCardIndex = index;

    searchUltimateCard();

    return;

}

        gameState.selectedCard = card;
        gameState.selectedCardIndex = index;

        showCardTarget();
        return;

    }else if (card.type === "呪具") {

    gameState.selectedCard = card;
    gameState.selectedCardIndex = index;

    showEquipmentTarget();

    return;
}else if (card.type === "領域") {

    gameState.selectedCard = card;
    gameState.selectedCardIndex = index;

    useFieldCard();

    return;

}else if (card.type === "呪物") {

    gameState.selectedCard = card;
    gameState.selectedCardIndex = index;

    showCardTarget();

    return;

}

    alert(card.name + " を使用しました");

    gameState.graveyard.push(card);

    gameState.hand.splice(index, 1);

    displayHand();

}

function showCardTarget() {

    const card = gameState.selectedCard;

    // 味方単体
    if (card.target === "味方単体") {

        showAllyTarget();
        return;

    }
    
    if (card.target === "味方2体") {

    showTwoAllyTarget();
    return;

}

    // 敵単体
    if (card.target === "敵単体") {

        showSupportEnemyTarget();
        return;

    }

    // 味方全体
    if (card.target === "味方全体") {

        useSupportCardAllies();
        return;

    }

    // 敵全体
    if (card.target === "敵全体") {

        useSupportCardEnemies();
        return;

    }

    // 自身
    if (card.target === "自身") {

        useSupportCardSelf();
        return;

    }

}

function showSupportEnemyTarget() {

    const app = document.getElementById("app");

    let html = `
        <div class="battle">

            <h2>対象の敵を選択</h2>
    `;

    gameState.enemyCharacters.forEach((enemy, index) => {

        if (enemy.currentHp <= 0) return;

        html += `
            <div class="character">

                <h3>${enemy.name}</h3>

                <p>
                    HP：
                    ${enemy.currentHp}
                    /
                    ${enemy.maxHp}
                </p>

                <button onclick="useSupportCardEnemy(${index})">
                    選択
                </button>

            </div>

            <br>
        `;

    });

    html += `
        <button onclick="showBattleScreen()">
            戻る
        </button>

        </div>
    `;

    app.innerHTML = html;

}

function useSupportCardEnemy(index) {

    const card = gameState.selectedCard;

    const target = gameState.enemyCharacters[index];

    applyEffects(
        null,
        target,
        Array.isArray(card.effect)
            ? card.effect
            : [card.effect]
    );

    alert(card.name + " を使用！");

    gameState.graveyard.push(card);

    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );

    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;

    showBattleScreen();

}

function useSupportCardEnemies() {

    const card = gameState.selectedCard;

    gameState.enemyCharacters.forEach(enemy => {

        if (enemy.currentHp <= 0) return;

        applyEffects(
            null,
            enemy,
            Array.isArray(card.effect)
                ? card.effect
                : [card.effect]
        );

    });

    alert(card.name + " を使用！");

    gameState.graveyard.push(card);

    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );

    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;

    showBattleScreen();

}

function useSupportCardSelf() {

    const card = gameState.selectedCard;

    const target =
        gameState.selectedActors[0];

    applyEffects(
        target,
        target,
        Array.isArray(card.effect)
            ? card.effect
            : [card.effect]
    );

    alert(card.name + " を使用！");

    gameState.graveyard.push(card);

    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );

    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;

    showBattleScreen();

}

function useSupportCardAllies(){

    const card = gameState.selectedCard;

    if (card.id === "death_painting_1") {

    applyEffects(
        null,
        null,
        card.effect
    );

    alert(card.name + " を使用！");

    gameState.graveyard.push(card);

    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );

    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;

    showBattleScreen();

    return;

}

    gameState.battleCharacters.forEach(character=>{

        if(character.currentHp <= 0) return;


        applyEffects(
            null,
            character,
            Array.isArray(card.effect)
                ? card.effect
                : [card.effect]
        );

    });


    alert(
        card.name +
        " を使用！"
    );


    gameState.graveyard.push(card);


    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );


    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;


    showBattleScreen();

}

function showAllyTarget() {

    const app = document.getElementById("app");

    let html = `
        <div class="battle">

        <h2>対象を選択</h2>
    `;

    gameState.battleCharacters.forEach((character, index) => {

        if (character.currentHp <= 0) return;

        html += `

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

                <button onclick="useSupportCard(${index})">

                    選択

                </button>

            </div>

            <br>

        `;

    });


    html += `

        <button onclick="showBattleScreen()">

            戻る

        </button>

        </div>

    `;


    app.innerHTML = html;

}

function useSupportCard(index) {

    const card = gameState.selectedCard;

    const target =
        gameState.battleCharacters[index];

if (
    card.hpLimit != null &&
    target.currentHp > card.hpLimit
) {

    alert("HPが条件を満たしていません");

    return;

}

    applyEffects(
    null,
    target,
    Array.isArray(card.effect)
        ? card.effect
        : [card.effect]
);

    alert(
        card.name +
        " を使用！"
    );

    gameState.graveyard.push(card);

    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );

    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;

    showBattleScreen();

}


// ===============================
// 味方2体選択
// ===============================

function showTwoAllyTarget() {

    gameState.selectedSupportTargets = [];

    const app = document.getElementById("app");

    let html = `
        <div class="battle">

            <h2>味方を2体選択</h2>

            <div id="twoTargetArea"></div>

            <button
                id="confirmTwoTarget"
                disabled
            >
                決定
            </button>

            <br><br>

            <button onclick="showBattleScreen()">
                戻る
            </button>

        </div>
    `;

    app.innerHTML = html;

    updateTwoTargetArea();

    document.getElementById(
        "confirmTwoTarget"
    ).onclick = useSupportCardTwoTargets;

}

function updateTwoTargetArea() {

    const area =
        document.getElementById("twoTargetArea");

    area.innerHTML = "";

    gameState.battleCharacters.forEach((character, index) => {

        if (character.currentHp <= 0) return;

        const selected =
            gameState.selectedSupportTargets.includes(index);

        area.innerHTML += `

        <div class="character">

            <h3>${character.name}</h3>

            <p>
                HP：
                ${character.currentHp}
                /
                ${character.maxHp}
            </p>

            <button
                onclick="toggleSupportTarget(${index})"
            >

                ${
                    selected
                    ? "選択解除"
                    : "選択"
                }

            </button>

        </div>

        <br>

        `;

    });

    document.getElementById(
        "confirmTwoTarget"
    ).disabled =
        gameState.selectedSupportTargets.length !== 2;

}

function toggleSupportTarget(index) {

    if (
        gameState.selectedSupportTargets.includes(index)
    ) {

        gameState.selectedSupportTargets =
            gameState.selectedSupportTargets.filter(
                i => i !== index
            );

    } else {

        if (
            gameState.selectedSupportTargets.length >= 2
        ) {

            alert("2人までです");

            return;

        }

        gameState.selectedSupportTargets.push(index);

    }

    updateTwoTargetArea();

}

function selectSupportTarget(index) {

    if (gameState.selectedSupportTargets.includes(index)) {

        return;

    }

    gameState.selectedSupportTargets.push(index);

    if (gameState.selectedSupportTargets.length < 2) {

        alert("あと1人選択してください");

        return;

    }

    useSupportCardTwoTargets();

}

// ===============================
// 味方2体対象カード使用
// ===============================

function useSupportCardTwoTargets() {

    const card = gameState.selectedCard;

    switch (card.id) {

        case "we_are_the_strongest":
            useStrongestCard();
            break;

        default:

            alert("未対応のカードです");
            return;

    }

}

// ===============================
// 私たちは最強なんだ
// ===============================

function useStrongestCard() {

    const card = gameState.selectedCard;

    gameState.selectedSupportTargets.forEach(index => {

        const target =
            gameState.battleCharacters[index];

        applyEffects(
            null,
            target,
            [
                {
                    type: "damageReduction",
                    value: 30,
                    duration: 2
                }
            ]
        );

    });

    alert(card.name + " を使用！");

    gameState.graveyard.push(card);

    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );

    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;
    gameState.selectedSupportTargets = [];

    showBattleScreen();

}

// ===============================
// 敵ターン
// ===============================

function enemyTurn() {

    // ===============================
    // 通常バトル
    // ===============================

    if (gameState.battleMode === "normal") {

        normalEnemyTurn();

        return;

    }


    // ===============================
    // ここから下は今までの
    // ボスバトル用処理
    // ===============================


// 領域ターン経過

    if (gameState.currentField) {

        gameState.currentField.turn++;

    }
    
    if (
    gameState.currentField &&
    gameState.currentField.card.id === "tokyo_jujutsu_high"
) {

    // 味方
    gameState.battleCharacters.forEach(character => {

        if (character.currentHp <= 0) return;

        character.currentCursedPower = Math.min(
            character.maxCursedPower,
            character.currentCursedPower + 10
        );

    });

    // 敵
    gameState.enemyCharacters.forEach(enemy => {

        if (enemy.currentHp <= 0) return;

        enemy.currentCursedPower = Math.min(
            enemy.maxCursedPower,
            enemy.currentCursedPower + 10
        );

    });

}

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
        
        // ===============================
// 敵スキルCT減少
// ===============================

for (const key in enemy.cooldowns) {

    if (enemy.cooldowns[key] > 0) {

        enemy.cooldowns[key]--;

        if (enemy.cooldowns[key] <= 0) {

            delete enemy.cooldowns[key];

        }

    }

}
        
// スタン中なら行動できない
if (enemy.stun > 0) {

    alert(enemy.name + " は行動不能！");

    return;

}

        let skill = null;
        let skillIndex = null;

// 5ターンごとなら必殺技を優先
if (
    enemy.turnCount % 5 === 0 &&
    enemy.ultimate &&
    !enemy.sealedSkills["ultimate"]
) {

    skill = enemy.ultimate;

} else {

// ===============================
// 使用可能な通常技を集める
// ===============================

let usable = [];

const skillWeights = [
    40,
    40,
    20
];

enemy.skills.forEach((normalSkill, index) => {

    if (!normalSkill) return;


    // ===============================
    // スキル封印中
    // ===============================

    if (enemy.sealedSkills[index]) {
        return;
    }


    // ===============================
    // CT中
    // ===============================

    if (
        (enemy.cooldowns[index] ?? 0) > 0
    ) {
        return;
    }


    // ===============================
    // 真人「変形」
    //
    // すでに変形している場合、
    // もう一度「変形」は使わない
    // ===============================

    if (
        enemy.id === "mahito" &&
        enemy.transformation &&
        normalSkill.mahitoTransform
    ) {

        return;

    }


    // ===============================
    // 使用候補に追加
    // ===============================

    usable.push({

        skill: normalSkill,

        index: index,

        weight:
            skillWeights[index] ?? 10

    });

});

    if (usable.length === 0) {

        alert(enemy.name + " は使用できる技がない！");
        return;

    }

    // 重み付き抽選
    const total =
        usable.reduce((sum, s) => sum + s.weight, 0);

    let r = Math.random() * total;

    for (const s of usable) {

    if (r < s.weight) {

        skill = s.skill;
        skillIndex = s.index;

        break;

    }

    r -= s.weight;

}

}

// ===============================
// 使用した敵スキルにCTを設定
// ===============================

if (
    skillIndex !== null &&
    (skill.cooldown ?? 0) > 0
) {

    enemy.cooldowns[skillIndex] =
        skill.cooldown;

}

        // 次はここから攻撃処理を書く
        // 攻撃対象
        if (skill.target === "単体") {

            let target =
    playersAlive.find(
        character => character.taunt > 0
    );

if (!target) {

    target =
        playersAlive[
            Math.floor(
                Math.random() *
                playersAlive.length
            )
        ];

}

let damage;


// ===============================
// 真人「無為転変」
// ===============================

if (
    skill.currentHpRatioDamage != null
) {

    damage =
        Math.floor(
            target.currentHp *
            skill.currentHpRatioDamage
        );

}


// ===============================
// 真人「変形打撃」
// ===============================

else if (
    skill.mahitoStrike &&
    enemy.transformation
) {

    const transformation =
        enemy.transformation;


    // 基本ダメージ
    damage =
        transformation.damage *
        (transformation.hits ?? 1);


    // 攻撃側バフ
    damage +=
        Number(enemy.attackBonus) || 0;

    damage +=
        Number(enemy.damageBuff) || 0;

    damage -=
        Number(enemy.damageDown) || 0;


    // 防御側補正
    damage +=
        Number(target.damageTakenUp) || 0;

    damage -=
        Number(target.damageReduction) || 0;


    damage =
        Math.max(
            0,
            Math.floor(damage)
        );

}


// ===============================
// 通常攻撃
// ===============================

else {

    damage =
        calculateDamage(
            enemy,
            target,
            skill
        );

}
                            
                showEnemySkillMessage(
    enemy.name,
    skill.name
);

            target.currentHp -= damage;
            
            const targetIndex =
    gameState.battleCharacters.indexOf(target);

showDamage(
    "player" + targetIndex,
    damage
);

            target.lastSingleDamage = damage;
            if (target.currentHp < 0) {

                target.currentHp = 0;

            }

            applyEffects(
                enemy,
                target,
                skill.effects
            );
            
            // ===============================
// 真人「変形打撃」の追加効果
// ===============================

if (
    skill.mahitoStrike &&
    enemy.transformation
) {

    const transformation =
        enemy.transformation;


    // ===============================
    // 棘腕
    // ===============================

    if (
        transformation.id === "spikeArm"
    ) {

        target.damageTakenUp =
            (target.damageTakenUp ?? 0)
            +
            transformation.damageTakenUp;

        target.damageTakenUpTurn =
            transformation.damageTakenUpTurn;

    }


    // ===============================
    // 打撃を使用したので変形解除
    // ===============================

    enemy.transformation = null;

}

        }

                // ===============================
        // 全体攻撃
        // ===============================
        else if (skill.target === "全体") {

            showEnemySkillMessage(
                enemy.name,
                skill.name
            );

            playersAlive.forEach((target) => {

    let damage;


    // ===============================
    // 真人
    // 領域展開「自閉円頓裹」
    // ===============================

    if (
        skill.executeHp != null &&
        target.currentHp <= skill.executeHp
    ) {

        // 残りHPを全部ダメージにする
        damage =
            target.currentHp;

    }

    else {

        damage =
            calculateDamage(
                enemy,
                target,
                skill
            );

    }


    target.currentHp -= damage;


    if (target.currentHp < 0) {

        target.currentHp = 0;

    }

                const targetIndex =
                    gameState.battleCharacters.indexOf(
                        target
                    );

                showDamage(
                    "player" + targetIndex,
                    damage
                );

                applyEffects(
                    enemy,
                    target,
                    skill.effects
                );

            });

        }

        // ===============================
// 自身対象スキル
// ===============================
else if (skill.target === "自身") {

    showEnemySkillMessage(
        enemy.name,
        skill.name
    );


    // ===============================
    // 真人「変形」
    // ===============================

    if (skill.mahitoTransform) {

        const transformations = [

            {
                id: "bladeArm",
                name: "刃腕",
                damage: 50,
                hits: 1
            },

            {
                id: "giantFist",
                name: "巨大拳",
                damage: 70,
                hits: 1
            },

            {
                id: "multiArm",
                name: "多腕攻撃",
                damage: 25,
                hits: 3
            },

            {
                id: "spikeArm",
                name: "棘腕",
                damage: 40,
                hits: 1,
                damageTakenUp: 20,
                damageTakenUpTurn: 2
            }

        ];


        // 4種類からランダム
        enemy.transformation =
            transformations[
                Math.floor(
                    Math.random() *
                    transformations.length
                )
            ];


        

    }


    // 通常の自身効果
    applyEffects(
        enemy,
        enemy,
        skill.effects
    );

}

    });
    
    // ===============================
// 敵のスキル封印ターン減少
// ===============================

gameState.enemyCharacters.forEach(enemy => {

    for (const key in enemy.sealedSkills) {

        enemy.sealedSkills[key]--;

        if (enemy.sealedSkills[key] <= 0) {

            delete enemy.sealedSkills[key];

        }

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
        
        // 受胎九相図 二番
if (character.extraActionStun) {

    character.stun = 2;
    character.extraActionStun = false;

}

        // 行動可能に戻す
        character.hasActed = false;

    });
    
    // 状態異常ターン経過

gameState.battleCharacters.forEach((character) => {

    updateStatus(character);

});

gameState.enemyCharacters.forEach(enemy => {

    if (enemy.stun > 0) {

        alert(
            enemy.name +
            " はスタン状態です！"
        );

    }

});

// ===============================
// ターン終了時の持続ダメージ
// ===============================

// 味方
gameState.battleCharacters.forEach(
    (character, index) => {

        processDamageOverTime(
            character,
            "player" + index
        );

    }
);


// 敵
gameState.enemyCharacters.forEach(
    (enemy, index) => {

        processDamageOverTime(
            enemy,
            "enemy" + index
        );

    }
);

gameState.enemyCharacters.forEach(updateStatus);
if (checkBattleEnd()) {
    return;
}

if (!drawCard()) {

    showBattleResult("lose");
    return;

}

setTimeout(() => {

    showBattleScreen();

}, 900);

}

function showEquipmentTarget() {

    const app = document.getElementById("app");

    let html = `
    <div class="battle">

    <h2>装備するキャラを選択</h2>
    `;

    gameState.battleCharacters.forEach((character, index) => {

        if (character.currentHp <= 0) return;

        html += `

        <div class="character">

            <h3>${character.name}</h3>

            <button onclick="equipCard(${index})">

                装備

            </button>

        </div>

        <br>

        `;

    });

    html += `
    <button onclick="showBattleScreen()">

    戻る

    </button>

    </div>
    `;

    app.innerHTML = html;

}

function equipCard(index) {

    const card = gameState.selectedCard;

    const character =
        gameState.battleCharacters[index];

    character.equipment.push(card);

    alert(
        character.name +
        " に " +
        card.name +
        " を装備！"
    );

    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );

    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;

    showBattleScreen();

}

function useFieldCard() {

    const card = gameState.selectedCard;

    const oldField = gameState.currentField;


    if (
        oldField &&
        oldField.turn < 2
    ) {

        alert("まだ領域を上書きできません");
        return;

    }

    gameState.currentField = {
        card: card,
        turn: 0
    };

    alert(
        oldField
            ? oldField.card.name + " を " + card.name + " で上書きした！"
            : card.name + " を展開した！"
    );

    gameState.graveyard.push(card);

    gameState.hand.splice(
        gameState.selectedCardIndex,
        1
    );

    gameState.selectedCard = null;
    gameState.selectedCardIndex = null;

    showBattleScreen();
}

function getStatusList(character){

    const list=[];

    if(character.invincible>0){

        list.push("🛡無敵");

    }

    if(character.stun>0){

        list.push("⚡スタン");

    }

    if(character.damageBuff>0){

        list.push("🔥与ダメ+" + character.damageBuff);

    }

    if(character.damageDown>0){

        list.push("⬇与ダメ-" + character.damageDown);

    }

    if(character.damageTakenUp>0){

        list.push("💥被ダメ+" + character.damageTakenUp);

    }

    if(character.taunt>0){

    list.push("🎯挑発");

}

if ((character.burnTurn ?? 0) > 0) {

    list.push(
        "🔥火傷 " +
        character.burnDamage +
        "ダメージ / " +
        character.burnTurn +
        "T"
    );

}

return list;

}

// ===============================
// 火傷付与
// ===============================

function applyBurn(
    target,
    damage,
    duration
) {

    if (!target) return;

    // 初期化
    target.burnDamage =
        target.burnDamage ?? 0;

    target.burnTurn =
        target.burnTurn ?? 0;


    // 火傷ダメージは加算
    target.burnDamage += damage;


    // 持続ターンは長い方を採用
    target.burnTurn =
        Math.max(
            target.burnTurn,
            duration
        );

}

// ===============================
// 持続ダメージ処理
// ===============================

function processDamageOverTime(
    character,
    targetId
) {

    if (!character) return;

    if (character.currentHp <= 0) {
        return;
    }


    // ===============================
    // 火傷
    // ===============================

    if (
        (character.burnTurn ?? 0) > 0 &&
        (character.burnDamage ?? 0) > 0
    ) {

        const damage =
            character.burnDamage;

        character.currentHp -= damage;


        if (character.currentHp < 0) {

            character.currentHp = 0;

        }

        showDamage(
    targetId,
    damage,
    "burn"
);

        // 残りターン減少
        character.burnTurn--;


        // 火傷終了
        if (character.burnTurn <= 0) {

            character.burnTurn = 0;
            character.burnDamage = 0;

        }

    }

}

// ===============================
// ダメージ表示キュー
// ===============================

const damageDisplayQueues = {};


// ===============================
// ダメージ表示
// ===============================

function showDamage(
    targetId,
    value,
    type = "normal"
) {

    // 対象ごとのキューを作る
    if (!damageDisplayQueues[targetId]) {

        damageDisplayQueues[targetId] = {
            queue: [],
            playing: false
        };

    }


    const data =
        damageDisplayQueues[targetId];


    // 表示待ちに追加
    data.queue.push({
        value: value,
        type: type
    });


    // まだ再生中でなければ開始
    if (!data.playing) {

        playDamageQueue(targetId);

    }

}


// ===============================
// キューを順番に表示
// ===============================

function playDamageQueue(targetId) {

    const data =
        damageDisplayQueues[targetId];

    if (!data) return;


    // 全部表示し終わった
    if (data.queue.length === 0) {

        data.playing = false;

        return;

    }


    data.playing = true;


    const damageData =
        data.queue.shift();


    displayDamageNumber(
        targetId,
        damageData.value,
        damageData.type
    );


    // 次のダメージを少し待って表示
    setTimeout(() => {

        playDamageQueue(targetId);

    }, 650);

}


// ===============================
// 実際の数字を表示
// ===============================

function displayDamageNumber(
    targetId,
    value,
    type
) {

    const target =
        document.getElementById(targetId);

    if (!target) {

        return;

    }


    const rect =
        target.getBoundingClientRect();


    const damageElement =
        document.createElement("div");


    damageElement.className =
        "floating-damage";


    // ===============================
    // ダメージ種類
    // ===============================

    switch (type) {

        case "burn":

            damageElement.classList.add(
                "burn"
            );

            damageElement.textContent =
                "🔥 -" + value;

            break;


        case "heal":

            damageElement.classList.add(
                "heal"
            );

            damageElement.textContent =
                "+" + value;

            break;


        default:

            damageElement.textContent =
                "-" + value;

            break;

    }


    // ===============================
    // 表示位置
    // ===============================

    damageElement.style.left =
        (
            rect.left +
            rect.width / 2
        ) + "px";


    damageElement.style.top =
        (
            rect.top +
            rect.height / 2
        ) + "px";


    document.body.appendChild(
        damageElement
    );


    // ===============================
    // 削除
    // ===============================

    setTimeout(() => {

        damageElement.remove();

    }, 600);

}

function showEnemySkillMessage(enemyName, skillName) {

    const message =
        document.createElement("div");

    message.className =
        "enemy-skill-message";

    message.innerHTML = `
        <span>${enemyName}</span>
        <strong>${skillName}</strong>
    `;

    document.body.appendChild(message);

    setTimeout(() => {

        message.remove();

    }, 1200);

}
// ===============================
// 通常バトル
// AIターン
// ===============================

function normalEnemyTurn() {

    // ===============================
    // 生存している敵を取得
    // ===============================

    const aliveEnemies =
        gameState.enemyCharacters.filter(
            enemy =>
                enemy.currentHp > 0
        );


    // ===============================
    // 生存している味方を取得
    // ===============================

    const alivePlayers =
        gameState.battleCharacters.filter(
            character =>
                character.currentHp > 0
        );


    // ===============================
    // 勝敗確認
    // ===============================

    if (aliveEnemies.length === 0) {

        showBattleResult("win");

        return;

    }


    if (alivePlayers.length === 0) {

        showBattleResult("lose");

        return;

    }


    // ===============================
    // 敵をシャッフル
    // ===============================

    const shuffledEnemies =
        [...aliveEnemies].sort(
            () =>
                Math.random() - 0.5
        );


    // ===============================
    // 最大2人を行動者にする
    // ===============================

    const actingEnemies =
        shuffledEnemies.slice(
            0,
            Math.min(
                2,
                shuffledEnemies.length
            )
        );


    console.log(
        "AI行動キャラ:",
        actingEnemies.map(
            enemy => enemy.name
        )
    );


    // ===============================
    // 順番に行動
    // ===============================

    normalEnemyAct(
        actingEnemies,
        0
    );

}


// ===============================
// 通常バトル
// AIキャラクターを順番に行動
// ===============================

function normalEnemyAct(
    actingEnemies,
    actorIndex
) {

    // ===============================
    // 全員行動終了
    // ===============================

    if (
        actorIndex >=
        actingEnemies.length
    ) {

        finishNormalEnemyTurn();

        return;

    }


    const enemy =
        actingEnemies[
            actorIndex
        ];


    // ===============================
    // 戦闘不能なら次へ
    // ===============================

    if (
        !enemy ||
        enemy.currentHp <= 0
    ) {

        normalEnemyAct(
            actingEnemies,
            actorIndex + 1
        );

        return;

    }


    // ===============================
    // スタン中
    // ===============================

    if (
        (enemy.stun ?? 0) > 0
    ) {

        showEnemySkillMessage(
            enemy.name,
            "行動不能"
        );


        setTimeout(() => {

            normalEnemyAct(
                actingEnemies,
                actorIndex + 1
            );

        }, 900);


        return;

    }


    // ===============================
    // 使用可能スキル取得
    // ===============================

    const usableSkills = [];


    enemy.skills.forEach(
        (skill, index) => {

            if (!skill) return;


            // CT中
            if (
                (
                    enemy.cooldowns[
                        index
                    ] ?? 0
                ) > 0
            ) {

                return;

            }


            // 呪力不足
            const cost =
                skill.cost ?? 0;


            if (
                (
                    enemy.currentCursedPower ??
                    0
                ) < cost
            ) {

                return;

            }


            usableSkills.push({

                skill: skill,

                index: index

            });

        }
    );


    // ===============================
    // 使用できる技がない
    // ===============================

    if (
        usableSkills.length === 0
    ) {

        showEnemySkillMessage(
            enemy.name,
            "行動できない"
        );


        setTimeout(() => {

            normalEnemyAct(
                actingEnemies,
                actorIndex + 1
            );

        }, 900);


        return;

    }


    // ===============================
// AIが使用スキルを選択
// ===============================

const selected =
    selectNormalEnemySkill(
        enemy,
        usableSkills
    );


    const skill =
        selected.skill;


    const skillIndex =
        selected.index;


    // ===============================
    // 呪力消費
    // ===============================

    enemy.currentCursedPower -=
        skill.cost ?? 0;


    if (
        enemy.currentCursedPower < 0
    ) {

        enemy.currentCursedPower = 0;

    }


    // ===============================
    // CT設定
    // ===============================

    if (
        (skill.ct ?? 0) > 0
    ) {

        enemy.cooldowns[
            skillIndex
        ] =
            skill.ct;

    }


    // ===============================
    // スキル名表示
    // ===============================

    showEnemySkillMessage(
        enemy.name,
        skill.name
    );


    // ===============================
    // スキル実行
    // ===============================

    executeNormalEnemySkill(
        enemy,
        skill
    );


    // ===============================
    // 次の敵へ
    // ===============================

    setTimeout(() => {

        if (checkBattleEnd()) {

            return;

        }


        normalEnemyAct(
            actingEnemies,
            actorIndex + 1
        );

    }, 1000);

}

// ===============================
// 通常バトル
// AIスキル選択
// ===============================

function selectNormalEnemySkill(
    enemy,
    usableSkills
) {

    const allies =
        gameState.enemyCharacters.filter(
            character =>
                character.currentHp > 0
        );


    const players =
        gameState.battleCharacters.filter(
            character =>
                character.currentHp > 0
        );


    // ===============================
    // 各スキルに点数をつける
    // ===============================

    const scoredSkills =
        usableSkills.map(data => {

            const skill =
                data.skill;

            let score =
                Math.random() * 20;


            // ===============================
            // 回復技
            // ===============================

            if (
                (skill.heal ?? 0) > 0
            ) {

                // 味方単体回復
                if (
                    skill.target ===
                    "味方単体"
                ) {

                    const injured =
                        allies.filter(
                            ally =>
                                ally.currentHp <
                                ally.maxHp
                        );


                    // 誰も減っていないなら
                    // かなり使いにくくする
                    if (
                        injured.length === 0
                    ) {

                        score -= 100;

                    }

                    else {

                        const lowest =
                            injured.reduce(
                                (a, b) =>
                                    (
                                        a.currentHp /
                                        a.maxHp
                                    ) <
                                    (
                                        b.currentHp /
                                        b.maxHp
                                    )
                                        ? a
                                        : b
                            );


                        const hpRate =
                            lowest.currentHp /
                            lowest.maxHp;


                        if (hpRate <= 0.3) {

                            score += 100;

                        }

                        else if (
                            hpRate <= 0.5
                        ) {

                            score += 70;

                        }

                        else {

                            score += 35;

                        }

                    }

                }


                // ===============================
                // 味方全体回復
                // ===============================

                else if (
                    skill.target ===
                    "味方全体"
                ) {

                    const injuredCount =
                        allies.filter(
                            ally =>
                                ally.currentHp <
                                ally.maxHp
                        ).length;


                    if (
                        injuredCount === 0
                    ) {

                        score -= 100;

                    }

                    else {

                        score +=
                            injuredCount * 35;

                    }

                }


                // ===============================
                // 自己回復
                // ===============================

                else if (
                    skill.target ===
                    "自身"
                ) {

                    const hpRate =
                        enemy.currentHp /
                        enemy.maxHp;


                    if (hpRate >= 0.9) {

                        score -= 100;

                    }

                    else if (
                        hpRate <= 0.4
                    ) {

                        score += 80;

                    }

                    else {

                        score += 30;

                    }

                }

            }


            // ===============================
            // 攻撃技
            // ===============================

            if (
                (skill.damage ?? 0) > 0
            ) {

                score += 25;


                // 全体攻撃は
                // 敵が多いほど評価
                if (
                    skill.target ===
                    "全体"
                ) {

                    score +=
                        players.length * 10;

                }


                // ダメージが高いほど
                // 少し評価
                score +=
                    skill.damage / 10;

            }


            // ===============================
            // 補助技
            // ===============================

            if (
                Array.isArray(
                    skill.effects
                ) &&
                skill.effects.length > 0
            ) {

                score += 20;

            }


            // ===============================
            // 自身強化
            // ===============================

            if (
                skill.target === "自身" &&
                (skill.damage ?? 0) <= 0 &&
                (skill.heal ?? 0) <= 0
            ) {

                score += 25;

            }


            // ===============================
            // 呪力を節約
            // ===============================

            const cost =
                skill.cost ?? 0;


            if (
                enemy.currentCursedPower <
                enemy.maxCursedPower * 0.35
            ) {

                score -=
                    cost * 0.5;

            }


            return {

                ...data,

                score: score

            };

        });


    // ===============================
    // 点数順
    // ===============================

    scoredSkills.sort(
        (a, b) =>
            b.score - a.score
    );


    console.log(
        enemy.name +
        " AIスキル候補:",
        scoredSkills.map(data => ({
            name: data.skill.name,
            score: Math.round(
                data.score
            )
        }))
    );


    return scoredSkills[0];

}

// ===============================
// 通常バトル
// AIスキル実行
// ===============================

function executeNormalEnemySkill(
    enemy,
    skill
) {

    const alivePlayers =
        gameState.battleCharacters.filter(
            character =>
                character.currentHp > 0
        );


    const aliveAllies =
        gameState.enemyCharacters.filter(
            character =>
                character.currentHp > 0
        );


    // ===============================
    // 単体攻撃
    // ===============================

    if (
        skill.target === "単体"
    ) {

        if (
            alivePlayers.length === 0
        ) {

            return;

        }


        let target =
            alivePlayers.find(
                character =>
                    (character.taunt ?? 0) > 0
            );


        if (!target) {

            target =
                alivePlayers[
                    Math.floor(
                        Math.random() *
                        alivePlayers.length
                    )
                ];

        }


        const damage =
            calculateDamage(
                enemy,
                target,
                skill
            );


        target.currentHp -=
            damage;


        if (
            target.currentHp < 0
        ) {

            target.currentHp = 0;

        }


        const targetIndex =
            gameState.battleCharacters.indexOf(
                target
            );


        showDamage(
            "player" + targetIndex,
            damage
        );


        target.lastSingleDamage =
            damage;


        applyEffects(
            enemy,
            target,
            skill.effects ?? []
        );


        // ===============================
        // 狗巻の自傷
        // ===============================

        applyNormalEnemySelfDamage(
            enemy,
            skill
        );


        return;

    }


    // ===============================
    // 全体攻撃
    // ===============================

    if (
        skill.target === "全体"
    ) {

        alivePlayers.forEach(
            target => {

                const damage =
                    calculateDamage(
                        enemy,
                        target,
                        skill
                    );


                target.currentHp -=
                    damage;


                if (
                    target.currentHp < 0
                ) {

                    target.currentHp = 0;

                }


                const targetIndex =
                    gameState.battleCharacters.indexOf(
                        target
                    );


                showDamage(
                    "player" +
                    targetIndex,
                    damage
                );


                applyEffects(
                    enemy,
                    target,
                    skill.effects ?? []
                );

            }
        );


        // 狗巻などの自傷
        applyNormalEnemySelfDamage(
            enemy,
            skill
        );


        return;

    }


    // ===============================
    // 敵全体
    //
    // AIから見た「敵」は
    // プレイヤー側
    // ===============================

    if (
        skill.target === "敵全体"
    ) {

        alivePlayers.forEach(
            target => {

                applyEffects(
                    enemy,
                    target,
                    skill.effects ?? []
                );

            }
        );


        applyNormalEnemySelfDamage(
            enemy,
            skill
        );


        return;

    }


    // ===============================
    // 自身
    // ===============================

    if (
        skill.target === "自身"
    ) {

        // ===============================
        // 自己回復
        // ===============================

        if (
            (skill.heal ?? 0) > 0
        ) {

            healNormalEnemy(
                enemy,
                skill.heal
            );

        }


        // ===============================
        // 自身への効果
        // ===============================

        applyEffects(
            enemy,
            enemy,
            skill.effects ?? []
        );


        applyNormalEnemySelfDamage(
            enemy,
            skill
        );


        return;

    }


    // ===============================
    // 味方単体
    // ===============================

    if (
        skill.target ===
        "味方単体"
    ) {

        if (
            aliveAllies.length === 0
        ) {

            return;

        }


        // ===============================
        // HP割合が一番低い味方
        // ===============================

        let target =
            aliveAllies[0];


        aliveAllies.forEach(
            ally => {

                const allyHpRate =
                    ally.currentHp /
                    ally.maxHp;


                const targetHpRate =
                    target.currentHp /
                    target.maxHp;


                if (
                    allyHpRate <
                    targetHpRate
                ) {

                    target = ally;

                }

            }
        );


        // ===============================
        // 回復
        // ===============================

        if (
            (skill.heal ?? 0) > 0
        ) {

            healNormalEnemy(
                target,
                skill.heal
            );

        }


        // ===============================
        // その他の効果
        // ===============================

        applyEffects(
            enemy,
            target,
            skill.effects ?? []
        );


        applyNormalEnemySelfDamage(
            enemy,
            skill
        );


        return;

    }


    // ===============================
    // 味方全体
    // ===============================

    if (
        skill.target ===
        "味方全体"
    ) {

        aliveAllies.forEach(
            target => {

                // 回復
                if (
                    (skill.heal ?? 0) > 0
                ) {

                    healNormalEnemy(
                        target,
                        skill.heal
                    );

                }


                // バフなど
                applyEffects(
                    enemy,
                    target,
                    skill.effects ?? []
                );

            }
        );


        applyNormalEnemySelfDamage(
            enemy,
            skill
        );


        return;

    }

}

// ===============================
// 通常バトル
// AIキャラクター回復
// ===============================

function healNormalEnemy(
    target,
    value
) {

    if (!target) return;


    if (
        target.currentHp <= 0
    ) {

        return;

    }


    const beforeHp =
        target.currentHp;


    target.currentHp =
        Math.min(
            target.maxHp,
            target.currentHp +
            value
        );


    const healAmount =
        target.currentHp -
        beforeHp;


    if (
        healAmount <= 0
    ) {

        return;

    }


    const index =
        gameState.enemyCharacters.indexOf(
            target
        );


    if (
        index !== -1
    ) {

        showDamage(
            "enemy" + index,
            healAmount,
            "heal"
        );

    }

}

// ===============================
// 通常バトル
// AI側の自傷ダメージ
// ===============================

function applyNormalEnemySelfDamage(
    enemy,
    skill
) {

    const selfDamage =
        skill.selfDamage ?? 0;


    if (
        selfDamage <= 0
    ) {

        return;

    }


    enemy.currentHp -=
        selfDamage;


    if (
        enemy.currentHp < 0
    ) {

        enemy.currentHp = 0;

    }


    const index =
        gameState.enemyCharacters.indexOf(
            enemy
        );


    if (
        index !== -1
    ) {

        showDamage(
            "enemy" + index,
            selfDamage
        );

    }

}

// ===============================
// 通常バトル
// AIターン終了
// ===============================

function finishNormalEnemyTurn() {

    // ===============================
    // AI側CT減少
    // ===============================

    gameState.enemyCharacters.forEach(
        enemy => {

            for (
                const key
                in enemy.cooldowns
            ) {

                if (
                    enemy.cooldowns[key] > 0
                ) {

                    enemy.cooldowns[key]--;

                }


                if (
                    enemy.cooldowns[key] <= 0
                ) {

                    delete enemy.cooldowns[
                        key
                    ];

                }

            }

        }
    );


    // ===============================
    // プレイヤー呪力回復
    // ===============================

    gameState.battleCharacters.forEach(
        character => {

            if (
                character.currentHp <= 0
            ) {

                return;

            }


            character.currentCursedPower =
                Math.min(

                    character.maxCursedPower,

                    character.currentCursedPower +
                    character.cursedPowerRecovery

                );


            // 行動状態リセット
            character.hasActed =
                false;

        }
    );


    // ===============================
    // 選択キャラを解除
    // ===============================

    gameState.selectedActors = [];


    // ===============================
    // プレイヤーCT減少
    // ===============================

    gameState.battleCharacters.forEach(
        character => {

            for (
                const key
                in character.cooldowns
            ) {

                if (
                    character.cooldowns[key] > 0
                ) {

                    character.cooldowns[key]--;

                }

            }

        }
    );


    // ===============================
    // 勝敗確認
    // ===============================

    if (
        checkBattleEnd()
    ) {

        return;

    }


    // ===============================
    // ドロー
    // ===============================

    if (
        !drawCard()
    ) {

        showBattleResult(
            "lose"
        );

        return;

    }


    // ===============================
    // 画面更新
    // ===============================

    setTimeout(() => {

        showBattleScreen();

    }, 700);

}