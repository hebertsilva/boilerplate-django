var fs = require("fs"),
    mime = require('mime');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        options : {
            djangoPath: 'django/',
            staticPath: '<%= options.djangoPath %>static/',
            compassPath: 'compass/',
            jsPath: '<%= options.staticPath %>js/',
            cssPath: '<%= options.staticPath %>css/',
            imgPath: '<%= options.staticPath %>img/',
            fontPath: '<%= options.staticPath %>font/'
        },

        jshint: {
            all: ['Gruntfile.js', '<%= options.jsPath %>app/**/*.js']
        },

        shell: {
            options: {
                stdout: true,
                stderr: true,
                stdin: true
            },

            compassWatch: {
                command: 'cd <%= options.compassPath %> && bundle exec compass watch'
            },

            compassClean: {
                command: 'cd <%= options.compassPath %> && bundle exec compass clean'
            },

            compassCompile: {
                command: 'cd <%= options.compassPath %> && bundle exec compass compile --force'
            },

            bundler: {
                command: 'cd <%= options.compassPath %> && bundle install --path .bundle'
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },

                files: [
                    {
                        expand: true,
                        cwd: '<%= options.imgPath %>',
                        src: ['**/*.png'],
                        dest: '<%= options.imgPath %>',
                        ext: '.png'
                    }
                ]
            },

            jpg: {
                options: {
                    progressive: false
                },

                files: [
                    {
                        expand: true,
                        cwd: '<%= options.imgPath %>',
                        src: ['**/*.jpg'],
                        dest: '<%= options.imgPath %>',
                        ext: '.jpg'
                    }
                ]
            }
        },

        favicons: {
            options: {
                trueColor: true,
                tileColor: '#fff',
                tileBlackWhite: false,
                appleTouchBackgroundColor: '#fff'
            },

            icons: {
                src:  '<%= options.imgPath %>favicon/favicon-base.png',
                dest: '<%= options.imgPath %>favicon'
            }
        },

        fontello: {
            dist: {
                options: {
                    config  : '<%= options.fontPath %>fontello/config.json',
                    fonts   : '<%= options.fontPath %>fontello',
                    styles  : '<%= options.compassPath %>source/vendor/fontello',
                    force   : true,
                    scss    : true
                }
            }
        },

        clean: {
            styleguide: ['styleguide/html']
        },

        connect: {
            styleguide:{
                options: {
                    keepalive: true,
                    port: 9000,
                    hostname: '0.0.0.0',
                    base: ['./django/', './', './styleguide/', './styleguide/html/']
                }
            }
        },

        sassdown: {
            options: {
                readme: '<%= options.compassPath %>README.md',
                excludeMissing: true,
                assets: [
                    '<%= options.cssPath %>**/*.css',
                    '<%= options.jsPath %>libs/jquery.js',
                    '<%= options.jsPath %>libs/jquery.selectskin.js',
                    'styleguide/assets/main.js'
                ]
            },
            files: {
                expand: true,
                cwd: 'compass/source/core',
                src: ['**/*.{sass,scss}'],
                dest: 'styleguide/html/'
            }
        },

        'string-replace': {
            errorPage: {
                files: {
                    'nginx/50x.html': 'nginx/50x.html'
                },
                options: {
                    replacements: [{
                        pattern: /<img(.*?)>/igm,
                        replacement: function (match) {
                            var file = './django/static/img/common/logo_fb200x200.png',
                                base64data;
                            if (fs.existsSync(file)) {
                                base64data = fs.readFileSync(file).toString("base64");
                                return '<img src="data:'+mime.lookup(file)+';base64,'+base64data+'">';
                            } else {
                                return match;
                            }
                        }
                    }]
                }
            }
        },

        watch: {
            livereload: {
                files: [
                    '<%= options.cssPath %>**/*.css',
                    '<%= options.djangoPath %>app/**/templates/**/*.html',
                    '<%= options.jsPath %>**/*.js'
                ],
                options: {
                    livereload: true
                }
            },

            js: {
                files: ['<%= jshint.all %>'],
                tasks: ['jshint']
            },

            sprites: {
                files: ['<%= options.staticPath %>img/sprite/*.png'],
                tasks: ['shell:compassCompile']
            },

            fontello: {
                files: ['<%= options.staticPath %>font/fontello/*.json'],
                tasks: ['fontello']
            },

            styleguide: {
                files: [
                    '<%= options.compassPath %>source/core/*.scss'
                ],
                tasks: ['clean:styleguide', 'sassdown']
            }
        },

        concurrent: {
            options: {
                logConcurrentOutput: true
            },

            watchAll: {
                tasks: ['shell:compassWatch', 'watch']
            },

            watchStyleguide: {
                tasks: ['connect:styleguide', 'watch:styleguide', 'shell:compassWatch']
            }
        }
    });

    // load tasks
    require('load-grunt-tasks')(grunt);
    grunt.loadNpmTasks('sassdown');

    // Default task(s).
    grunt.registerTask('docs', ['sassdown', 'concurrent:watchStyleguide']);
    grunt.registerTask('css', ['shell:compassCompile']);
    grunt.registerTask('cleancss', ['shell:compassClean']);
    grunt.registerTask('bundler', ['shell:bundler']);
    grunt.registerTask('logo', ['string-replace:errorPage']);
    grunt.registerTask('default', ['concurrent:watchAll']);
};
