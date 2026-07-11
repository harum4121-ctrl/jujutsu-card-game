// データ確認
console.log(characters);
console.log(cards);

// ゲーム全体の状態
const gameState = {
    selectedCharacters: [],
    deck: [],
    hand: [],
    graveyard: [],
    player: null,
    enemy: null
};

// ゲーム開始
window.onload = () => {
    showTitle();
};