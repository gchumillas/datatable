const _ = require('lodash')

module.exports = () => ({
  items: _.range(1, 35).map(i => ({ id: i, name: `Item ${i}` }))
})
