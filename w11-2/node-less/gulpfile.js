var gulp = require('gulp');
var less = require('gulp-less');
var plumber = require('gulp-plumber');

var paths = {
	less: ['./less/**.less']
};

gulp.task('less', function() {
		// 1. 找到 less 文件
    gulp.src(paths.less)
		// less错误不退出
        .pipe(plumber())
		// 2. 编译为css
        .pipe(less())
		// 3. 另存文件
        .pipe(gulp.dest('css'));
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function () {
    // 监听文件修改，当文件被修改则执行 less 任务
    gulp.watch('less/**.less', ['less']);
});

gulp.task('default', ['less', 'auto']);
