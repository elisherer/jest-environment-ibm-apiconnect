/**
 * jose
 */
module.exports = ({ jest }) => {

  jest.mock('jose', () => {
    return {
      createJWSHeader: jest.fn((keyName, algorithm) => ({keyName, algorithm}))
    };
  }, {virtual: true});

};