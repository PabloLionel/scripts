const matrix = [
    [1,  2, 3, 4],
    [5,  6, 7, 8],
    [9, 10,11,12],
    [13,14,15,16],
]
// const matrix = [
    //     [1,2,3,4],
    //     [5,6,7,8],
//     [9,10,11,12],
// ]
// const matrix = [
    //     [1,2,3,4],
    //     [5,6,7,8],
    // ]
    // const matrix = [
        //     [1,2],
        //     [3,4],
        //     [5,6],
        //     [7,8],
        // ]
 
// const matrix = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
// ]

const espiral = (M, fn) => {
    let n0 = 0, m0 = -1, 
    i = 0, j = 0, 
    n = M.length, m = M[0].length
    do {
        for (j = ++m0;j < m; ++j) fn(M[i][j])
        for (i = ++n0;i < n; ++i) fn(M[i][j - 1])
        for (j = --m;j > m0; --j) fn(M[i - 1][j - 1])
        for (i = --n;i > n0; --i) fn(M[i - 1][j])
    } while (n0 < n && m0 < m)
}

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

console.clear()
console.time('espiral')
espiral(matrix, console.log)
console.timeEnd('espiral')

console.log()
console.time('recorrer')
confeccionVector(matrix)
console.timeEnd('recorrer')