// =====================================
// 本格ガチャ演出
// =====================================

function playCinematicGacha(results) {

    const app = document.getElementById("app");

    const highest = getHighestRarity(results);

    const rarityClass = highest.toLowerCase();

    app.innerHTML = `

<div class="gacha-cinematic rarity-${rarityClass}">

    <div class="gacha-cinematic-dark"></div>

    <div class="gacha-cinematic-vortex"></div>

    <div class="gacha-particle-layer"
         id="particleLayer">
    </div>

    <div class="gacha-circle-group"
         id="circleGroup">

        <div class="gacha-magic-circle outer"></div>

        <div class="gacha-magic-circle middle"></div>

        <div class="gacha-magic-circle inner"></div>

    </div>

    <div
        class="gacha-energy-core"
        id="energyCore">

        <span>〇</span>

    </div>

    <div
        class="gacha-lightning-layer">

        <div
            class="gacha-lightning one">
        </div>

        <div
            class="gacha-lightning two">
        </div>

        <div
            class="gacha-lightning three">
        </div>

    </div>

    <div
        class="gacha-crack"
        id="crack">

        <div class="gacha-crack-line"></div>
        <div class="gacha-crack-line"></div>
        <div class="gacha-crack-line"></div>
        <div class="gacha-crack-line"></div>
        <div class="gacha-crack-line"></div>

    </div>

    <div
        class="gacha-full-flash"
        id="flash">
    </div>

    <div
        class="
            gacha-rarity-title
            rarity-${rarityClass}
        "
        id="rarityTitle">

        ${highest}

    </div>

    <div
        class="gacha-cinematic-message"
        id="message">

        呪力を集束中…

    </div>

    <button
        class="gacha-cinematic-skip"
        id="skipButton">

        スキップ

    </button>

</div>

`;

    createParticles();

    startCinematic(results);
}
function createParticles() {

    const layer =
        document.getElementById(
            "particleLayer"
        );

    for(let i=0;i<120;i++){

        const p =
            document.createElement("div");

        p.className =
            "gacha-energy-particle";

        p.style.setProperty(
            "--particle-x",
            (Math.random()*900-450)+"px"
        );

        p.style.setProperty(
            "--particle-y",
            (Math.random()*900-450)+"px"
        );

        p.style.animationDelay =
            (Math.random()*2)+"s";

        layer.appendChild(p);

    }

}
function startCinematic(results){
    
    const card =
    document.getElementById(
        "gachaCard"
    );

const cardImage =
    document.getElementById(
        "gachaCardImage"
    );
    
    

    const core =
        document.getElementById(
            "energyCore"
        );

    const circles =
        document.getElementById(
            "circleGroup"
        );

    const crack =
        document.getElementById(
            "crack"
        );

    const flash =
        document.getElementById(
            "flash"
        );

setTimeout(()=>{

    const first =

        results[0];

    cardImage.src =

        first.image || "";

    // LR・CHARACTERならスマホを振動

    if(

        first.rarity==="LR"

        ||

        first.rarity==="CHARACTER"

    ){

        navigator.vibrate?.(

            [150,80,150]

        );

    }

    card.classList.add(

        "fly"

    );

},3600);

setTimeout(()=>{

    card.classList.add(
        "flip"
    );

},4700);

    const rarity =
        document.getElementById(
            "rarityTitle"
        );

    const message =
        document.getElementById(
            "message"
        );

    const skip =
        document.getElementById(
            "skipButton"
        );

    let finished = false;

    function finish(){

        if(finished) return;

        finished = true;

        showGachaResult(results);

    }

    skip.onclick = finish;

    setTimeout(()=>{

        core.classList.add(
            "charging"
        );

        circles.classList.add(
            "charging"
        );

        message.textContent =
            "呪力増幅";

    },1000);

    setTimeout(()=>{

        document
        .querySelectorAll(
            ".gacha-lightning"
        )
        .forEach(e=>{

            e.classList.add(
                "active"
            );

        });

    },2200);

    setTimeout(()=>{

        crack.classList.add(
            "active"
        );

        document
        .querySelector(
            ".gacha-cinematic"
        )
        .classList.add(
            "impact"
        );

    },2700);

    setTimeout(()=>{

        flash.classList.add(
            "active"
        );

    },3200);

    setTimeout(()=>{

        rarity.classList.add(
            "active"
        );

        message.textContent =
            "召喚成功";

    },3500);

    setTimeout(

        finish,

        6500

    );

}
// =====================================
// 最高レアリティ取得
// =====================================

function getHighestRarity(results) {

    const rarityOrder = {
        N: 0,
        R: 1,
        SR: 2,
        SSR: 3,
        UR: 4,
        LR: 5,
        CHARACTER: 6
    };

    let highest = "N";

    results.forEach(result => {

        const rarity =
            result.rarity ?? "N";

        if (
            (rarityOrder[rarity] ?? 0) >
            (rarityOrder[highest] ?? 0)
        ) {

            highest = rarity;

        }

    });

    return highest;
}