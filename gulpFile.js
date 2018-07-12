const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsProject = ts.createProject("./tsconfig.server.json");

gulp.task('default', function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("./src/server/js/"));
});

const watcher = gulp.watch('./src/server/ts/**/*.ts', ['default']);

watcher.on('change', event => {
    console.log('TypeScript:', new Date);
    console.log(event);
});
