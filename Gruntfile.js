module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

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
        }

    });

    grunt.registerTask('build', [
        'clean',
        'blog',
        'copy',
        'less'
    ]);

    grunt.registerTask('default', ['build', 'watch']);

};
