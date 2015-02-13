'use strict';

var _ = require('ls-lodash'),
    gulp = require('gulp'),
    fs = require('fs'),
    q = require('q'),
    qFs = require('q-io/fs'),
    path = require('path'),
    lvsfGulpTasks = require('lvsf-gulp-tasks'),
    objStorageUp = require('./lib/object-storage-upload'),
    
    buildDir = path.join(__dirname, 'dist'),
    templatesDir = path.join(__dirname, 'html');

gulp.task('default', ['template']);

gulp.task('test', ['lint']);

gulp.task('cleanup', []);

gulp.task('deploy', ['template', 'object-storage-upload']);

gulp.task('lint', lvsfGulpTasks.lint(['./lib/**/*.js', './*.js'], ['./test/**/*.js']));

gulp.task('clean', function() {
    return qFs.isDirectory(buildDir).then(function(isDir) {
        return isDir ? qFs.removeTree(buildDir) : void 0;
    }); 
});

gulp.task('template', ['clean'], function() {
    return q.all([
        qFs.read('./lib/org-redirect.js'),
        qFs.read(path.join(templatesDir, 'error.html')),
        qFs.read(path.join(templatesDir, 'index.html')),
        qFs.makeTree(buildDir)
    ]).spread(function(jsContent, errorTemplateHtml, indexHtml) {
        var errorHtml = _.template(errorTemplateHtml)({ js: jsContent });

        return q.all([
            qFs.write(path.join(buildDir, 'error.html'), errorHtml),
            qFs.write(path.join(buildDir, 'index.html'), indexHtml)
        ]);
    });

});

gulp.task('object-storage-upload', ['template'], _.seal(objStorageUp, ['static.livesafemobile.com', buildDir], 0));
