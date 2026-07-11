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

            <div id="deckList"></div>

            <button id="startGame">
                対戦開始
            </button>

            <button id="backCharacter">
                キャラクター選択へ戻る
            </button>

        </div>
    `;

    displayAllCards();

    updateDeck();
document
    .getElementById("startGame")
    .addEventListener("click", () => {

        if (gameState.deck.length !== 40) {
            alert("デッキを40枚作成してください");
            return;
        }

    console.log("対戦開始ボタン押された");
startBattle();

    });
    document
    .getElementById("backCharacter")
    .addEventListener("click", () => {

        gameState.deck = [];

        showCharacterSelect();

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
            ${card.name}

            <button>削除</button>
        `;

        div.querySelector("button").onclick = () => {

            gameState.deck.splice(index, 1);

            updateDeck();

        };

        deckList.appendChild(div);

    });

}