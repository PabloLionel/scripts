const { log, error } = console
// http://websocket.org/echo.html
// const wsUri = "wss://echo.websocket.org/" // or ws://echo.websocket.org
// const wsUri = `ws://${document.domain}:${location.port}/ws`
const wsUri = 'ws://localhost:5000/socket.io/ws/'

const ws = new WebSocket(wsUri)

/**
 *  El servidor esta predispuesto
 * a establecer una conexión pero
 * son los clientes quienes deben
 * solicitarla.
 */
ws.onopen = e => { // or ws.addEventListener('open', e => ...)
    log('connected')
    sendInfo()
}

/**
 *  Como escuchamos los mensajes
 * que nos puede enviar el servidor
 * una vez establecida la conexión?
 *  Muy sencillo, seteando el método
 * onmessage.
 */
ws.onmessage = e => { // or ws.addEventListener('message', e => ...)
    const msg = JSON.parse(e.data)
    log(msg)
}

ws.onerror = e => { // or ws.addEventListener('error', e => ...)
    error(e)
}

/**
 *  Al ser un protocolo bidireccional
 * la connección la pude serrar el cliente
 * o el servidor.
 *  Podemos escuchar el cierre de la conexión
 * definiento el comportamiento para el método
 * onclose.
 */
ws.onclose = e => { // or ws.addEventListener('close', e => ...)
    log('Connection closed')
    log(e)
}

/**
 *  Ahora la pregunta del millon,
 * como enviamos información?
 *  Muy facil, simplemente con el
 * metodo send
 */
const sendInfo = () => {
    ws.send(JSON.stringify({soy: 'un objeto, que sera JSON'}))
}

/**
 *  Recordemos que el servidor
 * trabaja para mantener nuestra
 * conexión por lo tanto es importante
 * una vez terminada la operaciones
 * del cliente debemos cerrarla de la
 * siquiente manera
 */
// ws.close()