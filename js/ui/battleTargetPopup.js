// ===============================
// 敵選択ポップアップを開く
// ===============================

function openTargetWindow() {

    const targetWindow =
        document.getElementById("targetWindow");

    if (!targetWindow) {

        console.error(
            "targetWindowが見つかりません"
        );

        return;

    }

    targetWindow.innerHTML = "";

    const title =
        document.createElement("h2");

    title.textContent =
        "攻撃する敵を選択";

    targetWindow.appendChild(title);


    // 生存している敵を表示
    gameState.enemyCharacters.forEach(
        (enemy, index) => {

            if (enemy.currentHp <= 0) {
                return;
            }

            const button =
                document.createElement("button");

            button.type = "button";
            button.className =
                "target-popup-button";

            button.innerHTML = `
                <strong>
                    ${enemy.name}
                </strong>

                <span>
                    HP
                    ${enemy.currentHp}
                    /
                    ${enemy.maxHp}
                </span>
            `;

            button.addEventListener(
                "click",
                () => {

                    selectPopupTarget(index);

                }
            );

            targetWindow.appendChild(
                button
            );

        }
    );


    // 戻るボタン
    const backButton =
        document.createElement("button");

    backButton.type = "button";
    backButton.className =
        "target-popup-back";

    backButton.textContent =
        "スキル選択へ戻る";

    backButton.addEventListener(
        "click",
        () => {

            closeTargetWindow();

            const actor =
                gameState.selectedActors[
                    gameState.currentActorIndex
                ];

            if (actor) {

                openSkillWindow(actor);

            }

        }
    );

    targetWindow.appendChild(
        backButton
    );

    targetWindow.classList.remove(
        "hidden"
    );

}


// ===============================
// 敵を決定
// ===============================

function selectPopupTarget(index) {

    const enemy =
        gameState.enemyCharacters[index];

    if (
        !enemy ||
        enemy.currentHp <= 0
    ) {

        alert(
            "この敵は選択できません"
        );

        return;

    }

    closeTargetWindow();

    attackEnemy(index);

}


// ===============================
// 敵選択ポップアップを閉じる
// ===============================

function closeTargetWindow() {

    const targetWindow =
        document.getElementById(
            "targetWindow"
        );

    if (!targetWindow) return;

    targetWindow.classList.add(
        "hidden"
    );

    targetWindow.innerHTML = "";

}