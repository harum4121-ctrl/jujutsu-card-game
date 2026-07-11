console.log(characters);
let selectedCharacters = [];


// キャラクター一覧表示

function showCharacters(){

    const list = document.getElementById("characterList");


    for(let key in characters){

        const char = characters[key];


        const card = document.createElement("div");

        card.className = "character";


        card.innerHTML = `

            <h3>${char.name}</h3>

            <p>タイプ：${char.type}</p>

            <p class="hp">
            HP：${char.hp}
            </p>

            <p class="cursed">
            呪力：${char.cursedPower}
            </p>

            <button>
            選択
            </button>

        `;


        card.querySelector("button")
        .addEventListener("click",()=>{

            selectCharacter(key);

        });


        list.appendChild(card);

    }

}



// キャラクター選択

function selectCharacter(id){


    // 3体制限

    if(selectedCharacters.length >= 3){

        alert("キャラクターは3体までです");

        return;

    }


    // 同じキャラ重複防止

    if(selectedCharacters.includes(id)){

        alert("このキャラクターは選択済みです");

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


        const div=document.createElement("div");


        div.className="character";


        div.innerHTML=`

        <h3>${char.name}</h3>

        <button>
        解除
        </button>

        `;


        div.querySelector("button")
        .addEventListener("click",()=>{


            selectedCharacters =
            selectedCharacters.filter(
                x=>x!==id
            );


            updateSelected();


        });


        area.appendChild(div);


    });

}



// バトル開始

document
.getElementById("startBattle")
.addEventListener("click",()=>{


    if(selectedCharacters.length !== 3){

        alert("3体選択してください");

        return;

    }



    document
    .getElementById("selectScreen")
    .style.display="none";


    document
    .getElementById("game")
    .style.display="block";



    console.log(
        "編成:",
        selectedCharacters
    );


});



// 起動

showCharacters();