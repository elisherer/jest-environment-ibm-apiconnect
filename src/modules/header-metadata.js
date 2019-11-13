/**
 * header-metadata
 */
module.exports = ({ jest }) => {

  const mockHeaders = {
    current: {},
    response: {}
  };

  const api = {
    setCurrentHeader: (key,val) => mockHeaders.current[key] = val,
    getCurrentHeader: key => mockHeaders.current[key],
    setResponseHeader: (key,val) => mockHeaders.response[key] = val,
    getResponseHeader: key => mockHeaders.response[key]
  };

  jest.mock('header-metadata', () => {
    return {
      current: {
        set: jest.fn(api.setCurrentHeader),
        get: jest.fn(api.getCurrentHeader)
      },
      response: {
        set: jest.fn(api.setResponseHeader),
        get: jest.fn(api.getResponseHeader)
      }
    }
  }, {virtual: true});

  return api;
};