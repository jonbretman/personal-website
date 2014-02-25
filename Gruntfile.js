module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');

    require('./grunt/tasks/blog')(grunt);
    require('./grunt/tasks/serve')(grunt);

    grunt.initConfig({

        clean: {
            build: ['build']
        },

        watch: {
            blog: {
                files: [
                    'posts/**/*',
                    'pages/**/*',
                    'assets/**/*',
                    'templates/**/*'
                ],
                tasks: ['blog']
            }
        }

    });

    grunt.registerTask('default', ['clean', 'blog', 'serve', 'watch']);
    grunt.registerTask('build', ['clean', 'blog']);

};