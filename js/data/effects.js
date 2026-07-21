// ===============================
// ターン経過
// ===============================

function updateStatus(character) {
    
    if ((character.damageReductionTurn ?? 0) > 0) {

    character.damageReductionTurn--;

    if (character.damageReductionTurn === 0) {

        character.damageReduction = 0;

    }

}

if (character.ignoreInvincible > 0) {

    character.ignoreInvincible--;

}

    if (character.damageBuffTurn > 0) {

        character.damageBuffTurn--;

        if (character.damageBuffTurn === 0) {

            character.damageBuff = 0;

        }

    }
    
    if (character.damageDownTurn > 0) {

    character.damageDownTurn--;

    if (character.damageDownTurn === 0) {

        character.damageDown = 0;

    }

}

    if (character.damageTakenUpTurn > 0) {

        character.damageTakenUpTurn--;

        if (character.damageTakenUpTurn === 0) {

            character.damageTakenUp = 0;

        }

    }

    if (character.invincible > 0) {

        character.invincible--;

    }

    if (character.stun > 0) {

        character.stun--;

    }
    
    if (character.taunt > 0) {

    character.taunt--;

}

}