//webpack.config.js
'use strict';
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./config');
const parts = require('./webpack.parts');
const path = require('path');
const log = console.log;

const paths = {
	dir: __dirname,
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'dist')
};

const commonConfig = merge([
	parts.progress(),
	{
		resolve: {
			modules: [paths.dir + '/node_modules/']
		},
		entry: ['./app/assets/js/app.js', './app/assets/scss/test.scss'],
		output: {
			path: path.resolve(__dirname, config.productionFolderName),
			filename: 'test.js'
		},
	}
]);

const productionConfig = merge([
	parts.clean(paths.build),
	parts.handlebarsBuild(),
	parts.eslint(),
	parts.extractCSS(),
	parts.loadJavaScript(),
	parts.minifyJavaScript(),
	parts.minifyCSS({
		options: {
			discardComments: {
				removeAll: true,
			},
			safe: true,
		},
	}),
	parts.compression(),
	parts.imageCompression()
]);

const developmentConfig = merge([
	parts.handlebarsBuild(),
	parts.loadCSS(),
	parts.loadJavaScript(),
	parts.loadImages(),
	parts.lintSCSS(),
	parts.devServer({
		host: 'localhost',
		port: config.webpackDevServer.port
	}),
	{
		plugins: [
			new webpack.HotModuleReplacementPlugin()
		]
	},
]);

module.exports = (env) => {
	process.env.NODE_ENV = env;
	log('Enviroment...', process.env.NODE_ENV);
	switch (env) {
		case 'production':
			return merge(commonConfig, productionConfig);
			break;
		case 'development':
			return merge(commonConfig, developmentConfig);
			break;
	}
};