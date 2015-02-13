'use strict';

var _ = require('ls-lodash'),
    aws = require('aws-sdk'),
    cloudfrontConfig = {}; 

module.exports = _.once(function getCloudfrontApi() {
    return new aws.cloudfront(cloudfrontConfig);
});
