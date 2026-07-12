// ===============================
// 共通効果
// ===============================

function applyEffects(user, target, effects) {

    if (!effects) return;

    effects.forEach(effect => {

        switch (effect.type) {

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