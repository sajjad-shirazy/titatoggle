module.exports = function(grunt) {
require( 'time-grunt' )( grunt );
require( 'load-grunt-tasks' )( grunt );
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        watch: {
            styles: {
                // Which files to watch (all .less files recursively in the less directory)
                files: ['less/*.less'],
                tasks: ['less:develop','shell:jekyllBuild'],
                options: {
                    nospawn: true,
                    atBegin:true
                }
            },

            html:{
                files : [ '_layouts/*.html',
                '_includes/*.*',
                '_posts/*.markdown',
                '_config.yml',
                'pages/**',
                'index.html',
                '404.html' ],
                tasks : [ 'shell:jekyllBuild' ],
                options : {
                    spawn : true,
                    interrupt : true,
                    atBegin : true,
                    livereload : true
                }
            }
        },
        clean: {
            docs: {
                src: ['docs']
            },
            dist: {
                src: ['dist']
            }
        },
        copy: {
            deploy: {
                files: [
                // includes files within path
                {expand: true,  cwd: 'less/', src: ['_titatoggle.less'], dest: 'dist/'},
                ]
            }
        },

        shell : {
            jekyllBuild : {
                command : 'jekyll build'
            },
            jekyllServe : {
                command : 'jekyll serve'
            }
        },
        less: {
            develop: {
                options: {
                    sourceMap: true
                },
                files: {
                    "docs/css/main.css": "less/main.less"
                }
            },
            deploy: {
                options: {
                    cleancss: true
                },
                files: {
                    "dist/titatoggle-dist.css": "less/slider.less"
                }
            }
        },


    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('deploy', ['clean','less:develop','less:deploy','copy:deploy','shell:jekyllBuild']);
    grunt.registerTask('default', ['watch']);

};
