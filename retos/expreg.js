const log = console.log, myText = 'Hay tres características que definen la soledad: constituye una experiencia subjetiva porque puede sentirse aún cuando se está en un grupo; es el resultado de una o varias relaciones sociales deficientes, resulta desagradable y produce angustia o depresión. Salvo contadas excepciones, vivir la soledad es algo que no se desea, como tampoco la tristeza.'
const ER1 = new RegExp('grupo')
// Objeto literal de la exprecion anterior:
const ER2 = /grupo/
/*
METACARACTERES (comodines)
  - SUSTITUCION: Define lo que esperamos en un dererminado lugar del patron.
    . (punto)---> acepta cualquier simbolo/características
    @example
      myText = 'algun text$'
      (/text./).test(myText) // output: true
  
  [ao] ---> es un listado de caracteres validos en ése lugar del patron.
  [a-o] ---> si entre corchetes tenes un guion entre 2 simbolos del patron, es un rango. Tiene la unica limirtación de que debe ser en orden ascendente y no se puede saltear simbolos. Si podemos hacer [a-eop] esto implica que va a buscar el siguiente conjunto de caracteres: { a, b, c, d, e, p, o }
  (subpatron1 | subpatron2 | subpatron3 | ... |subpatronN) ---> el patron acepta el texto si encuentra el subpatron1 ó subpatron2 ó subpatron3 ó ... subpatronN.
    @example
      myText = 'algun text$'
      /text[ao]/.test(myText)
      /text[a-o]/.test(myText)

  CANTIDAD: Define cuantas veces aparece ése caracter.
    * 
*/
log(
  ER1.test(myText),
  ER2.test(myText),
  /grup[a-o]/.test(myText)
)
