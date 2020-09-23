// [promesa_1,promesa_2,promesa_3,promesa_4,...]
let a = [];

// las promesas ordenadas en el arreglo "b" seran ejecutadas con seguridad
// a.reduce((curr, next) => curr.then(next), Promise.resolve())

//EJEMPLO:
const getUsers = () =>
  new Promise((resoleve, reject) =>
    setTimeout(() => {
      console.log('Usuarios cargados!');
      resoleve();
    }, 800)
  );
const getProjects = () =>
  new Promise((resoleve, reject) =>
    setTimeout(() => {
      console.log('Proyectos cargados!');
      resoleve();
    }, 500)
  );
const getIssuts = () =>
  new Promise((resoleve, reject) =>
    setTimeout(() => {
      console.log('Ediciones cargados!');
      resoleve();
    }, 1100)
  );

const get = () =>
  new Promise((resoleve, reject) => setTimeout(() => resoleve(6), 2000));
let num = 0;
get()
  .then((data) => (num = data))
  .then(() => console.log(num));
// console.log(num)
// console.log(get())
// getUsers()
//   .then(getProjects)
//   .then(getIssuts)
// async function metodo(params) {
//     let reg1 = await
// }

// [getUsers, getProjects, getIssuts].reduce((cur, next) => cur.then(next), Promise.resolve())

console.log('Hola');
