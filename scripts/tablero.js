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
    var tableroIA = crearTablero(filas, columnas);
    
    inicializarTablero(tableroJugador, 'a');
    inicializarTablero(tableroIA, 'a');
    //mostrarTablero(tablero);
     
}

