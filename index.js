var parse = require('parse-database-url')
var get = require('./lib/get')

var getPostgresConfig = function(config, name) {
  for(var key in config) {
    if(name) {
      var params = parse(config[name])
      config.PGDATABASE = params.database
      config.PGPASSWORD = params.password
      config.PGHOST = params.host
      config.PGPORT = params.port
      config.PGUSER = params.user
      config.PGSSLMODE = 'require'
    } else if(key.indexOf('HEROKU_POSTGRES') === 0 || key.indexOf('DATABASE_URL') === 0) {
      var params = parse(config[key])
      config.PGDATABASE = params.database
      config.PGPASSWORD = params.password
      config.PGHOST = params.host
      config.PGPORT = params.port
      config.PGUSER = params.user
      config.PGSSLMODE = 'require'
      return
    }
  }
}

module.exports = function(app, name, cb) {
  if(typeof name == 'function') {
    cb = name
    name = ''
  }
  return get(app, function(err, config) {
    if(err) return cb(err);
    getPostgresConfig(config, name)
    cb(null, config)
  })
}

