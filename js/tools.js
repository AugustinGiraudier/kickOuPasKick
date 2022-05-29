function PageLoaded(){
    console.log("Game Loaded : Kick ou pas Kick v0.1\n Author : Augustin Giraudier");
}
function ReloadPage(path="./index.html"){
    window.location = path;
}
function getRandom(min, max) {
    return parseInt(Math.random() * (max - min) + min);
}