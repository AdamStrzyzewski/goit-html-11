import gulp from "gulp";
import dartSass from "sass";
import gulpSass from "gulp-sass";
import rename from "gulp-rename";
import autoPrefixer from "gulp-autoprefixer";

const sass = gulpSass(dartSass);

gulp.task("scss", () => {
  return gulp
    .src("scss/**/*.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(autoPrefixer())
    .pipe(gulp.dest("./public/css/", { sourcemaps: "/" }));
});

gulp.task("scss-minify", () => {
  return gulp
    .src("scss/**/*.scss", { sourcemaps: true })
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoPrefixer())
    .pipe(
      rename((path) => ({
        dirname: "./",
        basename: path.basename + ".min",
        extname: ".css",
      }))
    )
    .pipe(gulp.dest("./public/css/", { sourcemaps: "/" }));
});

gulp.task("watch", function () {
  gulp.watch("./scss/**/*.scss", gulp.series("scss", "scss-minify"));
});
