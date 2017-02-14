/**
 * Created by mmarinescu on 2/13/2017.
 */
const gulp = require('gulp'),
    nodemon = require('gulp-nodemon')

gulp.task('default', () => {
    nodemon({
        script: 'app.js',
        ext: 'js',
        env: {
            PORT: 8000
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', () => {
        console.log('Restarting...')
    })
})