function showTitle() {

    const app =
        document.getElementById("app");

    app.innerHTML = `
        <div class="title-screen">

            <div class="title-background-effect effect-one"></div>
            <div class="title-background-effect effect-two"></div>

            <main class="title-content">

                <div class="title-logo-area">

                    <p class="title-subtitle">
                        JUJUTSU CARD BATTLE
                    </p>

                    <h1 class="game-title">

                        <span class="game-title-small">
                            呪術
                        </span>

                        <span class="game-title-main">
                            カードゲーム
                        </span>

                    </h1>

                    <div class="title-decoration">

                        <span></span>

                        <strong>
                            呪いを制し、勝利を掴め
                        </strong>

                        <span></span>

                    </div>

                </div>


                <nav class="title-menu">

                    <button
                        id="battleButton"
                        class="title-menu-button battle"
                    >

                        <span class="title-button-label">
                            BATTLE
                        </span>

                        <small>
                            バトル開始
                        </small>

                    </button>


                    <button
                        id="deckButton"
                        class="title-menu-button deck"
                    >

                        <span class="title-button-label">
                            DECK EDIT
                        </span>

                        <small>
                            デッキ編集
                        </small>

                    </button>


                    <button
                        id="ruleButton"
                        class="title-menu-button rules"
                    >

                        <span class="title-button-label">
                            RULES
                        </span>

                        <small>
                            ルール確認
                        </small>

                    </button>

                </nav>


                <footer class="title-footer">

                    <span>
                        Version 0.1
                    </span>

                    <span>
                        JUJUTSU CARD GAME
                    </span>

                </footer>

            </main>

        </div>
    `;


    // バトル開始
    document
        .getElementById("battleButton")
        .addEventListener("click", () => {

            gameState.selectedCharacters = [];
            gameState.deck = [];

            showCharacterSelect();

        });


    // デッキ編集
    document
        .getElementById("deckButton")
        .addEventListener("click", () => {

            /*
            キャラクターが未選択の場合は、
            先にキャラクター選択画面へ移動する
            */

            if (
                !Array.isArray(
                    gameState.selectedCharacters
                ) ||
                gameState.selectedCharacters.length !== 3
            ) {

                alert(
                    "先に使用するキャラクターを3体選択してください"
                );

                showCharacterSelect();

                return;

            }

            if (!Array.isArray(gameState.deck)) {

                gameState.deck = [];

            }

            showDeckBuilder();

        });


    // ルール
    document
        .getElementById("ruleButton")
        .addEventListener("click", () => {

            showRules();

        });

}