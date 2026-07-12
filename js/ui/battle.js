// ===============================
// バトル開始
// ===============================

function startBattle() {

    gameState.selectedActors = [];
    
    gameState.currentField = null;

    gameState.battleCharacters = [];


    // 味方キャラクター作成
    gameState.selectedCharacters.forEach(id => {

        const char = characters[id];


        gameState.battleCharacters.push({

            id:id,

            name:char.name,

            maxHp:char.hp,

            currentHp:char.hp,


            maxCursedPower:
                char.maxCursedPower,

            currentCursedPower:
                char.cursedPower,


            cursedPowerRecovery:
                char.cursedPowerRecovery,


            hasActed:false,


            equipment:[],


            cooldowns:{},


            attackBonus:0,


            damageReduction:0

        });


    });



    // 敵作成

    gameState.enemyCharacters=[];


    for(const id in enemies){

        const enemy=enemies[id];


        gameState.enemyCharacters.push({

            id:id,

            name:enemy.name,

            maxHp:enemy.hp,

            currentHp:enemy.hp,


            attack:enemy.attack,


            skills:enemy.skills,


            ultimate:enemy.ultimate

        });

    }



    // デッキ作成

    gameState.drawPile =
        [...gameState.deck];


    // シャッフル

    gameState.drawPile.sort(
        ()=>Math.random()-0.5
    );


    gameState.hand=[];


    gameState.graveyard=[];



    // 初期手札5枚

    for(let i=0;i<5;i++){

        drawCard();

    }



    showBattleScreen();

}



// ===============================
// カードを引く
// ===============================

function drawCard(){


    if(gameState.drawPile.length===0){


        showBattleResult("lose");


        return false;


    }



    const card =
        gameState.drawPile.shift();



    gameState.hand.push(card);



    return true;


}



// ===============================
// ターン終了
// ===============================

function endTurn(){


    gameState.selectedActors=[];


    alert("敵のターン");


    enemyTurn();


}



// ===============================
// 山札表示更新
// ===============================

function updateDeckCount(){


    const count =
        document.getElementById("deckCount");


    if(count){

        count.textContent =
            gameState.drawPile.length;

    }


}
// ===============================
// 味方キャラクター表示
// ===============================

function displayBattleCharacters(){

    const area =
        document.getElementById("playerCharacters");


    area.innerHTML="";


    document.getElementById("actorCount").textContent =
        gameState.selectedActors.length;



    gameState.battleCharacters.forEach(character=>{


        const div =
            document.createElement("div");


        div.className="character";



        if(gameState.selectedActors.includes(character)){

            div.classList.add("selected");

        }



        div.innerHTML=`

            <h3>${character.name}</h3>

            <p>
            HP：
            ${character.currentHp}
            /
            ${character.maxHp}
            </p>


            <p>
            呪力：
            ${character.currentCursedPower}
            /
            ${character.maxCursedPower}
            </p>


            <button>
            ${
            gameState.selectedActors.includes(character)
            ?
            "選択解除"
            :
            "選択"
            }
            </button>

        `;



        div.querySelector("button")
        .onclick=()=>{


            if(character.currentHp<=0){

                alert(
                "このキャラクターは戦闘不能です"
                );

                return;

            }



            if(
            gameState.selectedActors.includes(character)
            ){


                gameState.selectedActors =
                gameState.selectedActors.filter(
                    c=>c!==character
                );


            }
            else{


                if(
                gameState.selectedActors.length>=2
                ){

                    alert(
                    "行動できるのは2人までです"
                    );

                    return;

                }


                gameState.selectedActors.push(character);


            }



            displayBattleCharacters();


        };



        area.appendChild(div);


    });


}



// ===============================
// 敵表示
// ===============================

function displayEnemyCharacters(){


    const area =
    document.getElementById("enemyCharacters");


    area.innerHTML="";



    gameState.enemyCharacters.forEach(enemy=>{


        const div =
        document.createElement("div");



        div.className="character";



        div.innerHTML=`

            <h3>
            ${enemy.name}
            </h3>


            <p>
            HP：
            ${enemy.currentHp}
            /
            ${enemy.maxHp}
            </p>

        `;


        area.appendChild(div);


    });


}




