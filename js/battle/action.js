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
        
        if (actor.stun > 0) {

    alert(actor.name + " は行動不能！");

    nextActor();

    return;

}

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
// 無下限呪術
if (skill.name === "無下限呪術") {

    showInfinityTarget();

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

    // 呪力・CT・必殺カード
    if (!useSkillCost(actor, skill)) {

        showSkillSelect();

        return;

    }

    // 蛇の目と牙のスピーカー
    if (
        hasEquipment(actor, "speaker") &&
        skill.attackType === "遠距離" &&
        skill.target === "単体"
    ) {

        attackAllEnemies(true);

        return;

    }

    const enemy =
        gameState.enemyCharacters[
            enemyIndex
        ];

    const damage =
        calculateDamage(
            actor,
            enemy,
            skill
        );

    enemy.currentHp -= damage;
    
    enemy.lastSingleDamage = damage;

    if (enemy.currentHp < 0) {

        enemy.currentHp = 0;

    }

    applyEffects(
        actor,
        enemy,
        skill.effects
    );
    
    if (actor.doubleNextDamageStun) {

    actor.stun = 2;
    
    alert(actor.stun);

    actor.doubleNextDamageStun = false;

}
    
    // 黒縄
if (
    hasEquipment(actor, "black_rope") &&
    skill.attackType === "遠距離"
) {

    applyEffects(
        actor,
        enemy,
        [
            {
                type: "damageDown",
                value: 10,
                duration: 1
            }
        ]
    );

    alert(
        enemy.name +
        " の与ダメージが10下がった！"
    );

}
    
    // 天逆鉾

if (

    hasEquipment(actor, "heavenly_spear") &&

    skill.attackType === "近接"

) {

    gameState.heavenlyTarget = enemy;

    showSealSkillSelect(enemy);

    return;

}

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

    // 自傷
    if (skill.selfDamage) {

        actor.currentHp -=
            skill.selfDamage;

        if (actor.currentHp < 0) {

            actor.currentHp = 0;

        }

    }

    // 野薔薇
    if (skill.name === "簪") {

        actor.nailStock--;

    }

    if (skill.name === "釘飛ばし") {

        actor.nailStock++;

    }

    nextActor();

}

// ===============================
// 全体攻撃
// ===============================

function attackAllEnemies(skipCost = false) {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;

    // 通常使用時だけ消費
    if (!skipCost) {

        if (!useSkillCost(actor, skill)) {

            showSkillSelect();

            return;

        }

    }

    gameState.enemyCharacters.forEach(enemy => {

        if (enemy.currentHp <= 0) return;

        const damage =
            calculateDamage(
                actor,
                enemy,
                skill
            );

        enemy.currentHp -= damage;

        if (enemy.currentHp < 0) {

            enemy.currentHp = 0;

        }

        applyEffects(
            actor,
            enemy,
            skill.effects
        );
        
        if (actor.doubleNextDamageStun) {

    actor.stun = 2;

    actor.doubleNextDamageStun = false;

}
        
        if (
    hasEquipment(actor, "black_rope") &&
    skill.attackType === "遠距離"
) {

    applyEffects(
        actor,
        enemy,
        [
            {
                type: "damageDown",
                value: 10,
                duration: 1
            }
        ]
    );

}

    });

    alert(
        actor.name +
        " の " +
        skill.name +
        "！\n\n敵全体に攻撃！"
    );

    // 自傷
    if (skill.selfDamage) {

        actor.currentHp -=
            skill.selfDamage;

        if (actor.currentHp < 0) {

            actor.currentHp = 0;

        }

    }

    // 野薔薇
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

function showInfinityTarget() {

    const app = document.getElementById("app");

    let html = `
    <div class="battle">

        <h2>無敵にする味方を選択</h2>
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

            <button onclick="useInfinity(${index})">

                選択

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

function useInfinity(index) {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;

    if (!useSkillCost(actor, skill)) {

        showSkillSelect();
        return;

    }

    const target =
        gameState.battleCharacters[index];

    // 選択した味方
    target.invincible = 1;

    // 五条自身
    actor.invincible = 1;

    alert(
        actor.name +
        " は無下限呪術を発動！\n\n" +
        actor.name +
        " と " +
        target.name +
        " が1ターン無敵になった！"
    );

    nextActor();

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

    if (!useSkillCost(actor, skill)) {

        showSkillSelect();

        return;

    }

    const target =
        gameState.battleCharacters[index];

    target.currentHp =
        Math.min(
            target.maxHp,
            target.currentHp + skill.heal
        );

    applyEffects(
        actor,
        target,
        skill.effects
    );

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

    if (!useSkillCost(actor, skill)) {

        showSkillSelect();

        return;

    }

    gameState.battleCharacters.forEach(character => {

        if (character.currentHp <= 0) return;

        character.currentHp =
            Math.min(
                character.maxHp,
                character.currentHp + skill.heal
            );

        applyEffects(
            actor,
            character,
            skill.effects
        );

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


    const actor =
    gameState.selectedActors[
        gameState.currentActorIndex
    ];

// 受胎九相図 二番
if (
    actor.extraAction &&
    !actor.extraActionUsed
) {

    actor.extraActionUsed = true;
    actor.extraAction = false;

    showSkillSelect();

    return;

}

actor.hasActed = true;

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
    
    if (actor.doubleNextDamage) {

    damage *= 2;

    actor.doubleNextDamage = false;

}

// ===============================
// 領域効果
// ===============================

if (gameState.currentField) {

    switch (gameState.currentField.card.id) {

        // 帳
        case "curtain":
            damage -= 10;
            break;

        // 仙台結界
        case "sendai_barrier":
            if (actor.type === "術") {
                damage += 10;
            }
            break;

        // 東京結界
        case "tokyo_barrier":
            if (actor.type === "体") {
                damage += 10;
            }
            break;

        // 東京都立呪術高等専門学校
        case "tokyo_jujutsu_high":
            damage -= 30;
            break;

    }

}

damage = Math.max(0, damage);
  
// 呪具効果
if (actor.equipment) {

    actor.equipment.forEach(card => {

        if (!card.effect) return;

        switch (card.effect.type) {

            // 屠坐魔
            case "meleeDamageUp":

                if (skill.attackType === "近接") {

                    damage += card.effect.value;

                }

                break;

        }

    });

}

    // 一時的な与ダメアップ
    damage += actor.damageBuff ?? 0;
    
    // 与ダメージダウン
    damage -= actor.damageDown ?? 0;

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

function showSealSkillSelect(enemy) {

    const app = document.getElementById("app");

    let html = `
    <div class="battle">

        <h2>封印するスキルを選択</h2>
    `;

    enemy.skills.forEach((skill, index) => {

        html += `

        <button
            onclick="sealEnemySkill(${index})"
        >

            ${skill.name}

        </button>

        <br><br>

        `;

    });

    html += `
    </div>
    `;

    app.innerHTML = html;

}

function sealEnemySkill(index) {

    const enemy =
        gameState.heavenlyTarget;

    enemy.sealedSkills[index] = 1;

    alert(
        enemy.skills[index].name +
        " を封印した！"
    );

    nextActor();

}
