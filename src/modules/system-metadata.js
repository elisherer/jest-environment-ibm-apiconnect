/**
 * system-metadata
 */
module.exports = ({ jest }) => {

  const mockSystemMetadata = {};

  const api = {
    setVariable: (key, val) => mockSystemMetadata[key] = val,
    getVariable: key => mockSystemMetadata[key],
  };

  jest.mock('system-metadata', () => {
    return {
      setVariable: jest.fn(api.setVariable),
      getVariable: jest.fn(api.getVariable),
    }
  }, {virtual: true});

  return api;
};