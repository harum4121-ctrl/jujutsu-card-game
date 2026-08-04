function createCharacterCard(character, options = {}) {

    const mode =
        options.mode ?? "battle";

    const currentHp =
        options.currentHp ??
        character.currentHp ??
        character.hp ??
        character.maxHp ??
        0;

    const currentCp =
        options.currentCp ??
        character.currentCursedPower ??
        character.cursedPower ??
        0;

    const maxHp =
        character.maxHp ??
        character.hp ??
        1;

    const maxCp =
        character.maxCursedPower ??
        100;

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
            currentHp / maxHp * 100
        )
    );

    const cpRate = Math.max(
        0,
        Math.min(
            100,
            currentCp / maxCp * 100
        )
    );

    const statusHtml =
        statuses.length > 0
            ? statuses
                .slice(0, 4)
                .map(status => `
                    <div
                        class="character-card-status"
                        title="${status.name}"
                    >
                        <span class="character-status-icon">
                            ${status.icon}
                        </span>

                        ${
                            status.turn != null &&
                            status.turn > 0
                                ? `
                                    <small>
                                        ${status.turn}
                                    </small>
                                `
                                : ""
                        }
                    </div>
                `)
                .join("")
            : "";

    return `
        <div
            class="
                character-card
                mode-${mode}
                ${selected ? "selected" : ""}
                ${acted ? "acted" : ""}
                ${defeated ? "defeated" : ""}
            "
        >

            ${
                mode === "battle" ||
                mode === "enemy"
                    ? `
                        <div class="character-card-battle-info">

                            <div class="character-card-gauge hp">

                                <div
                                    class="character-card-gauge-fill"
                                    style="width:${hpRate}%"
                                ></div>

                                <span>
                                    HP ${currentHp}/${maxHp}
                                </span>

                            </div>

                            <div class="character-card-gauge cp">

                                <div
                                    class="character-card-gauge-fill"
                                    style="width:${cpRate}%"
                                ></div>

                                <span>
                                    呪力 ${currentCp}/${maxCp}
                                </span>

                            </div>

                            ${
                                statusHtml
                                    ? `
                                        <div class="character-card-status-list">
                                            ${statusHtml}
                                        </div>
                                    `
                                    : ""
                            }

                        </div>
                    `
                    : ""
            }

            <div class="character-card-frame">

                <img
                    src="${character.cardImage}"
                    alt="${character.name}"
                    class="character-card-art"
                >

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