# jest-environment-ibm-apiconnect

[![npm version](https://img.shields.io/npm/v/jest-environment-ibm-apiconnect.svg)](https://www.npmjs.com/package/jest-environment-ibm-apiconnect)

### Overview

Mock the DataPower gatewayscript environment created by API Connect with Jest.

### Setup

```
npm install --save-dev jest-environment-ibm-apiconnect
```

**jest.config.js:**
```js
module.exports = {
    testEnvironment: "ibm-apiconnect",
    testEnvironmentOptions: {
      context: {
          "custom.variable.x": "Hello World" // This variable could be retreived by `apim.getvariable('custom.variable.x')`
      }
    },
    // Automatically clear mock calls and instances between every test
    clearMocks: true,
};
```

And in your test files:

```js
...

describe('my policy to test', () => {

  let apicMock;

  beforeEach(() => {
    apicMock = mockAPIConnect(jest);
  });

  ...
});
```

### Modules that are being mocked

* apim
* header-metadata (hm)
* jose
* jwt
* service-metadata (sm)
* system-metadata (sysm)
* transform
* urlopen

**Global modules:**

* session
* XML

### API

|Function|Description|
|----|----|
|`apicMock.apim.addINPUT(json, buffer)`|Pushes an input for apim stack to return when called by `apim.readInputAsJSON/Buffer` (LIFO)
|`apicMock.apim.setPolicyProperty(key, value)`|Sets a policy property before running a policy
|`apicMock.apim.setvariable(key, value)`|Sets a context variable *
|`apicMock.hm.setCurrentHeader(key, value)`|Sets a header to current *
|`apicMock.hm.getCurrentHeader(key)`|Gets the current header by key *
|`apicMock.hm.setResponseHeader(key, value)`|Sets a header to response * 
|`apicMock.hm.getResponseHeader(key)`|Gets the response header by key *
|`apicMock.sm.serviceMetadata`| **(Object)** Can be set with values to be read by code (Only dotted notation is supported)
|`apicMock.sysm.setVariable(key, value)`|Sets a variable in system-metadata *
|`apicMock.sysm.getVariable(key)`|Gets a variable from system-metadata *
|`apicMock.urlopen.addUrlOpenResponse(statusCode, reasonPhrase, json, buffer)`|Push a mock response to the urlopen responses stack (LIFO)
|`apicMock.urlopen.addUrlOpenError(message)`|Push an error to the urlopen responses stack (LIFO)
|`apicMock.urlopen.defaultResponse`| **(Object)** The response object you get when the responses stack is empty (for assertions)
|`XML.parse(string)`| Parse string into a `Document`
|`XML.stringify(xmlDoc)`| Stringify a `Document` into a string
|`XML.query(xmlDoc, expression)`| ** Query a `Document` by an XPath expression
|`XML.load(...)`|** Loads a file into a Document, Arguments are the same as path.join, so you can use it like: `XML.load(__dirname, 'my.xml')` (file is in same dir) , Returns `Document`.

\* Without being traced, for setup phase (will not appear in Jest's call counters/records)
\*\* Not used by gatewayscript, only for unit-test code.

### Example 

See [apiconnect-custom-policy-project-example](https://github.com/elisherer/apiconnect-custom-policy-project-example)