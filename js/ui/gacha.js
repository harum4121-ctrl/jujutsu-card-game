// ===============================
// ガチャ設定
// ===============================

const GACHA_SINGLE_COST = 100;
const GACHA_TEN_COST = 1000;

const GACHA_RATES = [
    {
        type: "character",
        rarity: "CHARACTER",
        rate: 1
    },
    {
        type: "card",
        rarity: "LR",
        rate: 1
    },
    {
        type: "card",
        rarity: "UR",
        rate: 5
    },
    {
        type: "card",
        rarity: "SSR",
        rate: 8
    },
    {
        type: "card",
        rarity: "SR",
        rate: 10
    },
    {
        type: "card",
        rarity: "R",
        rate: 25
    },
    {
        type: "card",
        rarity: "N",
        rate: 50
    }
];


// ===============================
// 全カード取得
// ===============================

function getAllGachaCards() {

    return [
        ...(Array.isArray(cards.equipment)
            ? cards.equipment
            : []),

        ...(Array.isArray(cards.cursedObjects)
            ? cards.cursedObjects
            : []),

        ...(Array.isArray(cards.support)
            ? cards.support
            : []),

        ...(Array.isArray(cards.domains)
            ? cards.domains
            : []),

        ...(Array.isArray(cards.ultimate)
            ? cards.ultimate
            : [])
    ].filter(card =>
        card &&
        card.id &&
        card.name
    );

}


// ===============================
// レアリティ抽選
// ===============================

function drawGachaCategory() {

    const random =
        Math.random() * 100;

    let total = 0;

    for (const setting of GACHA_RATES) {

        total += setting.rate;

        if (random < total) {

            return setting;

        }

    }

    // 念のため
    return {
        type: "card",
        rarity: "N",
        rate: 50
    };

}


// ===============================
// ガチャを1回引く
// ===============================

function drawOneGacha() {

    const category =
        drawGachaCategory();


    // キャラクター
    if (category.type === "character") {

        const characterEntries =
            Object.entries(characters);

        if (characterEntries.length === 0) {

            return null;

        }

        const randomEntry =
            characterEntries[
                Math.floor(
                    Math.random() *
                    characterEntries.length
                )
            ];

        const characterId =
            randomEntry[0];

        const character =
            randomEntry[1];

        addOwnedCharacter(
            characterId,
            1
        );

        return {
            resultType: "character",

            id: characterId,

            name: character.name,

            image:
                character.cardImage ?? "",

            rarity: "CHARACTER",

            ownedCount:
                getOwnedCharacterCount(
                    characterId
                )
        };

    }


    // カード
    const rarityCards =
        getAllGachaCards().filter(card =>
            (card.rarity ?? "N") ===
            category.rarity
        );

    /*
    指定レアリティのカードが1枚もない場合は、
    Nカードから抽選する
    */
    const fallbackCards =
        getAllGachaCards().filter(card =>
            (card.rarity ?? "N") === "N"
        );

    const drawPool =
        rarityCards.length > 0
            ? rarityCards
            : fallbackCards;

    if (drawPool.length === 0) {

        return null;

    }

    const card =
        drawPool[
            Math.floor(
                Math.random() *
                drawPool.length
            )
        ];

    addOwnedCard(
        card.id,
        1
    );

    return {
        resultType: "card",

        id: card.id,

        name: card.name,

        cardType: card.type,

        image:
            card.image ?? "",

        rarity:
            card.rarity ??
            category.rarity,

        ownedCount:
            getOwnedCardCount(
                card.id
            )
    };

}


// ===============================
// ガチャ実行
// ===============================

function performGacha(count) {

    const cost =
        count === 10
            ? GACHA_TEN_COST
            : GACHA_SINGLE_COST;

    const currency =
        gameState.collection
            ?.currency ?? 0;

    if (currency < cost) {

        alert(
            "コインが足りません"
        );

        return;

    }

    gameState.collection.currency -=
        cost;

    const results = [];

    for (
        let index = 0;
        index < count;
        index++
    ) {

        const result =
            drawOneGacha();

        if (result) {

            results.push(result);

        }

    }

    saveCollection();

showGachaAnimation(results);

}


// ===============================
// ガチャ画面
// ===============================

