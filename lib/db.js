/*
  Copyright (c) 2017, salesforce.com, inc.
  All rights reserved.
  Licensed under the BSD 3-Clause license.
  For full license text, see LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
*/

const massive = require('massive')
// const monitor = require('pg-monitor')
const loop = require('deasync').runLoopOnce
const serializeError = require('serialize-error')

const deasyncPromise = function (promise) {
  let result
  let done = false
  promise.then(res => {
    result = res
    // monitor.attach(res.driverConfig)
    done = true
  }).catch(e => {
    console.error('Error while connecting to DB:', serializeError(e))
  })
  while (!done) {
    loop()
  }
  return result
}

let db = massive(process.env.DATABASE_URL)

// let db =  massive({
//   host: 'ec2-54-90-177-188.compute-1.amazonaws.com',
//   port: 5432,
//   database: 'dd0gc8168p91br',
//   user: 'u4vjs4aln1h3t7',
//   password: 'pc7f3b738718bd7f60e101ae2252c7cb537d73419185943716e5c3ed750cba777',
//   ssl: true
// })




module.exports = deasyncPromise(db)
