'use strict';

module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '',
        // Task configuration.
        clean: {
            dist: {
                src: ['pub/**']
            }
        },
        concat: {
            css: {
                files: {
                    'pub/style.css': ['dev/*.css', '!dev/style.css']
                }
            }
        },
        imagemin: { // Task
            dist: { // Target
                options: { // Target options
                    optimizationLevel: 3
                },
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['*.png', '*.jpg'],
                    dest: 'pub/'
                }]
            }
        },
        copy: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dev/',
                    src: ['**', '!*.css', '!*.png', '!*.jpg'],
                    dest: 'pub/'
                }]
            }
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Default task.
    grunt.registerTask('default', ['clean', 'copy', 'concat', 'imagemin']);
    grunt.registerTask('build', ['clean', 'copy', 'concat', 'imagemin']);
};