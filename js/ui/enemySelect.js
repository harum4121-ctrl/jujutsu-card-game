function showEnemySelectScreen() {

    const app = document.getElementById("app");

    let html = `

        <div class="enemy-select-screen">

            <header class="enemy-select-header">

                <p class="enemy-select-subtitle">
                    SELECT ENEMY
                </p>

                <h1>
                    敵を選択
                </h1>

                <p>
                    対戦する敵を選んでください
                </p>

            </header>


            <div class="enemy-select-list">

    `;


    for (const id in enemies) {

        const enemy = enemies[id];

        html += `

            <button
                class="enemy-select-card"
                onclick="selectEnemy('${id}')"
            >

                <div class="enemy-select-image-area">

                    ${
                        enemy.image
                            ? `
                                <img
                                    src="${enemy.image}"
                                    alt="${enemy.name}"
                                    class="enemy-select-image"
                                >
                            `
                            : `
                                <div class="enemy-image-placeholder">
                                    ${enemy.name}
                                </div>
                            `
                    }

                    <div class="enemy-image-dark"></div>


                    <div class="enemy-name-overlay">

                        <span>
                            ENEMY
                        </span>

                        <strong>
                            ${enemy.name}
                        </strong>

                    </div>

                </div>


                <div class="enemy-select-info">

                    <div class="enemy-hp">

                        <span>
                            HP
                        </span>

                        <strong>
                            ${enemy.hp}
                        </strong>

                    </div>


                    <div class="enemy-battle-label">
                        BATTLE
                        <span>›</span>
                    </div>

                </div>

            </button>

        `;

    }


    html += `

            </div>


            <button
                class="enemy-select-back"
                onclick="showDeckBuilder()"
            >
                デッキ編集へ戻る
            </button>

        </div>

    `;


    app.innerHTML = html;

}



// ===============================
// 敵決定
// ===============================

function selectEnemy(id) {

    gameState.selectedEnemy = id;

    startBattle();

}