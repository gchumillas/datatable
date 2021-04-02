const _ = require('lodash')
const faker = require('faker')
const { DateTime } = require('luxon')

const MAX_TIMESTAMP = DateTime.fromISO('2005-01-01').toMillis()

module.exports = () => ({
  items: _.range(1, 35).map(i => ({
    id: i,
    date: faker.datatype.datetime(MAX_TIMESTAMP),
    first_name: faker.name.firstName(),
    last_name: faker.name.lastName(),
    job_title: faker.name.jobTitle(),
    gender: faker.name.gender(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email()
  }))
})
