// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['parallel', 'jasmine', '@angular-devkit/build-angular'],
 
       plugins: [
            require('karma-parallel'),
            require('karma-jasmine'),
            require('karma-chrome-launcher'),
            require('karma-jasmine-html-reporter'),
            require('karma-coverage-istanbul-reporter'),
            require('@angular-devkit/build-angular/plugins/karma')
        ],

        client: {
            clearContext: false // leave Jasmine Spec Runner output visible in browser
        },

        coverageIstanbulReporter: {
            dir: require('path').join(__dirname, '../coverage/'),
            reports: ['html', 'lcovonly', 'text-summary'],
            fixWebpackSourcePaths: true
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['coverage-istanbul','progress', 'kjhtml'],

        // web server port
        port: Math.floor((Math.random() * 500) + 9500),

        // enable / disable colors in the output (reporters and logs)
        colors: true,

        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,

        angularCli: {
            environment: 'dev'
        },

        browsers: ['ChromeHeadlessNoSandbox'],

        // How long does Karma wait for a browser to reconnect (in ms).
        // With a flaky connection, it is pretty common that the browser disconnects, but the actual test execution is still running without any problems.
        // Karma does not treat a disconnection as an immediate failure and will wait for browserDisconnectTimeout (ms).If the browser reconnects during that time, everything is fine.
        // Default: 2000
        browserDisconnectTimeout: 10000,

        // The number of disconnections tolerated.
        // The disconnectTolerance value represents the maximum number of tries a browser will attempt in the case of a disconnection.
        // Usually, any disconnection is considered a failure, but this option allows you to define a tolerance level when there is a flaky network link between the Karma server and the browsers.
        // Default: 0
        browserDisconnectTolerance: 3,

        // How long will Karma wait for a message from a browser before disconnecting from it (in ms).
        // If, during test execution, Karma does not receive any message from a browser within browserNoActivityTimeout(ms), it will disconnect from the browser.
        // Default: 10000
        browserNoActivityTimeout: 60000,

        // Timeout for capturing a browser (in ms).
        // The captureTimeout value represents the maximum boot-up time allowed for a browser to start and connect to Karma.
        // If any browser does not get captured within the timeout, Karma will kill it and try to launch it again and, after three attempts to capture it, Karma will give up.
        // Default: 60000
        captureTimeout: 120000,

        // Karma will report all the tests that are slower than given time limit (in ms).This is disabled by default (since the default value is 0).
        reportSlowerThan: 1000,

        customLaunchers: {
            ChromeHeadlessNoSandbox: {
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                    '--headless',
                    '--disable-gpu',
                    `--remote-debugging-port=${Math.floor((Math.random() * 500) + 9000)}`,
                ],
                debug: true
            },
        },

        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        parallelOptions: {
            executors: 2, // Defaults to cpu-count - 1 // or use a % of available resources , i.e.: executors: (Math.ceil(require('os').cpus().length / 2)),
            shardStrategy: 'round-robin'
        }
    });
};
