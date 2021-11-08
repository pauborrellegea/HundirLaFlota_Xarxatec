//funcion para crear tablas con document.createElement("tr") en el document.querySelector(#tableroJugador)
//En la pantalla de selección de barcos, hacer un remove child de Ul->Li para pillar la primera posición. Habilitar el boton de Siguiente cuando se haya terminado de colocar cada barco.


import Barcos from "./barcos.js";

document.getElementById("contenedorTableros").style.visibility="hidden";
document.getElementById("SeleccionJugador").style.visibility="hidden";

document.getElementById("botonJugar").addEventListener("click", function() {
    const list = document.getElementById("contenedorBoxJugar");
    list.parentNode.removeChild(list);
    document.getElementById("SeleccionJugador").style.visibility="visible";
    var x = document.getElementsByClassName("contenedorJugar");    
    for (var i = 0; i<x.length; i++) {
        x[i].classList.remove("enfoque");
     }
  });
document.getElementById("botonSiguiente").addEventListener("click", function() {
    const list = document.getElementById("SeleccionJugador");
    list.parentNode.removeChild(list);
    document.getElementById("contenedorTableros").style.visibility="visible";
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