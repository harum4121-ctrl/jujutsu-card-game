
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

        // ===============================
        // 初期所持キャラクター
        // ===============================

        characters: {

            yuji: 1,
            megumi: 1,
            nobara: 1

        },


        // ===============================
        // 初期所持カード
        // ===============================

        cards: {

            // 呪具
            slaughter_blade: 2,
            black_rope: 2,
            speaker: 1,


            // 呪物
            sukunas_finger: 1,
            death_painting_1: 2,
            death_painting_2: 2,
            death_painting_3: 2,


            // サポート
            king_of_curses: 1,
            domain_amplification: 2,
            we_are_the_strongest: 2,
            big_brother: 1,
            not_words: 1,
            save_people: 2,
            endure: 2,
            retry: 2,
            no_regret: 2,
            power_battle: 2,
            thank_you: 2,


            // 領域
            curtain: 2,
            sendai_barrier: 2,
            tokyo_barrier: 2,
            tokyo_jujutsu_high: 2,


            // 必殺
            ultimate_card: 1

        },


        // ===============================
        // 初期コイン
        // ===============================

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

// ===============================
// 初期所持カード
// ===============================

const INITIAL_OWNED_CARDS = {

    // 呪具
    slaughter_blade: 2,
    black_rope: 2,
    speaker: 1,

    // 呪物
    sukunas_finger: 1,
    death_painting_1: 2,
    death_painting_2: 2,
    death_painting_3: 2,

    // サポート
    king_of_curses: 1,
    domain_amplification: 2,
    we_are_the_strongest: 2,
    big_brother: 1,
    not_words: 1,
    save_people: 2,
    endure: 2,
    retry: 2,
    no_regret: 2,
    power_battle: 2,
    thank_you: 2,

    // 領域
    curtain: 2,
    sendai_barrier: 2,
    tokyo_barrier: 2,
    tokyo_jujutsu_high: 2,

    // 必殺
    ultimate_card: 1

};

// ===============================
// 初期所持カードを配布
// ===============================

function giveInitialOwnedCards() {

    // すでに初期配布済みなら何もしない
    const alreadyReceived =
        localStorage.getItem(
            "initialCardsReceived"
        );

    if (alreadyReceived === "true") {

        return;

    }


    // 初期カードを追加
    for (
        const [cardId, amount]
        of Object.entries(INITIAL_OWNED_CARDS)
    ) {

        addOwnedCard(
            cardId,
            amount
        );

    }


    // 配布済みにする
    localStorage.setItem(
        "initialCardsReceived",
        "true"
    );


    // 所持データ保存
    saveCollection();


    console.log(
        "初期所持カードを配布しました"
    );

}