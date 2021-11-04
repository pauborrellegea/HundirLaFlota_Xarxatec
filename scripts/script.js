//funcion para crear tablas con document.createElement("tr") en el document.querySelector(#tableroJugador)



import Barcos from "./barcos.js";


var vidaJugador = 4;
var vidaIA = 4;

//turno de atacar
var turno;
inicioPartida(10,10);
jugar();

function jugar(){

    turno = 0;
}