function showDeckBuilder() {

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

    displayAllCards();
    updateDeck();
    displayDeckSlots();

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

    const allCards = [
        ...(cards.equipment ?? []),
        ...(cards.cursedObjects ?? []),
        ...(cards.support ?? []),
        ...(cards.domains ?? []),
        ...(cards.ultimate ?? [])
    ];

    const filteredCards =
        allCards.filter(card => {

            const matchesName =
                card.name
                    .toLowerCase()
                    .includes(searchText);

            const matchesType =
                selectedType === "all" ||
                card.type === selectedType;

            return matchesName && matchesType;

        });

    filteredCards.forEach(card => {

        const count =
            gameState.deck.filter(
                deckCard =>
                    deckCard.id === card.id
            ).length;

        const div =
            document.createElement("div");

        div.className = "deck-card-item";

        div.innerHTML = `

            <div class="deck-card-item-top">

                <span class="deck-card-type">
                    ${card.type}
                </span>

                <span class="deck-card-count">
                    ${count} / 3
                </span>

            </div>

            <h3>${card.name}</h3>

            <p class="deck-card-description">
                ${getCardDescription(card)}
            </p>

            <button
                class="add-deck-card-button"
                ${count >= 3 ? "disabled" : ""}
            >
                追加
            </button>

        `;

        div
            .querySelector("button")
            .onclick = () => {

                addCard(card);

            };

        list.appendChild(div);

    });

}
function addCard(card) {

    if (gameState.deck.length >= 40) {

        alert("デッキは40枚までです。");

        return;

    }

    const count = gameState.deck.filter(
        c => c.id === card.id
    ).length;

    if (count >= 3) {

        alert("同名カードは3枚までです。");

        return;

    }

    gameState.deck.push(card);

    updateDeck();

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

    const availableCards = [
        ...(cards.equipment ?? []),
        ...(cards.cursedObjects ?? []),
        ...(cards.support ?? []),
        ...(cards.domains ?? []),
        ...(cards.ultimate ?? [])
    ];

    if (availableCards.length === 0) {

        alert("使用できるカードがありません");
        return;

    }

    const maximumDeckSize =
        availableCards.length * maxSameCard;

    if (maximumDeckSize < deckSize) {

        alert(
            "カードの種類が足りないため、40枚のデッキを作れません"
        );

        return;

    }

    const newDeck = [];
    const cardCounts = {};

    while (newDeck.length < deckSize) {

        const randomIndex =
            Math.floor(
                Math.random() *
                availableCards.length
            );

        const randomCard =
            availableCards[randomIndex];

        const currentCount =
            cardCounts[randomCard.id] ?? 0;

        if (currentCount >= maxSameCard) {
            continue;
        }

        newDeck.push(randomCard);

        cardCounts[randomCard.id] =
            currentCount + 1;

    }

    gameState.deck = newDeck;

    updateDeck();

    alert("おまかせデッキを作成しました！");
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
            !Array.isArray(saveData.cards)
        ) {

            alert(
                "保存データが正しくありません"
            );

            return;

        }

        gameState.deck =
            saveData.cards.map(
                card => ({ ...card })
            );

        updateDeck();

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
function getCardDescription(card) {

    if (card.description) {
        return card.description;
    }

    if (card.effect?.type) {
        return card.effect.type;
    }

    if (Array.isArray(card.effect)) {
        return card.effect
            .map(effect => effect.type)
            .join(" / ");
    }

    return "効果説明なし";

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