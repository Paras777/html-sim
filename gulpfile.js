var gulp = require('gulp');
var sass = require('gulp-sass');
var merge = require('merge-stream');
var injectPartials = require('gulp-inject-partials');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var mearge = require('merge-stream');
var rename = require('gulp-rename');
var cssmin = require('gulp-cssmin');
var minify = require('gulp-minify');

var source = {
    sassSource : 'src/scss/*.scss',
    htmlSource: 'src/*.html',
    htmlPartialSource: 'src/partial/*.html',
    jsSource: 'src/js/**'
};

var path = {
    root: 'app/',
    css: 'app/css',
    js: 'app/js'
};

gulp.task('sass', function(){
    var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
    var sassFiles;

    sassFiles = gulp.src(source.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        return merge(sassFiles, bootstrapCSS)
            .pipe(concat('main.css'))
            .pipe(gulp.dest('app/css'))
});

gulp.task('html', function(){
    return gulp.src(source.htmlSource)
    .pipe(injectPartials())
    .pipe(gulp.dest(path.root))
});

gulp.task('scripts', function(){
    return gulp.src(source.jsSource)
        .pipe(concat('main.js'))
        .pipe(browserify())
        .pipe(gulp.dest(path.js))
});

gulp.task('compress', function(){
    return gulp.src('./app/js/main.js')
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(gulp.dest('app/js'))
});

gulp.task('comprescss', function(){
    var bootstrapCSS = gulp.src('./node_modules/bootstrap/dist/css/bootstrap.css');
    var sassFiles;

    sassFiles = gulp.src(source.sassSource)
        .pipe(autoprefixer())
        .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
        return merge(sassFiles, bootstrapCSS)
            .pipe(concat('main.css'))
            .pipe(cssmin())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('app/css'))
});

gulp.task('default', gulp.series('sass', 'html', 'scripts', 'compress', 'comprescss'));