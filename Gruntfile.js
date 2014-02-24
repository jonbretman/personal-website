module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');

    require('./grunt/tasks/blog')(grunt);
    require('./grunt/tasks/serve')(grunt);

    grunt.initConfig({

        clean: {
            build: ['build']
        }

    });

    grunt.registerTask('default', ['blog']);

};