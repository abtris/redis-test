const toxiproxyClient = require ('toxiproxy-node-client');
const toxiproxy = new toxiproxyClient.Toxiproxy (process.env.TOXIPROXY_URL + ":8474");

const proxyBody = {
  listen: '0.0.0.0:6666',
  name: 'redis1',
  upstream: '172.28.0.10:6379',
};


function createProxy (proxyConfig = null) {
  if (proxyConfig && toxiproxy.get(proxyConfig.name)) {
    return toxiproxy.get(proxyBody.name)
  } else {
    if (proxyConfig === null) {
      return toxiproxy.createProxy(proxyBody)
    } else {
      return toxiproxy.createProxy(proxyConfig)
    }
  }
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
}
