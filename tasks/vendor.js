var gulp = require('gulp'),
    path = require('path'),
    rimraf = require('rimraf'),
    _ = require('lodash'),
    Logger = require('../Logger');

var clean = function() {
    rimraf(path.join(config.base, config.vendor.dest), function(){});
};

var buildVendorGlob = function (vendor) {
    return path.join(process.cwd(), 'node_modules', vendor, '**/*');
};

var buildVendorDest = function (vendor) {
    return path.join(config.base, config.vendor.dest, vendor);
};

var clone = function () {
    _.each(config.vendor.packages, function (vendor) {
        gulp.src(buildVendorGlob(vendor))
            .pipe(gulp.dest(buildVendorDest(vendor)));
    });
};

var vendorTask = function () {
    Logger.heading('Vendor packages');
    Logger.message('Cleaning ...');
    clean();
    Logger.message('Cloning ...');
    return clone();
};

var task = function (configFile) {
    config = configFile;

    return vendorTask;
};

module.exports = task;