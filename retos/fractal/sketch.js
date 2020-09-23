const { PI }      = Math 
const HEIGHT      = 950
const ANGLE       = PI / 4
let lenVariation  = .7
const btn         = document.createElement('button')
btn.innerText     = 'Aleatoriamente / Pausar'
let enableRandom  = false
btn.addEventListener('click', e => enableRandom = !enableRandom)

function setup() {
  // put setup code here
  document.body.appendChild(btn);
  createCanvas(1300, HEIGHT)
}

function draw() {
  // put drawing code here
  background(40)
  stroke(0,255,33)
  translate(650,HEIGHT)
  branch(250)
}

function branch(len) {
  line(0,0,0,-len)
  translate(0,-len)
  if (enableRandom) lenVariation = random(.5, .9)
  // Evitamos el error de stack
  // con len > 4.
  if (len > 4) {
    /*
      NOTA: Necesitamos dibujar la
      siguiente rama pero para eso
      hacemos un pequeño truco con
      processing.
      cuando dibujamos una linea,
      tenemos que regresar al
      punto inicial sino las
      operaciones que realice las
      va a hacer sobre el punto
      final. Entonces es necesario
      de esta forma, tener un
      respaldo de este punto.
      Para eso hacemos uso de un
      par de funciones que
      processing ya nos provee:
      push y pop son metodos de
      processing que trabajan con
      pilas, de esta forma vamos
      a tener respaldado el punto
      inicial y vamos a poder
      regresar a él.
    */
    push()
      rotate(ANGLE)
      branch(len * lenVariation)
    pop()
    push()
      rotate(-ANGLE)
      branch(len * lenVariation)
    pop()
  }
}