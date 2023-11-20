const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const {src, dest, watch, parallel, series} = require('gulp');
const avif = require('gulp-avif');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'));
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const webp = require('gulp-webp');
const csso = require('postcss-csso');

// Пути
const buildPath = './build/';
const sourcePath = './source/';

const path = {
  build: {
    html: buildPath,
    fonts: `${buildPath}fonts/`,
    favicon: buildPath,
    images: `${buildPath}images/`,
    css: `${buildPath}css/`,
    javaScript: `${buildPath}scripts/`,
  },
  source: {
    html: `${sourcePath}**/*.html`,
    fonts: `${sourcePath}fonts/**/*.{eot,woff,woff2,ttf,svg}`,
    favicon: `${sourcePath}favicon/**.*`,
    images: `${sourcePath}images/**/*.{jpg,jpeg,png}`,
    svg: `${sourcePath}images/**/*.svg`,
    scss: `${sourcePath}scss/style.scss`,
    less: `${sourcePath}less/style.less`,
    javaScript: `${sourcePath}scripts/**/*.js`,
  },
  watch: {
    html: `${sourcePath}**/*.html`,
    fonts: `${sourcePath}fonts/**/*.{eot,woff,woff2,ttf,svg}`,
    favicon: `${sourcePath}favicon/**.*`,
    images: `${sourcePath}images/**/*.{jpg,jpeg,png}`,
    svg: `${sourcePath}images/**/*.svg`,
    scss: `${sourcePath}scss/**/*.scss`,
    less: `${sourcePath}less/style.less`,
    javaScript: `${sourcePath}scripts/**/*.js`,
  },
};

// Очистка build
function clean() {
  return del(buildPath);
}

// HTML
function html() {
  return src(path.source.html)
    .pipe(plumber())
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(dest(path.build.html))
    .pipe(browserSync.stream());
}

// CSS/SCSS
function css() {
  return src([path.source.scss], {sourcemaps: true})
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(
      postcss([
        autoprefixer({
          overrideBrowserslist: ['last 10 version'],
          grid: true,
        }),
      ])
    )
    .pipe(postcss([csso()]))
    .pipe(rename({suffix: '.min'}))
    .pipe(dest(path.build.css, {sourcemaps: '.'}))
    .pipe(browserSync.stream());
}

// JavaScript
function javascript() {
  return src([path.source.javaScript])
    .pipe(plumber())
    .pipe(dest(path.build.javaScript))
    .pipe(browserSync.stream());
}

// Шрифты
function fonts() {
  return src(path.source.fonts)
    .pipe(plumber())
    .pipe(dest(path.build.fonts))
    .pipe(browserSync.stream());
}

// Favicon
function favicon() {
  return src(path.source.favicon, {base: sourcePath})
    .pipe(plumber())
    .pipe(dest(path.build.favicon))
    .pipe(browserSync.stream());
}

// Изображения
function images() {
  return src([path.source.images, '!./source/images/**/*.svg'])
    .pipe(avif({quality: 50}))
    .pipe(src([path.source.images]))
    .pipe(webp())
    .pipe(src([path.source.images, '!./source/images/**/*.svg']))
    .pipe(imagemin())
    .pipe(dest(path.build.images))
    .pipe(browserSync.stream());
}

// SVG Sprite
function sprite() {
  return src([path.source.svg])
    .pipe(plumber())
    .pipe(svgmin())
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename('sprite.svg'))
    .pipe(dest(path.build.images))
    .pipe(browserSync.stream());
}

// Локальный сервер
function server() {
  browserSync.init({
    server: {baseDir: buildPath},
    notify: true,
    online: true,
  });
}

// Наблюдения
function watching() {
  watch(path.watch.html, html);
  watch([path.watch.scss], css);
  watch(path.watch.fonts, fonts);
  watch(path.watch.favicon, favicon);
  watch(path.watch.images, images);
  watch(path.watch.svg, sprite);
  watch([path.watch.javaScript], javascript);
}

exports.clean = clean;
exports.html = html;
exports.css = css;
exports.javascript = javascript;
exports.fonts = fonts;
exports.favicon = favicon;
exports.server = server;
exports.watching = watching;
exports.images = images;
exports.sprite = sprite;

exports.build = series(
  clean,
  html,
  css,
  javascript,
  fonts,
  favicon,
  images,
  sprite
);

exports.dev = parallel(
  series(clean, html, css, javascript, fonts, favicon, images, sprite, server),
  watching
);
