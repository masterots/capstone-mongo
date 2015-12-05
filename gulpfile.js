var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('compile', function () {
  return gulp.src(['src/**/*.js'])
    .pipe(babel({
      "presets": ["es2015"],
      "plugins": ["syntax-async-functions", "transform-regenerator"]
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', ['compile']);

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['compile']);
});
