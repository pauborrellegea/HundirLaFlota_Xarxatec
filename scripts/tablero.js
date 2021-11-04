var tableroIA = undefined;
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
    let indicador = 0;
    //hago así el for para ahorrarme tener que hacer un array con longitudes dado que de momento me esta tocando los huevos el tema de la clase
    // Portaviones 4 - Acorazado 3 - Submarino 2 - Barco Normal 1    
    for(var i = 4; i != 0; i--){
        longitud = i;
        indicador = i;
        orientacion = parseInt(random(0,2)); //devuelve 0 (horizontal) y 1 (vertical)
        console.log(orientacion);
        if(orientacion == 1){
            posInicialX = parseInt(comprobarPosiciones(longitud));
            posInicialY = parseInt(random(0, 10)); //devuelve la posicion donde irá el extremo del barco
            colocarBarcos(posInicialX, posInicialY, indicador, longitud, orientacion);
        }
        else{
            posInicialY = parseInt(comprobarPosiciones(longitud));
            posInicialX = parseInt(random(0, 10)); //devuelve la posicion donde irá el extremo del barco
            colocarBarcos(posInicialX, posInicialY, indicador, longitud, orientacion);
        }
    }

    mostrarTablero(tableroIA);
}
// falta comprobar que no haya barcos cruzados
function comprobarPosiciones(longitud){
    var aux = random(0, 10); //devuelve la posicion donde irá el extremo del barco
    while(aux + longitud > 10){
        aux = random(0, 10); //devuelve la posicion donde irá el extremo del barco
    }
    
    return aux;
}

function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function colocarBarcos(X, Y, indicador, longitud, orientacion)
  {
      for(i = 0; i < longitud; i++){
          if(orientacion == 1){

            tableroIA[X+i][Y] = indicador;
        }
        else
        {
            tableroIA[X][Y+i] = indicador;
        }
      }

  }

