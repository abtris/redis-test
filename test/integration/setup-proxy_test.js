const assert = require ('assert');
const setupProxy = require ('../../src/setup-proxy.js');

describe ('Setup proxy', () => {
  describe ('Create proxy test', () => {
    it ('create proxy', async () => {
      const p = await setupProxy.createProxy (setupProxy.proxyBody);
      assert.equal (p.name, 'redis1');
    });
  });
});
