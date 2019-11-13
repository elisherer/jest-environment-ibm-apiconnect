const Factory = require('./factory')
const JSDOMEnvironment = require('jest-environment-jsdom');

class IBMApiConnectEnvironment extends JSDOMEnvironment {
  constructor(config) {
      super(config);
      this.global.mockAPIConnect = (jest, localConfig) => Factory(jest, this.global, Object.assign({}, config.testEnvironmentOptions, localConfig));
  }
}

module.exports = IBMApiConnectEnvironment;