import gulp from 'gulp'
import webpack from 'webpack'
import webpackConfig from './webpack.config'
import gutil from 'gulp-util'
import stylus from 'gulp-stylus'

gulp.task('webpack', (cb) => {
  let devWebpackConfig = Object.create(webpackConfig)
  devWebpackConfig.watch = true
  webpack(devWebpackConfig, (err, stats) => {
    gutil.log('[webpack:build]', stats.toString({
      colors: true
    }))
    cb()
  })
})

gulp.task('stylus', () => {
  gulp.src('./src/styl/main.styl')
    .pipe(stylus())
    .pipe(gulp.dest('./lib/css'))
})

gulp.task('watch', () => {
  gulp.watch('./src/styl/*.styl', ['stylus'])
})

gulp.task('build', ['webpack', 'stylus'])

gulp.task('default', ['build', 'watch'])