function pageLoaded(){
    onRangeChange();
}


var angle = getRandom(0,360);

function createChart(pourcentage){

    const color = d3.scaleOrdinal(['#E32819', '#286328']);
    const data = [pourcentage,100-pourcentage];
    const radius = 200;
    const g = d3.select('svg')
    .append('g')
    .attr('transform', `translate(${radius}, ${radius})`);

    const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(radius);

    const arcs = d3.pie()(data);

    g.selectAll('path')
    .data(arcs)
    .enter()
    .append('path')
    .attr('d', arc)
    .style('fill', (d, i) => color(i));

}

function onRangeChange(){
    document.querySelector("#cpt").innerHTML = document.querySelector("#range").value + "%";
}

function getSettings(){
    createChart(document.querySelector("#range").value);
    document.querySelector("#roue").style.transform="rotateZ("+ angle +"deg)";

    document.querySelector("#titreRoue").innerHTML = document.querySelector("#range").value + "% de kick";

    document.querySelector("#page_1").classList.add("hide");
    document.querySelector("#page_2").classList.remove("hide");
}

function StartGame(){

    document.querySelector("#btn-start").classList.add("hide");
    const PourcentKick = document.querySelector("#range").value;
    var roue = document.querySelector("#roue");

    var angleChange = getRandom(50,91); // vitesse de départ (90 - 50)

    const TimeBetweenUpdate = 25;
    const TimeBetweenDeceleration = 500;
    const SpeedDecelerationFactor = getRandom(2,6); // (2 - 5)
    const TimeBeforeStop = (angleChange/SpeedDecelerationFactor) * TimeBetweenDeceleration;

    let inter = setInterval(function(){
        angle += angleChange;
        roue.style.transform="rotateZ("+ angle +"deg)";
    }, TimeBetweenUpdate);

    let inter2 = setInterval(function(){
        angleChange -= SpeedDecelerationFactor;
    }, TimeBetweenDeceleration);

    let inter3 = setInterval(function(){
        clearInterval(inter);
        clearInterval(inter2);
        clearInterval(inter3);
        if(SayIfKick(PourcentKick, angle%360)){
            document.getElementById("img_logo").src = "./ressources/kick.png";
            document.querySelector("#fleche").src = "./ressources/flecheRouge.png";
        }
        else{
            document.getElementById("img_logo").src = "./ressources/pasKick.png";
            document.querySelector("#fleche").src = "./ressources/flecheVerte.png";
        }
    }, TimeBeforeStop);
}

function SayIfKick(PourcentageKick, AngleMod){

    if(PourcentageKick >= 50){
        var redAngle = ((PourcentageKick * 360) / 100);
        if(AngleMod< 90 || AngleMod > 360 - (redAngle-90))
            return true;
        else
            return false;
    }
    else{
        var redAngle = ((PourcentageKick * 360) / 100);
        if(AngleMod< 90 || AngleMod > 90 + redAngle)
            return false;
        else
            return true;
    }

}