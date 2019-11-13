/**
 * jwt
 *
 * The key name is used as the actual signing key (Should have the same interface as API Connect)
 */
module.exports = ({ jest }) => {

  jest.mock('jwt', () => {
    const jwt = require('jsonwebtoken');

    return {
      Encoder: function (claims) {
        const state = {header: { keyName: 'none' }, options: { algorithm: 'none', noTimestamp: !claims.iat /* don't add "iat" by default */ }};

        this.addOperation = jest.fn((action, value) => {
          if (action === 'sign') {
            state.header = value;
            state.options.algorithm = value.algorithm;
          }
        });

        this.encode = cb => jwt.sign(claims, state.header.keyName, state.options, cb);

        return this;
      },
      Decoder: function (token) {
        const state = {verifyByKey: null};
        this.addOperation = jest.fn((action, value) => {
          if (action === 'verify') {
            state.verifyByKey = value;
          }
        });
        this.decode = cb => state.verifyByKey ? jwt.verify(token, state.verifyByKey, cb) : cb(null, jwt.decode(token, {json: true}));
      }
    };
  }, {virtual: true});

};