// ===============================
// 手札表示
// ===============================

function displayHand(){


    const area =
    document.getElementById("hand");


    if(!area)return;



    area.innerHTML="";



    gameState.hand.forEach((card,index)=>{


        const div =
        document.createElement("div");



        div.className="card";



        div.innerHTML=`

            <h3>
            ${card.name}
            </h3>


            <p>
            ${card.type}
            </p>


            <button>
            使用
            </button>

        `;



        div.querySelector("button")
        .onclick=()=>{


            useCard(index);


        };



        area.appendChild(div);


    });


}



// ===============================
// バトル画面
// ===============================

function showBattleScreen(){


const app =
document.getElementById("app");



app.innerHTML=`

<div class="battle">


<h1>バトル</h1>



<h2>敵チーム</h2>

<div id="enemyCharacters"></div>



<hr>



<p>
山札：
<span id="deckCount"></span>
枚
</p>



<h2>味方</h2>


<p>
行動選択：
<span id="actorCount">
0
</span>
/
2
</p>



<div id="playerCharacters"></div>



<button id="startAction">
行動開始
</button>



<h2>手札</h2>

<div id="hand"></div>



<button id="endTurn">
ターン終了
</button>



</div>

`;



displayEnemyCharacters();

displayBattleCharacters();

displayHand();

updateDeckCount();




document
.getElementById("endTurn")
.onclick=endTurn;




document
.getElementById("startAction")
.addEventListener("click", () => {

if(gameState.selectedActors.length===0){

    if(!confirm("行動せずターン終了しますか？")){
        return;
    }

    endTurn();
}

    startActionPhase();

});



}
// ===============================
// カード使用
// ===============================

function useCard(index){


    const card =
    gameState.hand[index];



    // 呪具
    if(card.type==="呪具"){


        showEquipmentTarget(index);

        return;

    }



    alert(
        card.name+
        "を使用しました！"
    );



    applyCardEffect(card);



    gameState.graveyard.push(card);



    gameState.hand.splice(index,1);



    displayHand();



}




// ===============================
// 呪具装備対象選択
// ===============================

function showEquipmentTarget(cardIndex){


const app =
document.getElementById("app");



let html=`

<div class="battle">


<h2>
装備するキャラクターを選択
</h2>


`;



gameState.battleCharacters.forEach(
(character,index)=>{


html+=`

<div class="character">


<h3>
${character.name}
</h3>


<button
onclick="
equipCard(${cardIndex},${index})
">

装備する

</button>


</div>


`;



});



html+=`

</div>

`;



app.innerHTML=html;



}



// ===============================
// 呪具装備処理
// ===============================

function equipCard(cardIndex,characterIndex){



const card =
gameState.hand[cardIndex];



const character =
gameState.battleCharacters[characterIndex];




// 装備制限

if(character.equipment.length>=1){


alert(
"このキャラクターは既に呪具を装備しています"
);


showBattleScreen();


return;


}




character.equipment.push(card);





// 効果適用

if(card.effect){



switch(card.effect.type){


case "attackUp":


character.attackBonus +=
card.effect.value;


break;



case "damageReduction":


character.damageReduction +=
card.effect.value;


break;



}

}



alert(

character.name+
"に"+
card.name+
"を装備しました！"

);



gameState.hand.splice(cardIndex,1);



gameState.graveyard.push(card);



showBattleScreen();



}




// ===============================
// カード効果
// ===============================

function applyCardEffect(card){



switch(card.type){



case "領域":

    gameState.currentField = card;

    alert(card.name + "を展開しました！");

    break;


alert(

card.name+
"を展開しました！"

);



// 後で領域システム追加


break;




case "サポート":


alert(

card.name+
"の効果発動！"

);



// 後でサポート効果追加


break;




case "必殺":


alert(

card.name+
"必殺カードを使用！"

);


// 必殺処理は④で追加


break;



}



}



// ===============================
// 必殺カード枚数確認
// ===============================

