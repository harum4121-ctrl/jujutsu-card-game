function openTargetWindow() {

    const targetWindow =
        document.getElementById("targetWindow");

    if (!targetWindow) {

        console.error(
            "targetWindowが見つかりません"
        );

        return;

    }

    targetWindow.innerHTML = `
        <h2>対象を選択</h2>
    `;

    gameState.enemyCharacters.forEach((enemy, index) => {

        if (enemy.currentHp <= 0) return;

        targetWindow.innerHTML += `
            <button
                onclick="selectTarget(${index})"
            >
                ${enemy.name}
                HP ${enemy.currentHp}/${enemy.maxHp}
            </button>
        `;

    });

    targetWindow.innerHTML += `
        <button
            onclick="closeTargetWindow()"
        >
            戻る
        </button>
    `;

    targetWindow.classList.remove("hidden");

}