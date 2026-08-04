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
            
            <button id="saveDeck">
    デッキ保存
</button>

<button id="loadDeck">
    デッキ読込
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
    
    document
    .getElementById("saveDeck")
    .onclick = saveDeck;

document
    .getElementById("loadDeck")
    .onclick = loadDeck;
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
function saveDeck() {

    localStorage.setItem(
        "savedDeck",
        JSON.stringify(gameState.deck)
    );

    alert("デッキを保存しました！");

}

function loadDeck() {

    const savedDeck =
        localStorage.getItem("savedDeck");

    if (!savedDeck) {

        alert("保存されたデッキがありません");

        return;

    }

    gameState.deck =
        JSON.parse(savedDeck);

    updateDeck();

    alert("デッキを読み込みました！");

}

function displayDeckSlots() {

    const area =
        document.getElementById("deckSaveArea");

    if (!area) return;

    area.innerHTML = "";

    for (let i = 1; i <= 10; i++) {

        const saved =
            localStorage.getItem(
                "deck" + i
            );

        area.innerHTML += `
            <div class="deck-slot">

                <span>
                    デッキ${i}
                </span>

                <button
                    onclick="saveDeck(${i})"
                >
                    保存
                </button>

                <button
                    onclick="loadDeck(${i})"
                >
                    読込
                </button>

                <button
                    onclick="deleteDeck(${i})"
                >
                    削除
                </button>

                ${
                    saved
                        ? "✅"
                        : "－"
                }

            </div>
        `;

    }

}
function saveDeck(slot){

    if(gameState.deck.length !== 40){

        alert("40枚のデッキのみ保存できます");

        return;

    }

    const deckName = prompt(

        "デッキ名を入力してください",

        "デッキ" + slot

    );

    if(deckName === null){

        return;

    }

    const saveData = {

        name: deckName,

        cards: [...gameState.deck]

    };

    localStorage.setItem(

        "deck" + slot,

        JSON.stringify(saveData)

    );

    displayDeckSlots();

};

    alert(
        "デッキ" +
        slot +
        "に保存しました！"
    );

    displayDeckSlots();

}
function loadDeck(slot){

    const data = localStorage.getItem(

        "deck" + slot

    );

    if(!data){

        alert("保存されていません");

        return;

    }

    const saveData = JSON.parse(data);

    gameState.deck = [...saveData.cards];

    updateDeck();

}
function deleteDeck(slot){

    if(!confirm("削除しますか？")){

        return;

    }

    localStorage.removeItem(

        "deck" + slot

    );

    displayDeckSlots();

}