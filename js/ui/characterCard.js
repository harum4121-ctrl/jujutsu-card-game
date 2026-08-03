function createCharacterCard(character, currentHp, currentCp) {

    return `
    <div class="battle-card">

        <div class="card-top">

            <div class="hp-area">

                ❤️

                <div class="bar">

                    <div class="hp-fill"
                    style="width:${currentHp / character.maxHp * 100}%">
                    </div>

                </div>

                <span>${currentHp}/${character.maxHp}</span>

            </div>

            <div class="cp-area">

                🌀

                <div class="bar">

                    <div class="cp-fill"
                    style="width:${currentCp / character.maxCursedPower * 100}%">
                    </div>

                </div>

                <span>${currentCp}/${character.maxCursedPower}</span>

            </div>

        </div>

        <img
            class="card-image"
            src="${character.cardImage}"
        >

        <div class="card-name">

            ${character.name}

        </div>

        <div class="card-type">

            ${character.type}タイプ

        </div>

    </div>
    `;

}