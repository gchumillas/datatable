const _ = require('lodash')
const faker = require('faker')

module.exports = () => ({
  items: _.range(1, 35).map(i => ({
    id: i,
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    job_title: faker.name.jobTitle(),
    gender: faker.name.gender(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email()
  }))
})
