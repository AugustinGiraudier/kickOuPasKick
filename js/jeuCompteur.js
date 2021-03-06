
/* Variables globales */

var SleepTiming1 = 90;
var SleepTiming2 = 300;
var SleepTiming3 = 500;

var NbChoisi = -1;
var NbChance = -1;

var NumCpt2 = 1;
var cpt2;


function StartGame(){

    ResetErrorMessages();


    NbChance = parseInt(document.getElementById("inp_nb_chance").value);
    NbChoisi = parseInt(document.getElementById("inp_nb").value);

    // Gestion d'erreurs :
    if(!verifNbr(NbChance)){
        document.getElementById("err-1").classList.remove('hide');
        return;
    }
    if(!verifNbr(NbChoisi)){
        document.getElementById("err-2").classList.remove('hide');
        return;
    }
    if(NbChoisi > NbChance){
        document.getElementById("err-2").classList.remove('hide');
        return;
    }


    //prepare l'affichage :
    cpt2 = document.getElementById("cpt2");
    NumCpt2 = getRandom(0, NbChance);   
    cpt2.innerHTML = NumCpt2;
    document.getElementById("cpt1").innerHTML = NbChoisi;
    document.getElementById("titre_cpt2").innerHTML = "Tirage entre 1 et " + NbChance; 
    // cache la premiere page : 
    document.getElementById("first_page").classList.add("hide");
    // fait apparaitre la deuxieme : 
    document.getElementById("second_page").classList.remove("hide");
    // retour au haut de page
    scroll(0,0)
    // lancer le tirage :
    tirage(getRandom(30,50));
}

function verifNbr(nombre){
    if(isNaN(nombre) || nombre < 1)
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
    if(NumCpt2 == NbChance)
        NumCpt2 = 1;
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

function ResetErrorMessages(){
    if(!document.getElementById("err-1").classList.contains('hide'))
        document.getElementById("err-1").classList.add('hide');
    if(!document.getElementById("err-2").classList.contains('hide'))
        document.getElementById("err-2").classList.add('hide');
}