console.log(characters);
let selectedCharacters = [];


// キャラクター一覧表示
function showCharacterList(){

    const list =
    document.getElementById("characterList");


    for(let id in characters){

        const char = characters[id];


        const card = document.createElement("div");

        card.className = "character";


        card.innerHTML = `

            <h3>${char.name}</h3>

            <p>タイプ：${char.type}</p>

            <p>HP：${char.hp}</p>

            <p>呪力：${char.cursedPower}</p>

        `;


        card.onclick = function(){

            selectCharacter(id);

        };


        list.appendChild(card);

    }

}



// キャラクター選択
function selectCharacter(id){

    if(selectedCharacters.length >= 3){

        alert("3体まで選択できます");

        return;

    }


    if(selectedCharacters.includes(id)){

        alert("すでに選択しています");

        return;

    }


    selectedCharacters.push(id);


    updateSelected();

}



// 選択中表示
function updateSelected(){

    const area =
    document.getElementById("selectedCharacters");


    area.innerHTML="";


    selectedCharacters.forEach(id=>{

        const char = characters[id];


        const div =
        document.createElement("div");


        div.className="character";


        div.innerHTML =
        `
        <h3>${char.name}</h3>
        `;


        area.appendChild(div);

    });

}



// バトル開始
document
.getElementById("startBattle")
.onclick=function(){

    if(selectedCharacters.length !== 3){

        alert("キャラクターを3体選択してください");

        return;

    }


    document.getElementById("selectScreen")
    .style.display="none";


    document.getElementById("game")
    .style.display="block";


    console.log("編成完了",selectedCharacters);

};



// 起動
showCharacterList();