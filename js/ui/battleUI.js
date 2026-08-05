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
        
        console.log(actor);
console.log(actor.cardImage);

    if (!actorData) {

        console.error(
            "キャラクターデータが見つかりません:",
            actor.id
        );

        return;

    }

    const skillCards =
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

                const disabled =
                    ct > 0 ||
                    insufficientPower;

                return `
                    <div
                        class="
                            skill-card
                            ${disabled ? "disabled" : ""}
                        "
                        ${
                            disabled
                                ? ""
                                : `onclick="selectPopupSkill(${index})"`
                        }
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
                                skill.costCard
                                    ? ` ／ 必殺${skill.costCard}`
                                    : ""
                            }

                            ${
                                ct > 0
                                    ? ` ／ CT:${ct}`
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

    <div class="skill-window-character">

        <img
    src="${actor.cardImage}"
    alt="${actor.name}"
    onerror="
        this.outerHTML =
        '<div style=&quot;width:80px;height:120px;border:2px solid red;display:flex;align-items:center;justify-content:center;font-size:12px;text-align:center;&quot;>画像エラー<br>${actor.cardImage}</div>';
    "
>

        <div class="skill-window-character-info">

            <div class="skill-window-character-name">
                ${actor.name}
            </div>

            <div class="skill-window-hp">
                HP ${actor.currentHp}/${actor.maxHp}
            </div>

            <div class="skill-window-cp">
                呪力 ${actor.currentCursedPower}/${actor.maxCursedPower}
            </div>

        </div>

    </div>

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

                HP
                ${actor.currentHp}
                /
                ${actor.maxHp}

            </span>

            <span>

                呪力
                ${actor.currentCursedPower}
                /
                ${actor.maxCursedPower}

            </span>

        </div>

        <div class="skill-list">

            ${skillCards}

            <div
                class="skill-card ultimate-card"
                onclick="selectPopupUltimate()"
            >

                <div class="skill-top">

                    <span class="skill-name">

                        ★ ${ultimate.name}

                    </span>

                    <span class="skill-cost">

                        必殺

                    </span>

                </div>

                <div class="skill-info">

                    ${ultimate.attackType}
                    ／
                    ${ultimate.target}

                    ／ 必殺カード
                    ${ultimate.costCard ?? 0}枚

                </div>

            </div>

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