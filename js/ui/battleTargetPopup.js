function openTargetWindow() {

    const window =
        document.getElementById("targetWindow");

    window.innerHTML = `
        <h2>対象を選択</h2>
    `;

    gameState.enemyCharacters.forEach((enemy, index) => {

        if (enemy.currentHp <= 0) return;

        window.innerHTML += `
            <button
                onclick="selectTarget(${index})"
            >
                ${enemy.name}
                HP
                ${enemy.currentHp}
                /
                ${enemy.maxHp}
            </button>
        `;

    });

    window.innerHTML += `
        <button
            onclick="closeTargetWindow()"
        >
            戻る
        </button>
    `;

    window.classList.remove("hidden");

}

function closeTargetWindow() {

    document
        .getElementById("targetWindow")
        .classList.add("hidden");

}

function selectTarget(index) {

    closeTargetWindow();

    attackEnemy(index);

}