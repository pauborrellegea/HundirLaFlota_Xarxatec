//funcion para crear tablas con document.createElement("tr") en el document.querySelector(#tableroJugador)
//En la pantalla de selección de barcos, hacer un remove child de Ul->Li para pillar la primera posición. Habilitar el boton de Siguiente cuando se haya terminado de colocar cada barco.


import Barcos from "./barcos.js";
//Iniciamos con las capas deshabilitadas para el usuario
document.getElementById("contenedorTableros").style.visibility="hidden";
document.getElementById("SeleccionJugador").style.visibility="hidden";
//Cuando pinchas al boton de Jugar quitamos la capa de la caja contenedora de Jugar y mostramos el tablero creado
// para que el usuario coloque los barcos
document.getElementById("botonJugar").addEventListener("click", function() {
    const list = document.getElementById("contenedorBoxJugar");
    list.parentNode.removeChild(list);
    document.getElementById("SeleccionJugador").style.visibility="visible";

    let cajaTabla = document.getElementById("SeleccionJugador");
    var x = document.getElementsByClassName("contenedorJugar");    
    for (var i = 0; i<x.length; i++) {
        x[i].classList.remove("enfoque");
     }
     crearTabla(10,"SeleccionJugador");
  });
  //Una vez guardada la posicion de los barcos removemos la capa de Posicionar barcos y mostramos la de jugar
document.getElementById("botonSiguiente").addEventListener("click", function() {
    const list = document.getElementById("SeleccionJugador");
    list.parentNode.removeChild(list);
    document.getElementById("contenedorTableros").style.visibility="visible";
});

function crearTabla(rows,cajaTabla){
    const tabla = document.createElement("table");
    
    const td = document.createElement("td"); 
    
    tabla.setAttribute('id','tableroJugador');
    tabla.setAttribute('class','tablero');
    for(let i=0;i<rows;i++){
        const tr = document.createElement("tr");
        tabla.appendChild(tr);
        for(let j=0;j<10;j++){
            const td = document.createElement("td"); 
            td.appendChild(document.createTextNode('X'))
            tr.appendChild(td);
        }
    }
    document.getElementById(cajaTabla).insertBefore(tabla,document.getElementById("SeleccionJugador").childNodes[0]);
}

var vidaJugador = 4;
var vidaIA = 4;

//turno de atacar
var turno;
inicioPartida(10,10);
jugar();

function jugar(){    
    turno = 0;
}