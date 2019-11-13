/* global jest */

const mockApim = require('./modules/apim');
const mockHeaderMetadata = require('./modules/header-metadata');
const mockJose = require('./modules/jose');
const mockJwt = require('./modules/jwt');
const mockServiceMetadata = require('./modules/service-metadata');
const mockSession = require('./modules/session');
const mockSystemMetadata = require('./modules/system-metadata');
const mockTransform = require('./modules/transform');
const mockUrlOpen = require('./modules/urlopen');
const mockXML = require('./modules/XML');

module.exports = (jest, global, mockOptions = {}) => {
  // needed so all the `require` calls will run again for each test
  jest.resetModules();

  const args = { jest, global, mockOptions };
  mockXML(args);
  mockSession(args)

  return {
    apim: mockApim(args),
    hm: mockHeaderMetadata(args),
    jose: mockJose(args),
    jwt: mockJwt(args),
    sm: mockServiceMetadata(args),
    sysm: mockSystemMetadata(args),
    transform: mockTransform(args),
    urlopen: mockUrlOpen(args),
  };
};