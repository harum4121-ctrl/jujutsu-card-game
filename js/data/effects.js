// ===============================
// 共通効果
// ===============================

function applyEffects(user, target, effects) {

    if (!effects) return;

    effects.forEach(effect => {

        switch (effect.type) {
            
           case "skillCostDownPermanent":

    user.skillCostDown =
        (user.skillCostDown ?? 0) + effect.value;

    break;

            // 与ダメアップ
            case "damageBuff":

                user.damageBuff =
                    (user.damageBuff ?? 0) + effect.value;

                user.damageBuffTurn =
                    effect.duration ?? 0;

                break;

            // 永続攻撃アップ
            case "damageBuffPermanent":

                user.attackBonus =
                    (user.attackBonus ?? 0) + effect.value;

                break;

            // 被ダメアップ
            case "damageTakenUp":

                target.damageTakenUp =
                    (target.damageTakenUp ?? 0) + effect.value;

                target.damageTakenUpTurn =
                    effect.duration ?? 0;

                break;

            // スタン
            case "stun":

                target.stun =
                    effect.duration ?? 1;

                break;

            // 無敵
            case "invincible":

                target.invincible =
                    effect.duration ?? 1;

                break;

            // 呪力減少
            case "cursedDown":

                if (target.currentCursedPower != null) {

                    target.currentCursedPower =
                        Math.max(
                            0,
                            target.currentCursedPower - effect.value
                        );

                }

                break;

            // 呪力回復
            case "cursedUp":

                if (target.currentCursedPower != null) {

                    target.currentCursedPower =
                        Math.min(
                            target.maxCursedPower,
                            target.currentCursedPower + effect.value
                        );

                }

                break;
                
                case "allCursedPowerUp":

    gameState.battleCharacters.forEach(character => {

        if (character.currentHp <= 0) return;

        character.currentCursedPower = Math.min(
            character.maxCursedPower,
            character.currentCursedPower + effect.value
        );

    });

    break;
    
    case "allCursedPowerDown":

    gameState.enemyCharacters.forEach(enemy => {

        if (enemy.currentHp <= 0) return;

        enemy.currentCursedPower = Math.max(
            0,
            enemy.currentCursedPower - effect.value
        );

    });

    break;
    
    case "damageReduction":

    target.damageReduction =
        (target.damageReduction ?? 0)
        + effect.value;

    target.damageReductionTurn =
        effect.duration ?? 0;

    break;
    
    case "allDamageReduction":

    gameState.battleCharacters.forEach(character => {

        if (character.currentHp <= 0) return;

        character.damageReduction =
            (character.damageReduction ?? 0)
            + effect.value;

        character.damageReductionTurn =
            effect.duration ?? 0;

    });

    break;
    
    

            // HP回復
            case "heal":

                target.currentHp =
                    Math.min(
                        target.maxHp,
                        target.currentHp + effect.value
                    );

                break;

            default:

                console.log(
                    "未対応効果:",
                    effect.type
                );

        }

    });

}
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

    if (character.damageBuffTurn > 0) {

        character.damageBuffTurn--;

        if (character.damageBuffTurn === 0) {

            character.damageBuff = 0;

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

}