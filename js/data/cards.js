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

    ],



    domains: [

    ]

};