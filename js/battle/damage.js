function calculateDamage(actor, target, skill) {

    let damage = 0;

if (skill.damage != null) {

    damage = skill.damage;

}
else if (skill.attacks) {

    skill.attacks.forEach(attack => {

        damage += attack.damage;

    });

}

    // 多段攻撃
    if (skill.hits) {
        damage *= skill.hits;
    }

// 永続攻撃アップ
damage += actor.attackBonus ?? 0;

// 一時的な与ダメアップ
damage += actor.damageBuff ?? 0;

// 与ダメージダウン
damage -= actor.damageDown ?? 0;

// 被ダメージアップ
damage += target.damageTakenUp ?? 0;

// ダメージ軽減
damage -= target.damageReduction ?? 0;

// 領域効果
if (gameState.currentField) {

    switch (gameState.currentField.card.id) {

        case "curtain":
            damage -= 10;
            break;

        case "sendai_barrier":
            if (actor.type === "術") {
                damage += 10;
            }
            break;

        case "tokyo_barrier":
            if (actor.type === "体") {
                damage += 10;
            }
            break;

        case "tokyo_jujutsu_high":
            damage -= 30;
            break;

    }

}

// 呪具
if (actor.equipment) {

    actor.equipment.forEach(card => {

        if (!card.effect) return;

        switch (card.effect.type) {

            case "meleeDamageUp":

                if (skill.attackType === "近接") {

                    damage += card.effect.value;

                }

                break;

        }

    });

}

// 次の攻撃2倍
if (actor.doubleNextDamage) {

    damage *= 2;

    actor.doubleNextDamage = false;

}

// 無敵
if (
    target.invincible > 0 &&
    actor.ignoreInvincible <= 0
) {

    damage = 0;

}

damage = Math.max(0, damage);

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