module.exports = function (grunt) {
    grunt.initConfig({

        // define source files and their destinations
        uglify: {
            options: {
                mangle: true
            },
            files: { 
                src: 'scripts/**/*.js',  // source files mask
                dest: 'public/',    // destination folder
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                ext: '.min.js'   // replace .js to .min.js
            }
        },
        sass: {
            options: {
                style: 'compressed'
            },
            files: { 
                src: 'sass/main.scss',  // source files mask
                dest: 'public/',    // destination folder
                expand: true,    // allow dynamic building
                flatten: true,   // remove all unnecessary nesting
                ext: '.min.css'   // replace .js to .min.js
            }
        },
        watch: {
            js:  { files: 'scripts/**/*.js', tasks: [ 'uglify' ] },
            css:  { files: ['sass/main.scss', 'sass/**/*.scss'], tasks: [ 'sass' ] }
        },
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');

        // register at least this one task
        grunt.registerTask('default', ['uglify', 'sass']);

};