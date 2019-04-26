"use strict";
const toxiproxyClient = require("toxiproxy-node-client");

const toxiproxy = new toxiproxyClient.Toxiproxy("http://localhost:8474");

const proxyBody = {
  listen: "0.0.0.0:6666",
  name: "redis1",
  upstream: "172.28.1.1:6379"
};

toxiproxy.createProxy(proxyBody);
