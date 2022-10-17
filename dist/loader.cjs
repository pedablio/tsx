'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var pkgroll_createRequire = require('./pkgroll_create-require-03d3fb82.cjs');
var esmLoader = require('@esbuild-kit/esm-loader');
require('module');

pkgroll_createRequire.require("@esbuild-kit/cjs-loader");

Object.keys(esmLoader).forEach(function (k) {
	if (k !== 'default' && !exports.hasOwnProperty(k)) Object.defineProperty(exports, k, {
		enumerable: true,
		get: function () { return esmLoader[k]; }
	});
});
