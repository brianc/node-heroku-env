#!/usr/bin/env node
var herokuEnv = require('../')
var app = process.argv[2]
var convert = require('./convert')
if(!app) {
  console.error("No app specified.  Invoke with heroku-env <name_of_app>")
  console.error("Note: you need to have the heroku toolbelt installed, in your path, and be logged in.")
  return
}
herokuEnv(app, process.argv[3], function(err, config) {
  if(err) return console.error(err);
  console.log(convert(config))
})
