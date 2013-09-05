var parse = require('parse-database-url')
var get = require('./lib/get')

module.exports = function(app, cb) {
  return get(app, function(err, config) {
    if(err) return cb(err);
    var params = parse(config.DATABASE_URL)
    config.PGDATABASE = params.database
    config.PGPASSWORD = params.password
    config.PGHOST = params.host
    config.PGPORT = params.port
    config.PGUSER = params.user
    config.PGSSLMODE = 'require'
    cb(null, config)
  })
}

