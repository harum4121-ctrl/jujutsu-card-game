console.log("characterSelect.js 読み込み成功");
function showCharacterSelect() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="character-select">

            <h1>キャラクター選択</h1>

            <p>使用するキャラクターを3体選択してください</p>

            <div id="characterList"></div>

            <h2>選択中</h2>

            <div id="selectedCharacters"></div>

            <button id="startDeck">
                デッキ編集へ
            </button>

        </div>
    `;

    displayCharacters();

    document
        .getElementById("startDeck")
        .addEventListener("click", () => {

            if (gameState.selectedCharacters.length !== 3) {
                alert("キャラクターを3体選択してください");
                return;
            }

            gameState.deck = [];
            showDeckBuilder();

        });

}
function displayCharacters() {
    const list = document.getElementById("characterList");

    list.innerHTML = "";

    for (const id in characters) {

        const char = characters[id];

        const card = document.createElement("div");

        card.className = "character";

        card.innerHTML = `
            <h3>${char.name}</h3>
            <p>タイプ：${char.type}</p>
            <p>HP：${char.hp}</p>
            <p>呪力：${char.cursedPower}</p>

            <button>選択</button>
        `;

        card.querySelector("button").onclick = () => {
            selectCharacter(id);
        };

        list.appendChild(card);

    }

}
function selectCharacter(id) {

    if (gameState.selectedCharacters.length >= 3) {
        alert("キャラクターは3体までです");
        return;
    }

    if (gameState.selectedCharacters.includes(id)) {
        alert("このキャラクターは選択済みです");
        return;
    }

    gameState.selectedCharacters.push(id);

    updateSelectedCharacters();

}
function updateSelectedCharacters() {

    const area = document.getElementById("selectedCharacters");

    area.innerHTML = "";

    gameState.selectedCharacters.forEach(id => {

        const char = characters[id];

        const div = document.createElement("div");

        div.className = "character";

        div.innerHTML = `
            <h3>${char.name}</h3>
            <button>解除</button>
        `;

        div.querySelector("button").onclick = () => {

            gameState.selectedCharacters =
                gameState.selectedCharacters.filter(x => x !== id);

            updateSelectedCharacters();

        };

        area.appendChild(div);

    });

}