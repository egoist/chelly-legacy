import gulp from 'gulp'
import babel from 'gulp-babel'
import gutil from 'gulp-util'
import stylus from 'gulp-stylus'

const paths = {
  babel: {
    src: ['./src/js/*.*', './src/js/*/*.*'],
    target: './lib/js'
  },
  stylus: {
    main: './src/styl/main.styl',
    src: './src/styl/*.styl',
    target: './lib/css'
  }
}

gulp.task('babel', () => {
  gulp.src(paths.babel.src)
    .pipe(babel())
    .pipe(gulp.dest(paths.babel.target))
})

gulp.task('stylus', () => {
  gulp.src(paths.stylus.main)
    .pipe(stylus())
    .pipe(gulp.dest(paths.stylus.target))
})

gulp.task('watch', () => {
  gulp.watch(paths.babel.src, ['babel'])
  gulp.watch(paths.stylus.src, ['stylus'])
})

gulp.task('build', ['babel', 'stylus'])

gulp.task('default', ['build', 'watch'])
