const courses = [
  {
    _id: '087654123',
    title: 'Dev Angular SSR',
    teacher: 'SSR es Semi-Senior',
    description: 'Técnicamente autosuficiente. Puede desarrollar funcionalidades más complejas y ejecutar proyectos de mayor envergadura. Pero no es un crack y todavía comete errores “evitables”.',
    topic: 'Seniority',
  },
  {
    _id: '123654123',
    title: 'Dev Angular SR',
    teacher: 'SR es Senior',
    description: 'evitable.',
    topic: 'Seniority',
  },
];

exports.Query = {
  getCourses() {
    /**
     * Devolvemos un string porque es lo que definimos
     * en el squema.
     * @examples
     * getCourses {
     *    _id,
     * 	  title
     * }
     */
    return courses;
  },
  getCourse(/*root*/ _, /*args*/ {id}) {
    /**
     * Siempre recibimos un root, seguido de un parametro
     * args.
     * En args es el payload donde encuentramos los parametros
     * definidos en el schema.
     * @examples
     * getCourse(id: "123654123") {
     *    _id,
     * 	  title
     * }
     */
    return courses.find(course => course._id === id);
  }
}
