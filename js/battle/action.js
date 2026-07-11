function startActionPhase() {

    gameState.selectedActors =
        gameState.selectedActors.filter(
            character => !character.hasActed
        );

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

        html += `
            <button onclick="selectSkill(${index})">

                ${skill.name}

                （消費呪力 ${skill.cost ?? 0}）

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

    gameState.selectedSkill =
        characters[actor.id].skills[index];

    showEnemySelect();

}

function selectUltimate() {

    alert("必殺技は次に実装します。");

}

function showEnemySelect() {

    const app =
        document.getElementById("app");

    let html = `
        <div class="battle">

            <h2>攻撃する敵を選択してください</h2>
    `;

    gameState.enemyCharacters.forEach((enemy, index) => {

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

    const enemy =
        gameState.enemyCharacters[
            enemyIndex
        ];

    // 呪力チェック
    if (actor.currentCursedPower < (skill.cost ?? 0)) {

        alert("呪力が足りません。");

        showSkillSelect();

        return;

    }

    // 呪力消費
    actor.currentCursedPower -= (skill.cost ?? 0);

    // ダメージ計算
    let damage = skill.damage ?? 0;

    // 多段攻撃対応
    if (skill.hits) {
        damage *= skill.hits;
    }

    // HP減少
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


// 勝利判定
const aliveEnemies =
    gameState.enemyCharacters.filter(
        enemy => enemy.currentHp > 0
    );


if (aliveEnemies.length === 0) {

    alert("勝利！");

    showBattleResult("win");

    return;

}

actor.hasActed = true;

// 行動済みにする
actor.hasActed = true;

    // 次のキャラクターへ
    gameState.currentActorIndex++;

    if (
        gameState.currentActorIndex <
        gameState.selectedActors.length
    ) {

        showSkillSelect();

    } else {

        alert("味方の行動終了");
        
        gameState.selectedActors = [];
        
        showBattleScreen();
        

}

}
function showBattleResult(result) {

    const app = document.getElementById("app");

    if (result === "win") {

        app.innerHTML = `

            <div class="battle">

                <h1>勝利！</h1>

                <button onclick="showTitle()">
                    タイトルへ戻る
                </button>

            </div>

        `;

    }

}