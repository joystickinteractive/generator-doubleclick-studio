'use strict';

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '',
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['dev/*.js'],
        tasks: [],
        options: {
          livereload: '<' + '%= connect.options.livereload %>'
        }
      },
      livereload: {
        options: {
          livereload: '<' + '%= connect.options.livereload %>'
        },
        files: [
          'dev/*.html',
          'dev/*.css',
          'dev/*.js',
          'dev/{,*/}*.{png,jpg,jpeg,gif,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect.static('dev')
            ];
          }
        }
      }
    },
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

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.task.run(['clean', 'connect:livereload', 'watch']);
  });
};