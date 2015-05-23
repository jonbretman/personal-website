module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-http-server');

    require('./grunt/blog')(grunt);

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
            },
            css: {
                files: [
                    'assets/css/**/*'
                ],
                tasks: ['less']
            }
        },

        less: {
            compile: {
                options: {
                    compress: grunt.option('minify-css')
                },
                files: {
                    'build/css/main.css': 'assets/css/main.less'
                }
            }
        },

        copy: {
            assets: {
                files: [
                    {
                        expand: true,
                        src: ['img/**/*', 'js/**/*', '!css/**/*'],
                        cwd: 'assets',
                        dest: 'build'
                    }
                ]
            }
        },

        'http-server': {

            'dev': {

                // the server root directory
                root: './build/',

                // the server port
                // can also be written as a function, e.g.
                // port: function() { return 8282; }
                port: 8000,


                // the host ip address
                // If specified to, for example, "127.0.0.1" the server will
                // only be available on that ip.
                // Specify "0.0.0.0" to be available everywhere
                host: "localhost",

                // run in parallel with other tasks
                runInBackground: true

            }

        }

    });

    grunt.registerTask('build', [
        'clean',
        'blog',
        'copy',
        'less'
    ]);

    grunt.registerTask('default', ['build', 'http-server', 'watch']);

};
