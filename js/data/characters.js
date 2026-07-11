const characters = {

    yuji: {
        name: "虎杖悠仁",
        type: "体",

        hp: 320,
        maxHp: 320,

        cursedPower: 30,
        maxCursedPower: 100,

        recovery: 15,

        skills: [
            {
                name: "打撃",
                attackType: "近接",
                target: "単体",
                damage: 25,
                cost: 0
            },
            {
                name: "3段攻撃",
                attackType: "近接",
                target: "単体",
                damage: 20,
                hits: 3,
                cost: 25
            },
            {
                name: "渾身の一撃",
                attackType: "近接",
                target: "単体",
                damage: 90,
                cost: 45
            }
        ],

        ultimate: {
            name: "黒閃",
            attackType: "近接",
            target: "単体",
            damage: 70,
            costCard: 1,

            effects: [
                {
                    type: "damageBuff",
                    value: 30,
                    duration: 5
                }
            ]
        }
    },

    megumi: {
        name: "伏黒恵",
        type: "術",

        hp: 420,
        maxHp: 420,

        cursedPower: 40,
        maxCursedPower: 100,

        recovery: 10,

        skills: [
            {
                name: "斬りかかり",
                attackType: "近接",
                target: "単体",
                damage: 15,
                cost: 5
            },
            {
                name: "玉犬「渾」",
                attackType: "近接",
                target: "単体",
                damage: 50,
                cost: 40,

                effects: [
                    {
                        type: "damageBuff",
                        value: 20,
                        duration: 5
                    }
                ]
            },
            {
                name: "鵺",
                attackType: "遠距離",
                target: "単体",
                damage: 30,
                cost: 20,

                effects: [
                    {
                        type: "cursedDown",
                        value: 15
                    }
                ]
            }
        ],

        ultimate: {
            name: "万象",
            attackType: "遠距離",
            target: "全体",
            damage: 80,
            costCard: 1,

            effects: [
                {
                    type: "enemyDamageDown",
                    value: 15,
                    duration: 3
                }
            ]
        }
    },

    nobara: {
        name: "釘崎野薔薇",
        type: "術",

        hp: 320,
        maxHp: 320,

        cursedPower: 40,
        maxCursedPower: 100,

        recovery: 10,

        skills: [
            {
                name: "殴打",
                attackType: "近接",
                target: "単体",
                damage: 30,
                cost: 0
            },
            {
                name: "釘飛ばし",
                attackType: "遠距離",
                target: "全体",
                damage: 15,
                cost: 10
            },
            {
                name: "簪",
                attackType: "遠距離",
                target: "単体",
                damage: 60,
                cost: 40,
                condition: "釘飛ばし"
            }
        ],

        ultimate: {
            name: "共鳴り",
            attackType: "遠距離",
            target: "単体",
            damage: 200,
            costCard: 1,
            condition: "previousDamage"
        }
    },

    gojo: {
        name: "五条悟",
        type: "術",

        hp: 400,
        maxHp: 400,

        cursedPower: 60,
        maxCursedPower: 100,

        recovery: 10,

        skills: [
            {
                name: "打撃",
                attackType: "近接",
                target: "単体",
                damage: 50,
                cost: 0,
                ct: 1
            },
            {
                name: "無下限呪術",
                attackType: "特殊",
                target: "味方全体",
                cost: 10,
                ct: 5,

                effects: [
                    {
                        type: "invincible",
                        duration: 1
                    }
                ]
            },
            {
                name: "僕、最強だから",
                attackType: "特殊",
                target: "敵全体",
                cost: 10,
                ct: 1,

                effects: [
                    {
                        type: "enemySkillCostUp",
                        value: 10,
                        duration: 1
                    }
                ]
            }
        ],

        ultimate: {
            name: "領域展開 無量空処",
            attackType: "特殊",
            target: "単体",
            costCard: 2,

            effects: [
                {
                    type: "cursedDown",
                    value: 50
                },
                {
                    type: "stun",
                    duration: 2
                },
                {
                    type: "damageTakenUp",
                    value: 50
                }
            ]
        }
    },
    
        maki: {
        name: "禪院真希",
        type: "体",

        hp: 380,
        maxHp: 380,

        cursedPower: 1,
        maxCursedPower: 1,

        recovery: 0,

        skills: [
            {
                name: "切り裂き",
                attackType: "近接",
                target: "単体",
                damage: 60,
                cost: 0,
                ct: 1
            },
            {
                name: "薙ぎ払い",
                attackType: "近接",
                target: "全体",
                damage: 50,
                cost: 0,
                ct: 3
            },
            {
                name: "骨砕き",
                attackType: "近接",
                target: "単体",
                damage: 20,
                cost: 0,
                ct: 1,
                effects: [
                    {
                        type: "damageTakenUp",
                        value: 30,
                        duration: 1
                    }
                ]
            }
        ],

        ultimate: {
            name: "游雲",
            attackType: "近接",
            target: "単体",
            damage: 120,
            costCard: 1,

            effects: [
                {
                    type: "damageBuffPermanent",
                    value: 20
                }
            ]
        }
    },

    inumaki: {
        name: "狗巻棘",
        type: "術",

        hp: 350,
        maxHp: 350,

        cursedPower: 40,
        maxCursedPower: 100,

        recovery: 10,

        skills: [
            {
                name: "爆ぜろ",
                attackType: "遠距離",
                target: "全体",
                damage: 20,
                cost: 0,
                selfDamage: 10
            },
            {
                name: "動くな",
                attackType: "特殊",
                target: "2体",
                cost: 30,
                ct: 2,
                selfDamage: 40,
                effects: [
                    {
                        type: "stun",
                        duration: 1
                    }
                ]
            },
            {
                name: "潰れろ",
                attackType: "遠距離",
                target: "単体",
                damage: 80,
                cost: 20,
                selfDamage: 20
            }
        ],

        ultimate: {
            name: "ぶっ飛べ",
            attackType: "遠距離",
            target: "単体",
            damage: 120,
            costCard: 1,

            effects: [
                {
                    type: "heal",
                    value: 80
                }
            ]
        }
    },

    panda: {
        name: "パンダ",
        type: "体",

        hp: 400,
        maxHp: 400,

        cursedPower: 70,
        maxCursedPower: 100,

        recovery: 10,

        skills: [
            {
                name: "打撃",
                attackType: "近接",
                target: "単体",
                damage: 40,
                cost: 5
            },
            {
                name: "パンダは強い",
                attackType: "特殊",
                target: "自身",
                cost: 35,
                effects: [
                    {
                        type: "damageBuffPermanent",
                        value: 10
                    }
                ]
            },
            {
                name: "栄養補給",
                attackType: "回復",
                target: "自身",
                heal: 40,
                cost: 0,
                ct: 4
            }
        ],

        ultimate: {
            name: "激震掌",
            attackType: "近接",
            target: "単体",
            damage: 50,
            costCard: 1,
            effects: [
                {
                    type: "cursedUp",
                    value: 30
                }
            ]
        }
    },

    shoko: {
        name: "家入硝子",
        type: "術",

        hp: 310,
        maxHp: 310,

        cursedPower: 40,
        maxCursedPower: 100,

        recovery: 10,

        skills: [
            {
                name: "集中治療",
                attackType: "回復",
                target: "味方単体",
                heal: 60,
                cost: 15
            },
            {
                name: "全体治療",
                attackType: "回復",
                target: "味方全体",
                heal: 50,
                cost: 30,
                ct: 3
            },
            {
                name: "メス投げ",
                attackType: "遠距離",
                target: "単体",
                damage: 10,
                cost: 0
            }
        ],

        ultimate: {
            name: "反転術式（出力最大）",
            attackType: "回復",
            target: "味方単体",
            heal: 180,
            costCard: 1
        }
    },
    
        sukuna: {
        name: "両面宿儺",
        type: "術",

        hp: 400,
        maxHp: 400,

        cursedPower: 60,
        maxCursedPower: 100,

        recovery: 10,

        skills: [
            {
                name: "解",
                attackType: "遠距離",
                target: "全体",
                damage: 50,
                cost: 40
            },
            {
                name: "捌",
                attackType: "近接",
                target: "単体",
                damage: 80,
                cost: 20,
                ct: 1
            },
            {
                name: "打撃",
                attackType: "近接",
                target: "単体",
                damage: 20,
                cost: 0
            }
        ],

        ultimate: {
            name: "開",
            attackType: "遠距離",
            target: "単体",
            damage: 250,
            costCard: 1,

            effects: [
                {
                    type: "cursedUp",
                    value: 20
                }
            ]
        }
    },

    yuta: {
        name: "乙骨憂太",
        type: "術/体",

        hp: 370,
        maxHp: 370,

        cursedPower: 90,
        maxCursedPower: 90,

        recovery: 15,

        skills: [
            {
                name: "斬撃",
                attackType: "遠距離",
                target: "単体",
                damage: 80,
                cost: 40
            },
            {
                name: "反転術式",
                attackType: "回復",
                target: "味方単体",
                heal: 40,
                cost: 40
            },
            {
                name: "黒閃",
                attackType: "近接",
                target: "単体",
                damage: 80,
                cost: 30,
                costCard: 1
            },
            {
                name: "合わせろ、里香",
                attackType: "複合",
                target: "単体",

                attacks: [
                    {
                        attackType: "近接",
                        damage: 30
                    },
                    {
                        attackType: "遠距離",
                        damage: 40
                    }
                ],

                ct: 2
            }
        ],

        ultimate: {
            name: "来い、里香！",
            attackType: "特殊",
            target: "自身",
            costCard: 2,

            effects: [
                {
                    type: "damageBuff",
                    value: 80,
                    duration: 5
                }
            ]
        }
    }

};