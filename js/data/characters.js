const characters = {

    yuji: {
        name: "虎杖悠仁",
        type: "体",
        
        hp: 320,
        maxHp: 320,

        cursedPower: 30,
        maxCursedPower: 30,

        recovery: 15,

        skills: [
            {
                name: "打撃",
                type: "近接",
                target: "単体",
                damage: 25,
                cost: 0
            },

            {
                name: "3段攻撃",
                type: "近接",
                target: "単体",
                damage: 60,
                cost: 25,
                effect: "3hit"
            },

            {
                name: "渾身の一撃",
                type: "近接",
                target: "単体",
                damage: 90,
                cost: 45
            }
        ],

        ultimate: {
            name: "黒閃",
            type: "近接",
            target: "単体",

            damage: 70,

            costCard: 1,

            effect: {
                type: "damageBuff",
                value: 30,
                duration: 5
            }
        }
    },


    megumi: {

        name: "伏黒恵",
        type: "術",

        hp: 420,
        maxHp: 420,

        cursedPower: 40,
        maxCursedPower: 40,

        recovery: 10,


        skills: [

            {
                name:"斬りかかり",
                type:"近接",
                target:"単体",
                damage:15,
                cost:5
            },

            {
                name:"玉犬「渾」",
                type:"近接",
                target:"単体",
                damage:50,
                cost:40,

                effect:{
                    type:"damageBuff",
                    value:20,
                    duration:5
                }
            },

            {
                name:"鵺",
                type:"遠距離",
                target:"単体",
                damage:30,
                cost:20,

                effect:{
                    type:"cursedDown",
                    value:15
                }
            }
        ],


        ultimate:{
            name:"万象",
            type:"遠距離",
            target:"全体",

            damage:80,

            costCard:1,

            effect:{
                type:"enemyDamageDown",
                value:15,
                duration:3
            }
        }
    },


    nobara: {

        name:"釘崎野薔薇",
        type:"術",

        hp:320,
        maxHp:320,

        cursedPower:40,
        maxCursedPower:40,

        recovery:10,


        skills:[

            {
                name:"殴打",
                type:"近接",
                target:"単体",
                damage:30,
                cost:0
            },

            {
                name:"釘飛ばし",
                type:"遠距離",
                target:"全体",
                damage:15,
                cost:10
            },

            {
                name:"簪",
                type:"遠距離",
                target:"単体",
                damage:60,
                cost:40,

                condition:"釘飛ばし"
            }

        ],


        ultimate:{
            name:"共鳴り",

            type:"遠距離",
            target:"単体",

            damage:200,

            costCard:1,

            condition:"previousDamage"
        }

    }

},


    gojo: {

        name:"五条悟",
        type:"術",

        hp:400,
        maxHp:400,

        cursedPower:60,
        maxCursedPower:60,

        recovery:10,


        skills:[

            {
                name:"打撃",
                type:"近接",
                target:"単体",
                damage:50,
                cost:0,

                ct:1
            },

            {
                name:"無下限呪術",
                type:"特殊",
                target:"味方",

                cost:10,

                effect:{
                    type:"invincible",
                    duration:1
                },

                ct:5
            },

            {
                name:"僕、最強だから",
                type:"特殊",
                target:"敵全体",

                cost:10,

                effect:{
                    type:"enemySkillCostUp",
                    value:10,
                    duration:1
                },

                ct:1
            }

        ],


        ultimate:{

            name:"領域展開 無量空処",

            type:"特殊",
            target:"単体",

            costCard:2,

            effect:[
                {
                    type:"cursedDown",
                    value:50
                },
                {
                    type:"stun",
                    duration:2
                },
                {
                    type:"damageTakenUp",
                    value:50
                }
            ]

        }

    },


    maki:{

        name:"禪院真希",
        type:"体",

        hp:380,
        maxHp:380,

        cursedPower:1,
        maxCursedPower:1,

        recovery:0,


        skills:[

            {
                name:"切り裂き",
                type:"近接",
                target:"単体",
                damage:60,
                cost:0,

                ct:1
            },

            {
                name:"薙ぎ払い",
                type:"近接",
                target:"全体",
                damage:50,
                cost:0,

                ct:3
            },

            {
                name:"骨砕き",
                type:"近接",
                target:"単体",
                damage:20,
                cost:0,

                effect:{
                    type:"damageTakenUp",
                    value:30,
                    duration:1
                },

                ct:1
            }

        ],


        ultimate:{

            name:"游雲",

            type:"近接",
            target:"単体",

            damage:120,

            costCard:1,

            effect:{
                type:"damageBuffPermanent",
                value:20
            }

        }

    },


    inumaki:{

        name:"狗巻棘",
        type:"術",

        hp:350,
        maxHp:350,

        cursedPower:40,
        maxCursedPower:40,

        recovery:10,


        skills:[

            {
                name:"爆ぜろ",
                type:"遠距離",
                target:"全体",
                damage:20,

                selfDamage:10
            },

            {
                name:"動くな",
                type:"特殊",
                target:"2体",

                cost:30,

                effect:{
                    type:"stun",
                    duration:1
                },

                selfDamage:40,

                ct:2
            },

            {
                name:"潰れろ",
                type:"遠距離",
                target:"単体",
                damage:80,

                cost:20,

                selfDamage:20
            }

        ],


        ultimate:{

            name:"ぶっ飛べ",

            type:"遠距離",
            target:"単体",

            damage:120,

            costCard:1,

            effect:{
                type:"heal",
                value:80
            }

        }

    }