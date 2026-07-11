function startActionPhase() {

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

    // 次のキャラクターへ
    gameState.currentActorIndex++;

    if (
        gameState.currentActorIndex <
        gameState.selectedActors.length
    ) {

        showSkillSelect();

    } else {

        alert("味方の行動終了");

        displayBattleCharacters();
        displayEnemyCharacters();
        displayHand();
        updateDeckCount();

        document.getElementById("app").innerHTML = `
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

        gameState.selectedActors = [];

    }

}