function calculateDamage(actor, target, skill) {

    if (!actor || !target || !skill) {

        console.error(
            "calculateDamageの引数不足",
            { actor, target, skill }
        );

        return 0;

    }

    let damage = 0;


    // ===============================
    // 基礎ダメージ
    // ===============================

    if (skill.damage != null) {

        damage = Number(skill.damage) || 0;

    } else if (Array.isArray(skill.attacks)) {

        damage = skill.attacks.reduce(
            (total, attack) =>
                total + (Number(attack.damage) || 0),
            0
        );

    }


    // 多段攻撃
    if (skill.hits != null) {

        damage *= Number(skill.hits) || 1;

    }


    // ===============================
    // 攻撃側の補正
    // ===============================

    // 永続与ダメージアップ
    damage += Number(actor.attackBonus) || 0;

    // 一時的な与ダメージアップ
    damage += Number(actor.damageBuff) || 0;

    // 与ダメージダウン
    damage -= Number(actor.damageDown) || 0;

// ===============================
// 状態異常による追加ダメージ
// ===============================

// 火傷状態の相手に追加ダメージ
if (
    (skill.bonusDamageIfBurn ?? 0) > 0 &&
    (target.burnTurn ?? 0) > 0
) {

    damage +=
        Number(skill.bonusDamageIfBurn) || 0;

}

    // ===============================
    // 防御側の補正
    // ===============================

    // 被ダメージアップ
    damage += Number(target.damageTakenUp) || 0;

    // ダメージ軽減
    damage -= Number(target.damageReduction) || 0;


    // ===============================
    // 領域効果
    // ===============================

    const fieldId =
        gameState.currentField?.card?.id;

    switch (fieldId) {

        // 帳
        case "curtain":

            damage -= 10;
            break;


        // 仙台結界
        case "sendai_barrier":

            if (actor.type === "術") {
                damage += 10;
            }

            break;


        // 東京結界
        case "tokyo_barrier":

            if (actor.type === "体") {
                damage += 10;
            }

            break;


        // 東京都立呪術高等専門学校
        case "tokyo_jujutsu_high":

            damage -= 30;
            break;

    }


    // ===============================
    // 呪具効果
    // ===============================

    if (Array.isArray(actor.equipment)) {

        actor.equipment.forEach(card => {

            const effects =
                Array.isArray(card.effect)
                    ? card.effect
                    : card.effect
                        ? [card.effect]
                        : [];

            effects.forEach(effect => {

                if (
                    effect.type === "meleeDamageUp" &&
                    skill.attackType === "近接"
                ) {

                    damage +=
                        Number(effect.value) || 0;

                }

            });

        });

    }

// ===============================
// 火傷状態への追加ダメージ
// ===============================

if (
    (skill.bonusDamageIfBurn ?? 0) > 0 &&
    (target.burnTurn ?? 0) > 0
) {

    damage +=
        Number(skill.bonusDamageIfBurn) || 0;

}

    // ===============================
    // 次の攻撃を2倍
    // ===============================

    if (actor.doubleNextDamage) {

        damage *= 2;

        actor.doubleNextDamage = false;

    }


    // ===============================
    // 無敵
    // ===============================

    if (
        (target.invincible ?? 0) > 0 &&
        (actor.ignoreInvincible ?? 0) <= 0
    ) {

        damage = 0;

    }


    // 最低0ダメージ
    damage = Math.max(
        0,
        Math.floor(damage)
    );

    return damage;

}

function useSkillCost(actor, skill) {

    // 呪力不足
    let cost;

    if (actor.nextSkillFree) {

        cost = 0;
        actor.nextSkillFree = false;

    } else {

        cost = Math.max(
            0,
            (skill.cost ?? 0) -
            (actor.skillCostDown ?? 0)
        );

    }

    if (actor.currentCursedPower < cost) {

        alert("呪力不足");

        return false;

    }

    actor.currentCursedPower -= cost;

    // 必殺カード
    if (skill.costCard) {

        if (!actor.freeUltimate) {

            if (
                getUltimateCardCount() <
                skill.costCard
            ) {

                alert("必殺カード不足");

                return false;

            }

            consumeUltimateCards(
                skill.costCard
            );

        }

        actor.freeUltimate = false;

    }

    // CT
    if (skill.ct) {

        actor.cooldowns[
            skill.name
        ] = skill.ct;

    }

    return true;
}

function getUltimateCardCount() {

    return gameState.hand.filter(card =>
        card.type === "必殺"
    ).length;

}

function consumeUltimateCards(count) {

    let remain = count;

    gameState.hand = gameState.hand.filter(card => {

        if (remain > 0 && card.type === "必殺") {

            gameState.graveyard.push(card);
            remain--;

            return false;

        }

        return true;

    });

}

function hasEquipment(character, equipmentId) {

    return character.equipment.some(
        card => card.id === equipmentId
    );

}