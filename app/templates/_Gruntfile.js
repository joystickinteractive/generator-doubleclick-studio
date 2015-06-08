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
      image: {
        files: ['dev/sprites/*.png'],
        tasks: ['sprite'],
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

    uglify: {
      core: {
        options: {
          mangle: false
        },
        files: {
          'pub/app.js': ['dev/*.js']
        }
      }
    },
    cssmin: {
      core: {
        files: {
          'pub/style.css': ['dev/*.css']
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
    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: 'pub/'
      },
      html: 'pub/index.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          'pub/'
        ]
      },
      html: ['pub/{,*/}*.html'],
      css: ['pub/{,*/}*.css']
    },
    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: false,
          removeOptionalTags: false,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeComments: true,
        },
        files: [{
          expand: true,
          cwd: 'pub/',
          src: '{,*/}*.html',
          dest: 'pub/'
        }]
      }
    },
    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: 'dev/',
          src: ['**', '!sprites/**'],
          dest: 'pub/'
        }]
      }
    },
    sprite:{
      all: {
        src: 'dev/sprites/*.png',
        dest: 'dev/spr.png',
        destCss: 'dev/sprites.css',
        padding: 2,
        cssOpts: {
          cssSelector: function (item) {
            return '.' + item.name;
          }
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-usemin');

  // Load in `grunt-spritesmith`
  grunt.loadNpmTasks('grunt-spritesmith');

  // Default task.
  grunt.registerTask('default', ['clean', 'copy', 'concat', 'imagemin']);
  grunt.registerTask('build', ['clean', 'sprite', 'copy', 'cssmin', 'uglify', 'imagemin', 'useminPrepare', 'usemin', 'htmlmin']);

  grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive']);
    }

    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.task.run(['clean', 'connect:livereload', 'watch']);
  });
};