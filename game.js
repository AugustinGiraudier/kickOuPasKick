function PageLoaded(){
    console.log("Game Loaded : Kick ou pas Kick v0.1\n Author : Augustin Giraudier");
}
function ReloadPage(){
    window.location = "";
}

/* Variables globales */

var SleepTiming1 = 90;
var SleepTiming2 = 300;
var SleepTiming3 = 500;

var NbChoisi = -1;
var NbChance = -1;

var NumCpt2 = 0;
var cpt2;


function StartGame(){
    let nbrChance = parseInt(document.getElementById("inp_nb_chance").value);
    let nbrChoosen = parseInt(document.getElementById("inp_nb").value);

    if(verifNbr(nbrChance) && verifNbr(nbrChoosen)){
        NbChoisi = nbrChoosen;
        NbChance = nbrChance;
        if(NbChoisi > NbChance-1){
            console.log("Erreur : nombre choisi plus grand que le nombre de chances...")
            return;
        }
        //prepare l'affichage :
        cpt2 = document.getElementById("cpt2");
        NumCpt2 = getRandom(0, NbChance);   
        cpt2.innerHTML = NumCpt2;
        document.getElementById("cpt1").innerHTML = NbChoisi;
        document.getElementById("titre_cpt2").innerHTML = "Tirage entre 0 et " + (NbChance-1); 
        // cache la premiere page : 
        document.getElementById("first_page").classList.add("hide");
        // fait apparaitre la deuxieme : 
        document.getElementById("second_page").classList.remove("hide");
        // retour au haut de page
        scroll(0,0)
        // lancer le tirage :
        tirage(getRandom(30,50));

        return;
    }
    console.log("Erreur : nombres d'entrée incorrects...");
}

function verifNbr(nombre){
    if(isNaN(nombre) || nombre < 0)
        return false;
    return true;
}

async function tirage(nb){
    for(let iTirage=0; iTirage<nb; iTirage++){
        IncrementCpt();
        let remaining = nb-iTirage;
        if(remaining == 1)
            break;
        else if(remaining > 10)
            await (sleep(SleepTiming1));
        else if(remaining > 4)
            await (sleep(SleepTiming2));
        else
            await (sleep(SleepTiming3));
    }
    FinTirage();
}

function IncrementCpt(){
    if(NumCpt2 == NbChance-1)
        NumCpt2 = 0;
    else
        NumCpt2++;
    cpt2.innerHTML = NumCpt2;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function FinTirage(){
    document.getElementById("cpt2").style.color = "white";
    // perdu
    if(NumCpt2 == NbChoisi){
        document.getElementById("fond_cpt2").style.backgroundColor = "#E32819";
        document.getElementById("img_logo").src = "./ressources/kick.png";
    }
    // ouf !
    else{
        document.getElementById("fond_cpt2").style.backgroundColor = "#286328";
        document.getElementById("img_logo").src = "./ressources/pasKick.png";
    }

}

function getRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}