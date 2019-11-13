module.exports = global => {

  const jest = global.jest;

  const contextCache = {};
  const sessionCache = {};

  const createContext = contextName => {
    const context = {
      getVariable: jest.fn(varName => {
        return sessionCache[contextName] && sessionCache[contextName][varName];
      }),
      setVariable: jest.fn((varName, value) => {
        if (!sessionCache[contextName]) {
          sessionCache[contextName] = {};
        }
        sessionCache[contextName][varName] = value;
    })
    };
    //aliases
    context.getVar = jest.fn(varName => context.getVariable(varName));
    context.setVar = jest.fn((varName, value) => context.setVariable(varName, value));
    contextCache[contextName] = context;
    return context;
  };

  createContext('_apimgmt'); // usually used to get 'consumer'
  createContext('api'); // usually used to get 'oauth/metadata-for-payload'
  createContext('AAA'); // usually used to get 'oauth-token'
  createContext('assembly'); // usually used to get 'application-certificate'

  global.session = {
    name(contextName) {
      return contextCache[contextName];
    },
    createContext(contextName) {
      return createContext(contextName);
    },
    reject: jest.fn()
  };

};