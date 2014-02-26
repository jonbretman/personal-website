module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');

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
                    compress: grunt.option('production')
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

        uglify: {
            js: {
                files: {
                    'build/js/main.min.js': 'assets/js/main.js'
                }
            }
        },

        blog: {
            options: {
                production: grunt.option('production')
            }
        }

    });

    grunt.registerTask('build', [
        'clean',
        'blog',
        'copy',
        'less',
        'uglify'
    ]);

    grunt.registerTask('default', ['build', 'watch']);

};