const measureExecutionTime = (fn) => {
  let start = Date.now();
  fn();
  console.log(`Time: ${Date.now() - start}ms`);
};
