//funcion para crear tablas con document.createElement("tr") en el document.querySelector(#tableroJugador)
//En la pantalla de selección de barcos, hacer un remove child de Ul->Li para pillar la primera posición. Habilitar el boton de Siguiente cuando se haya terminado de colocar cada barco.
import Barcos from "./barcos.js";

var vidaJugador = 4;
var vidaIA = 4;
var turno;
var tableroIA = undefined;
var indicadores = new Array('B','S', 'C', 'P');

jugar();

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
            td.setAttribute('id','x'+i+'y'+j)
            td.setAttribute('class','casilla');
            tr.appendChild(td);
        }
    }
    document.getElementById(cajaTabla).insertBefore(tabla,document.getElementById("SeleccionJugador").childNodes[0]);
    colocarCasillas();
}
function colocarCasillas(){
    let casilla=document.getElementsByClassName("casilla");
    for(let i=0;i<casilla.length;i++){
        console.log(casilla[i]);
        casilla[i].addEventListener("click",function(){
            alert("Soy la casilla: "+ casilla[i].getAttribute("id"));
    });
}
}

function jugar(){    
    inicioPartida(10,10);
    turno = 0;
}

function crearTablero(filas, columnas){

    var matriz;
    matriz = new Array(filas);

    for(var i = 0; i < matriz.length; i++)
    {
        matriz[i] = new Array(columnas);
    }
    

    return matriz;
}

function inicializarTablero(matriz, estado){

    for(var x = 0; x <matriz.length; x++)
    {
        for(var y = 0; y <matriz[x].length; y++)
        {
            matriz[x][y] = estado;
            
        }   
    }
}

function mostrarTablero(tablero)
{
    var aux;
    for(var x = 0; x <tablero.length; x++)
    {
        aux = '';
        for(var y = 0; y <tablero[x].length; y++)
        {
            aux+= tablero[x][y] + '\t';
        }
        console.log(aux);   
    }  
}

function inicioPartida(filas, columnas)
{
    var tableroJugador = crearTablero(filas, columnas);
    tableroIA = crearTablero(filas, columnas);
    
    inicializarTablero(tableroJugador, 'a');
    inicializarTablero(tableroIA, 'a');


    colocarBarcosIA(); 
}


function colocarBarcosIA(){
    var posicionX, posicionY, orientacion, longitud;
    var posInicialX = 10;
    var posInicialY = 10;
    var posiciones;

    for(var i = 4; i > 0; i--){
        longitud = i;
        orientacion = parseInt(random(0,2)); //devuelve 0 (horizontal) y 1 (vertical)

        posiciones = comprobarPosiciones(orientacion, longitud);

        colocarBarcos(posiciones[0], posiciones[1], indicadores[longitud-1], longitud, orientacion);
    }

    mostrarTablero(tableroIA);
}

function comprobarPosiciones(orientacion, longitud){
    var noPosicion = true;

    var posInicialX = undefined;
    var posInicialY = undefined;
    while(noPosicion)
    {
        posInicialX = parseInt(random(0, 10)); //devuelve la posicion donde irá el extremo del barco
        posInicialY = parseInt(random(0, 10)); //devuelve la posicion donde irá el extremo del barco
        
        if(orientacion == 0){
            if(posInicialY + longitud < 10)
            {  
                noPosicion = !comprobarCasillaVacia(posInicialX, posInicialY, longitud, orientacion);
            }
        }
        else{
            if(posInicialX + longitud < 10)
            { 
                noPosicion = !comprobarCasillaVacia(posInicialX, posInicialY, longitud, orientacion);
            }
        }
    }
    var posiciones = new Array(2);
    posiciones[0] = posInicialX;
    posiciones[1] = posInicialY;
    return posiciones;

}

function comprobarCasillaVacia(posInicialX, posInicialY, longitud, orientacion){
    var nuevaX, nuevaY;  
    for(var i = 0; i < longitud; i++){
        nuevaX = orientacion==1?posInicialX+i:posInicialX;
        nuevaY = orientacion==0?posInicialY+i:posInicialY;
        if(tableroIA[nuevaX][nuevaY] != 'a'){return false;}
    }
    return true;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
  }

function colocarBarcos(X, Y, indicador, longitud, orientacion)
{
    for(var i = 0; i < longitud; i++){
        if(orientacion == 1){

        tableroIA[X+i][Y] = indicador;
    }
    else
        {
            tableroIA[X][Y+i] = indicador;
        }
    }
}

