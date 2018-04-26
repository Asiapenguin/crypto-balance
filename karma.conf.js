// Karma configuration
// Generated on Mon Apr 16 2018 18:23:15 GMT-0700 (PDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('@angular/cli/plugins/karma')
    ],
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    preprocessors: {
      './src/*.spec.ts': ['angular-cli']
    },
    angularCli: {
      environment: 'dev'
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
  });
};
