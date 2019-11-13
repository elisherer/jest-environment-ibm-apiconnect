/**
 * service-metadata
 */
module.exports = ({ jest, mockOptions }) => {

  const catalogName = (mockOptions.context && mockOptions.context["env.path"]) || 'production';

  const mockServiceMetadata = { domainName: catalogName };

  jest.mock('service-metadata', () => {
    return mockServiceMetadata;
  }, {virtual: true});

  return {
    serviceMetadata: mockServiceMetadata
  }
};