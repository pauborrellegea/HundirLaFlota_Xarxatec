//funcion para crear tablas con document.createElement("tr") en el document.querySelector(#tableroJugador)



import Barcos from "./barcos.js";

document.getElementById("botonJugar").addEventListener("click", function() {
    const list = document.getElementById("boxJugar");
    list.parentNode.removeChild(list);
    var x = document.getElementsByClassName("contenedorJugar");
    for (var i = 0; i<x.length; i++) {
        x[i].classList.remove("enfoque");
     }
  });
    

var vidaJugador = 4;
var vidaIA = 4;

//turno de atacar
var turno;
inicioPartida(10,10);
jugar();

function jugar(){    
    turno = 0;
}