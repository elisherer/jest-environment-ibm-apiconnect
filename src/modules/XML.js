/**
 * XML
 *
 * * NOTE: When creating XML documents, you can use this helper function to create them:
 *       `XML.load(__dirname, file)`
 *   then in you test code, you could do:
 *       `session.name('_apimgmt').setVariable('consumer', XML.load(__dirname, 'consumer.xml'))`
 */

const fs = require('fs');
const path = require('path');

module.exports = global => {

  const query = (xmlDoc, expression) => {
    const xpathResult = xmlDoc.evaluate(expression, xmlDoc, null, /*XPathResult.ORDERED_NODE_SNAPSHOT_TYPE*/7, null);
    xpathResult.item = xpathResult.snapshotItem;
    Object.defineProperty(xpathResult, "length", {
      get: function() { return xpathResult.snapshotLength; }
    });
    return xpathResult;
  };

  const stringify = xmlDoc => new global.XMLSerializer().serializeToString(xmlDoc);

  const parse = xml => new global.DOMParser().parseFromString(xml, "text/xml");

  global.XML = {
    parse,
    stringify,
    
    // additional helper functions for testing
    query,
    /**
     * Loads a file into a Document
     * Arguments are the same as path.join, so you can use it like: `XML.load(__dirname,'my.xml')` (file is in same dir)
     * @returns {Document}
     */
    load: function() { return parse(fs.readFileSync(path.join.apply(null, arguments))); }
  };
};

