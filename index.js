var basename            = require("path").basename
    ,readFileSync       = require("fs").readFileSync
    ,readdirSync        = require("fs").readdirSync
    ,lstatSync          = require("fs").lstatSync
    ,glob               = require("glob")
    ,componentsLocation = "bower_components";


module.exports = plugin;

function plugin(options){
    if(options.componentsDirectory) componentsLocation = options.componentsDirectory;
    if(options.componentDirectory) componentsLocation = options.componentDirectory;

    return function(files, metalsmith, done) {
        if(!options.components) return done();

        var include = function(root, included) {
            var contents, file, i, len, results;
            results = [];
            root = root.replace(/\/$/, "");
            for (i = 0, len = included.length; i < len; i++) {
                file = included[i];
                var stats = lstatSync(file);

                if(stats.isDirectory()){
                    var children = readdirSync(file);

                    children.forEach(function(s,i){
                        children[i] = file + "/" + s;
                    });

                    include(root + "/" + (basename(file)), children);
                }
                else{
                    contents = readFileSync(file);
                    results.push(files[root + "/" + (basename(file))] = {
                        contents: contents
                    });
                }
            }
            return results;
        };

        var findFiles = function(source, dest, nodir = true){
            source = source.replace(/\/$/, "");

            var foundFiles = glob.sync(source, {nodir: nodir});

            if (foundFiles && foundFiles.length) {
                include(dest, foundFiles);
            }
            else if (source.indexOf("*") == -1) {
                findFiles(source + "/*", dest, false);
            }
        };

        var executeTasks = function(component, tasks, index, callback){
            var key = Object.keys(tasks)[index],
                source = componentsLocation + "/" + component + "/" + key;

            findFiles(source, tasks[key]);

            if(++index < Object.keys(tasks).length){
                executeTasks(component, tasks, index, callback);
            }
            else{
                callback.call(this);
            }
        };

        var processComponent = function(components, index){
            var keys = Object.keys(components),
                component = keys[index],
                tasks = components[component];

            executeTasks(component, tasks, 0, function(){
                if(++index < keys.length){
                    processComponent(components, index);
                }
            });
        };

        processComponent(options.components, 0);

        return done();
    };
}
