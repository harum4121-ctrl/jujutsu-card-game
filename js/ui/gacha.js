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

function showGachaAnimation(results) {

    const app =
        document.getElementById("app");

    const highest =
        getHighestRarity(results);

    app.innerHTML = `

<div class="gacha-animation">

    <div
        id="gachaAura"
        class="gacha-aura ${highest.toLowerCase()}"
    ></div>

    <div id="gachaOrb">

        ☯

    </div>

    <div id="gachaText">

        呪力を解放中...

    </div>

</div>

`;

    setTimeout(() => {

        document
            .getElementById("gachaOrb")
            .classList.add("open");

    },1000);

    setTimeout(() => {

showGachaAnimation(results);

    },2500);

}
function getHighestRarity(results){

    const order = [

        "N",
        "R",
        "SR",
        "SSR",
        "UR",
        "LR",
        "CHARACTER"

    ];

    let highest = "N";

    results.forEach(result=>{

        if(
            order.indexOf(result.rarity)
            >
            order.indexOf(highest)
        ){

            highest = result.rarity;

        }

    });

    return highest;

}

function playGachaAnimation(result) {

    const animation =
        document.getElementById("gachaAnimation");

    const flash =
        document.getElementById("gachaFlash");

    const card =
        document.getElementById("gachaCard");

    const back =
        document.getElementById("gachaCardBack");

    const image =
        document.getElementById("gachaCardImage");

    const rarity =
        document.getElementById("gachaRarity");

    if (
        !animation ||
        !flash ||
        !card ||
        !back ||
        !image ||
        !rarity
    ) {

        console.error(
            "ガチャ演出用の要素が見つかりません"
        );

        return;

    }

    animation.classList.remove(
        "hidden",
        "shake",
        "lr-background"
    );

    back.style.display = "flex";
    image.style.display = "none";

    rarity.textContent = "";

    card.classList.remove("gacha-flip");

    void card.offsetWidth;

    card.classList.add("gacha-flip");

    flash.animate(
        [
            { opacity: 0 },
            { opacity: 1 },
            { opacity: 0 }
        ],
        {
            duration: 600
        }
    );

    setTimeout(() => {

        back.style.display = "none";

        image.style.display = "block";

        image.src =
            result.image ?? "";

        rarity.textContent =
            result.rarity ?? "N";

        switch (result.rarity) {

            case "LR":

                rarity.style.color =
                    "#ffef5e";

                animation.classList.add(
                    "shake",
                    "lr-background"
                );

                break;

            case "UR":

                rarity.style.color =
                    "#ff4242";

                break;

            case "SSR":

                rarity.style.color =
                    "#ffd700";

                break;

            case "SR":

                rarity.style.color =
                    "#b75cff";

                break;

            case "R":

                rarity.style.color =
                    "#58b8ff";

                break;

            default:

                rarity.style.color =
                    "white";

        }

    }, 700);

}