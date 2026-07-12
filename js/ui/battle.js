// ===============================
// バトル開始
// ===============================

function startBattle(){

    gameState.battleCharacters = [];
    gameState.enemyCharacters = [];
    gameState.selectedActors = [];
    gameState.currentField = null;


    // 味方生成
    gameState.selectedCharacters.forEach(id=>{

        const char = characters[id];

        gameState.battleCharacters.push({

            id:id,
            name:char.name,

            maxHp:char.hp,
            currentHp:char.hp,

            maxCursedPower:char.maxCursedPower,
            currentCursedPower:char.cursedPower,

            cursedPowerRecovery:
            char.cursedPowerRecovery,

            cooldowns:{},

            equipment:[],

            attackBonus:0,
            damageReduction:0

        });

    });



    // 敵生成
    for(const id in enemies){

        const enemy = enemies[id];

        gameState.enemyCharacters.push({

            id:id,

            name:enemy.name,

            maxHp:enemy.hp,
            currentHp:enemy.hp,

            attack:enemy.attack

        });

    }



    // デッキ
    gameState.drawPile=[
        ...gameState.deck
    ];

    gameState.drawPile.sort(
        ()=>Math.random()-0.5
    );


    gameState.hand=[];
    gameState.graveyard=[];


    // 初期手札
    for(let i=0;i<5;i++){
        drawCard();
    }


    showBattleScreen();

}



// ===============================
// バトル画面
// ===============================

