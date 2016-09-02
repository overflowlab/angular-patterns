module.exports = function (grunt) {
    'use strict';
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jslint');
    grunt.loadNpmTasks('grunt-html-build');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-exec');
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        build: grunt.file.readJSON('build-config.json'),
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        src:  '<%= build.scripts %>',
                        flatten: true,
                        dest: 'docs/js'
                    }
                ]
            }
        },
        clean: {
            build: ['test']
        },
        jslint: {
            server: {
                src: [
                    'app/*.js',
                    'app/**/*.js',
                    'app/**/**/*.js'
                ],
                exclude: [
                    'node_modules/*.js',
                    'bower_components/*.js',
                    'app/app.directives.js'
                ],
                directives: {
                    'node': true,
                    'todo': true,
                    'plusplus': true,
                    'regexp': true,
                    'globals': {
                        'window': true,
                        'localStorage': true,
                        'admetricks': true,
                        'jasmine': true,
                        'describe': true,
                        'beforeEach': true,
                        'it': true,
                        'expect': true,
                        'inject': true,
                        'angular': true,
                        'browser': true,
                        'document': true,
                        'element': true,
                        'moment': true,
                        'mixpanel': true,
                        'zE': true,
                        'by':true,
                        'io':true,
                        '_':false,
                        '$':true
                    }
                },
            }
        },
        htmlbuild: {
            app: {
                src: 'index.html',
                dest: 'docs/index.html',
                options: {
                    beautify: true,
                    prefix: '',
                    relative: true,
                    scripts: {
                        dependencies: '<%= build.scripts %>'
                    }
                }
            }
        },
        replace: {
            app: {
                src: 'docs/index.html',
                dest: 'docs/index.html',
                replacements: [{
                    from: /(..\/bower_components(?:.*)js)/g,
                    to: function (matchedWord) {
                        var path = matchedWord.split('/');
                        return 'js/' + path.pop();
                    }

                },{
                    from: "../",
                    to: "js/"
                }]
            }
        }
    });
    grunt.registerTask('develop', [
        'clean:build',
        'copy:main',
        'htmlbuild:app',
        'replace:app'
    ]);
};
