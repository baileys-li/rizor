"use strict";

const gulp = require("gulp"),
  log = require("fancy-log"),
  sass = require("gulp-sass"),
  cleanCSS = require("gulp-clean-css"),
  autoprefixer = require("gulp-autoprefixer"),
  pug = require("gulp-pug"),
  pugbem = require("gulp-pugbem"),
  imagemin = require("gulp-imagemin"),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload;

// * Paths setup

const srcBase = "./src/",
  destBase = "./build/";
const paths = {
  pages: {
    src: srcBase + "pages/*.pug",
    all: srcBase + "pages/**/*.pug",
    dest: destBase,
  },

  sass: {
    src: srcBase + "sass/**/*.{sass,scss}",
    dest: srcBase + "css/",
  },

  css: {
    src: srcBase + "css/**/*.css",
    dest: destBase + "css/",
  },

  images: {
    src: srcBase + "img/**/*",
    dest: destBase + "img/",
  },
};

// * Pug Compiler
gulp.task("pug", () =>
  gulp
    .src(paths.pages.src)
    .pipe(
      pug({
        pretty: true,
        plugins: [pugbem],
      })
    )
    .pipe(gulp.dest(paths.pages.dest))
);

// * Sass Compiler
sass.compiler = require("node-sass");
gulp.task("sass", () =>
  gulp
    .src(paths.sass.src)
    .pipe(sass())
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest(paths.sass.dest))
    .pipe(browserSync.stream())
);

// * CSS Minifier
gulp.task("css", () =>
  gulp
    .src(paths.css.src)
    .pipe(
      cleanCSS({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest(paths.css.dest))
);

gulp.task("images", () =>
  gulp
    .src(paths.images.src)
    .pipe(
      imagemin([
        imagemin.optipng({
          optimizationLevel: 3,
        }),
        imagemin.mozjpeg({
          progressive: true,
          quality: 75,
        }),
        imagemin.svgo(),
      ])
    )
    .pipe(gulp.dest(paths.images.dest))
);

// * Watchers, Browser Sync

gulp.task("watch", () => {
  gulp.watch(paths.pages.all, gulp.series("pug"));
  gulp.watch(paths.sass.src, gulp.series("sass", "css"));
  gulp.watch(destBase + "*.html").on("change", reload);
  gulp.watch(destBase + "js/**/*.js").on("change", reload);
});

gulp.task("serve", () =>
  browserSync.init({
    server: {
      baseDir: destBase,
    },
  })
);

gulp.task(
  "default",
  gulp.series(gulp.parallel("pug", "sass"), gulp.parallel("watch", "serve"))
);
