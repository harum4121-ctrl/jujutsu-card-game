const cards = {

    equipment: [

        {
            id: "heavenly_spear",

            name: "天逆鉾",

            type: "呪具",

            effect: {
                type: "sealSkill",

                cooldown: 2,

                trigger: "meleeAttack",

                duration: 1
            }
        },

        {
            id: "slaughter_blade",

            name: "屠坐魔",

            type: "呪具",

            effect: {
                type: "meleeDamageUp",

                value: 10
            }
        },

        {
            id: "black_rope",

            name: "黒縄",

            type: "呪具",

            effect: {
                type: "rangeDamageDown",

                value: 10,

                duration: 1,

                trigger: "rangeAttack"
            }
        },

        {
            id: "speaker",

            name: "蛇の目と牙のスピーカー",

            type: "呪具",

            effect: {
                type: "singleToAll",

                attackType: "遠距離",

                consume: true
            }
        }

    ],



    cursedObjects: [

        {
            id: "sukuna_finger",

            name: "宿儺の指",

            type: "呪物",

            effect: {
                type: "taunt",
                duration: 1
            }
        },

        {
            id: "death_painting_1",

            name: "受胎九相図 一番",

            type: "呪物",

            effect: [
                {
                    type: "enemyCursedDown",
                    value: 10
                },
                {
                    type: "allyCursedUp",
                    value: 10
                }
            ]
        },

        {
            id: "death_painting_2",

            name: "受胎九相図 二番",

            type: "呪物",

            effect: {
                type: "extraAction",
                penalty: "stunNextTurn"
            }
        },

        {
            id: "death_painting_3",

            name: "受胎九相図 三番",

            type: "呪物",

            effect: {
                type: "doubleNextDamage"
            }
        },

        {
            id: "prison_realm",

            name: "獄門疆",

            type: "呪物",

            effect: {
                type: "sealAfterTurns",
                delay: 2,
                duration: 5
            }
        }

    ],



    support: [

    {
        id: "king_of_curses",
        name: "呪いの王",
        type: "サポート",

        effect: {
            type: "allCursedPowerDown",
            value: 30
        }
    },

    {
        id: "domain_amplification",
        name: "領域展延",
        type: "サポート",

        effect: {
            type: "ignoreInvincible",
            duration: 3
        }
    },

    {
        id: "we_are_the_strongest",
        name: "私たちは最強なんだ",
        type: "サポート",

        effect: {
            type: "damageReduction",

            targets: 2,

            value: 30,

            duration: 2
        }
    },

    {
        id: "big_brother",
        name: "全力でお兄ちゃんを遂行する！",
        type: "サポート",

        effect: {
            type: "allCursedPowerUp",
            value: 15
        }
    },

    {
        id: "not_words",
        name: "ここまで来たら言葉じゃねぇだろ！",
        type: "サポート",

        effect: {
            type: "searchUltimate"
        }
    },

    {
        id: "save_people",
        name: "俺は不平等に人を助ける",
        type: "サポート",

        effect: {
            type: "healSelf",
            value: 30
        }
    },

    {
        id: "endure",
        name: "耐えろ！",
        type: "サポート",

        effect: {
            type: "allDamageReduction",

            value: 10,

            duration: 5
        }
    },

    {
        id: "go_ahead",
        name: "先に逝く せいぜい頑張れ",
        type: "サポート",

        effect: [
            {
                type: "selfDamage",
                value: 100
            },
            {
                type: "allyDamageUp",
                targets: 2,
                value: 70,
                duration: 1
            }
        ]
    },

    {
        id: "retry",
        name: "やり直しだ",
        type: "サポート",

        effect: {
            type: "recoverPreviousSingleDamage"
        }
    },

    {
        id: "no_regret",
        name: "生き様で後悔はしたくない",
        type: "サポート",

        effect: {
            type: "damageReduction",
            value: 50,
            duration: 1
        }
    },

    {
        id: "power_battle",
        name: "火力勝負といこう",
        type: "サポート",

        effect: {
            type: "skillCostZero",
            duration: 1
        }
    },

    {
        id: "thank_you",
        name: "今はただ君に感謝を",
        type: "サポート",

        effect: {
            type: "ultimateIgnoreCondition",

            hpLimit: 100
        }
    }

],



    domains: [

    ]

};