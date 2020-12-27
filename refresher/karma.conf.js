/* global __dirname, require */
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
	config.set({
		basePath: '',
		browsers: [
			// 'Chrome',
			'ChromeHeadless',
		],
		client: {
			clearContext: false, // leave Jasmine Spec Runner output visible in browser
		},
		colors: true,
		coverageReporter: {
			reporters: [
				{
					check: { // More info - https://github.com/karma-runner/karma-coverage/blob/master/docs/configuration.md#check
						branches: 25,
						excludes: [],
						functions: 25,
						lines: 25,
						statements: 25,
					},
					dir: require('path').join(__dirname, 'coverage', 'refresher'),
					type: 'html',
					watermarks: { // first is start of yellow, second is start of green
						branches: [ 50, 80 ],
						functions: [ 50, 80 ],
						lines: [ 50, 80 ],
						statements: [ 50, 80 ],
					},
				},
				{
					check: {
						branches: 25,
						excludes: [],
						functions: 25,
						lines: 25,
						statements: 25,
					},
					type: 'text-summary',
					watermarks: { // first is start of yellow, second is start of green
						branches: [ 50, 80 ],
						functions: [ 50, 80 ],
						lines: [ 50, 80 ],
						statements: [ 50, 80 ],
					},
				},
			],
		},
		customLaunchers: {
			ChromeHeadlessCustom: {
				base: 'ChromeHeadless',
				flags: ['--no-sandbox', '--disable-gpu'],
			}
		},
		exclude: [
			'**/main.ts',
			'**/mock-heroes.ts',
			'**/test.ts',
		],
		files: [
			'**/application-pipes/*.ts'
		],
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		logLevel: config.LOG_INFO, // default val
		plugins: [
			require('karma-chrome-launcher'),
			require('karma-coverage'),
			require('karma-jasmine'),
			require('karma-jasmine-html-reporter'),
			require('@angular-devkit/build-angular/plugins/karma'),
		],
		port: 9876, // default val
		restartOnFileChange:true,
		retryLimit: 2, // default val
		reporters: ['progress', 'coverage'],
		singleRun: true,
	})
}
