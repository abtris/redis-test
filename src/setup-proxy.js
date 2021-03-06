const debug = require ('debug');
const critical = debug ('app:error');
const info = debug ('app:info');
const toxiproxyClient = require ('toxiproxy-node-client');
const toxiproxy = new toxiproxyClient.Toxiproxy (
  process.env.TOXIPROXY_URL + ':8474'
);

const proxyBody = {
  listen: '0.0.0.0:6666',
  name: 'redis1',
  upstream: '172.28.0.10:6379',
};

function createProxy (proxyConfig = null) {
  if (proxyConfig == null) {
    throw new Error ('Missing config for create proxy');
    return;
  }
  info ('CREATE PROXY');
  return toxiproxy
    .createProxy (proxyBody)
    .then (proxy => {
      // can add Latecy and etc.
      return proxy;
    })
    .catch (error => {
      info (error.message);
      return toxiproxy.get (proxyBody.name);
    });
}
// Latency, Jitter value in ms
function addLatency (proxy, latencyValue, jitterValue) {
  const toxicBody = {
    attributes: {latency: latencyValue, jitter: jitterValue},
    type: 'latency',
  };
  proxy.addToxic (new toxiproxyClient.Toxic (proxy, toxicBody));
}
// Latency value in ms, if 0 the connection won't close,
function addTimeout (proxy, timeoutValue) {
  const toxicBody = {
    attributes: {timeout: timeoutValue},
    type: 'timeout',
  };
  proxy.addToxic (new toxiproxyClient.Toxic (proxy, toxicBody));
}

module.exports = {
  createProxy: createProxy,
  addLatency: addLatency,
  addTimeout: addTimeout,
  proxyBody: proxyBody,
};
