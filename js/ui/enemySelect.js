function showEnemySelectScreen() {

    const app =
        document.getElementById("app");

    let enemyCards = "";


    // ===============================
    // 敵一覧
    // ===============================

    for (const id in enemies) {

        const enemy =
            enemies[id];

        const imageHtml =
            enemy.cardImage
                ? `
                    <img
                        src="${enemy.cardImage}"
                        alt="${enemy.name}"
                        class="enemy-select-image"
                    >
                `
                : `
                    <div class="enemy-select-no-image">
                        ENEMY
                    </div>
                `;


        enemyCards += `

            <button
                type="button"
                class="enemy-select-card"
                onclick="selectEnemy('${id}')"
            >

                <!-- 背景エフェクト -->
                <div class="enemy-card-aura"></div>


                <!-- 上部 -->
                <div class="enemy-card-header">

                    <span class="enemy-number">
                        TARGET
                    </span>

                    <span class="enemy-danger">
                        ⚠
                    </span>

                </div>


                <!-- キャラクター画像 -->
                <div class="enemy-select-image-area">

                    ${imageHtml}

                    <div class="enemy-image-gradient"></div>

                </div>


                <!-- 敵情報 -->
                <div class="enemy-select-info">

                    <span class="enemy-label">
                        ENEMY
                    </span>

                    <h2>
                        ${enemy.name}
                    </h2>


                    <div class="enemy-select-stats">

                        <div>

                            <span>
                                HP
                            </span>

                            <strong>
                                ${enemy.hp}
                            </strong>

                        </div>


                        ${
                            enemy.type
                                ? `
                                    <div>

                                        <span>
                                            TYPE
                                        </span>

                                        <strong>
                                            ${enemy.type}
                                        </strong>

                                    </div>
                                `
                                : ""
                        }

                    </div>


                    <div class="enemy-battle-label">

                        <span>
                            この敵と戦う
                        </span>

                        <strong>
                            ›
                        </strong>

                    </div>

                </div>

            </button>

        `;

    }


    // ===============================
    // 画面
    // ===============================

    app.innerHTML = `

        <div class="enemy-select-screen">


            <!-- 背景演出 -->

            <div
                class="
                    enemy-select-background-effect
                    enemy-effect-one
                "
            ></div>

            <div
                class="
                    enemy-select-background-effect
                    enemy-effect-two
                "
            ></div>


            <!-- ヘッダー -->

            <header class="enemy-select-header">

                <button
                    type="button"
                    class="enemy-select-back"
                    onclick="showDeckBuilder()"
                >
                    ←
                </button>


                <div>

                    <p>
                        BATTLE TARGET
                    </p>

                    <h1>
                        対戦相手選択
                    </h1>

                </div>


                <div class="enemy-select-header-mark">
                    ⚔
                </div>

            </header>


            <!-- 説明 -->

            <div class="enemy-select-message">

                <span>
                    SELECT YOUR ENEMY
                </span>

                <p>
                    戦う相手を選択してください
                </p>

            </div>


            <!-- 敵一覧 -->

            <main class="enemy-select-list">

                ${enemyCards}

            </main>


        </div>

    `;

}



function selectEnemy(id) {

    gameState.selectedEnemy = id;

    startBattle();

}