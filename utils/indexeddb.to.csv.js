const CONFIG = {
    DB_NAME: 'locations',
    DB_VERSION: 3,
    DB_STORE_NAME: 'locationsStore'
}
function loadData() {
    return new Promise((resolve, reject) => {
        const openrequest = indexedDB.open(CONFIG.DB_NAME, CONFIG.DB_VERSION)
        // openrequest.onupgradeneeded = ...
        openrequest.onerror = event => reject(event.target.error)
        openrequest.onsuccess = event => {
            const db = event.target.result
            const txn = db.transaction(db.objectStoreNames, 'readonly')
            const store = txn.objectStore(CONFIG.DB_STORE_NAME)
            const loadrequest = store.getAll()
            loadrequest.onerror = event => reject(event.target.error)
            loadrequest.onsuccess = event => resolve(event.target.result)
        }
    })
}
// async function exec() {
//     var data = await loadData()
//     console.log('loaded the data, loaded %d objects', data.length)
//     console.dir(data)
// }

function toCSV(data) {
    const output = []
    for(const object of data) {
        const row = []
        for(const prop in object) {
            row.push(to_csv_value(object[prop]))
            row.push(',')
        }
        row.push('\n')
        output.push(row.join(''))
    }
    return output.join('')
}

function to_csv_value(value) {
    if (value) {
        var output = '"'
        output += value.toString().replace('"', '\\"')
        return output + '"'
    } else return 'non'
}

// Because File implements blob interface, we are effectively creating a file
// by creating a blob
function createCSVFileFromString(string) {
    var csv_mime_type = 'text/csv'
    return new Blob([string], {type: csv_mime_type})
}

function downloadBlob(blob, filename) {
    var anchor = document.createElement('a');
    anchor.setAttribute('download', filename);
    var url = URL.createObjectURL(blob);
    anchor.setAttribute('href', url);
    anchor.click();
    URL.revokeObjectURL(url);
}
  
// And finally, to compose it all together
async function loadAndStartDownloadingData() {
    var data = await loadData();
    var csvstring = toCSV(data);
    var blob = createCSVFileFromString(csvstring);
    downloadBlob(blob, 'mydata.csv');
}

//...
loadAndStartDownloadingData().catch(console.warn)
//...