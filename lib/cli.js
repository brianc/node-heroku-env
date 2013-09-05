var herokuEnv = require('../')
var app = process.argv[2]
var convert = require('./convert')
herokuEnv(app, function(err, config) {
  if(err) return console.error(err);
  console.log(convert(config))
})
