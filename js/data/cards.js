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

    ],



    support: [

    ],



    domains: [

    ]

};