//En la pantalla de selección de barcos, hacer un remove child de Ul->Li para pillar la primera posición. Habilitar el boton de Siguiente cuando se haya terminado de colocar cada barco.
import Barcos from "./barcos.js";

var vidaJugador = 4;
var vidaIA = 4;
var turnoColocacion = 4;
var tableroJugador = undefined;
var tableroIA = undefined;
var indicadores = new Array('B','S', 'C', 'P');
var arrayDeAtaques = new Array();

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
    let tablaJugador = document.getElementById("tableroJugador");
    console.log(tablaJugador);
    const list = document.getElementById("SeleccionJugador");
    let nuevaTablaJugador = list.cloneNode(true);
    list.parentNode.removeChild(list);
    document.getElementById("contenedorTableros").style.visibility="visible";
    let claseTablero = document.getElementsByClassName("tamanyoTableros");
    for(let i=0;i<claseTablero.length;i++){
        claseTablero[i].appendChild(nuevaTablaJugador);    
}
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
    infoCasillaPulsada();
}
function infoCasillaPulsada(){
    let casilla=document.getElementsByClassName("casilla");
    for(let i=0;i<casilla.length;i++){
        casilla[i].addEventListener("click",function(){
            if(turnoColocacion>0){ colocarBarcosJugador(casilla[i].getAttribute("id"));}
            else{
                ataqueJugador(casilla[i].getAttribute("id"));

                //Aqui debe desavtivarse la casilla que ha pulsado el jugador
            };

    });}
}

function jugar(){    
    inicioPartida(10,10);
    mostrarTablero(tableroIA);
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
    tableroJugador = crearTablero(filas, columnas);
    tableroIA = crearTablero(filas, columnas);
    
    inicializarTablero(tableroJugador, 'a');
    inicializarTablero(tableroIA, 'a');

    colocarBarcosIA(); 
    inicializarAtaques();
}

function inicializarAtaques(){
    
    var pos = '';

    for(var i = 0; i<100; i++){
        if(i < 10 ){pos = '0' + i.toString();}
        else{pos = i.toString();}

        arrayDeAtaques.push(pos);
    }
}

function colocarBarcosIA(){
    var orientacion, longitud, posiciones;

    for(var i = 4; i > 0; i--){
        longitud = i;
        orientacion = parseInt(random(0,2)); // 0 (horizontal) y 1 (vertical)

        posiciones = comprobarPosiciones(orientacion, longitud);

        colocarBarcos(posiciones[0], posiciones[1], indicadores[longitud-1], longitud, orientacion);
    }
}

function comprobarPosiciones(orientacion, longitud){
    var noPosicion = true;
    var posInicialX = undefined;
    var posInicialY = undefined;
    while(noPosicion)
    {
        posInicialX = parseInt(random(0, 10)); 
        posInicialY = parseInt(random(0, 10)); 
        
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

function comprobarCasillaVaciaJugador(posInicialX, posInicialY, longitud, orientacion){
    var nuevaX, nuevaY;
    if(orientacion == 0){
        if(posInicialX + longitud > 10){ return false;}
    }
    else{
        if(posInicialY + longitud > 10){ return false;}
    }
    for(var i = 0; i < longitud; i++){
        nuevaX = orientacion==1?posInicialX+i:posInicialX;
        nuevaY = orientacion==0?posInicialY+i:posInicialY;
        if(tableroJugador[nuevaX][nuevaY] != 'a'){return false;}
    }
    return true;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
  }

function colocarBarcos(X, Y, indicador, longitud, orientacion)
{
    for(var i = 0; i < longitud; i++){
        if(orientacion == 1) { tableroIA[X+i][Y] = indicador; }
        else { tableroIA[X][Y+i] = indicador;}
    }
}

function colocarBarcosJugador(coordenadas)
{
    var x = parseInt(coordenadas[1]);
    var y = parseInt(coordenadas[3]);
    var orientacionJugador = parseInt(random(0,2));
    var colocar = false;
    if(tableroJugador[x][y] == 'b')
    {
        alert("No se puede colocar");
    }
    else{

        colocar = comprobarCasillaVaciaJugador(x, y, turnoColocacion, orientacionJugador);
        if(colocar){
            for(var i = 0; i < turnoColocacion; i++){
                if(orientacionJugador == 0){ tableroJugador[x+i][y] = indicadores[turnoColocacion-1];}
                else{ tableroJugador[x][y+i] = indicadores[turnoColocacion-1];}
            }
            turnoColocacion--;
            let barcosRestantes = document.getElementById("barcosRestantes");
            barcosRestantes.removeChild(barcosRestantes.childNodes[0]);
        }
        else{alert("No se puede colocar");
        }
    }
}

function ataqueJugador(coordenadas)
{
    var xAtaque = parseInt(coordenadas[1]);
    var yAtaque = parseInt(coordenadas[3]);

    //console.log(tableroIA[xAtaque][yAtaque]);

    if(tableroIA[xAtaque][yAtaque] == 'P'){ alert("Portaviones tocado");vidaIA--;}
    else if(tableroIA[xAtaque][yAtaque] == 'S'){ alert("Submarino tocado");vidaIA--;}
    else if(tableroIA[xAtaque][yAtaque] == 'C'){ alert("Acorazado tocado");vidaIA--;}
    else if(tableroIA[xAtaque][yAtaque] == 'B'){ alert("Barco pequeño tocado y hundido");vidaIA--;}
    else{alert("Agua");}

    //condicion de victoria

    if(vidaIA == 0){ alert("Ganaste");}
    else{ ataqueIA();}
}


function ataqueIA()
{
    var posicionAtaque = arrayDeAtaques[parseInt(random(0, arrayDeAtaques.length))];
    var casillaAtacada = arrayDeAtaques[posicionAtaque];
    arrayDeAtaques.splice(posicionAtaque, 1);
    var xAtaque = casillaAtacada[0];
    var yAtaque = casillaAtacada[1];

    //console.log(tableroIA[xAtaque][yAtaque]);

    if(tableroJugador[xAtaque][yAtaque] == 'P'){ alert("Portaviones tocado"); vidaJugador--;}
    else if(tableroJugador[xAtaque][yAtaque] == 'S'){ alert("Submarino tocado"); vidaJugador--;}
    else if(tableroJugador[xAtaque][yAtaque] == 'C'){ alert("Acorazado tocado");vidaJugador--;}
    else if(tableroJugador[xAtaque][yAtaque] == 'B'){ alert("Barco pequeño tocado y hundido");vidaJugador--;}
    else{alert("Agua");}

    if(vidaJugador == 0){ alert("Perdiste");}
}