// ===============================
// 行動開始
// ===============================

function startActionPhase() {

    gameState.selectedActors =
        gameState.selectedActors.filter(
            character =>
                character.currentHp > 0 &&
                !character.hasActed
        );

    if (gameState.selectedActors.length === 0) {

        showBattleScreen();
        return;

    }

    gameState.currentActorIndex = 0;

    showSkillSelect();

}

// ===============================
// スキル選択
// ===============================

function showSkillSelect() {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const actorData =
        characters[actor.id];

    const app =
        document.getElementById("app");

    let html = `
        <div class="battle">

            <h2>${actor.name}</h2>

            <p>
                HP :
                ${actor.currentHp}
                /
                ${actor.maxHp}
            </p>

            <p>
                呪力 :
                ${actor.currentCursedPower}
                /
                ${actor.maxCursedPower}
            </p>

            <h3>
                スキルを選択
            </h3>
    `;

    actorData.skills.forEach((skill, index) => {

        const ct =
            actor.cooldowns[skill.name] ?? 0;

        html += `

            <button
                onclick="selectSkill(${index})"
                ${ct > 0 ? "disabled" : ""}
            >

                ${skill.name}

                <br>

                消費呪力 :
                ${skill.cost ?? 0}

                ${ct > 0 ? `<br>CT:${ct}` : ""}

            </button>

            <br><br>

        `;

    });

    html += `

        <button
            onclick="selectUltimate()"
        >

            必殺技

        </button>

        <br><br>

        <button
            onclick="showBattleScreen()"
        >

            戻る

        </button>

        </div>

    `;

    app.innerHTML = html;

}

// ===============================
// スキル選択
// ===============================

function selectSkill(index) {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        characters[
            actor.id
        ].skills[index];
        
        if (
    skill.name === "簪" &&
    actor.nailStock <= 0
) {

    alert("先に釘飛ばしを使用してください");

    return;

}

    gameState.selectedSkill =
        skill;

    // 必殺カードチェック
    if (skill.costCard) {

        if (
            getUltimateCardCount() <
            skill.costCard
        ) {

            alert("必殺カード不足");

            return;

        }

    }

    // 回復
   if (
    skill.attackType === "回復"
) {

    if (
        skill.target ===
        "味方全体"
    ) {

        healAllCharacters();

    } else {

        showHealTarget();

    }

    return;

}

    // 全体攻撃
    if (
        skill.target === "全体"
    ) {

        attackAllEnemies();

        return;

    }

    // 単体攻撃
    showEnemySelect();

}
// ===============================
// 必殺技
// ===============================

function selectUltimate() {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const ultimate =
        characters[actor.id].ultimate;

    if (
    !actor.freeUltimate &&
    getUltimateCardCount() <
    (ultimate.costCard ?? 0)
) {

    alert("必殺カード不足");
    return;

}

    gameState.selectedSkill = ultimate;

    if (
    ultimate.attackType === "回復"
) {

    // 自身回復
    if (ultimate.target === "自身") {

        const actor =
            gameState.selectedActors[
                gameState.currentActorIndex
            ];

        const index =
            gameState.battleCharacters.indexOf(actor);

        healCharacter(index);

    }

    // 全体回復
    else if (
        ultimate.target === "味方全体"
    ) {

        healAllCharacters();

    }

    // 単体回復
    else {

        showHealTarget();

    }

    return;

}

    if (
        ultimate.target === "全体"
    ) {

        attackAllEnemies();

        return;

    }

    showEnemySelect();

}

// ===============================
// 敵選択
// ===============================

function showEnemySelect() {

    const app =
        document.getElementById("app");

    let html = `
        <div class="battle">

            <h2>攻撃する敵を選択</h2>
    `;

    gameState.enemyCharacters.forEach((enemy, index) => {

        if (enemy.currentHp <= 0) return;

        html += `
            <div class="character">

                <h3>${enemy.name}</h3>

                <p>
                    HP :
                    ${enemy.currentHp}
                    /
                    ${enemy.maxHp}
                </p>

                <button onclick="attackEnemy(${index})">

                    攻撃

                </button>

            </div>

            <br>
        `;

    });

    html += `
        <br>

        <button onclick="showSkillSelect()">

            戻る

        </button>

        </div>
    `;

    app.innerHTML = html;

}

// ===============================
// 単体攻撃
// ===============================

function attackEnemy(enemyIndex) {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;

    if (
        actor.currentCursedPower <
        (skill.cost ?? 0)
    ) {

        alert("呪力不足");

        showSkillSelect();

        return;

    }

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

actor.currentCursedPower -= cost;

    if (skill.costCard) {

    if (!actor.freeUltimate) {

        consumeUltimateCards(
            skill.costCard
        );

    }

    actor.freeUltimate = false;

}

    if (skill.ct) {

        actor.cooldowns[
            skill.name
        ] = skill.ct;

    }

const enemy =
    gameState.enemyCharacters[
        enemyIndex
    ];

let damage =
    calculateDamage(actor, enemy, skill);
    
    alert(JSON.stringify(skill));

    enemy.currentHp -= damage;

    if (enemy.currentHp < 0) {

        enemy.currentHp = 0;

    }
    
    
    applyEffects(
    actor,
    enemy,
    skill.effects
);

    alert(
        actor.name +
        " の " +
        skill.name +
        "！\n\n" +
        enemy.name +
        " に " +
        damage +
        " ダメージ！"
    );

if (skill.selfDamage) {

    actor.currentHp -= skill.selfDamage;

    if (actor.currentHp < 0) {

        actor.currentHp = 0;

    }

}

if (skill.name === "簪") {

    actor.nailStock--;

}

    nextActor();

}
// ===============================
// 全体攻撃
// ===============================

