function showTitle() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="title-screen">

            <h1>呪術カードゲーム</h1>

            <p>Version 0.1</p>

            <button id="battleButton">
                バトル開始
            </button>

            <button id="deckButton">
                デッキ編集
            </button>

            <button id="ruleButton">
                ルール
            </button>

        </div>
    `;

document
    .getElementById("battleButton")
    .addEventListener("click", () => {

        console.log("バトル開始ボタン押された");

        showCharacterSelect();

    });

}