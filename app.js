// app.js
var http = require('http')

function router(routes) {
  var paths = Object.keys(routes)
  var regexes = paths.map(function(path) {
    return new RegExp('^' + path + '$')
  })

  return function(req, res) {
    var i = 0
    while (!regexes[i].test(req.url)) i++
    return routes[paths[i]].call(null, req, res)
  }
}

var server = http.createServer(router({
  '/': function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello World!')
  },
  '/bye': function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Bye~')
  }
}))

server.listen(8080, function() {
  console.log('Docker DEMO with Node.js is running.')
})