function getUltimateCardCount(){


return gameState.hand.filter(

card=>
card.type==="必殺"

).length;



}




// ===============================
// 必殺カード消費
// ===============================

function consumeUltimateCards(count){



let used=0;



for(
let i=gameState.hand.length-1;
i>=0;
i--
){



if(
gameState.hand[i].type==="必殺"
){



gameState.graveyard.push(
gameState.hand[i]
);



gameState.hand.splice(i,1);



used++;



if(used>=count){

break;

}



}



}



}
// ===============================
// 行動開始
// ===============================

function startActionPhase(){


gameState.currentActorIndex = 0;


showSkillSelect();


}



// ===============================
// スキル選択画面
// ===============================

function showSkillSelect(){



const actor =
gameState.selectedActors[
gameState.currentActorIndex
];



const data =
characters[actor.id];



const app =
document.getElementById("app");



let html=`

<div class="battle">


<h1>
${actor.name}
</h1>


<h2>
スキル選択
</h2>



`;




data.skills.forEach(
(skill,index)=>{


let ct =
actor.cooldowns[skill.name] || 0;



html+=`

<button

onclick="
selectSkill(${index})
"

${ct>0?"disabled":""}

>

${skill.name}

<br>

消費呪力:${skill.cost || 0}

${ct>0?
" CT:"+ct
:""}

</button>

<br><br>

`;


});




html+=`

<button onclick="selectUltimate()">

必殺技

</button>



</div>

`;



app.innerHTML=html;



}





// ===============================
// スキル決定
// ===============================

function selectSkill(index){


const actor =
gameState.selectedActors[
gameState.currentActorIndex
];



const skill =
characters[actor.id].skills[index];



gameState.selectedSkill = skill;

if (skill.costCard) {

    if (getUltimateCardCount() < skill.costCard) {
        alert("必殺カード不足");
        return;
    }

    consumeUltimateCards(skill.costCard);

}

    if (skill.attackType === "回復") {
        showHealTarget();
        return;
    }

    if (skill.target === "全体") {
        attackAllEnemies();
        return;
    }

    showEnemySelect();


}



// ===============================
// 敵選択
// ===============================

function showEnemySelect(){



const app =
document.getElementById("app");



let html=`

<div class="battle">

<h2>

攻撃対象を選択

</h2>

`;



gameState.enemyCharacters.forEach(
(enemy,index)=>{


if(enemy.currentHp<=0)
return;



html+=`

<div class="character">


<h3>
${enemy.name}
</h3>


<p>

HP:
${enemy.currentHp}
/${enemy.maxHp}

</p>



<button

onclick="
attackEnemy(${index})
"

>

攻撃

</button>



</div>


`;



});



html+="</div>";



app.innerHTML=html;



}





// ===============================
// 攻撃処理
// ===============================

function attackEnemy(index){



const actor =
gameState.selectedActors[
gameState.currentActorIndex
];



const skill =
gameState.selectedSkill;



if(
actor.currentCursedPower <
(skill.cost || 0)
){


alert("呪力不足");


showSkillSelect();


return;


}



// 呪力消費

actor.currentCursedPower -=
(skill.cost || 0);





// CT

if(skill.ct){


actor.cooldowns[skill.name]
=
skill.ct;


}

const damage = calculateDamage(actor, skill);

const enemy =
gameState.enemyCharacters[index];



enemy.currentHp -= damage;



if(enemy.currentHp<0)
enemy.currentHp=0;



alert(

actor.name+
"の"+
skill.name+
"！\n\n"+
enemy.name+
"に"+
damage+
"ダメージ！"

);

if (checkBattleEnd()) {
    return;
}

nextActor();

}





// ===============================
// 全体攻撃
// ===============================

