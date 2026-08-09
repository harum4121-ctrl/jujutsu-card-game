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

    showNormalBattleTeamSelect();

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
// ===============================
// 通常バトル
// AIチーム一覧
// ===============================

const normalBattleTeams = {

    firstYears: {

        name: "虎杖・伏黒・釘崎",

        characters: [
            "yuji",
            "megumi",
            "nobara"
        ]

    },


    secondYears: {

        name: "禪院・狗巻・パンダ",

        characters: [
            "maki",
            "inumaki",
            "panda"
        ]

    },


    specialTeam: {

        name: "五条・家入・乙骨",

        characters: [
            "gojo",
            "shoko",
            "yuta"
        ]

    },


    random: {

        name: "ランダム3人",

        random: true

    }

};


// ===============================
// 通常バトル
// AIチーム選択画面
// ===============================

function showNormalBattleTeamSelect() {

    const app =
        document.getElementById("app");


    app.innerHTML = `

        <div class="battle-mode-screen">

            <div class="battle-mode-header">

                <p class="battle-mode-small">
                    SELECT ENEMY TEAM
                </p>

                <h1>
                    対戦チーム選択
                </h1>

                <p class="battle-mode-description">
                    対戦するAIチームを選択
                </p>

            </div>


            <div class="battle-mode-list">


                <button
                    class="battle-mode-card normal-mode"
                    onclick="selectNormalBattleTeam('firstYears')"
                >

                    <div class="battle-mode-icon">
                        ⚔️
                    </div>

                    <div class="battle-mode-content">

                        <span class="battle-mode-type">
                            TEAM 01
                        </span>

                        <h2>
                            虎杖・伏黒・釘崎
                        </h2>

                        <p>
                            虎杖悠仁・伏黒恵・釘崎野薔薇
                        </p>

                    </div>

                    <div class="battle-mode-arrow">
                        ›
                    </div>

                </button>


                <button
                    class="battle-mode-card normal-mode"
                    onclick="selectNormalBattleTeam('secondYears')"
                >

                    <div class="battle-mode-icon">
                        ⚔️
                    </div>

                    <div class="battle-mode-content">

                        <span class="battle-mode-type">
                            TEAM 02
                        </span>

                        <h2>
                            禪院・狗巻・パンダ
                        </h2>

                        <p>
                            禪院真希・狗巻棘・パンダ
                        </p>

                    </div>

                    <div class="battle-mode-arrow">
                        ›
                    </div>

                </button>


                <button
                    class="battle-mode-card normal-mode"
                    onclick="selectNormalBattleTeam('specialTeam')"
                >

                    <div class="battle-mode-icon">
                        ⚔️
                    </div>

                    <div class="battle-mode-content">

                        <span class="battle-mode-type">
                            TEAM 03
                        </span>

                        <h2>
                            五条・家入・乙骨
                        </h2>

                        <p>
                            五条悟・家入硝子・乙骨憂太
                        </p>

                    </div>

                    <div class="battle-mode-arrow">
                        ›
                    </div>

                </button>


                <button
                    class="battle-mode-card normal-mode"
                    onclick="selectNormalBattleTeam('random')"
                >

                    <div class="battle-mode-icon">
                        🎲
                    </div>

                    <div class="battle-mode-content">

                        <span class="battle-mode-type">
                            RANDOM TEAM
                        </span>

                        <h2>
                            ランダム3人
                        </h2>

                        <p>
                            ランダムに選ばれた3人と対戦
                        </p>

                    </div>

                    <div class="battle-mode-arrow">
                        ›
                    </div>

                </button>


            </div>


            <button
                class="battle-mode-back"
                onclick="showBattleModeSelect()"
            >
                戻る
            </button>


        </div>

    `;

}


// ===============================
// 通常バトル
// AIチーム決定
// ===============================

function selectNormalBattleTeam(teamId) {

    const team =
        normalBattleTeams[teamId];

    if (!team) {

        alert(
            "チームデータが見つかりません"
        );

        return;

    }


    // ===============================
    // ランダムチーム
    // ===============================

    if (team.random) {

        const candidateIds = [

            "yuji",
            "megumi",
            "nobara",

            "maki",
            "inumaki",
            "panda",

            "gojo",
            "shoko",
            "yuta"

        ];


        // シャッフル
        const shuffled =
            [...candidateIds].sort(
                () => Math.random() - 0.5
            );


        // 最初の3人
        gameState.normalEnemyTeam =
            shuffled.slice(0, 3);

    }

    // ===============================
    // 固定チーム
    // ===============================

    else {

        gameState.normalEnemyTeam =
            [...team.characters];

    }


    // 選択したチームIDも保存
    gameState.normalEnemyTeamId =
        teamId;


    // ===============================
    // 確認用
    // ===============================

    const names =
        gameState.normalEnemyTeam
            .map(id => characters[id].name)
            .join("・");


    alert(
        "対戦相手\n" +
        names
    );


    // ===============================
    // 自分のキャラ選択へ
    // ===============================

    showCharacterSelect();

}