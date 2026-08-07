function showDeckBuilder() {
    
    if (!Array.isArray(gameState.deck)) {

        gameState.deck = [];

    }

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="deck-builder-screen">

            <header class="deck-builder-header">

                <div>
                    <h1>デッキ編集</h1>

                    <p>
                        デッキ枚数：
                        <strong id="deckCount">0</strong>
                        / 40
                    </p>
                </div>

                <div class="deck-builder-actions">

                    <button
                        id="randomDeckButton"
                        class="deck-action-button auto"
                    >
                        おまかせ編成
                    </button>

                    <button
                        id="backCharacter"
                        class="deck-action-button back"
                    >
                        キャラクター選択へ戻る
                    </button>

                    <button
                        id="startGame"
                        class="deck-action-button start"
                    >
                        対戦開始
                    </button>

                </div>

            </header>


            <div class="deck-builder-main">

                <!-- 左側 -->
                <section class="deck-card-section">

                    <div class="deck-section-header">

                        <h2>カード一覧</h2>

                        <div class="deck-filter-area">

                            <input
                                id="cardSearch"
                                type="search"
                                placeholder="カード名で検索"
                            >

                            <select id="cardTypeFilter">

                                <option value="all">
                                    すべて
                                </option>

                                <option value="呪具">
                                    呪具
                                </option>

                                <option value="呪物">
                                    呪物
                                </option>

                                <option value="サポート">
                                    サポート
                                </option>

                                <option value="領域">
                                    領域
                                </option>

                                <option value="必殺">
                                    必殺
                                </option>

                            </select>

                        </div>

                    </div>

                    <div
                        id="cardList"
                        class="deck-card-list"
                    ></div>

                </section>


                <!-- 右側 -->
                <section class="current-deck-section">

                    <div class="deck-section-header">

                        <h2>現在のデッキ</h2>

                        <div id="deckStats"></div>

                    </div>

                    <div
                        id="deckList"
                        class="current-deck-list"
                    ></div>

                </section>

            </div>


            <section class="saved-deck-section">

                <h2>保存デッキ</h2>

                <div
                    id="deckSaveArea"
                    class="deck-save-grid"
                ></div>

            </section>

        </div>
    `;

    try {

    displayAllCards();
    updateDeck();
    displayDeckSlots();

} catch (error) {

    console.error(
        "デッキ編集画面の表示エラー:",
        error
    );

    alert(
        "デッキ編集画面の表示中にエラーが発生しました。\n" +
        error.message
    );

}

    document
        .getElementById("startGame")
        .addEventListener("click", () => {

            if (gameState.deck.length !== 40) {

                alert("デッキを40枚作成してください");
                return;

            }

            showEnemySelectScreen();

        });

    document
        .getElementById("backCharacter")
        .addEventListener("click", () => {

            gameState.deck = [];

            showCharacterSelect();

        });

    document
        .getElementById("randomDeckButton")
        .addEventListener("click", () => {

            const confirmed = confirm(
                "現在のデッキを消して、おまかせで40枚編成しますか？"
            );

            if (!confirmed) return;

            buildRandomDeck();

        });

    document
        .getElementById("cardSearch")
        .addEventListener("input", () => {

            displayAllCards();

        });

    document
        .getElementById("cardTypeFilter")
        .addEventListener("change", () => {

            displayAllCards();

        });

}
function displayAllCards() {

    const list =
        document.getElementById("cardList");

    if (!list) return;

    list.innerHTML = "";

    const searchInput =
        document.getElementById("cardSearch");

    const filterInput =
        document.getElementById("cardTypeFilter");

    const searchText =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";

    const selectedType =
        filterInput
            ? filterInput.value
            : "all";


    // ===============================
    // 全カード取得
    // ===============================

    const allCards = [
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
        typeof card === "object" &&
        card.id != null
    );


    // ===============================
    // 検索・種類フィルター
    // ===============================

    const filteredCards =
        allCards.filter(card => {

            const cardName =
                String(card.name ?? "");

            const cardType =
                String(card.type ?? "");

            const matchesName =
                cardName
                    .toLowerCase()
                    .includes(searchText);

            const matchesType =
                selectedType === "all" ||
                cardType === selectedType;

            return (
                matchesName &&
                matchesType
            );

        });


    // ===============================
    // カード表示
    // ===============================

    filteredCards.forEach(card => {

        // デッキに入っている枚数
        const deckCount =
            gameState.deck.filter(
                deckCard =>
                    deckCard &&
                    deckCard.id === card.id
            ).length;


        // 所持枚数
        const ownedCount =
            getOwnedCardCount(
                card.id
            );


        // 実際にデッキへ入れられる上限
        // 所持数と3枚制限の小さい方
        const usableLimit =
            Math.min(
                ownedCount,
                3
            );


        const div =
            document.createElement("div");

        div.className =
            "deck-card-item";


        // 未所持ならクラス追加
        if (ownedCount <= 0) {

            div.classList.add(
                "not-owned-card"
            );

        }


        div.innerHTML = `

            <div class="deck-card-item-top">

                <span class="deck-card-type">
                    ${card.type ?? "不明"}
                </span>

                <span class="deck-card-count">
                    ${deckCount} / ${usableLimit}
                </span>

            </div>


            <h3>
                ${card.name ?? "名前なし"}
            </h3>


            <div class="deck-owned-count">

                所持 ×${ownedCount}

            </div>


            <button
                class="add-deck-card-button"

                ${
                    ownedCount <= 0 ||
                    deckCount >= usableLimit ||
                    gameState.deck.length >= 40

                        ? "disabled"
                        : ""
                }
            >

                ${
                    ownedCount <= 0
                        ? "未所持"
                        : deckCount >= usableLimit
                            ? "上限"
                            : "追加"
                }

            </button>

        `;


        const addButton =
            div.querySelector(
                ".add-deck-card-button"
            );


        addButton.onclick = () => {

            addCard(card);

        };


        list.appendChild(div);

    });

}

function addCard(card) {

    // ===============================
    // 40枚制限
    // ===============================

    if (gameState.deck.length >= 40) {

        alert(
            "デッキは40枚までです。"
        );

        return;

    }


    // ===============================
    // 現在デッキに入っている枚数
    // ===============================

    const deckCount =
        gameState.deck.filter(
            c =>
                c &&
                c.id === card.id
        ).length;


    // ===============================
    // 所持枚数
    // ===============================

    const ownedCount =
        getOwnedCardCount(
            card.id
        );


    // ===============================
    // 未所持
    // ===============================

    if (ownedCount <= 0) {

        alert(
            "このカードを所持していません。"
        );

        return;

    }


    // ===============================
    // 所持枚数制限
    // ===============================

    if (deckCount >= ownedCount) {

        alert(
            "所持している枚数以上はデッキに入れられません。"
        );

        return;

    }


    // ===============================
    // 同名3枚制限
    // ===============================

    if (deckCount >= 3) {

        alert(
            "同名カードは3枚までです。"
        );

        return;

    }


    // ===============================
    // デッキへ追加
    // ===============================

    gameState.deck.push(card);


    // ===============================
    // 表示更新
    // ===============================

    updateDeck();

    displayAllCards();

}

function updateDeck() {

    const deckList =
        document.getElementById("deckList");

    const deckCount =
        document.getElementById("deckCount");

    if (!deckList || !deckCount) return;

    deckList.innerHTML = "";

    deckCount.textContent =
        gameState.deck.length;

    const groupedDeck = {};

    gameState.deck.forEach(card => {

        if (!groupedDeck[card.id]) {

            groupedDeck[card.id] = {
                card: card,
                count: 0
            };

        }

        groupedDeck[card.id].count++;

    });

    Object.values(groupedDeck)
        .forEach(group => {

            const div =
                document.createElement("div");

            div.className =
                "current-deck-card";

            div.innerHTML = `

                <div>

                    <span class="deck-card-type">
                        ${group.card.type}
                    </span>

                    <strong>
                        ${group.card.name}
                    </strong>

                </div>

                <div class="current-deck-card-actions">

                    <span>
                        × ${group.count}
                    </span>

                    <button>
                        1枚削除
                    </button>

                </div>

            `;

            div
                .querySelector("button")
                .onclick = () => {

                    const index =
                        gameState.deck.findIndex(
                            card =>
                                card.id === group.card.id
                        );

                    if (index !== -1) {

                        gameState.deck.splice(index, 1);

                        updateDeck();
                        displayAllCards();

                    }

                };

            deckList.appendChild(div);

        });

    updateDeckStats();

}

function buildRandomDeck() {

    const deckSize = 40;

    const maxSameCard = 3;


    // ===============================
    // 全カード
    // ===============================

    const allCards = [
        ...(cards.equipment ?? []),
        ...(cards.cursedObjects ?? []),
        ...(cards.support ?? []),
        ...(cards.domains ?? []),
        ...(cards.ultimate ?? [])
    ];


    // ===============================
    // 所持カードだけ取得
    // ===============================

    const availableCards =
        allCards.filter(card => {

            if (!card || !card.id) {

                return false;

            }

            return (
                getOwnedCardCount(
                    card.id
                ) > 0
            );

        });


    if (availableCards.length === 0) {

        alert(
            "使用できるカードを1枚も所持していません"
        );

        return;

    }


    // ===============================
    // 所持カードだけで最大何枚組めるか
    // ===============================

    let maximumDeckSize = 0;

    availableCards.forEach(card => {

        const ownedCount =
            getOwnedCardCount(
                card.id
            );

        maximumDeckSize +=
            Math.min(
                ownedCount,
                maxSameCard
            );

    });


    if (maximumDeckSize < deckSize) {

        alert(
            "所持カードが足りないため、40枚のデッキを作れません。\n" +
            "現在使用できるカード：" +
            maximumDeckSize +
            "枚"
        );

        return;

    }


    // ===============================
    // デッキ作成
    // ===============================

    const newDeck = [];

    const cardCounts = {};


    while (
        newDeck.length < deckSize
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                availableCards.length
            );


        const randomCard =
            availableCards[
                randomIndex
            ];


        const currentCount =
            cardCounts[
                randomCard.id
            ] ?? 0;


        const ownedCount =
            getOwnedCardCount(
                randomCard.id
            );


        // このカードを入れられる最大枚数
        const cardLimit =
            Math.min(
                ownedCount,
                maxSameCard
            );


        // 上限なら別カードを抽選
        if (
            currentCount >=
            cardLimit
        ) {

            continue;

        }


        newDeck.push(
            randomCard
        );


        cardCounts[
            randomCard.id
        ] =
            currentCount + 1;

    }


    // ===============================
    // 完成
    // ===============================

    gameState.deck =
        newDeck;


    updateDeck();

    displayAllCards();


    alert(
        "所持カードからおまかせデッキを作成しました！"
    );

}

// ===============================
// 保存デッキ一覧
// ===============================

function displayDeckSlots() {

    const area =
        document.getElementById("deckSaveArea");

    if (!area) return;

    area.innerHTML = "";

    for (let slot = 1; slot <= 10; slot++) {

        const data =
            localStorage.getItem(
                "deck" + slot
            );

        if (data) {

            let saveData;

            try {

                saveData =
                    JSON.parse(data);

            } catch (error) {

                console.error(
                    "保存デッキの読込失敗:",
                    error
                );

                localStorage.removeItem(
                    "deck" + slot
                );

                saveData = null;

            }

            if (saveData) {

                const cardCount =
                    Array.isArray(saveData.cards)
                        ? saveData.cards.length
                        : 0;

                area.innerHTML += `
                    <div class="deck-slot">

                        <span>
                            ${slot}. ${saveData.name}
                            （${cardCount}枚）
                        </span>

                        <button
                            onclick="loadDeck(${slot})"
                        >
                            読込
                        </button>

                        <button
                            onclick="saveDeck(${slot})"
                        >
                            上書き
                        </button>

                        <button
                            onclick="deleteDeck(${slot})"
                        >
                            削除
                        </button>

                    </div>
                `;

                continue;

            }

        }

        area.innerHTML += `
            <div class="deck-slot">

                <span>
                    ${slot}. 未保存
                </span>

                <button
                    onclick="saveDeck(${slot})"
                >
                    保存
                </button>

            </div>
        `;

    }

}


// ===============================
// デッキ保存
// ===============================

function saveDeck(slot) {

    if (gameState.deck.length !== 40) {

        alert(
            "40枚のデッキのみ保存できます"
        );

        return;

    }

    const oldData =
        localStorage.getItem(
            "deck" + slot
        );

    if (oldData) {

        const confirmed =
            confirm(
                "この保存枠を上書きしますか？"
            );

        if (!confirmed) return;

    }

    let defaultName =
        "デッキ" + slot;

    if (oldData) {

        try {

            const parsed =
                JSON.parse(oldData);

            if (parsed.name) {

                defaultName =
                    parsed.name;

            }

        } catch (error) {

            console.error(
                "既存デッキ名の取得失敗:",
                error
            );

        }

    }

    const inputName =
        prompt(
            "デッキ名を入力してください",
            defaultName
        );

    if (inputName === null) return;

    const deckName =
        inputName.trim() ||
        defaultName;

    const saveData = {

        name: deckName,

        cards:
            gameState.deck.map(
                card => ({ ...card })
            )

    };

    localStorage.setItem(
        "deck" + slot,
        JSON.stringify(saveData)
    );

    displayDeckSlots();

    alert(
        deckName +
        "を保存しました！"
    );

}


// ===============================
// デッキ読込
// ===============================

function loadDeck(slot) {

    const data =
        localStorage.getItem(
            "deck" + slot
        );


    if (!data) {

        alert(
            "この枠にはデッキが保存されていません"
        );

        return;

    }


    try {

        const saveData =
            JSON.parse(data);


        if (
            !saveData ||
            !Array.isArray(
                saveData.cards
            )
        ) {

            alert(
                "保存データが正しくありません"
            );

            return;

        }


        // ===============================
        // 保存デッキ内の枚数を確認
        // ===============================

        const savedCounts = {};


        saveData.cards.forEach(card => {

            if (!card || !card.id) {

                return;

            }

            savedCounts[card.id] =
                (
                    savedCounts[
                        card.id
                    ] ?? 0
                ) + 1;

        });


        // ===============================
        // 所持枚数チェック
        // ===============================

        for (
            const cardId
            in savedCounts
        ) {

            const requiredCount =
                savedCounts[
                    cardId
                ];


            const ownedCount =
                getOwnedCardCount(
                    cardId
                );


            if (
                requiredCount >
                ownedCount
            ) {

                const card =
                    saveData.cards.find(
                        card =>
                            card.id ===
                            cardId
                    );


                alert(
                    "このデッキは読み込めません。\n\n" +
                    "「" +
                    (
                        card?.name ??
                        cardId
                    ) +
                    "」が不足しています。\n\n" +

                    "必要：" +
                    requiredCount +
                    "枚\n" +

                    "所持：" +
                    ownedCount +
                    "枚"
                );


                return;

            }


            // 念のため3枚制限も確認
            if (
                requiredCount > 3
            ) {

                alert(
                    "保存デッキに同名カードが4枚以上含まれています。"
                );

                return;

            }

        }


        // ===============================
        // 問題なければ読込
        // ===============================

        gameState.deck =
            saveData.cards.map(
                card => ({
                    ...card
                })
            );


        updateDeck();

        displayAllCards();


        alert(
            saveData.name +
            "を読み込みました！"
        );


    } catch (error) {

        console.error(
            "デッキ読込エラー:",
            error
        );


        alert(
            "デッキの読み込みに失敗しました"
        );

    }

}

// ===============================
// 保存デッキ削除
// ===============================

function deleteDeck(slot) {

    const data =
        localStorage.getItem(
            "deck" + slot
        );

    if (!data) {

        alert(
            "この枠にはデッキが保存されていません"
        );

        return;

    }

    const confirmed =
        confirm(
            "保存デッキを削除しますか？"
        );

    if (!confirmed) return;

    localStorage.removeItem(
        "deck" + slot
    );

    displayDeckSlots();

}

function updateDeckStats() {

    const area =
        document.getElementById("deckStats");

    if (!area) return;

    const counts = {
        "呪具": 0,
        "呪物": 0,
        "サポート": 0,
        "領域": 0,
        "必殺": 0
    };

    gameState.deck.forEach(card => {

        if (counts[card.type] != null) {

            counts[card.type]++;

        }

    });

    area.innerHTML = `
        <span>呪具 ${counts["呪具"]}</span>
        <span>呪物 ${counts["呪物"]}</span>
        <span>支援 ${counts["サポート"]}</span>
        <span>領域 ${counts["領域"]}</span>
        <span>必殺 ${counts["必殺"]}</span>
    `;

}