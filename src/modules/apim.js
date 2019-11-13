/**
 * apim
 *
 * Usage:
 *   Before tests you can do `apicMock.apim.setvariable()` to prepare the context data
 *   After tests you can call `apim.getvariable` to do assertions
 *   You can do `apicMock.addApimINPUT(someInput)` so when `apim.readInputAsJSON/Buffer` will be called it will get it
 */
module.exports = ({ jest, mockOptions }) => {

  const mockPolicyProperties = {};
  const mockInputs = [];
  const mockContext = mockOptions.context || {};

  const setvariable = (key, value) => mockContext[key] = value;

  jest.mock('local://isp/policy/apim.custom.js', () => {
    return {
      getPolicyProperty: jest.fn(() => mockPolicyProperties),
      getvariable: jest.fn(key => mockContext[key]),
      setvariable: jest.fn(setvariable),
      readInputAsJSON: jest.fn(cb => {
        const input = mockInputs.pop();
        cb(null, input && input.json);
      }),
      readInputAsBuffer: jest.fn(cb => {
        const input = mockInputs.pop();
        cb(null, input && input.buffer);
      }),
      console: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
      },
      error: jest.fn(),
      output: jest.fn(),
    };
  }, {virtual: true});

  return {
    /**
     * Adds an input for apim to return when called
     * @param json (object) JSON representation of the input
     * @param buffer (string) buffer representation of the input
     */
    addINPUT: (json, buffer) => {
      if (!buffer) buffer = JSON.stringify(json);
      mockInputs.push({ json: json ? Object.assign({}, json) : json, buffer });
    },

    /**
     * Sets a policy property before running a policy
     * @param key (string) the policy string key
     * @param value (object) the policy property value
     */
    setPolicyProperty: (key, value) => {
      mockPolicyProperties[key] = value;
    },

    /**
     * Sets a variable without being recorded (for doing test setup)
     */
    setvariable,
  }
};