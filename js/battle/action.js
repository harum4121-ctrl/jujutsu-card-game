function startActionPhase() {

    gameState.currentActorIndex = 0;

    showSkillSelect();

}

function showSkillSelect() {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const app =
        document.getElementById("app");

    let html = `
    <div class="battle">

        <h1>${actor.name}</h1>

        <h2>使用するスキルを選択</h2>
    `;

    const actorData =
        characters[actor.id];

    actorData.skills.forEach((skill, index) => {

        html += `
        <button onclick="selectSkill(${index})">

            ${skill.name}

            (消費:${skill.cost ?? 0})

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

    alert(
        actor.name +
        " が " +
        skill.name +
        " を選択しました。"
    );

}

function selectUltimate() {

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    alert(
        actor.name +
        " の必殺技を選択しました。"
    );

}