alert("テスト");
// データ確認
alert("①");
console.log(characters);
alert("②");
console.log(cards);
alert("③");
// ゲーム全体の状態
const gameState = {
alert("④");
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
    alert("⑤");
    alert("main.jsは動いています");
    showTitle();
};