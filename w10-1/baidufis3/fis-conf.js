fis.match('::packager', {
    spriter: fis.plugin('csssprites')
});

fis.match('*.{js,css,png}', {
    useHash: true
});
//将选中的文件加入到静态映射表中
fis.match('*.{png,jpg}', {
    useMap: true
});

fis.match('*.js', {
    optimizer: fis.plugin('uglify-js')
});

fis.match('*.css', {
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

fis.match('*.html', {
  //invoke fis-optimizer-html-minifier
  optimizer: fis.plugin('html-minifier')
});
