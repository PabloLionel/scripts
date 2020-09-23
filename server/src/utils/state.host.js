const os = require('os');

console.log(os.arch());
console.log(os.platform());
console.log(os.cpus().length);
// IRs del sistema
// console.log(os.constants);

const kb = (memo) => memo / 1024;
const mb = (memo) => kb(memo) / 1024;
const gb = (memo) => mb(memo) / 1024;
const tb = (memo) => gb(memo) / 1024;
const pb = (memo) => tb(memo) / 1024;

console.log(`Gigabytes: ${gb(os.freemem())}`);
console.log(`Petabytes: ${pb(os.totalmem())}`);

console.log(os.homedir());
console.log(os.tmpdir());

console.log(os.hostname());

console.log(os.networkInterfaces());

// [[[[[[[[[[[[[[[process]]]]]]]]]]]]]]]

process.on('beforeExit', () => console.log('El proceso va a acabar'));
// aquí no existe event loop (setTimeout nofuncionaria)
process.on('exit', () => console.log('El proceso acabó'));
process.on('uncaughtException', (error, origin) => {
  console.log('Para excepciones que no se han capturado');
  console.log(`Origen: ${origin}`);
  console.log(`Error: ${error}`);
});
process.on('uncaughtRejection', () =>
  console.log('Para promesas que no se han rechazado y nadie tiene un catch')
);

functionQueNoExiste();

console.log('Esto si el error no se recoje, no sale');
