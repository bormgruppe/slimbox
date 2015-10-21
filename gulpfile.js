var gulp = require('gulp');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('run-sequence');
var concat = require('gulp-concat');

// used to serve the example
var connect = require('connect');
var static = require('serve-static');
var open = require('open');

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
});

gulp.task('rebuild-all', function(){
    runSequence('clean', 'concat-js');
});

// Serve dir at port and open the browser at path (relative to dir)
var serveAndOpen = function(dir, port, path) {
    connect()
        .use(static(dir))
        .listen(port, function() {
            gutil.log('Starting webserver on port ' + port);
            var openPath = 'http://localhost:' + port + '/' + path;
            gutil.log('Opening browser at ' + openPath);
            open(openPath);
        });
};

gulp.task('serve-example', function(){
    serveAndOpen('./', 8000, 'example.html');
});

