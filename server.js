var http = require('http')
var fs = require('fs')
var url = require('url')

http.createServer(function(req, res) {
    var pathObj = url.parse(req.url, true)
    if (pathObj.pathname == '/') {
        res.end(fs.readFileSync(__dirname + '/index.html'))
    } else {
        res.end(fs.readFileSync(__dirname + '/music.json'))
    }

}).listen(8000)