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
function showRules() {

    const app =
        document.getElementById("app");

    app.innerHTML = `
        <div class="rules-screen">

            <header class="rules-header">

                <h1>
                    ゲームルール
                </h1>

                <button
                    id="closeRulesButton"
                    class="rules-close-button"
                >
                    ×
                </button>

            </header>


            <main class="rules-content">

                <section class="rule-section">

                    <h2>
                        バトル準備
                    </h2>

                    <p>
                        キャラクターを3体選択し、
                        40枚のデッキを作成します。
                    </p>

                    <p>
                        同名カードはデッキに
                        3枚まで入れられます。
                    </p>

                </section>


                <section class="rule-section">

                    <h2>
                        ターンの進行
                    </h2>

                    <ol>
                        <li>
                            山札からカードを1枚引く
                        </li>

                        <li>
                            手札からカードを使用する
                        </li>

                        <li>
                            味方キャラクターを最大2体選び、
                            それぞれ行動する
                        </li>

                        <li>
                            ターンを終了する
                        </li>
                    </ol>

                </section>


                <section class="rule-section">

                    <h2>
                        勝利条件
                    </h2>

                    <p>
                        相手キャラクターをすべて倒すか、
                        相手の山札がなくなれば勝利です。
                    </p>

                </section>


                <section class="rule-section">

                    <h2>
                        必殺技
                    </h2>

                    <p>
                        必殺技を使用するときは、
                        指定された枚数の必殺カードを消費します。
                    </p>

                </section>


                <section class="rule-section">

                    <h2>
                        領域カード
                    </h2>

                    <p>
                        場に存在できる領域カードは、
                        敵味方を合わせて1枚だけです。
                    </p>

                    <p>
                        領域を展開してから2ターン経過すると、
                        新しい領域で上書きできます。
                    </p>

                </section>

            </main>


            <button
                id="rulesBackButton"
                class="rules-back-button"
            >
                タイトルへ戻る
            </button>

        </div>
    `;


    document
        .getElementById("closeRulesButton")
        .addEventListener("click", () => {

            showTitle();

        });


    document
        .getElementById("rulesBackButton")
        .addEventListener("click", () => {

            showTitle();

        });

}