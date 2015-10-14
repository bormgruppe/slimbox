var gulp = require('gulp');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var webserver = require('gulp-webserver');
var concat = require('gulp-concat');

gulp.task('clean', function(){
    return del.sync('./dist/**');
});

gulp.task('minify-js', function(){
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(rename(function(path){
            path.basename += '.min';
        }))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('concat-js', ['minify-js'], function(){
    return gulp.src(['./dist/slimbox2.min.js', './dist/autoload.min.js'])
        .pipe(concat('slimbox2-autoload.min.js'))
        .pipe(gulp.dest('./dist/'));
})

gulp.task('rebuild-all', function(){
    runSequence('clean', 'concat-js');
});


gulp.task('serve-example', function(){
    gulp.src('./')
        .pipe(webserver({
            open: 'example.html'
        }));
});

