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

//let db = massive(process.env.DATABASE_URL)

let db_url = process.env.DATABASE_URL
let db_url_parsed = url.parse(db_url)

/*

protocol: 'postgres:',
  slashes: true,
  auth:
   'u4vjs4aln1h3t7:pc7f3b738718bd7f60e101ae2252c7cb537d73419185943716e5c3ed750cba777',
  host: 'ec2-54-90-177-188.compute-1.amazonaws.com:5432',
  port: '5432',
  hostname: 'ec2-54-90-177-188.compute-1.amazonaws.com',
  hash: null,
  search: null,
  query: null,
  pathname: '/dd0gc8168p91br',
  path: '/dd0gc8168p91br',
*/

let db =  massive({
  host: db_url_parsed.hostname,
  port: db_url_parsed.port,
  database: db_url_parsed.pathname.replace('/', ''),
  user: db_url_parsed.auth.split(':')[0],
  password: db_url_parsed.auth.split(':')[1],
  ssl: true
})




module.exports = deasyncPromise(db)
