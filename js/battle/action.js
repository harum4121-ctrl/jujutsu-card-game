function startActionPhase() {

    gameState.selectedActors =
        gameState.selectedActors.filter(
            character => !character.hasActed
        );

    if (gameState.selectedActors.length === 0) {
        showBattleScreen();
        return;
    }

    gameState.currentActorIndex = 0;

    showSkillSelect();

}

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

            <h1>${actor.name}</h1>

            <h2>使用するスキルを選択</h2>
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

                （消費呪力 ${skill.cost ?? 0}）

                ${ct > 0 ? `【CT:${ct}】` : ""}
            </button>

            <br><br>
        `;

    });

    html += `
        <button onclick="selectUltimate()">
            必殺技
        </button>

        </div>
    `;

    app.innerHTML = html;

}

function selectSkill(index) {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        characters[actor.id].skills[index];

    gameState.selectedSkill = skill;

    if (skill.attackType === "回復") {

        showHealTarget();
        return;

    }

    showEnemySelect();

}

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
                    HP：
                    ${character.currentHp}
                    /
                    ${character.maxHp}
                </p>

                <button
                    onclick="healCharacter(${index})"
                >
                    回復
                </button>

            </div>
        `;

    });

    html += `</div>`;

    app.innerHTML = html;

}

function healCharacter(index) {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;

    const target =
        gameState.battleCharacters[index];

    if (
        actor.currentCursedPower <
        (skill.cost ?? 0)
    ) {

        alert("呪力が足りません");

        showSkillSelect();

        return;

    }

    actor.currentCursedPower -=
        (skill.cost ?? 0);

    if (skill.costCard) {

        consumeUltimateCards(
            skill.costCard
        );

    }

    if (skill.ct) {

        actor.cooldowns[skill.name] =
            skill.ct;

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
        "！\n\n" +
        target.name +
        " は " +
        skill.heal +
        " 回復した！"
    );

    actor.hasActed = true;

    gameState.currentActorIndex++;

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
function selectUltimate() {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const ultimate =
        characters[actor.id].ultimate;

    if (
        getUltimateCardCount() <
        ultimate.costCard
    ) {

        alert("必殺カードが足りません");
        return;

    }

    gameState.selectedSkill = ultimate;

 if (
    ultimate.attackType === "回復" ||
    ultimate.target === "味方単体" ||
    ultimate.target === "味方全体"
){

        showHealTarget();
        return;

    }

    showEnemySelect();

}

function showEnemySelect() {

    const app =
        document.getElementById("app");

    let html = `
        <div class="battle">

            <h2>攻撃する敵を選択してください</h2>
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

                <button onclick="attackEnemy(${index})">

                    攻撃

                </button>

            </div>

            <br>
        `;

    });

    html += `</div>`;

    app.innerHTML = html;

}

function attackEnemy(enemyIndex) {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;

    if (skill.target === "全体") {

        attackAllEnemies();
        return;

    }

    if (
        actor.currentCursedPower <
        (skill.cost ?? 0)
    ) {

        alert("呪力が足りません");

        showSkillSelect();

        return;

    }

    actor.currentCursedPower -=
        (skill.cost ?? 0);

    if (skill.costCard) {

        consumeUltimateCards(
            skill.costCard
        );

    }

    if (skill.ct) {

        actor.cooldowns[skill.name] =
            skill.ct;

    }

    const enemy =
        gameState.enemyCharacters[
            enemyIndex
        ];

    let damage =
        skill.damage ?? 0;

    if (skill.hits) {

        damage *= skill.hits;

    }

    actor.equipment.forEach(equipment => {

        if (
            equipment.effect.type ===
            "meleeDamageUp" &&
            skill.attackType === "近接"
        ) {

            damage +=
                equipment.effect.value;

        }

    });

    enemy.currentHp -= damage;

    if (enemy.currentHp < 0) {

        enemy.currentHp = 0;

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

    if (enemy.currentHp === 0) {

        alert(enemy.name + " を撃破！");

    }

    actor.hasActed = true;

    gameState.currentActorIndex++;

    const aliveEnemies =
        gameState.enemyCharacters.filter(
            enemy => enemy.currentHp > 0
        );

    if (aliveEnemies.length === 0) {

        showBattleResult("win");
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
function attackAllEnemies() {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;

    // 呪力チェック
    if (
        actor.currentCursedPower <
        (skill.cost ?? 0)
    ) {

        alert("呪力が足りません");

        showSkillSelect();

        return;

    }

    // 呪力消費
    actor.currentCursedPower -=
        (skill.cost ?? 0);

    // 必殺カード消費
    if (skill.costCard) {

        consumeUltimateCards(
            skill.costCard
        );

    }

    // CT開始
    if (skill.ct) {

        actor.cooldowns[skill.name] =
            skill.ct;

    }

    // 全体攻撃
    gameState.enemyCharacters.forEach(enemy => {

        if (enemy.currentHp <= 0) return;

        let damage =
            skill.damage ?? 0;

        if (skill.hits) {

            damage *= skill.hits;

        }

        // 屠坐魔
        actor.equipment.forEach(equipment => {

            if (
                equipment.effect.type === "meleeDamageUp" &&
                skill.attackType === "近接"
            ) {

                damage += equipment.effect.value;

            }

        });

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

    actor.hasActed = true;

    gameState.currentActorIndex++;

    // 勝利判定
    const aliveEnemies =
        gameState.enemyCharacters.filter(
            enemy => enemy.currentHp > 0
        );

    if (aliveEnemies.length === 0) {

        showBattleResult("win");

        return;

    }

    // 次の味方へ
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

function showBattleResult(result) {

    const app =
        document.getElementById("app");

    if (result === "win") {

        app.innerHTML = `

            <div class="battle">

                <h1>勝利！</h1>

                <button onclick="showTitle()">
                    タイトルへ戻る
                </button>

            </div>

        `;

    } else if (result === "lose") {

        app.innerHTML = `

            <div class="battle">

                <h1>敗北…</h1>

                <button onclick="showTitle()">
                    タイトルへ戻る
                </button>

            </div>

        `;

    }

}