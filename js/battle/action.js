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

    const skill =
        characters[actor.id].skills[index];

    gameState.selectedSkill = skill;

    if (skill.heal) {

        showHealTarget();

        return;

    }

    showEnemySelect();

}
function showHealTarget() {

    const app =
        document.getElementById("app");

    const skill =
        gameState.selectedSkill;

    let html = `
        <div class="battle">

        <h2>回復する味方を選択</h2>
    `;

    gameState.battleCharacters.forEach((character,index)=>{

        if(character.currentHp<=0){
            return;
        }

        html += `
            <div class="character">

                <h3>${character.name}</h3>

                <p>
                    HP：
                    ${character.currentHp}
                    /
                    ${character.maxHp}
                </p>

                <button onclick="healCharacter(${index})">

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

    // 呪力チェック
    if(actor.currentCursedPower < (skill.cost ?? 0)){

        alert("呪力が足りません");

        showSkillSelect();

        return;

    }

    // 呪力消費
    actor.currentCursedPower -=
        (skill.cost ?? 0);

    // CT開始
    if(skill.ct){

        actor.cooldowns[skill.name]=skill.ct;

    }

    // 回復
    target.currentHp += skill.heal;

    if(target.currentHp > target.maxHp){

        target.currentHp = target.maxHp;

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

    if(
        gameState.currentActorIndex <
        gameState.selectedActors.length
    ){

        showSkillSelect();

    }else{

        gameState.selectedActors=[];

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
        ultimate.target === "自身" ||
        ultimate.target === "味方単体" ||
        ultimate.target === "味方全体"
    ) {

        if (
            ultimate.target === "味方全体"
        ) {

            healAllCharacters();

        } else {

            showHealTarget();

        }

    } else {

        showEnemySelect();

    }

}

function showEnemySelect() {

    const app =
        document.getElementById("app");

    let html = `
        <div class="battle">

            <h2>攻撃する敵を選択してください</h2>
    `;

gameState.enemyCharacters.forEach((enemy, index) => {

    if(enemy.currentHp <= 0){
        return;
    }

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
        
        // 全体攻撃なら専用処理
if (skill.target === "全体") {

    attackAllEnemies();

    return;

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

    // CT開始
    if (skill.ct) {

        actor.cooldowns[skill.name] =
            skill.ct;

    }

    gameState.enemyCharacters.forEach(enemy => {

        if (enemy.currentHp <= 0) return;

        let damage =
            skill.damage ?? 0;

        if (skill.hits) {

            damage *= skill.hits;

        }

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
    
    // CT開始
if (skill.ct) {
    actor.cooldowns[skill.name] = skill.ct;
}

    // ダメージ計算
let damage = skill.damage ?? 0;


// 装備効果
actor.equipment.forEach(equipment => {

    if(
        equipment.effect.type === "meleeDamageUp"
        &&
        skill.attackType === "近接"
    ){

        damage += equipment.effect.value;

    }

});

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

// 行動済みにする
actor.hasActed = true;

// 次のキャラクターへ
gameState.currentActorIndex++;

if (
    gameState.currentActorIndex <
    gameState.selectedActors.length
) {

    // まだ行動する味方がいる
    showSkillSelect();

} else {

    alert("味方の行動終了");

    // 選択解除
    gameState.selectedActors = [];

    // 敵ターンへ
    enemyTurn();

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