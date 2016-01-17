module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: grunt.file.readJSON('jshint.json'),
        lint: {
            frontend: ['public/js/**/*.js']
        },
        watch: {
            files: ['<%= lint.frontend %>'],
            tasks: 'default'
        },
        requirejs: {
            build: {
                configFile: 'tools/requirejs/build.json'
            }
        },
        sass: {
            compile: {
                options: {
                    loadPath: 'node_modules/bootstrap-sass/assets/stylesheets'
                },
                files: [{
                    expand: true, // Enable dynamic expansion
                    cwd: 'public/sass', // src marches are relative to this path
                    src: ['**/*.scss', '!**/_*.scss'], // Actual patterns to match
                    dest: 'public/css', // Destination path prefix
                    ext: '.css' // Destination filepaths will have this extension
                }]
            }
        },
        copy: {
            fonts: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'public/sass/font-awesome-4.1.0',
                    dest: 'public/css/font-awesome-4.1.0',
                    src: [
                        'fonts/*.*'
                    ]
                }]
            }
        },
        jst: {
            options: {
                amd: true
            },
            compile: {
                files: {
                    'public/js/templates.js': ['public/js/templates/*.ejs']
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-jst');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.loadTasks('./tools/grunt-tasks');

    grunt.registerTask('compile', ['sass:compile', 'copy:fonts', 'jst']);
    grunt.registerTask('default', ['jshint:*']);
};
