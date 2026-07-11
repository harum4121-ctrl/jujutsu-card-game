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

};