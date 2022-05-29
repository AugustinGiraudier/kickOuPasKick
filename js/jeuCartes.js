
var EndGame = false;

function startGame(nbrCartes){
    nbrCartes = parseInt(nbrCartes);

    // Gestion d'erreur
    if(nbrCartes < 2 || nbrCartes > 5){
        console.log("erreur d'input dans la fonction de jeu...");
        return;
    }

    // Lancement du jeu :

    document.getElementById("page_1").classList.add("hide");
    document.getElementById("page_2").classList.remove("hide");


    let kickCard = getRandom(0,nbrCartes);

    for(let i=0; i<nbrCartes; i++){
        if(i == kickCard)
            addCardTo("cards", true);
        else
            addCardTo("cards", false);
    }

}


function addCardTo(pannelId, kick){

    let div = document.getElementById(pannelId);
    let divAdd = document.createElement("div")
    divAdd.className = "carte";
    divAdd.onclick = function(){CardClick(divAdd);};
    div.appendChild(divAdd);

    if(kick)
        divAdd.innerHTML = `
            <div class="carte-inner">
            <div class="carte-front">
                <img class="grow" src="./ressources/carte-kick.png" alt="">
            </div>
            <div class="carte-back">
                <img class="grow" src="./ressources/carte-back.png" alt="">
            </div>
            </div>
        `
    else
        divAdd.innerHTML = `
        <div class="carte-inner">
        <div class="carte-front">
            <img class="grow" src="./ressources/carte-pasKick.png" alt="">
        </div>
        <div class="carte-back">
            <img class="grow" src="./ressources/carte-back.png" alt="">
        </div>
        </div>
        `

}

function CardClick(div){
    if(!EndGame)
        div.classList.add("carte-return");
    EndGame = true;
}