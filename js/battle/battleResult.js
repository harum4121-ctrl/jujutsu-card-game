function checkBattleEnd() {

    const enemyAlive =
        gameState.enemyCharacters.some(
            enemy =>
                enemy.currentHp > 0
        );

    if (!enemyAlive) {

        showBattleResult("win");

        return true;

    }
    
    // 敵の山札切れ（勝利）

    if (

        gameState.enemyDrawPile &&

        gameState.enemyDrawPile.length === 0

    ) {

        showBattleResult("win");

        return true;

    }

    const playerAlive =
        gameState.battleCharacters.some(
            character =>
                character.currentHp > 0
        );

    if (!playerAlive) {

        showBattleResult("lose");

        return true;

    }

    return false;

}

function showBattleResult(result) {

    const app = document.getElementById("app");

    if (result === "win") {

        app.innerHTML = `
            <div class="battle">
                <h1>勝利！</h1>

                <button onclick="showTitle()">
                    タイトルへ戻る
                </button>
            </div>
        `;

    } else {

        app.innerHTML = `
            <div class="battle">
                <h1>敗北...</h1>

                <button onclick="showTitle()">
                    タイトルへ戻る
                </button>
            </div>
        `;

    }

}