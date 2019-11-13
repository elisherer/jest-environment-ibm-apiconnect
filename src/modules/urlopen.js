/**
 * urlopen
 *
 * Usage:
 *   Before tests do `apicMock.addUrlOpenResponse(code,phrase,json,buffer)` and it will be returned in the code (opposite order of insertion, LIFO)
 *   After tests check urlopen.open to see the requests that were made for assertions (using expect)
 */
module.exports = ({ jest }) => {

  /**
   *
   * @param statusCode
   * @param reasonPhrase
   * @param json
   * @param buffer
   * @returns {{statusCode: *, reasonPhrase: *, readAsJSON(*): void, readAsBuffer(*): void, disconnect: jest.Mock<any>}}
   */
  const createResponse = (statusCode, reasonPhrase, json, buffer) => {
    if (json && !buffer) buffer = JSON.stringify(json);
    return {
      statusCode,
      reasonPhrase,
      readAsJSON(cb) {
        cb(null, json);
      },
      readAsBuffer(cb) {
        cb(null, buffer);
      },
      disconnect: jest.fn(),
    };
  };

  const mockDefaultResponse = createResponse(400, "Bad Request", { error: "bad_request" });
  const mockResponses = [];

  jest.mock('urlopen', () => {
    return {
      open: jest.fn((options, cb) => {
        const response = mockResponses.pop();
        if (response instanceof Error) {
          cb(response);
          return;
        }
        cb(null, response || mockDefaultResponse);
      })
    };
  }, {virtual: true});

  return {
    /**
     * If not defined, urlopen will always return this response
     */
    defaultResponse: mockDefaultResponse,

    /**
     * Adds a mock response to the urlopen responses stack (LIFO)
     * @param statusCode (number) the response status code
     * @param reasonPhrase (string) the response reason phrase
     * @param json (object) the JSON to return in readAsJSON
     * @param buffer (string) the buffer to return in readAsBuffer
     * @returns {{statusCode: number, reasonPhrase: string, readAsJSON, (Function): void, readAsBuffer, (Function): void, disconnect: Function}}
     */
    addUrlOpenResponse: (statusCode, reasonPhrase, json, buffer) => {
      const response = createResponse(statusCode, reasonPhrase, json, buffer);
      mockResponses.push(response);
      return response;
    },

    /**
     * Adds an exception that will happen during the urlopen
     * @param message (string) to appear in the error message
     */
    addUrlOpenError: (message) => {
      mockResponses.push(new Error(message));
    },
  };
};