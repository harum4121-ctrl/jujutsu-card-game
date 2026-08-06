
// データ確認
console.log(characters);

console.log(cards);


// ゲーム全体の状態
const gameState = {

    selectedCharacters: [],
    battleCharacters: [],
    selectedActors: [],
    selectedSupportTargets: [],
    currentField: null,
    selectedSupportTargets: [],

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

    loadCollection();

    showTitle();

};

// ===============================
// 所持データ
// ===============================

const COLLECTION_SAVE_KEY =
    "jujutsuCardGameCollection";


// 初期所持データを作成
function createDefaultCollection() {

    return {

        characters: {},

        cards: {},

        currency: 3000

    };

}


// 所持データを読み込む
function loadCollection() {

    const savedData =
        localStorage.getItem(
            COLLECTION_SAVE_KEY
        );

    if (!savedData) {

        gameState.collection =
            createDefaultCollection();

        saveCollection();

        return;

    }

    try {

        const parsed =
            JSON.parse(savedData);

        gameState.collection = {

            characters:
                parsed.characters ?? {},

            cards:
                parsed.cards ?? {},

            currency:
                parsed.currency ?? 0

        };

    } catch (error) {

        console.error(
            "所持データの読み込みに失敗しました",
            error
        );

        gameState.collection =
            createDefaultCollection();

        saveCollection();

    }
    
    gameState.collection.currency = 9999999;
saveCollection();

}


// 所持データを保存
function saveCollection() {

    localStorage.setItem(
        COLLECTION_SAVE_KEY,
        JSON.stringify(
            gameState.collection
        )
    );

}


// キャラクターの所持数
function getOwnedCharacterCount(
    characterId
) {

    return (
        gameState.collection
            ?.characters
            ?.[characterId] ?? 0
    );

}


// カードの所持数
function getOwnedCardCount(cardId) {

    return (
        gameState.collection
            ?.cards
            ?.[cardId] ?? 0
    );

}


// キャラクターを獲得
function addOwnedCharacter(
    characterId,
    amount = 1
) {

    if (
        !gameState.collection.characters
    ) {

        gameState.collection.characters = {};

    }

    const oldAmount =
        getOwnedCharacterCount(
            characterId
        );

    gameState.collection.characters[
        characterId
    ] = oldAmount + amount;

    saveCollection();

}


// カードを獲得
function addOwnedCard(
    cardId,
    amount = 1
) {

    if (!gameState.collection.cards) {

        gameState.collection.cards = {};

    }

    const oldAmount =
        getOwnedCardCount(cardId);

    gameState.collection.cards[
        cardId
    ] = oldAmount + amount;

    saveCollection();

}


// 所持しているか
function ownsCharacter(characterId) {

    return (
        getOwnedCharacterCount(
            characterId
        ) > 0
    );

}


function ownsCard(cardId) {

    return (
        getOwnedCardCount(cardId) > 0
    );

}