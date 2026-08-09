const enemies = {



        sukuna: {

    name: "両面宿儺",
    image: "images/cards/2sukuna.png.PNG",
    hp: 800,

    attack: 100,
    
    maxCursedPower: 100,

    cursedPower: 100,

    cursedPowerRecovery: 20,

    skills: characters.sukuna.skills,

    ultimate: characters.sukuna.ultimate

},


    jogo: {

    name: "漏瑚",

    image: "images/cards/jogo.png.PNG",

    hp: 600,

    attack: 60,

    maxCursedPower: 100,
    cursedPower: 100,
    cursedPowerRecovery: 20,


    // ===============================
    // 通常スキル
    // ===============================

    skills: [

        // ===============================
        // スキル1
        // 火礫蟲
        // ===============================

        {
            name: "火礫蟲",

            damage: 40,

            target: "単体",

            effects: [

                {
                    type: "burn",

                    value: 10,

                    duration: 3,

                    chance: 50
                }

            ]
        },


        // ===============================
        // スキル2
        // 噴火
        // ===============================

        {
            name: "噴火",

            damage: 30,

            target: "全体",

            effects: [],

            // 火傷状態なら追加20ダメージ
            bonusDamageIfBurn: 20
        },


        // ===============================
        // スキル3
        // 隕
        // ===============================

        {
            name: "隕",

            damage: 80,

            target: "全体",

            cooldown: 7,

            effects: [

                {
                    type: "burn",

                    value: 10,

                    duration: 3,

                    chance: 100
                }

            ]
        }

    ],


    // ===============================
    // 必殺スキル
    // ===============================

    ultimate: {

        name: "領域展開「蓋棺鉄囲山」",

        target: "自身",

        damage: 0,

        effects: [

            {
                type: "burnChanceBuff",

                value: 100,

                // 内部的には4
                // → 実質3ターン
                duration: 4
            },

            {
                type: "damageBuff",

                value: 30,

                duration: 4
            }

        ]

    }

},

    mahito: {

    name: "真人",

    image: "images/cards/mahito.png.PNG",

    hp: 500,

    attack: 45,

    maxCursedPower: 100,
    cursedPower: 100,
    cursedPowerRecovery: 20,


    // ===============================
    // 通常スキル
    // ===============================

    skills: [

        // ===============================
        // スキル1
        // 打撃
        // ===============================

        {
            name: "打撃",

            damage: 20,

            target: "単体",

            attackType: "近接",

            effects: []
        },


        // ===============================
        // スキル2
        // 変形
        // ===============================

        {
            name: "変形",

            damage: 0,

            target: "自身",

            effects: [

                {
                    type: "mahitoTransform"
                }

            ]
        },


        // ===============================
        // スキル3
        // 無為転変
        // ===============================

        {
            name: "無為転変",

            damage: 0,

            target: "単体",

            // 相手の現在HPの1/4
            currentHpDamageRate: 0.25,

            effects: []
        }

    ],


    // ===============================
    // 必殺スキル
    // ===============================

    ultimate: {

        name: "領域展開「自閉円頓裹」",

        damage: 0,

        target: "全体",

        effects: [

            {
                type: "instantDeath",

                hpLimit: 100
            }

        ]

    },


    // ===============================
    // 変形候補
    // ===============================

    transformations: [

        // 刃腕
        {
            name: "刃腕",

            damage: 50,

            target: "単体",

            attackType: "近接",

            effects: []
        },


        // 巨大拳
        {
            name: "巨大拳",

            damage: 70,

            target: "単体",

            attackType: "近接",

            effects: []
        },


        // 多腕攻撃
        {
            name: "多腕攻撃",

            damage: 25,

            hits: 3,

            target: "単体",

            attackType: "近接",

            effects: []
        },


        // 棘腕
        {
            name: "棘腕",

            damage: 40,

            target: "単体",

            attackType: "近接",

            effects: [

                {
                    type: "damageTakenUp",

                    value: 20,

                    duration: 2
                }

            ]
        }

    ]

}

};