function showGachaScreen() {

    const app =
        document.getElementById("app");

    const currency =
        gameState.collection
            ?.currency ?? 0;

    app.innerHTML = `
        <div class="gacha-screen">

            <header class="gacha-header">

                <button
                    id="gachaBackButton"
                    class="gacha-back-button"
                >
                    ←
                </button>

                <div>

                    <p class="gacha-header-small">
                        CURSED DRAW
                    </p>

                    <h1>
                        呪術ガチャ
                    </h1>

                </div>

                <div class="gacha-currency">

                    <span>
                        COIN
                    </span>

                    <strong>
                        ${currency}
                    </strong>

                </div>

            </header>


            <main class="gacha-main">

                <section class="gacha-banner">

                    <div class="gacha-banner-light"></div>

                    <div class="gacha-banner-content">

                        <p>
                            CHARACTER & CARD
                        </p>

                        <h2>
                            呪いを引き当てろ
                        </h2>

                        <span>
                            キャラクター・カードが排出
                        </span>

                    </div>

                </section>


                <section class="gacha-rate-section">

                    <h2>
                        排出率
                    </h2>

                    <div class="gacha-rate-grid">

                        <div>
                            <span>CHARACTER</span>
                            <strong>1%</strong>
                        </div>

                        <div class="rarity-lr">
                            <span>LR</span>
                            <strong>1%</strong>
                        </div>

                        <div class="rarity-ur">
                            <span>UR</span>
                            <strong>5%</strong>
                        </div>

                        <div class="rarity-ssr">
                            <span>SSR</span>
                            <strong>8%</strong>
                        </div>

                        <div class="rarity-sr">
                            <span>SR</span>
                            <strong>10%</strong>
                        </div>

                        <div class="rarity-r">
                            <span>R</span>
                            <strong>25%</strong>
                        </div>

                        <div class="rarity-n">
                            <span>N</span>
                            <strong>50%</strong>
                        </div>

                    </div>

                </section>


                <section class="gacha-buttons">

                    <button
                        id="singleGachaButton"
                        class="gacha-draw-button single"
                    >

                        <span>
                            1回引く
                        </span>

                        <small>
                            100 COIN
                        </small>

                    </button>


                    <button
                        id="tenGachaButton"
                        class="gacha-draw-button ten"
                    >

                        <span>
                            10回引く
                        </span>

                        <small>
                            1000 COIN
                        </small>

                    </button>

                </section>

            </main>

        </div>
    `;


    document
        .getElementById(
            "gachaBackButton"
        )
        .onclick = () => {

            showTitle();

        };


    document
        .getElementById(
            "singleGachaButton"
        )
        .onclick = () => {

            performGacha(1);

        };


    document
        .getElementById(
            "tenGachaButton"
        )
        .onclick = () => {

            performGacha(10);

        };

}


// ===============================
// ガチャ結果画面
// ===============================

function showGachaResult(results) {

    const app =
        document.getElementById("app");

    const resultHtml =
        results
            .map((result, index) => {

                const hasImage =
                    result.image &&
                    result.image.length > 0;

                return `
                    <div
                        class="
                            gacha-result-card
                            rarity-${result.rarity.toLowerCase()}
                        "
                        style="
                            animation-delay:
                            ${index * 0.08}s
                        "
                    >

                        <div class="gacha-result-rarity">

                            ${result.rarity}

                        </div>

                        ${
                            hasImage
                                ? `
                                    <img
                                        src="${result.image}"
                                        alt="${result.name}"
                                    >
                                `
                                : `
                                    <div class="gacha-result-placeholder">

                                        ${result.resultType === "character"
                                            ? "CHARACTER"
                                            : result.cardType ?? "CARD"}

                                    </div>
                                `
                        }

                        <strong>
                            ${result.name}
                        </strong>

                        <small>

                            所持数
                            ×${result.ownedCount}

                        </small>

                    </div>
                `;

            })
            .join("");

    app.innerHTML = `
        <div class="gacha-result-screen">

            <header class="gacha-result-header">

                <p>
                    GACHA RESULT
                </p>

                <h1>
                    獲得結果
                </h1>

            </header>


            <main
                class="gacha-result-grid"
            >
                ${resultHtml}
            </main>


            <footer class="gacha-result-actions">

                <button
                    id="gachaAgainButton"
                >
                    ガチャへ戻る
                </button>

                <button
                    id="gachaTitleButton"
                >
                    タイトルへ
                </button>

            </footer>

        </div>
    `;


    document
        .getElementById(
            "gachaAgainButton"
        )
        .onclick = () => {

            showGachaScreen();

        };


    document
        .getElementById(
            "gachaTitleButton"
        )
        .onclick = () => {

            showTitle();

        };

}
// ===============================
// ガチャ演出
// ===============================

