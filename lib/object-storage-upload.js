'use strict';

var q = require('q'),
    qFs = require('q-io/fs'),
    _ = require('ls-lodash'),
    path = require('path'),
    s3 = require('./get-s3-api')(),
    s3PutObject = q.nbind(s3.putObject, s3);

module.exports = function objectStorageUpload(bucketName, sourceDir) {
    return qFs.list(sourceDir).then(function(objsToUpload) {
        return q.all(_.map(objsToUpload, function(objToUpload) {
            return qFs.read(path.join(sourceDir, objToUpload)).then(function(objContents) {
                return s3PutObject({
                    Bucket: bucketName,
                    Key: objToUpload,
                    Body: objContents,
                    CacheControl: 'no-cache',
                    ContentType: 'text/html'
                });
            });
        }));
    });
};
