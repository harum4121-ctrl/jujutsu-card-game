function openSkillWindow(actor) {

    const windowElement =
        document.getElementById("skillWindow");

    if (!windowElement) {

        console.error(
            "skillWindowが見つかりません"
        );

        return;

    }

    if (!actor) {

        console.error(
            "行動キャラクターが指定されていません"
        );

        return;

    }

    const actorData =
        characters[actor.id];

    if (!actorData) {

        console.error(
            "キャラクターデータが見つかりません:",
            actor.id
        );

        return;

    }

    const skillButtons =
        actorData.skills
            .map((skill, index) => {

                const ct =
                    actor.cooldowns[
                        skill.name
                    ] ?? 0;

                const cost =
                    skill.cost ?? 0;

                const insufficientPower =
                    !actor.nextSkillFree &&
                    actor.currentCursedPower < cost;

                const unavailable =
                    ct > 0 ||
                    insufficientPower;

                return `
<div
    class="
        skill-card
        ${unavailable ? "disabled" : ""}
    "
    onclick="${
        unavailable
            ? ""
            : `selectPopupSkill(${index})`
    }"
>

    <div class="skill-top">

        <span class="skill-name">

            ${skill.name}

        </span>

        <span class="skill-cost">

            ${cost}

        </span>

    </div>

    <div class="skill-info">

        ${skill.attackType}
        ／
        ${skill.target}

        ${
            ct > 0
                ? `　CT:${ct}`
                : ""
        }

    </div>

</div>
`;

            })
            .join("");

    const ultimate =
        actorData.ultimate;

    windowElement.innerHTML = `
        <div class="skill-window-header">

            <h2>
                ${actor.name}
            </h2>

            <button
                class="skill-window-close"
                onclick="closeSkillWindow()"
            >
                ×
            </button>

        </div>

        <div class="skill-window-resources">

            <span>
                HP ${actor.currentHp}/${actor.maxHp}
            </span>

            <span>
                呪力
                ${actor.currentCursedPower}
                /
                ${actor.maxCursedPower}
            </span>

        </div>

        <div class="skill-popup-list">

            ${skillButtons}

            <button
                class="skill-popup-button ultimate"
                onclick="selectPopupUltimate()"
            >
                <strong>
                    ${ultimate.name}
                </strong>

                <span>
                    必殺技
                    ／
                    ${ultimate.target}
                </span>

                <small>
                    必殺カード
                    ${ultimate.costCard ?? 0}枚
                </small>
            </button>

        </div>
    `;

    windowElement.classList.remove("hidden");

}


function selectPopupSkill(index) {

    closeSkillWindow();

    selectSkill(index);

}


function selectPopupUltimate() {

    closeSkillWindow();

    selectUltimate();

}


function closeSkillWindow() {

    const windowElement =
        document.getElementById("skillWindow");

    if (!windowElement) return;

    windowElement.classList.add("hidden");

    windowElement.innerHTML = "";

}