function attackAllEnemies(){



const actor =
gameState.selectedActors[
gameState.currentActorIndex
];


const skill =
gameState.selectedSkill;



if(
actor.currentCursedPower <
(skill.cost || 0)
){

alert("呪力不足");

return;

}



actor.currentCursedPower -=
(skill.cost || 0);

// CT
if(skill.ct){
    actor.cooldowns[skill.name] = skill.ct;
}


gameState.enemyCharacters.forEach(
enemy=>{


if(enemy.currentHp<=0)
return;

const damage = calculateDamage(actor, skill);


enemy.currentHp-=damage;



if(enemy.currentHp<0)
enemy.currentHp=0;



});


alert(
skill.name+
"で敵全体を攻撃！"
);

if (checkBattleEnd()) {
    return;
}

nextActor();


}
// ===============================
// 単体回復
// ===============================

function showHealTarget(){

    const app = document.getElementById("app");

    let html = `
    <div class="battle">
        <h2>回復する味方を選択</h2>
    `;

    gameState.battleCharacters.forEach((character,index)=>{

        if(character.currentHp<=0) return;

        html += `
        <div class="character">
            <h3>${character.name}</h3>

            <p>
            HP：
            ${character.currentHp}
            /
            ${character.maxHp}
            </p>

            <button onclick="healCharacter(${index})">
            回復
            </button>

        </div>
        `;
    });

    html += "</div>";

    app.innerHTML = html;

}



function healCharacter(index){

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill = gameState.selectedSkill;

// 呪力不足
if(actor.currentCursedPower < (skill.cost || 0)){
    alert("呪力不足");
    showSkillSelect();
    return;
}

// 呪力消費
actor.currentCursedPower -= (skill.cost || 0);

// CT設定
if(skill.ct){
    actor.cooldowns[skill.name] = skill.ct;
}

    const target =
        gameState.battleCharacters[index];

    target.currentHp += skill.heal;

    if(target.currentHp > target.maxHp){

        target.currentHp = target.maxHp;

    }

    alert(
        actor.name +
        "の" +
        skill.name +
        "！\n\n" +
        target.name +
        "が" +
        skill.heal +
        "回復！"
    );

    nextActor();

}



// ===============================
// 全体回復
// ===============================

function healAllCharacters(){

    const actor =
        gameState.selectedActors[
            gameState.currentActorIndex
        ];

    const skill =
        gameState.selectedSkill;
        
        // 呪力不足
if(actor.currentCursedPower < (skill.cost || 0)){
    alert("呪力不足");
    showSkillSelect();
    return;
}

// 呪力消費
actor.currentCursedPower -= (skill.cost || 0);

// CT設定
if(skill.ct){
    actor.cooldowns[skill.name] = skill.ct;
}

    gameState.battleCharacters.forEach(character=>{

        if(character.currentHp<=0) return;

        character.currentHp += skill.heal;

        if(character.currentHp > character.maxHp){

            character.currentHp = character.maxHp;

        }

    });

    alert(
        actor.name +
        "の" +
        skill.name +
        "！\n\n味方全体が回復！"
    );

    nextActor();

}





// ===============================
// 次のキャラへ
// ===============================

function nextActor(){



gameState.selectedActors[
gameState.currentActorIndex
].hasActed=true;



gameState.currentActorIndex++;





if(
gameState.currentActorIndex <
gameState.selectedActors.length
){


showSkillSelect();


}else{


gameState.selectedActors=[];


enemyTurn();


}



}





// ===============================
// 必殺技
// ===============================

function selectUltimate(){



const actor =
gameState.selectedActors[
gameState.currentActorIndex
];



const ultimate =
characters[actor.id].ultimate;



if(
getUltimateCardCount()
<
ultimate.costCard
){


alert(
"必殺カード不足"
);


return;


}

if(actor.currentCursedPower < (ultimate.cost || 0)){
    alert("呪力不足");
    return;
}




consumeUltimateCards(
    ultimate.costCard
);

gameState.selectedSkill = ultimate;

// 味方単体回復
if (ultimate.attackType === "回復") {

    showHealTarget();

    return;

}

if (ultimate.target === "味方全体") {

    healAllCharacters();

    return;

}

// 敵全体攻撃
if (ultimate.target === "全体") {

    attackAllEnemies();

    return;

}

// 単体攻撃
showEnemySelect();



}
// ===============================
// 敵ターン
// ===============================

