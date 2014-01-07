'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    // Task configuration.
    clean: {
      files: ['<%= pkg.rawFolder %>', '<%= pkg.distName %>', '<%= pkg.distName %>.zip']
    },
    gitclone: {
      clone: {
        options: {
            repository: 'git@git.augmentum.com.cn:augmarketing/campaign-portal.git',
            branch: 'develop',
            directory: '<%= pkg.rawFolder %>'
        }
      }
    },
    copy: {
      main: {
        files:[
          {
            expand: true,
            cwd: '<%= pkg.copyFolder %>',
            src: '**',
            dest: '<%= pkg.distName %>/',
            dot: true
          },
        ]
      }
    },
    replace: {
      mainPHP: {
        src: ['<%= pkg.distName %>/protected/config/main.php'],
        dest: '<%= pkg.distName %>/protected/config/',
        replacements: [{
          from: /(connectionString'\s*=>\s*).+',/g,
          to: "$1'mysql:host={DB_HOST};dbname={DB_NAME}',"
        },{
          from: /(username'\s*=>\s*).+',/g,
          to: "$1'{DB_USERNAME}',"
        },{
          from: /(password'\s*=>\s*).+',/g,
          to: "$1'{DB_PASSWORD}',"
        },{
          from: /(Host'\s*=>\s*).+',/g,
          to: "$1'{MAIL_HOST}',"
        },{
          from: /(Port'\s*=>\s*).+',/g,
          to: "$1'{MAIL_PORT}',"
        },{
          from: /(Username'\s*=>\s*).+',/g,
          to: "$1'{MAIL_USERNAME}',"
        },{
          from: /(Password'\s*=>\s*).+',/g,
          to: "$1'{MAIL_PASSWORD}',"
        }]
      },
      paramsPHP: {
        src: ['<%= pkg.distName %>/protected/config/params.php'],
        dest: '<%= pkg.distName %>/protected/config/',
        replacements: [{
          from: /(server_address'\s*=>\s*).+',/g,
          to: "$1'{AE_HOST}',"
        }]
      }
    },
    compress: {
      main: {
        options: {
          archive: '<%= pkg.distName %>.zip'
        },
        files: [
          {
            expand: true,
            cwd: '<%= pkg.distName %>/',
            src: ['**'],
            dest: '<%= pkg.distName %>/',
            dot: true
          }
        ]
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-text-replace');
  grunt.loadNpmTasks('grunt-contrib-compress');

  // Default task.   ,
  grunt.registerTask('default', ['clean', 'gitclone', 'copy', 'replace', 'compress']);

};