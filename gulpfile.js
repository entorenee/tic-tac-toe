var gulp = require('gulp');
var projectFolder = '../../../portfolio_site/projects/tic-tac-toe';

gulp.task('copy', function() {
  return gulp.src('./build/**/*')
             .pipe(gulp.dest(projectFolder))
});
