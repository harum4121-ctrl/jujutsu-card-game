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
    
    if (actor.doubleNextDamage) {

    damage *= 2;

    actor.doubleNextDamage = false;

}

    if (damage < 0) {
        damage = 0;
    }

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