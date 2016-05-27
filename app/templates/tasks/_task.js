/**
 * Extend a source object with a destination object
 * @param {Object} source - the reference will be modified
 * @param {Object} dest   - the object to assign to the source
 * @returns {Object} the source reference
 */
var extend = function extend(source, dest){
    if(typeof Object.assign === 'function'){
        return Object.assign(source, dest);
    } else {
        return require('util')._extend(source, dest);
    }
};


module.exports = function(grunt) {

    /**
     * Register the Grunt task <%=taskName%>
     */
    grunt.registerMultiTask('<%=taskName%>', '<%=description%>', function() {
        var options = this.options();
        var done    = this.async();
        var count   = 0;

        // Placeholder task
        // merge everything into the destination
        // the options and the source files JSON

        this.files.forEach(function(file){

            var content = extend({}, options);
            var dest = file.dest;

            grunt.log.debug("base content %j", content);

            file.src.forEach(function(source){

                grunt.log.debug("adding %s", source);
                extend(content, grunt.file.readJSON(source));
                grunt.log.debug("content is now %j", content);
            });

            grunt.log.debug("writing to %s", dest);

            grunt.file.write(dest, JSON.stringify(content));

            if(grunt.file.exists(dest)){

                grunt.verbose.write("%s created", dest);
                count++;
            } else {
                grunt.fail.warn('Unable to write %s', dest);
            }
        });
        if(count > 0){
            grunt.log.ok( "%s %s created", count, (count > 1 ? 'files' : 'file'));
        }
    });
};

