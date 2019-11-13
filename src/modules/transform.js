/**
 * transform
 *
 * Exposes one method, xpath (Should have the same interface as API Connect)
 */
module.exports = ({ jest, XML }) => {

  jest.mock('transform', () => {
    return {
      xpath(expression, xmlDoc, cb) {
        cb(null, XML.query(xmlDoc, expression));
      }
    }
  }, {virtual: true});

};

  
  