function attackAllEnemies() {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;

    if (
        actor.currentCursedPower <
        (skill.cost ?? 0)
    ) {

        alert("呪力不足");

        showSkillSelect();

        return;

    }

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

actor.currentCursedPower -= cost;

    if (skill.costCard) {

    if (!actor.freeUltimate) {

        consumeUltimateCards(
            skill.costCard
        );

    }

    actor.freeUltimate = false;

}

    if (skill.ct) {

        actor.cooldowns[
            skill.name
        ] = skill.ct;

    }

    gameState.enemyCharacters.forEach(enemy => {

        if (enemy.currentHp <= 0) return;

        let damage =
            skill.damage ?? 0;

        if (skill.hits) {

            damage *= skill.hits;

        }

        damage += actor.attackBonus;

        enemy.currentHp -= damage;

        if (enemy.currentHp < 0) {

            enemy.currentHp = 0;

        }

    });

    alert(
        actor.name +
        " の " +
        skill.name +
        "！\n\n敵全体に攻撃！"
    );
    
    if (skill.selfDamage) {

    actor.currentHp -= skill.selfDamage;

    if (actor.currentHp < 0) {

        actor.currentHp = 0;

    }

}

if (skill.name === "釘飛ばし") {

    actor.nailStock++;

}

    nextActor();

}

// ===============================
// 回復対象選択
// ===============================

function showHealTarget() {

    const app =
        document.getElementById("app");

    let html = `
        <div class="battle">

            <h2>回復する味方を選択</h2>
    `;

    gameState.battleCharacters.forEach((character, index) => {

        if (character.currentHp <= 0) return;

        html += `

            <div class="character">

                <h3>${character.name}</h3>

                <p>
                    HP :
                    ${character.currentHp}
                    /
                    ${character.maxHp}
                </p>

                <button onclick="healCharacter(${index})">

                    回復

                </button>

            </div>

            <br>

        `;

    });

    html += `

        <button onclick="showSkillSelect()">

            戻る

        </button>

        </div>

    `;

    app.innerHTML = html;

}

// ===============================
// 単体回復
// ===============================

function healCharacter(index) {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;

    const target =
        gameState.battleCharacters[index];

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

actor.currentCursedPower -= cost;

    if (skill.costCard) {

    if (!actor.freeUltimate) {

        consumeUltimateCards(
            skill.costCard
        );

    }

    actor.freeUltimate = false;

}

    if (skill.ct) {

        actor.cooldowns[
            skill.name
        ] = skill.ct;

    }

    target.currentHp +=
        skill.heal;

    if (
        target.currentHp >
        target.maxHp
    ) {

        target.currentHp =
            target.maxHp;

    }

    alert(
        actor.name +
        " の " +
        skill.name +
        "！"
    );

    nextActor();

}

// ===============================
// 全体回復
// ===============================

function healAllCharacters() {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;

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

actor.currentCursedPower -= cost;

    if (skill.costCard) {

    if (!actor.freeUltimate) {

        consumeUltimateCards(
            skill.costCard
        );

    }

    actor.freeUltimate = false;

}

    if (skill.ct) {

        actor.cooldowns[
            skill.name
        ] = skill.ct;

    }

    gameState.battleCharacters.forEach(character => {

        if (character.currentHp <= 0) return;

        character.currentHp +=
            skill.heal;

        if (
            character.currentHp >
            character.maxHp
        ) {

            character.currentHp =
                character.maxHp;

        }

    });

    alert(
        actor.name +
        " の " +
        skill.name +
        "！"
    );

    nextActor();

}

// ===============================
// 次のキャラ
// ===============================

function nextActor() {


    gameState.selectedActors[

        gameState.currentActorIndex

    ].hasActed = true;


    gameState.currentActorIndex++;


    if (checkBattleEnd()) {


        return;

    }

    if (

        gameState.currentActorIndex <

        gameState.selectedActors.length

    ) {


        showSkillSelect();

    } else {


        gameState.selectedActors = [];

        gameState.battleCharacters.forEach(updateStatus);

        gameState.enemyCharacters.forEach(updateStatus);


    enemyTurn();


    }

}

// ===============================
// 勝敗判定
// ===============================

function checkBattleEnd() {

    const enemyAlive =
        gameState.enemyCharacters.some(
            enemy =>
                enemy.currentHp > 0
        );

    if (!enemyAlive) {

        showBattleResult("win");

        return true;

    }

    const playerAlive =
        gameState.battleCharacters.some(
            character =>
                character.currentHp > 0
        );

    if (!playerAlive) {

        showBattleResult("lose");

        return true;

    }

    return false;

}
// ===============================
// ダメージ計算
// ===============================

function calculateDamage(actor, target, skill) {

    let damage = 0;

if (skill.damage != null) {

    damage = skill.damage;

}
else if (skill.attacks) {

    skill.attacks.forEach(attack => {

        damage += attack.damage;

    });

}

    // 多段攻撃
    if (skill.hits) {
        damage *= skill.hits;
    }

    // 永続攻撃アップ
    damage += actor.attackBonus ?? 0;
    // 屠坐魔
if (actor.equipment) {

    actor.equipment.forEach(card => {

        if (
            card.id === "tojima" &&
            skill.attackType === "近接"
        ) {

            damage += 10;

        }

    });

}

    // 一時的な与ダメアップ
    damage += actor.damageBuff ?? 0;

    // 被ダメアップ
    damage += target.damageTakenUp ?? 0;

    // ダメージ軽減
    damage -= target.damageReduction ?? 0;

    // 無敵
if (
    target.invincible > 0 &&
    actor.ignoreInvincible <= 0
) {

    damage = 0;

}

    // 最低0ダメージ
    if (damage < 0) {
        damage = 0;
    }

    return damage;

}