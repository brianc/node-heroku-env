var exec = require('child_process').exec
var parse = require('parse-database-url')

exec('heroku config --app ' + process.argv[2], function(err, stdout) {
  if(err) throw err;
  var config = {}
  var lines = stdout.split('\n')
  lines.shift()
  lines.forEach(function(line) {
    if(!line.trim()) return;
    var parts = line.split(': ')
    if(!parts[1]) {
      console.log('could not parse', line)
    } else {
      config[parts[0].trim()] = parts[1].trim()
    }
  })
  var params = parse(config.DATABASE_URL)
  var str = ""
  str += 'PGDATABASE=' + params.database
  str += ' PGHOST=' + params.host
  str += ' PGPASSWORD=' + params.password
  str += ' PGPORT=' + params.port
  str += ' PGUSER=' + params.user
  console.log(str)
})