function showGachaAnimation(results){

    const app =
        document.getElementById("app");

    const highest =
        getHighestRarity(results);

    app.innerHTML = `

<div class="gacha-animation">

    <div id="gachaBackground"></div>

    <div id="summonCircle"></div>

    <div id="gachaLightning"></div>

    <div id="gachaCrack"></div>

    <div id="gachaFlash"></div>

    <div id="gachaFinalGlow"></div>

    <div id="gachaText">
        呪力を集束中...
    </div>

    <button
        id="gachaSkip"
        class="gacha-skip-button"
    >
        SKIP
    </button>

</div>

`;

    let finished = false;

    const finish = () => {

        if (finished) return;

        finished = true;

        showGachaResult(results);

    };

    document
        .getElementById("gachaSkip")
        .onclick = finish;


    // ===============================
    // 0 ～ 1.5秒
    // 全レア共通
    // ===============================

    setTimeout(()=>{

        const text =
            document.getElementById(
                "gachaText"
            );

        const circle =
            document.getElementById(
                "summonCircle"
            );

        if (text) {

            text.textContent =
                "術式展開";

        }

        if (circle) {

            circle.classList.add(
                "fast"
            );

        }

    },1500);


    // ===============================
    // 3秒
    // 雷＋画面揺れ
    // まだ全レア共通
    // ===============================

    setTimeout(()=>{

        const lightning =
            document.getElementById(
                "gachaLightning"
            );

        const animation =
            document.querySelector(
                ".gacha-animation"
            );

        if (lightning) {

            lightning.classList.add(
                "active"
            );

        }

        if (animation) {

            animation.classList.add(
                "shake"
            );

        }

    },3000);


    // ===============================
    // 4秒
    // ヒビ
    // ===============================

    setTimeout(()=>{

        const crack =
            document.getElementById(
                "gachaCrack"
            );

        if (crack) {

            crack.classList.add(
                "active"
            );

        }

    },4000);


    // ===============================
    // 4.7秒
    // 白フラッシュ
    // ===============================

    setTimeout(()=>{

        const flash =
            document.getElementById(
                "gachaFlash"
            );

        if (flash) {

            flash.classList.add(
                "gacha-flash-active"
            );

        }

    },4700);


    // ===============================
    // 5.0秒
    // ここで初めてレア度による分岐
    // ===============================

    setTimeout(()=>{

        const glow =
            document.getElementById(
                "gachaFinalGlow"
            );

        const animation =
            document.querySelector(
                ".gacha-animation"
            );

        const text =
            document.getElementById(
                "gachaText"
            );

        if (!glow) return;


        // まず共通クラスを除去
        glow.className = "";


        // N～SR
        if (
            highest === "N" ||
            highest === "R" ||
            highest === "SR"
        ) {

            glow.classList.add(
                "final-purple"
            );

        }


        // SSR
        else if (
            highest === "SSR"
        ) {

            glow.classList.add(
                "final-gold"
            );

            animation?.classList.add(
                "medium-impact"
            );

        }


        // UR
        else if (
            highest === "UR"
        ) {

            glow.classList.add(
                "final-red"
            );

            animation?.classList.add(
                "strong-impact"
            );

            navigator.vibrate?.(
                [80,50,120]
            );

        }


        // LR
        else if (
            highest === "LR"
        ) {

            glow.classList.add(
                "final-rainbow"
            );

            animation?.classList.add(
                "legend-impact"
            );

            if (text) {

                text.textContent =
                    "呪力が暴走している…！";

            }

            navigator.vibrate?.(
                [120,60,120,60,180]
            );

        }


        // CHARACTER
        else if (
            highest === "CHARACTER"
        ) {

            glow.classList.add(
                "final-character"
            );

            animation?.classList.add(
                "legend-impact"
            );

            if (text) {

                text.textContent =
                    "特異な呪力を感知…";

            }

            navigator.vibrate?.(
                [150,70,200]
            );

        }

    },5000);


    // ===============================
    // 5.4秒
    // LR / CHARACTERだけ追加衝撃
    // ===============================

    setTimeout(()=>{

        if (
            highest !== "LR" &&
            highest !== "CHARACTER"
        ) {

            return;

        }

        const flash =
            document.getElementById(
                "gachaFlash"
            );

        if (flash) {

            flash.classList.remove(
                "gacha-flash-active"
            );

            void flash.offsetWidth;

            flash.classList.add(
                "gacha-flash-active"
            );

        }

    },5400);


    // ===============================
    // 6秒
    // 結果画面
    // ===============================

    setTimeout(
        finish,
        6000
    );

}