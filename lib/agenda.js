/*
  Copyright (c) 2017, salesforce.com, inc.
  All rights reserved.
  Licensed under the BSD 3-Clause license.
  For full license text, see LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/

const Agenda = require('agenda')
const mongoConnectionString = process.env.MONGODB_URI
console.log(`MONGODB_URI: ${mongoConnectionString}`)
const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    options: {
      useNewUrlParser: true
    }
  }
})

module.exports = agenda
