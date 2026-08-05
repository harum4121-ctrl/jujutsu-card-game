function openSkillWindow(actor){

    const windowElement =
        document.getElementById("skillWindow");

    if(!windowElement) return;

    windowElement.classList.remove("hidden");

    windowElement.innerHTML = `
        <h2>${actor.name}</h2>

        <button>テストスキル</button>

        <button onclick="closeSkillWindow()">
            閉じる
        </button>
    `;

}

function closeSkillWindow(){

    document
        .getElementById("skillWindow")
        .classList.add("hidden");

}