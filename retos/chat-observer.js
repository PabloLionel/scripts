(d => {
    // https://developer.mozilla.org/es/docs/IndexedDB-840092-dup/Usando_IndexedDB
    const db = indexedDB.open('locations', 3)
    db.onerror = console.dir
    db.onsuccess = console.dir

    const chatObserver = listMutation => {
        listMutation.filter(
            mutation => mutation.addedNode.length
                && mutation.addedNode[0].classList.contains('FTBzM')
                && mutation.addedNode[0].classList.contains('message-in')
        )
        .map(m => m.addedNode[0])
        .forEach(messagein => {
            const link = messagein.querySelector('a._34tCm').getAttribute('href')
            // 'https://maps.google.com/maps?q=-27.4645761%2C-58.8358667&z=17&hl=es'.match(/-*\d+\.\d+/g)
            const [lat, lon] = link.match(/-*\d+\.\d+/g)
            const phone = messagein.querySelector('span.ZObjg').textContent
            
        })
    } 
    new MutationObserver(chatObserver)
        .observe(
            d.getElementsByClassName('_1ays2')[0],
            {
                attributes: true,
                childList: true,
                characterData: true
            }
        )
})(document)

// ((t) => {
//     const s = d.createElement(t),
//     m = d.getElementsByTagName(t)[0]
//     s.setAttribute('src', '//cdnjs.cloudflare.com/ajax/libs/socket.io/2.2.0/socket.io.js')
//     s.setAttribute('integrity', 'sha256-yr4fRk/GU1ehYJPAs8P4JlTgu0Hdsp4ZKrx8bDEDC3I=')
//     s.setAttribute('crossorigin', 'anonymous')
//     m.parentNode.insertBefore(s, m)
// })('script')

// const socket = io.connect('http://localhost:5000/wapp')

// socket.emit('save',
//     {
//         data: {
//             phone,
//             lat,
//             lon,
//         }
//     }
// )

// fetch('http://localost:5000/save', {
//     method: 'POST', // or 'PUT'
//     body: JSON.stringify({
//         lat,
//         lon,
//         phone
//     }), // data can be `string` or {object}!
//     headers: new Headers({
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//         // https://developer.mozilla.org/es/docs/Web/HTTP/CSP
//         'Content-Security-Policy': 'none'
//     })
// })
