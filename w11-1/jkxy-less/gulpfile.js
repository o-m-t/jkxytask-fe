//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp'), //本地安装gulp所用到的地方
less = require('gulp-less');

//定义一个jkxyLess任务（自定义任务名称）
gulp.task('jkxyLess', function () {
gulp.src('src/less/index.less') //该任务针对的文件
    .pipe(less()) //该任务调用的模块
    .pipe(gulp.dest('src/css')); //将会在src/css下生成index.css
});

gulp.task('default',['jkxyLess']); 

