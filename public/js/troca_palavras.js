function muda_palavra(){
    document.getElementsByTagName("strong")
    newtext = document.getElementById("palavra").value;

    console.log()

    palavra[0].innerHTML = newtext;
    palavra[1].innerHTML = newtext;
    palavra[2].innerHTML = newtext;
    palavra[3].innerHTML = newtext;
    palavra[4].innerHTML = newtext;

    for(i =0; i< palavra.length;i++){
    }
}

function start(){
    var newword = document.getElementById("palavra").value;

    document.getElementById("filme1").innerHTML = newword;
    document.getElementById("filme2").innerHTML = newword;
    document.getElementById("filme3").innerHTML = newword;
    document.getElementById("filme4").innerHTML = newword;
    document.getElementById("filme5").innerHTML = newword;
}