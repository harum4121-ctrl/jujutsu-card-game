function createCharacterCard(character, options = {}) {

const mode =
    options.mode ?? "battle";

    const currentHp =
        options.currentHp ?? character.hp;

    const currentCp =
        options.currentCp ?? character.cursedPower;

    const statuses =
        options.statuses ?? [];

    const selected =
        options.selected ?? false;

    const acted =
        options.acted ?? false;

    const defeated =
        currentHp <= 0;

    const hpRate = Math.max(
        0,
        Math.min(
            100,
            currentHp /
            character.maxHp *
            100
        )
    );

    const cpRate = Math.max(
        0,
        Math.min(
            100,
            currentCp /
            character.maxCursedPower *
            100
        )
    );

    const statusHtml =
        statuses
            .slice(0, 3)
            .map(status => `
                <div
                    class="character-card-status"
                    title="${status.name}"
                >
                    <span>${status.icon}</span>

                    ${
                        status.turn != null
                            ? `
                                <small>
                                    ${status.turn}
                                </small>
                            `
                            : ""
                    }
                </div>
            `)
            .join("");

    return `
        <div
            class="
                character-card
                ${selected ? "selected" : ""}
                ${acted ? "acted" : ""}
                ${defeated ? "defeated" : ""}
            "
        >

            <div class="character-card-frame">

                <img
                    src="${character.cardImage}"
                    alt="${character.name}"
                    class="character-card-art"
                >


                <div class="character-card-top">

                    <div class="character-card-gauge hp">

                        <div
                            class="character-card-gauge-fill"
                            style="width:${hpRate}%"
                        ></div>

                        <span>
                            HP ${currentHp}/${character.maxHp}
                        </span>

                    </div>


                    <div class="character-card-gauge cp">

                        <div
                            class="character-card-gauge-fill"
                            style="width:${cpRate}%"
                        ></div>

                        <span>
                            呪力 ${currentCp}/${character.maxCursedPower}
                        </span>

                    </div>

                </div>


                <div class="character-card-status-list">
                    ${statusHtml}
                </div>


                <div class="character-card-bottom">

                    <strong>
                        ${character.name}
                    </strong>

                    <span>
                        ${character.type}タイプ
                    </span>

                </div>


                ${
                    selected
                        ? `
                            <div class="character-card-selected">
                                ✓
                            </div>
                        `
                        : ""
                }


                ${
                    acted
                        ? `
                            <div class="character-card-acted">
                                行動済み
                            </div>
                        `
                        : ""
                }

            </div>

        </div>
    `;
}