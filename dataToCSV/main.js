// HELPERS
(function(console){
    'use strict'
    if (!console.save) console.save = function(data, filename){
        if(!data) {
            console.error('Console.save: No data')
            return;
        }

        if(!filename) filename = 'console.json'

        if(typeof data === "object"){
            data = JSON.stringify(data, undefined, 4)
        }

        var blob = new Blob([data], {type: 'text/json'}),
            e = document.createEvent('MouseEvents'),
            a = document.createElement('a')

        a.download = filename
        a.href = window.URL.createObjectURL(blob)
        a.dataset.downloadurl =  ['text/json', a.download, a.href].join(':')
        e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
    }
})(console) // generador de archivos guardables.

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}
// Sencibilizamos el nombre de los tipos de datos para mejor comprencion.
const formatDataType = str => ({
        "Tipo"      : "Tipo de Dato",
        "integer"   : "entero",
        "decimal"   : "decimal",
        "numeric"   : "numero real",
        "date"      : "fecha",
        "timestamp" : "fecha y hora",
        "smallint"  : "entero",
        "bigint"    : "entero",
        "boolean"   : "verdadero/falso",
        "character" : "cadena de caracteres",
        "text"      : "texto",
    }[str.split(/(\s|\()/)[0]]  // del tipo de dato solo tomamos
)                               // su primer separacion

const formatDefault = str => ({
        "Defecto"   : "Defecto",
        "nextval"   : "autoincremental",
        "now"       : "fecha y hora actual",
        "false"     : "falso",
        "true"      : "verdadero",
        ""          : "fecha"
    }[str.split(/(\s|\()/)[0]])

const formatChecked = check => ({
        undefined   : "Publicable",
        true        : "SI",
        false       : "NO"
    }[check])

// const checkTable = table => {

// } // const check = checkTable(oTable)
const tableToCSV = oTable => {
    // preparamos la captura de las celdas
    const csv = []
    // consigimos el numero de filas.
    const rowLength = oTable.rows.length
    // iteramos a través de las filas.
    for (let i = 0; i < rowLength; i++) {
        // obtenemos celdas de la fila actual.
        const oCells = oTable.rows.item(i).cells
        // preparamos la captura de filas.
        const row = []
        // obtenemos la cantidad de celdas de la fila actual (n° de columnas).
        const cellLength = oCells.length
        // iteramos a través de cada celda en la fila actual.
        for (let j = 0; j < cellLength; j++)
            /*  aquí obtenemos la información de tu celda */
            switch (j) {
                //case 0: break
                case 1: // Tipo de Dato
                    row.push(formatDataType(oCells.item(j).innerHTML))
                    break
                // case 2: break
                // case 3: break
                case 4: // Por Defecto
                    row.push(formatDefault(oCells.item(j).innerHTML))
                    break
                case 6: // Publicable
                    row.push(formatChecked(oCells.item(cellLength - 1).firstChild.checked))
                    break
                default:
                    row.push(oCells.item(j).innerHTML)
            }
        csv.push(row.join(","))
    }
    return csv.join("\n")
}

const addColumnPublicable = table => {
    // Creamos la cabecera de la columna.
    let cell = table.rows[0].insertCell(
        // Insertamos la nueva celda al final
        // de cada fila.
        -1
    )
    cell.outerHTML = '<th class="ReportTableHeaderCell" width="16,6666666666667%">Publicable</th>'
    const rowLength = table.rows.length
    // Para cada fila y añadir celda.
    for (i = 1; i < rowLength; i++) {
        cell = table.rows[i].insertCell(
            // insertamos la nueva celda al final
            // de cada fila.
            -1
        )
        const el = document.createElement('input')
        el.setAttribute('type','checkbox')
        // y finalmente en esa celda insertamos el checkbox.
        cell.appendChild(el)
    }
}

const htmlExtractorInformation = async dom => {
    // Obtenemos la cabecera para insertar el boton y procesar su información.
    const reportHeader = dom.getElementById("ReportHeader")
    // buscamos las tablas del reporte:
    const tables = dom.querySelectorAll('table')
    addColumnPublicable(tables[0])
    // Insertamos un boton para descargar en formato csv :)
    const btn = dom.createElement("button")
    btn.type = "button"
    btn.innerText = "Descargar CSV"
    // Agregamos un evento al boton para descargar el archivo csv.
    btn.addEventListener("click", () => {
        // [[[[[[[[[[[[[[[[[[[[[[Proceso de extraccion]]]]]]]]]]]]]]]]]]]]]]
        const CSV = []
        // capturamos el numbre del archivo.
        const filename = reportHeader.children[7].nextSibling.textContent.capitalize() + 
        " diccionario de datos de " + reportHeader.children[0].textContent.slice(-8)
        
        CSV.push(
            // servidor:
            reportHeader.children[3].textContent + "," + 
            reportHeader.children[3].nextSibling.textContent + "\n" +
            // Base de datos:
            reportHeader.children[5].textContent + "," + 
            reportHeader.children[5].nextSibling.textContent + "\n" +
            // esquema:
            reportHeader.children[7].textContent + "," + 
            reportHeader.children[7].nextSibling.textContent
        )
        
        CSV.push(tableToCSV(tables[0]))

        console.save(CSV.join("\n"), `${filename}.csv`)
    })
    // colocamos el boton en la cabecera.
    reportHeader.appendChild(btn)
}
