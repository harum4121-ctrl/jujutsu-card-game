// ===============================
// 共通効果
// ===============================

function applyEffects(user, target, effects) {

    if (!effects) return;

    effects.forEach(effect => {

        switch (effect.type) {

            // -----------------------
            // 与ダメージアップ
            // -----------------------
            case "damageBuff":

                if (!user.damageBuff) {

                    user.damageBuff = 0;

                }

                user.damageBuff += effect.value;

                user.damageBuffTurn =
                    effect.duration ?? 0;

                break;

            // -----------------------
            // 永続与ダメアップ
            // -----------------------
            case "damageBuffPermanent":

                if (!user.attackBonus) {

                    user.attackBonus = 0;

                }

                user.attackBonus += effect.value;

                break;

            // -----------------------
            // 被ダメアップ
            // -----------------------
            case "damageTakenUp":

                if (!target.damageTakenUp) {

                    target.damageTakenUp = 0;

                }

                target.damageTakenUp += effect.value;

                target.damageTakenUpTurn =
                    effect.duration ?? 0;

                break;

            // -----------------------
            // スタン
            // -----------------------
            case "stun":

                target.stun =
                    effect.duration ?? 1;

                break;

            // -----------------------
            // 無敵
            // -----------------------
            case "invincible":

                target.invincible =
                    effect.duration ?? 1;

                break;

            // -----------------------
            // 呪力減少
            // -----------------------
            case "cursedDown":

                target.currentCursedPower -=
                    effect.value;

                if (
                    target.currentCursedPower < 0
                ) {

                    target.currentCursedPower = 0;

                }

                break;

            // -----------------------
            // 呪力回復
            // -----------------------
            case "cursedUp":

                target.currentCursedPower +=
                    effect.value;

                if (
                    target.currentCursedPower >
                    target.maxCursedPower
                ) {

                    target.currentCursedPower =
                        target.maxCursedPower;

                }

                break;

        }

    });

}