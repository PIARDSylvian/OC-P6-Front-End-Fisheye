module.exports = function (grunt) {
    grunt.initConfig({
        uglify: {
            my_target: {
                files: {
                    'public/scripts/base.min.js': [
                        'scripts/models/abstractModelPhotographer.js',
                        'scripts/templates/abstractTemplatePhotographer.js',
                        'scripts/factories/photographer.js',
                        'scripts/utils/getPhotographers.js'
                    ],
                    'public/scripts/home.min.js': [
                        'scripts/models/photographerModelCard.js',
                        'scripts/templates/photographerTemplateCard.js',
                        'scripts/pages/home.js'
                    ],
                    'public/scripts/photographer.min.js': [
                        'scripts/models/photographerModelPage.js',
                        'scripts/models/abstractModelMedia.js',
                        'scripts/models/photographerImageCard.js',
                        'scripts/models/photographerVideoCard.js',
                        'scripts/templates/photographerTemplatePage.js',
                        'scripts/templates/abstractTemplateMedia.js',
                        'scripts/templates/photographerTemplateImage.js',
                        'scripts/templates/photographerTemplateVideo.js',
                        'scripts/factories/media.js',
                        'scripts/utils/customSelect.js',
                        'scripts/utils/modal.js',
                        'scripts/utils/carousel.js',
                        'scripts/pages/photographer.js'
                    ]
                }
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
        copy: {
            main: {
                files: [{src : 'node_modules/normalize.css/normalize.css', dest: 'public/normalize.css'}]
            },
        },
        watch: {
            js:  { files: 'scripts/**/*.js', tasks: [ 'uglify' ] },
            css:  { files: ['sass/main.scss', 'sass/**/*.scss'], tasks: [ 'copy','sass' ] }
        },
    });

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // register at least this one task
    grunt.registerTask('default', ['uglify', 'copy', 'sass']);
};