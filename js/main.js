alert("main.js");
// データ確認
console.log(characters);
console.log(cards);

// ゲーム全体の状態
const gameState = {

    selectedCharacters: [],
    battleCharacters: [],
    selectedActors: [],
    currentField: null,

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
    alert("main.jsは動いています");
    showTitle();
};