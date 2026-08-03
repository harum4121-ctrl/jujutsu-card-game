console.log("characterSelect.js 読み込み成功");

// ===============================
// キャラクター選択画面
// ===============================

function showCharacterSelect() {

    // 選択状態をリセット
    gameState.selectedCharacters = [];

    const app =
        document.getElementById("app");

    app.innerHTML = `
        <div class="character-select-screen">

            <header class="character-select-header">

                <div>
                    <h1>キャラクター選択</h1>

                    <p>
                        バトルに参加するキャラクターを
                        3体選択してください
                    </p>
                </div>

                <div class="select-count-panel">

                    <span>選択中</span>

                    <strong id="selectedCount">
                        0 / 3
                    </strong>

                </div>

            </header>


            <main class="character-select-main">

                <!-- 左：キャラクター一覧 -->
                <section class="character-list-section">

                    <h2>キャラクター一覧</h2>

                    <div
                        id="characterList"
                        class="character-select-list"
                    ></div>

                </section>


                <!-- 右：選択中 -->
                <section class="selected-team-section">

                    <h2>選択中のチーム</h2>

                    <div
                        id="selectedCharacters"
                        class="selected-team-list"
                    ></div>

                    <button
                        id="startDeck"
                        class="start-deck-button"
                        disabled
                    >
                        デッキ編集へ
                    </button>

                    <button
                        class="character-select-back"
                        onclick="showTitle()"
                    >
                        タイトルへ戻る
                    </button>

                </section>

            </main>

        </div>
    `;

    displayCharacters();
    updateSelectedCharacters();

    document
        .getElementById("startDeck")
        .addEventListener("click", () => {

            if (
                gameState.selectedCharacters.length !== 3
            ) {

                alert(
                    "キャラクターを3体選択してください"
                );

                return;
            }

            gameState.deck = [];

            showDeckBuilder();

        });

}


// ===============================
// キャラクター一覧表示
// ===============================

function displayCharacters() {

    const list =
        document.getElementById("characterList");

    if (!list) return;

    list.innerHTML = "";

    for (const id in characters) {

        const char = characters[id];

        const selected =
            gameState.selectedCharacters.includes(id);

        const card =
            document.createElement("button");

        card.type = "button";

        card.className =
            "character-select-card" +
            (selected ? " selected" : "");

        card.onclick = () => {

            selectCharacter(id);

        };

        card.innerHTML =
    createCharacterCard(
        char,
        {
            currentHp: char.hp,
            currentCp: char.cursedPower,
            selected: selected,
            statuses: []
        }
    );

        list.appendChild(card);

    }

}


// ===============================
// キャラクター選択・解除
// ===============================

function selectCharacter(id) {

    const selected =
        gameState.selectedCharacters.includes(id);

    // 選択済みなら解除
    if (selected) {

        gameState.selectedCharacters =
            gameState.selectedCharacters.filter(
                characterId =>
                    characterId !== id
            );

        displayCharacters();
        updateSelectedCharacters();

        return;
    }

    // 3人選択済み
    if (
        gameState.selectedCharacters.length >= 3
    ) {

        alert("キャラクターは3体までです");

        return;
    }

    gameState.selectedCharacters.push(id);

    displayCharacters();
    updateSelectedCharacters();

}


// ===============================
// 選択中チーム表示
// ===============================

function updateSelectedCharacters() {

    const area =
        document.getElementById(
            "selectedCharacters"
        );

    const count =
        document.getElementById(
            "selectedCount"
        );

    const startButton =
        document.getElementById(
            "startDeck"
        );

    if (!area) return;

    area.innerHTML = "";

    // 選択数表示
    if (count) {

        count.textContent =
            gameState.selectedCharacters.length +
            " / 3";

    }

    // 空き枠も含めて3枠表示
    for (let index = 0; index < 3; index++) {

        const id =
            gameState.selectedCharacters[index];

        // キャラクターが選択されている枠
        if (id) {

            const char =
                characters[id];

            const imageHtml =
                char.cardImage
                    ? `
                        <img
                            src="${char.cardImage}"
                            alt="${char.name}"
                            class="selected-team-image"
                        >
                    `
                    : `
                        <div class="selected-image-placeholder">
                            ${char.name}
                        </div>
                    `;

            area.innerHTML += `

                <div class="selected-team-card">

                    <div class="selected-slot-number">
                        ${index + 1}
                    </div>

                    ${imageHtml}

                    <div class="selected-team-info">

                        <strong>
                            ${char.name}
                        </strong>

                        <span>
                            ${char.type}タイプ
                        </span>

                    </div>

                    <button
                        class="remove-character-button"
                        onclick="removeSelectedCharacter('${id}')"
                    >
                        解除
                    </button>

                </div>

            `;

        }

        // 空き枠
        else {

            area.innerHTML += `

                <div class="selected-team-card empty">

                    <div class="selected-slot-number">
                        ${index + 1}
                    </div>

                    <div class="empty-team-slot">
                        未選択
                    </div>

                </div>

            `;

        }

    }

    // 3人選択でボタン有効
    if (startButton) {

        startButton.disabled =
            gameState.selectedCharacters.length !== 3;

    }

}


// ===============================
// 選択解除
// ===============================

function removeSelectedCharacter(id) {

    gameState.selectedCharacters =
        gameState.selectedCharacters.filter(
            characterId =>
                characterId !== id
        );

    displayCharacters();
    updateSelectedCharacters();

}