function startBattle() {

    const app = document.getElementById("app");

    app.innerHTML = `
        <div class="battle">

            <h1>バトル開始</h1>

            <h2>味方キャラクター</h2>

            <div id="playerCharacters"></div>

            <h2>手札</h2>

            <div id="hand"></div>

            <p>ターン開始</p>

        </div>
    `;


    displayBattleCharacters();

}


function displayBattleCharacters() {

    const area = document.getElementById("playerCharacters");

    area.innerHTML = "";


    gameState.selectedCharacters.forEach(id => {

        const char = characters[id];

        const div = document.createElement("div");

        div.className = "character";

        div.innerHTML = `
            <h3>${char.name}</h3>
            <p>HP：${char.hp}</p>
            <p>呪力：${char.cursedPower}</p>
        `;

        area.appendChild(div);

    });

}