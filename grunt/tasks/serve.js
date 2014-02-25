module.exports = function (grunt) {

    grunt.registerTask('serve', function () {

        var http = require('http');

        var mimeTypes = {
            '.js': 'text/javascript',
            '.css': 'text/css',
            '.html': 'text/html',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg'
        };

        http.createServer(function (req, res) {

            var path = './build' + req.url;

            if (!grunt.file.exists(path) || !grunt.file.isFile(path)) {
                path += 'index.html';

                if (!grunt.file.exists(path) || !grunt.file.isFile(path)) {
                    grunt.log.warn('404 for ' + req.url);
                    res.writeHead(404, {'Content-Type': 'text/plain'});
                    res.end();
                    return;
                }

            }

            grunt.log.ok('Serving file: ' + path);
            res.writeHead(200, {'Content-Type': mimeTypes[path.substring(path.lastIndexOf('.'))]});
            res.end(grunt.file.read(path));

        }).listen(8000, '127.0.0.1');

    });

};