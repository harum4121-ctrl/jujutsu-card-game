function showEnemySelectScreen() {

    const app = document.getElementById("app");

    let html = `

    <div class="enemy-select">

        <h1>敵選択</h1>

    `;


    for (const id in enemies) {

        const enemy = enemies[id];


        html += `

        <div class="character">

            <h2>${enemy.name}</h2>

            <p>
                HP：${enemy.hp}
            </p>

            <button onclick="selectEnemy('${id}')">

                この敵と戦う

            </button>

        </div>

        <br>

        `;

    }


    html += `

    </div>

    `;


    app.innerHTML = html;

}



function selectEnemy(id) {

    alert("selectEnemy実行：" + id);

    gameState.selectedEnemy = id;

    startBattle();

}