function enemyTurn(){


const enemiesAlive =
gameState.enemyCharacters.filter(
enemy=>enemy.currentHp>0
);



if(enemiesAlive.length===0){

showBattleResult("win");

return;

}





enemiesAlive.forEach(enemy=>{


const targets =
gameState.battleCharacters.filter(
character=>character.currentHp>0
);



if(targets.length===0)
return;




// ランダム攻撃

const target =
targets[
Math.floor(
Math.random()*targets.length
)
];




// 敵攻撃力

let damage =
enemy.attack || 30;




// 味方のダメージ軽減

damage -=
target.damageReduction;



if(damage<0)
damage=0;




target.currentHp -= damage;



if(target.currentHp<0)
target.currentHp=0;



alert(

enemy.name+
"の攻撃！\n\n"+
target.name+
"に"+
damage+
"ダメージ！"

);



});





// 敗北確認

const alivePlayer =
gameState.battleCharacters.filter(
character=>character.currentHp>0
);



if(alivePlayer.length===0){


showBattleResult("lose");


return;


}




// 次ターン

setTimeout(()=>{


startPlayerTurn();



},700);



}







// ===============================
// 味方ターン開始
// ===============================

function startPlayerTurn(){



// ドロー

if(!drawCard()){

return;

}

if(gameState.currentField){

    const effects = Array.isArray(gameState.currentField.effect)
        ? gameState.currentField.effect
        : [gameState.currentField.effect];

    effects.forEach(effect=>{

        if(effect.type==="allCursedPowerRecovery"){

            gameState.battleCharacters.forEach(character=>{

                character.currentCursedPower = Math.min(
                    character.maxCursedPower,
                    character.currentCursedPower + effect.value
                );

            });

        }

    });

}



gameState.battleCharacters.forEach(
character=>{



// 呪力回復

character.currentCursedPower =
Math.min(

character.maxCursedPower,

character.currentCursedPower +
character.cursedPowerRecovery

);




// 行動済み解除

character.hasActed=false;





// CT減少

for(
const skill in character.cooldowns
){


character.cooldowns[skill]--;



if(
character.cooldowns[skill]<=0
){

delete character.cooldowns[skill];


}



}



});



gameState.selectedActors=[];



showBattleScreen();



alert(
"味方のターン"
);



}







// ===============================
// ダメージ計算
// ===============================

function calculateDamage(
actor,
skill
){


let damage =
skill.damage || 0;




// 複数攻撃

if(skill.hits){

damage *= skill.hits;

}




// 装備補正

damage +=
actor.attackBonus;

if(gameState.currentField){

    const effects = Array.isArray(gameState.currentField.effect)
        ? gameState.currentField.effect
        : [gameState.currentField.effect];

    effects.forEach(effect=>{

        switch(effect.type){

            case "allDamageDown":
                damage -= effect.value;
                break;

            case "techniqueDamageUp":
                if(characters[actor.id].type==="術"){
                    damage += effect.value;
                }
                break;

            case "bodyDamageUp":
                if(characters[actor.id].type==="体"){
                    damage += effect.value;
                }
                break;

        }

    });

}


return damage;



}







// ===============================
// 勝敗確認
// ===============================

function checkBattleEnd(){



const enemies =
gameState.enemyCharacters.filter(
enemy=>enemy.currentHp>0
);



if(enemies.length===0){


showBattleResult("win");


return true;


}





const players =
gameState.battleCharacters.filter(
character=>character.currentHp>0
);



if(players.length===0){


showBattleResult("lose");


return true;


}



return false;


}







// ===============================
// 結果画面
// ===============================

function showBattleResult(result){



const app =
document.getElementById("app");



if(result==="win"){



app.innerHTML=`

<div class="battle">


<h1>
勝利！
</h1>


<button onclick="showTitle()">

タイトルへ戻る

</button>


</div>

`;



}else{


app.innerHTML=`

<div class="battle">


<h1>
敗北…
</h1>


<button onclick="showTitle()">

タイトルへ戻る

</button>


</div>

`;



}


}