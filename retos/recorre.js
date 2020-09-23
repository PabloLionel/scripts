// recorrera la matriz en forma de espiral imprimiendo los valores en ese respectivo orden

function confeccionVector(matriz){
    const longitud = matriz.length; 
    var finFila = longitud - 1;
    ordenado = [];
    let arriba = [];
    let abajo=[];
    let izquierda =[];
    let derecha=[];

    // evaluamos el final del recorrido en espiral menos un paso
    fin = (longitud> matriz[0].length) ? longitud- matriz[0].length : (longitud< matriz[0].length) ? matriz[0].length - longitud : 1;
    
    // mientras que el numero de fil
    while (matriz.length > fin+1) {
        arriba = matriz.splice (0,1);
        abajo = matriz.splice(finFila -1,1);
        
        matriz.forEach(element => {
            izquierda.unshift(element.shift());
            derecha.push(element.pop());
        });
        console.log(arriba);
        console.log(derecha);
        console.log(abajo);
        console.log(izquierda);
        finFila = matriz.length-1;
        ordenado.push(arriba.flat(),derecha,abajo[0].reverse(),izquierda);
    }
    console.log(fin);
    
    if (matriz.length <= fin + 1){
        if (matriz.length == 2){
            matriz[1].reverse()
        }
        ordenado.push(matriz.flat())
    }
    console.log(ordenado.flat());
}