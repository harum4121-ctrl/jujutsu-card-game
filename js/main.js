// データ確認
console.log(characters);
console.log(cards);

// ゲーム全体の状態
const gameState = {

    selectedCharacters: [],
    battleCharacters: [],
    selectedActors: [],

    selectedEnemy: "",

    deck: [],
    drawPile: [],
    hand: [],
    graveyard: [],

    enemyCharacters: [],

    player: null,
    enemy: null

};

// ゲーム開始
window.onload = () => {
    showTitle();
};