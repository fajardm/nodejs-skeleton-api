const bcrypt = require('bcrypt');
const faker = require('faker');

faker.locale = 'id_ID';

const users = [];

for (let i = 0; i < 20; i += 1) {
  users.push({
    id: faker.random.uuid(),
    email: i + faker.internet.email(),
    username: i + faker.internet.userName(),
    password: bcrypt.hashSync('demo', 10),
    created_at: new Date(),
    updated_at: new Date(),
  });
}

module.exports = users;
