function showDeckBuilder() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="deck-builder">

            <h1>デッキ編集</h1>

            <p>
                デッキ枚数：
                <span id="deckCount">0</span>
                /40
            </p>

            <h2>カード一覧</h2>

            <div id="cardList"></div>

            <h2>デッキ</h2>
            
            <h2>デッキ保存</h2>

<div id="deckSaveArea"></div>

            <div id="deckList"></div>

            <button id="startGame">
                対戦開始
            </button>

            <button id="backCharacter">
                キャラクター選択へ戻る
            </button>
            
                <button
    id="randomDeckButton"
    class="deck-auto-button"
>
    おまかせ編成
</button>

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

    console.log("対戦開始ボタン押された");
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

        const confirmed =
            confirm(
                "現在のデッキを消して、おまかせで40枚編成しますか？"
            );

        if (!confirmed) {
            return;
        }

        buildRandomDeck();

    });
    
}

function displayAllCards() {

    const list = document.getElementById("cardList");

    list.innerHTML = "";

    const groups = [
        cards.equipment,
        cards.cursedObjects,
        cards.support,
        cards.domains,
        cards.ultimate
    ];

groups.forEach(group => {

    if (!Array.isArray(group)) return;

    group.forEach(card => {

            const div = document.createElement("div");

            div.className = "card";

            div.innerHTML = `
                <h3>${card.name}</h3>
                <p>${card.type}</p>

                <button>追加</button>
            `;

            div.querySelector("button").onclick = () => {

                addCard(card);

            };

            list.appendChild(div);

        });

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

    const deckList = document.getElementById("deckList");

    deckList.innerHTML = "";

    document.getElementById("deckCount").textContent =
        gameState.deck.length;

    gameState.deck.forEach((card, index) => {

        const div = document.createElement("div");

        div.className = "card";

        div.innerHTML = `
    <h3>${card.name}</h3>

    <p>${card.type}</p>

    <button>削除</button>
`;

        div.querySelector("button").onclick = () => {

            gameState.deck.splice(index, 1);

            updateDeck();

        };

        deckList.appendChild(div);

    });

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