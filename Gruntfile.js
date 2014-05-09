'use strict';
module.exports = function (grunt) {

    // load all grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    var cfg = {
        srcDir: 'src',
        buildDir: 'dist',
        demoDir: 'demo'
    };

    // project configuration
    grunt.initConfig({
        cfg: cfg,
        // watch
        watch: {
            livereload: {
                files: [
                    '<%= cfg.demoDir %>/**/*.css',
                    '<%= cfg.demoDir %>/**/*.js',
                    '<%= cfg.demoDir %>/**/*.html'
                ],
                options: {
                    livereload: 23616
                }
            },
            build: {
                files: [
                    '<%= cfg.srcDir %>/**/*.js'
                ],
                tasks: ['jshint:source', 'clean:build', 'concat:build', 'uglify:build', 'copy']
            }
        },
        jshint: {
            options: {
                'jshintrc': true,
                reporter: require('jshint-stylish')
            },
            source: {
                files: {
                    src: ['<%= cfg.srcDir %>/**/*.js']
                }
            },
            demo: {
                files: {
                    src: [
                        '<%= cfg.demoDir %>/**/*.js',
                        '!<%= cfg.demoDir %>/bower_components/**/*'
                    ]
                }
            }
        },

        // ### Config for grunt-contrib-clean
        // Clean up files as part of other tasks
        clean: {
            build: {
                src: ['<%= cfg.buildDir %>/**']
            },
            demo: {
                src: ['<%= cfg.demoDir %>/dist/**']
            }
        },

        // ### Config for grunt-contrib-copy
        // Prepare files for demo
        copy: {
            demo: {
                files: [{
                    expand: true,
                    src: ['<%= cfg.buildDir %>/**'],
                    dest: '<%= cfg.demoDir %>/'
                }]
            }
        },


        // concat
        concat: {
            build: {
                src: [
                    '<%= cfg.srcDir %>/main.js',
                    '<%= cfg.srcDir %>/controllers/*.js',
                    '<%= cfg.srcDir %>/directives/*.js'
                ],
                dest: '<%= cfg.buildDir %>/angular-ui-gridster.js'
            }
        },
        // uglify
        uglify: {
            options: {
                preserveComments: 'some',
                mangle: false
            },
            build: {
                files: {
                    '<%= cfg.buildDir %>/angular-ui-gridster.min.js': ['<%= cfg.buildDir %>/angular-ui-gridster.js']
                }
            }
        },

        // connect
        connect: {
            options: {
                port: 8080,
                livereload: 23616,
                hostname: '0.0.0.0'
            },
            demo: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '')
                        ];
                    }
                }
            }
        },

        // open
        open: {
            server: {
                path: 'http://localhost:<%= connect.options.port %>/<%= cfg.demoDir %>/sample.html'
            }
        },


        bower: {
          install: {
            options: {
              copy: false
            }
          }
        },

        // karma
        karma: {
            options: {
                configFile: 'karma.conf.js',
                autoWatch: true
            },

            single: {
                singleRun: true
            },

            continuous: {
                singleRun: false
            }
        }
    });

    // default
    grunt.registerTask('default', ['webserver']);
    grunt.registerTask('build', ['bower', 'jshint:source', 'clean:build', 'concat:build', 'uglify:build', 'copy']);
    grunt.registerTask('webserver', ['build', 'open', 'connect:demo', 'watch']);
    grunt.registerTask('test', ['karma:single']);
    grunt.registerTask('test:continuous', ['karma:continuous']);
};
