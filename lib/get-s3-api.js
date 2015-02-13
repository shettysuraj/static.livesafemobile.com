'use strict';

var _ = require('ls-lodash'),
    aws = require('aws-sdk'),
    s3Config = {};

module.exports = _.once(function getS3Api() {
    return new aws.S3(s3Config);
});
