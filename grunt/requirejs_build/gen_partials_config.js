var fs = require('fs');
var basePath = './partials';
var modFile = 'Modfile.js';
var dirNames = [];
var data = '';

function appendData(path) {
    var key = path.slice(path.lastIndexOf('/') + 1);
    data += key + ': {\r\n' + '\tsrc: "' + path + '/*.html",\r\n'
                            + '\tdest: "./dist' + path.slice(path.indexOf('/')) + '"\r\n},\r\n';
}

function replaceConfig(modFile, replacement) {
    fs.readFile(modFile, function(err, data){
        fs.writeFile(modFile, data.toString().replace('//replace', replacement), function(err){
            if (err) throw err;
        })
    });
}

function listDirNames(basePath) {
    fs.readdir(basePath, function(err, files){
        files.forEach(function(file){
            var path = basePath + '/' + file;
            fs.stat(path, function(err, stats){
                if (stats.isDirectory()) {
                    appendData(path);
                    listDirNames(path);
                }
            });
        });
    });
}

data += '//r\r\nmain: {\r\n\tsrc: "./partials/*.html",\r\n\tdest: "./dist/partials/"\r\n},\r\n';
listDirNames(basePath);

setTimeout(function(){
    data += '//r';
    replaceConfig(modFile, data);
}, 2000);

