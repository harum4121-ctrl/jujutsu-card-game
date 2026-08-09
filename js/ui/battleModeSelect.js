// ===============================
// バトルモード選択
// ===============================

function showBattleModeSelect() {

    const app =
        document.getElementById("app");


    app.innerHTML = `

        <div class="battle-mode-screen">

            <div class="battle-mode-header">

                <p class="battle-mode-small">
                    SELECT BATTLE MODE
                </p>

                <h1>
                    バトルモード
                </h1>

                <p class="battle-mode-description">
                    挑戦するモードを選択
                </p>

            </div>


            <div class="battle-mode-list">


                <!-- =====================
                     通常バトル
                ====================== -->

                <button
                    class="battle-mode-card normal-mode"
                    onclick="selectBattleMode('normal')"
                >

                    <div class="battle-mode-icon">
                        ⚔️
                    </div>

                    <div class="battle-mode-content">

                        <span class="battle-mode-type">
                            NORMAL BATTLE
                        </span>

                        <h2>
                            通常バトル
                        </h2>

                        <p>
                            AIがキャラクターとデッキを使用する
                            本格カードバトル
                        </p>

                    </div>

                    <div class="battle-mode-arrow">
                        ›
                    </div>

                </button>


                <!-- =====================
                     ボスバトル
                ====================== -->

                <button
                    class="battle-mode-card boss-mode"
                    onclick="selectBattleMode('boss')"
                >

                    <div class="battle-mode-icon">
                        ☠️
                    </div>

                    <div class="battle-mode-content">

                        <span class="battle-mode-type">
                            BOSS BATTLE
                        </span>

                        <h2>
                            ボスバトル
                        </h2>

                        <p>
                            3人のキャラクターで
                            強大なボス1体に挑戦
                        </p>

                    </div>

                    <div class="battle-mode-arrow">
                        ›
                    </div>

                </button>


                <!-- =====================
                     チャレンジバトル
                ====================== -->

                <button
                    class="battle-mode-card challenge-mode"
                    onclick="selectBattleMode('challenge')"
                >

                    <div class="battle-mode-icon">
                        🔥
                    </div>

                    <div class="battle-mode-content">

                        <span class="battle-mode-type">
                            CHALLENGE BATTLE
                        </span>

                        <h2>
                            チャレンジバトル
                        </h2>

                        <p>
                            徐々に難易度が上昇する
                            ステージを攻略
                        </p>

                    </div>

                    <div class="battle-mode-arrow">
                        ›
                    </div>

                </button>


            </div>


            <button
                class="battle-mode-back"
                onclick="showTitle()"
            >
                タイトルへ戻る
            </button>


        </div>

    `;

}


// ===============================
// モード決定
// ===============================

function selectBattleMode(mode) {

    gameState.battleMode = mode;


    // ===============================
    // 通常バトル
    // ===============================

    if (mode === "normal") {

        alert(
            "通常バトルは現在準備中です！"
        );

        return;

    }


    // ===============================
    // ボスバトル
    // ===============================

    if (mode === "boss") {

        showCharacterSelect();

        return;

    }


    // ===============================
    // チャレンジ
    // ===============================

    if (mode === "challenge") {

        alert(
            "チャレンジバトルは現在準備中です！"
        );

        return;

    }

}