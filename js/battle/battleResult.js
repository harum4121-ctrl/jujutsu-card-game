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
    
    // 自分の山札切れ（敗北）

    if (

        gameState.drawPile.length === 0

    ) {

        showBattleResult("lose");

        return true;

    }

    return false;

}

function drawCard() {

    if (gameState.drawPile.length === 0) {
        return false;
    }

    const card = gameState.drawPile.shift();

    gameState.hand.push(card);

    return true;

}