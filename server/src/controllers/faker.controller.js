const faker = require('faker');
exports.getusersrandom = (_, res) => {
  res.json({
    results: new Array(200).fill(0).map(() => ({
      id: faker.random.number(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      phone: faker.phone.phoneNumberFormat(),
    })),
  });
};
exports.getarticles = (_, res) => {
  res.json({
    results: new Array(2400).fill(0).map(() => {
      const id = faker.random.number();
      return {
        id: id,
        text: `[${id}] ${faker.lorem.sentence()}`,
      };
    }),
  });
};
exports.getproviders = (_, res) => {
  res.json({
    results: new Array(100).fill(0).map(() => {
      const id = faker.random.number();
      return {
        id: id,
        text: `[${id}] ${faker.lorem.sentence()}`,
      };
    }),
  });
};
