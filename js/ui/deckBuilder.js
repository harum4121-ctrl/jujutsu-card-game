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