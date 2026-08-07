const cards = {

    equipment: [

        {
            id: "heavenly_spear",

            name: "天逆鉾",
rarity: "LR",
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
rarity: "R",
            type: "呪具",

            effect: {
                type: "meleeDamageUp",

                value: 10
            }
        },

        {
            id: "black_rope",

            name: "黒縄",
rarity: "SR",
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
rarity: "UR",
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
    id: "sukunas_finger",

    name: "宿儺の指",
rarity: "UR",
    type: "呪物",

    target: "味方単体",

    effect: {
        type: "taunt",
        duration: 2
    }
},

        {
    id: "death_painting_1",

    name: "受胎九相図 一番",
rarity: "SSR",
    type: "呪物",

    target: "敵全体",

    effect: [
        {
            type: "allCursedPowerDown",
            value: 10
        },
        {
            type: "allCursedPowerUp",
            value: 10
        }
    ]
},

       {
    id: "death_painting_2",

    name: "受胎九相図 二番",
rarity: "SSR",
    type: "呪物",

    target: "味方単体",

    effect: {
        type: "extraAction"
    }
},

        {
            id: "death_painting_3",

            name: "受胎九相図 三番",
rarity: "SSR",
            type: "呪物",
            
            target: "味方単体",

            effect: {
                type: "doubleNextDamage"
            }
        },

         {

            id: "prison_realm",

            name: "獄門疆",
rarity: "LR",
            type: "呪物",

            target: "敵単体",

            effect: [

                {

                    type: "stun",

                    duration: 5

                },

                {

                    type: "invincible",

                    duration: 5

                }

            ]

        }

    ],



    support: [

    {
    id: "challenger",

    name: "そっちが挑戦者だから",
rarity: "LR",
    type: "サポート",

    target: "味方単体",

    effect: [
        {
            type: "cursedUp",
            value: 20
        }
    ]
},
    {
        id: "king_of_curses",
        name: "呪いの王",
        type: "サポート",
        target: "敵全体",
rarity: "UR",
        effect: {
            type: "allCursedPowerDown",
            value: 30
        }
    },

   {
    id: "domain_amplification",
    name: "領域展延",
    type: "サポート",
rarity: "SR",
    target: "味方単体",

    effect: {
        type: "ignoreInvincible",
        duration: 3
    }
},

    {
        id: "we_are_the_strongest",
        name: "私たちは最強なんだ",
        type: "サポート",
        rarity: "SSR",
        target: "味方2体",
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
        rarity: "UR",
        target: "味方全体",
        effect: {
            type: "cursedUp",
            value: 15
        }
    },

    {
        id: "not_words",
        name: "ここまで来たら言葉じゃねぇだろ！",
        type: "サポート",
rarity: "UR",
        effect: {
            type: "searchUltimate"
        }
    },

   {
    id: "save_people",
    name: "俺は不平等に人を助ける",
rarity: "SR",
    type: "サポート",
    target: "味方単体",

    effect: {
        type: "heal",
        value: 30
    }
},

    {
        id: "endure",
        name: "耐えろ！",
        type: "サポート",
        rarity: "N",
        target: "味方全体",
        effect: {
            type: "allDamageReduction",

            value: 10,

            duration: 5
        }
    },

   {
    id: "retry",

    name: "やり直しだ",
rarity: "SSR",
    type: "サポート",

    target: "味方単体",

    effect: {
        type: "recoverPreviousSingleDamage"
    }
},

    {
        id: "no_regret",
        name: "生き様で後悔はしたくない",
        type: "サポート",
        rarity: "SR",
        target: "味方単体",
        effect: {
            type: "damageReduction",
            value: 50,
            duration: 1
        }
    },

   {
    id: "power_battle",

    name: "火力勝負といこう",
rarity: "SSR",
    type: "サポート",
    target: "味方単体",

    effect: {
        type: "skillCostZero"
    }
},

    {
    id: "thank_you",
    name: "今はただ君に感謝を",
    type: "サポート",
    target: "味方単体",
rarity: "SSR",
    hpLimit: 100,

    effect: {
        type: "freeUltimate"
    }
}

],



    domains: [

    {
        id: "curtain",

        name: "帳",
rarity: "N",
        type: "領域",

        effect: {
            type: "allDamageDown",
            value: 10
        }
    },

    {
        id: "sendai_barrier",

        name: "仙台結界",
rarity: "SR",
        type: "領域",

        effect: {
            type: "techniqueDamageUp",
            value: 10
        }
    },

    {
        id: "tokyo_barrier",

        name: "東京第一結界",
rarity: "SR",
        type: "領域",

        effect: {
            type: "bodyDamageUp",
            value: 10
        }
    },

    {
        id: "tokyo_jujutsu_high",

        name: "東京都立呪術高等専門学校",
rarity: "SR",
        type: "領域",

        effect: [
            {
                type: "allCursedPowerRecovery",
                value: 10
            },
            {
                type: "allDamageDown",
                value: 30
            }
        ]
    }

],

ultimate: [

    {
        id: "ultimate_card",

        name: "必殺カード",
rarity: "LR",
        type: "必殺"
    }

]

};