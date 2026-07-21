alert("battle.js読み込み");
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

skillCostDown: 0,
nextSkillFree: false,
freeUltimate: false,
            
hasActed: false,

extraAction: false,
extraActionUsed: false,
extraActionStun: false

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
        
        sealedSkills: {},

        turnCount: 0,

        attackBonus: 0,

damageBuff: 0,
damageBuffTurn: 0,

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

skillCostDown: 0

    }

];


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
        <div class="battle">

            <h1>バトル</h1>
            
            <p id="fieldName"></p>

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

const fieldText =
    document.getElementById("fieldName");

fieldText.textContent =
    gameState.currentField
        ? "領域：" + gameState.currentField.card.name
        : "領域：なし";


    document.getElementById("startAction").onclick = () => {

        if (gameState.selectedActors.length === 0) {

            alert("行動するキャラクターを選択してください");
            return;

        }

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

        showBattleResult("lose");

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
    character.hasActed ||
    character.stun > 0;

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
        
// スタン中なら行動できない
if (enemy.stun > 0) {

    alert(enemy.name + " は行動不能！");

    return;

}

        let skill = null;

// 5ターンごとなら必殺技を優先
if (
    enemy.turnCount % 5 === 0 &&
    enemy.ultimate &&
    !enemy.sealedSkills["ultimate"]
) {

    skill = enemy.ultimate;

} else {

    // 使用可能な通常技だけ集める
    let usable = [];

    if (!enemy.sealedSkills[0]) {

        usable.push({
            skill: enemy.skills[0],
            weight: 40
        });

    }

    if (!enemy.sealedSkills[1]) {

        usable.push({
            skill: enemy.skills[1],
            weight: 40
        });

    }

    if (!enemy.sealedSkills[2]) {

        usable.push({
            skill: enemy.skills[2],
            weight: 20
        });

    }

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
            break;

        }

        r -= s.weight;

    }

}

        // 次はここから攻撃処理を書く
        // 攻撃対象
alert("宿儺は " + skill.name + " を選択");
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

            const damage =
                calculateDamage(enemy, target, skill);

            target.currentHp -= damage;
            target.lastSingleDamage = damage;
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
gameState.battleCharacters.forEach(updateStatus);

gameState.enemyCharacters.forEach(enemy => {

    alert(
        enemy.name +
        " stun=" +
        enemy.stun
    );

});

gameState.enemyCharacters.forEach(updateStatus);

if (checkBattleEnd()) {
    return;
}

if (!drawCard()) {

    showBattleResult("lose");
    return;

}

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

function hasEquipment(character, equipmentId) {

    return character.equipment.some(
        card => card.id === equipmentId
    );

}

// ===============================
// スキル使用処理
// ===============================

function useSkillCost(actor, skill) {

    // 呪力不足
    let cost;

    if (actor.nextSkillFree) {

        cost = 0;
        actor.nextSkillFree = false;

    } else {

        cost = Math.max(
            0,
            (skill.cost ?? 0) -
            (actor.skillCostDown ?? 0)
        );

    }

    if (actor.currentCursedPower < cost) {

        alert("呪力不足");

        return false;

    }

    actor.currentCursedPower -= cost;

    // 必殺カード
    if (skill.costCard) {

        if (!actor.freeUltimate) {

            if (
                getUltimateCardCount() <
                skill.costCard
            ) {

                alert("必殺カード不足");

                return false;

            }

            consumeUltimateCards(
                skill.costCard
            );

        }

        actor.freeUltimate = false;

    }

    // CT
    if (skill.ct) {

        actor.cooldowns[
            skill.name
        ] = skill.ct;

    }

    return true;

}

function useFieldCard() {

    const card = gameState.selectedCard;

    const oldField = gameState.currentField;
    
    alert(JSON.stringify(gameState.currentField));

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