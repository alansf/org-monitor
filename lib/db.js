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
var url = require('url');

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

let db_url = process.env.DATABASE_URL
let db_url_parsed = url.parse(db_url)

let db =  massive({
  host: db_url_parsed.hostname,
  port: db_url_parsed.port,
  database: db_url_parsed.pathname.replace('/', ''),
  user: db_url_parsed.auth.split(':')[0],
  password: db_url_parsed.auth.split(':')[1],
  ssl: true
})




module.exports = deasyncPromise(db)