function showBattleScreen(){

const app=document.getElementById("app");


app.innerHTML=`

<div class="battle">

<h1>バトル</h1>


<h2>敵</h2>

<div id="enemyCharacters"></div>



<h2>味方</h2>

<p>
行動選択
<span id="actorCount">0</span>/2
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



document
.getElementById("startAction")
.onclick=()=>{


if(gameState.selectedActors.length===0){

alert("行動するキャラクターを選択してください");
return;

}


gameState.currentActorIndex=0;

showSkillSelect();


};



document
.getElementById("endTurn")
.onclick=endTurn;


}



// ===============================
// 味方表示
// ===============================

function displayBattleCharacters(){

const area=
document.getElementById("playerCharacters");


area.innerHTML="";


gameState.battleCharacters.forEach(character=>{


const div=document.createElement("div");

div.className="character";


div.innerHTML=`

<h3>${character.name}</h3>

<p>
HP:
${character.currentHp}
/${character.maxHp}
</p>

<p>
呪力:
${character.currentCursedPower}
</p>


<button>
${
gameState.selectedActors.includes(character)
?"解除"
:"選択"
}

</button>

`;



div.querySelector("button")
.onclick=()=>{


if(gameState.selectedActors.includes(character)){


gameState.selectedActors =
gameState.selectedActors.filter(
c=>c!==character
);


}
else{


if(gameState.selectedActors.length>=2){

alert("2体までです");
return;

}


gameState.selectedActors.push(character);

}


displayBattleCharacters();


};



area.appendChild(div);


});


document
.getElementById("actorCount")
.textContent=
gameState.selectedActors.length;


}




// ===============================
// 敵表示
// ===============================

function displayEnemyCharacters(){

const area=
document.getElementById("enemyCharacters");


area.innerHTML="";


gameState.enemyCharacters.forEach(enemy=>{


const div=document.createElement("div");


div.className="character";


div.innerHTML=`

<h3>${enemy.name}</h3>

<p>
HP:${enemy.currentHp}
</p>

`;



area.appendChild(div);


});


}




// ===============================
// 手札
// ===============================

function drawCard(){

if(gameState.drawPile.length===0)
return;


gameState.hand.push(
gameState.drawPile.shift()
);


}



function displayHand(){

const area=
document.getElementById("hand");


area.innerHTML="";


gameState.hand.forEach((card,index)=>{


const div=document.createElement("div");


div.className="card";


div.innerHTML=`

<h3>${card.name}</h3>

<p>${card.type}</p>

<button>
使用
</button>

`;



div.querySelector("button")
.onclick=()=>useCard(index);



area.appendChild(div);


});


}



// ===============================
// スキル選択
// ===============================

function showSkillSelect(){

const actor=
gameState.selectedActors[
gameState.currentActorIndex
];


const data=
characters[actor.id];


const app=
document.getElementById("app");


let html=`

<div class="battle">

<h2>
${actor.name}
</h2>

<h3>
スキル選択
</h3>

`;



data.skills.forEach((skill,index)=>{


html+=`

<button onclick="selectSkill(${index})">

${skill.name}

<br>

消費呪力:${skill.cost || 0}

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
// スキル選択後
// ===============================

function selectSkill(index){


const actor =
gameState.selectedActors[
gameState.currentActorIndex
];


const skill =
characters[actor.id].skills[index];


gameState.selectedSkill = skill;



// 必殺カード消費
if(skill.costCard){


if(getUltimateCardCount() < skill.costCard){

alert("必殺カード不足");

return;

}


consumeUltimateCards(skill.costCard);

}




// 回復
if(skill.attackType==="回復"){


if(skill.target==="味方全体"){

healAllCharacters();

}
else{

showHealTarget();

}


return;

}



// 全体攻撃

if(skill.target==="全体"){


attackAllEnemies();

return;


}



// 単体攻撃

showEnemySelect();


}




// ===============================
// 敵選択
// ===============================

function showEnemySelect(){


const app=
document.getElementById("app");


let html=`

<div class="battle">

<h2>
攻撃対象を選択
</h2>

`;



gameState.enemyCharacters.forEach((enemy,index)=>{


if(enemy.currentHp<=0)
return;



html+=`

<div class="character">

<h3>
${enemy.name}
</h3>


<p>
HP:${enemy.currentHp}
</p>


<button onclick="attackEnemy(${index})">

攻撃

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
// 単体攻撃
// ===============================

function attackEnemy(index){


const actor =
gameState.selectedActors[
gameState.currentActorIndex
];


const skill =
gameState.selectedSkill;



if(actor.currentCursedPower < (skill.cost||0)){


alert("呪力不足");

showSkillSelect();

return;


}



// 呪力消費

actor.currentCursedPower -=
(skill.cost||0);



// CT

if(skill.ct){

actor.cooldowns[skill.name]=skill.ct;

}




let damage =
calculateDamage(actor,skill);



const enemy =
gameState.enemyCharacters[index];



enemy.currentHp -= damage;



if(enemy.currentHp<0)
enemy.currentHp=0;



alert(

actor.name+
"の"+
skill.name+
"\n"+
enemy.name+
"に"+
damage+
"ダメージ"

);



if(checkBattleEnd())
return;



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



if(actor.currentCursedPower < (skill.cost||0)){


alert("呪力不足");

showSkillSelect();

return;


}



actor.currentCursedPower -=
(skill.cost||0);



gameState.enemyCharacters.forEach(enemy=>{


if(enemy.currentHp<=0)
return;


let damage=
calculateDamage(actor,skill);


enemy.currentHp-=damage;



if(enemy.currentHp<0)
enemy.currentHp=0;



});



alert(
skill.name+
"で全体攻撃！"
);



if(checkBattleEnd())
return;


nextActor();


}



// ===============================
// 次の行動キャラ
// ===============================

function nextActor(){



gameState.currentActorIndex++;



if(
gameState.currentActorIndex
<
gameState.selectedActors.length
){


showSkillSelect();


}
else{


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



if(getUltimateCardCount()
<
ultimate.costCard){


alert("必殺カード不足");

return;


}



if(actor.currentCursedPower <
(ultimate.cost||0)){


alert("呪力不足");

return;


}



consumeUltimateCards(
ultimate.costCard
);



gameState.selectedSkill =
ultimate;



if(ultimate.target==="全体"){


attackAllEnemies();


return;


}



if(ultimate.attackType==="回復"){


if(ultimate.target==="味方全体"){

healAllCharacters();

}
else{

showHealTarget();

}


return;


}



showEnemySelect();


}




// ===============================
// 敵ターン
// ===============================

function enemyTurn(){



const enemiesAlive =
gameState.enemyCharacters.filter(
e=>e.currentHp>0
);



if(enemiesAlive.length===0){

showBattleResult("win");

return;

}



enemiesAlive.forEach(enemy=>{


const targets =
gameState.battleCharacters.filter(
c=>c.currentHp>0
);



if(targets.length===0)
return;



const target =
targets[
Math.floor(
Math.random()*targets.length
)
];



let damage =
enemy.attack || 30;



damage -=
target.damageReduction;



if(damage<0)
damage=0;



target.currentHp-=damage;



if(target.currentHp<0)
target.currentHp=0;



alert(

enemy.name+
"の攻撃\n"+
target.name+
"に"+
damage+
"ダメージ"

);


});



if(checkBattleEnd())
return;



setTimeout(()=>{

startPlayerTurn();

},500);



}




// ===============================
// プレイヤーターン開始
// ===============================

function startPlayerTurn(){



drawCard();



gameState.battleCharacters.forEach(character=>{


character.currentCursedPower =
Math.min(

character.maxCursedPower,

character.currentCursedPower+
character.cursedPowerRecovery

);



for(const skill in character.cooldowns){


character.cooldowns[skill]--;


if(character.cooldowns[skill]<=0){

delete character.cooldowns[skill];

}


}



});



showBattleScreen();


alert("味方ターン");


}



// ===============================
// ダメージ計算
// ===============================

function calculateDamage(actor,skill){


let damage =
skill.damage || 0;



if(skill.hits){

damage *= skill.hits;

}



damage += actor.attackBonus;



return damage;


}



// ===============================
// 必殺カード数
// ===============================

function getUltimateCardCount(){


return gameState.hand.filter(

card=>card.type==="必殺"

).length;


}



function consumeUltimateCards(count){


let used=0;


for(let i=gameState.hand.length-1;i>=0;i--){


if(gameState.hand[i].type==="必殺"){


gameState.graveyard.push(
gameState.hand[i]
);


gameState.hand.splice(i,1);


used++;


if(used>=count)
break;


}


}


}



// ===============================
// 勝敗
// ===============================

function checkBattleEnd(){



const enemyAlive =
gameState.enemyCharacters.some(
e=>e.currentHp>0
);



if(!enemyAlive){

showBattleResult("win");

return true;

}



const playerAlive =
gameState.battleCharacters.some(
c=>c.currentHp>0
);



if(!playerAlive){

showBattleResult("lose");

return true;

}



return false;


}



// ===============================
// 結果
// ===============================

function showBattleResult(result){


const app=
document.getElementById("app");


app.innerHTML=`

<div class="battle">

<h1>

${result==="win"
?"勝利！"
:"敗北…"
}

</h1>


<button onclick="showTitle()">

タイトルへ戻る

</button>


</div>

`;


}