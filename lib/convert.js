//converts config object to environment variable format
module.exports = function(config) {
  var out = []
  for(var key in config) {
    out.push(key + '=' + config[key])
  }
  return out.join(require('os').EOL)
}
