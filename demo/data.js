const _ = require('lodash')
const faker = require('faker')

module.exports = () => ({
  items: _.range(1, 35).map(i => ({
    id: i,
    name: faker.name.findName(),
    job_title: faker.name.jobTitle(),
    gender: faker.name.gender(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email()
  }))
})
