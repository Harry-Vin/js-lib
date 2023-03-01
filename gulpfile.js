const sass = require('gulp-sass')(require('dart-sass'))
const gulp = require('gulp');
const plumber = require("gulp-plumber");
const cleanCss = require("gulp-clean-css");
const del = require('del');
const postcss = require('gulp-postcss');
const ts = require('gulp-typescript');
const merge = require('merge2');

const tsProject = ts.createProject('tsconfig.json');
const dest = gulp.dest;
const src = gulp.src;
const series = gulp.series;

function clean(){
    return del('dist')
}

function scss(){
    return src(['src/styles/*.scss'])
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss())
        .pipe(cleanCss())
        .pipe(dest('dist/styles'))
}

function css(){
    return src(['src/styles/*.css'])
        .pipe(plumber())
        .pipe(postcss())
        .pipe(cleanCss())
        .pipe(dest('dist/styles'))
}

function typescript(){
    const tsResult  = src(['src/*.ts'])
        .pipe(plumber())
        .pipe(tsProject());

    return merge([
        tsResult.dts.pipe(dest('dist/types')),
        tsResult.js.pipe(gulp.dest('dist'))
    ])
}

exports.default = series(clean,scss,css,typescript)
