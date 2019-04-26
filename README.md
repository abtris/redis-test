# SRE Redis test

Testing redis client and his resilience

### Prerequisites

We need `toxiproxy-cli`

```
brew tap shopify/shopify
brew install toxiproxy
```

Redis, toxiproxy server and node.js server are in docker.

```
docker-compose build
```

### First steps

```
toxiproxy-cli list
```

```
toxiproxy-cli create redis1 --listen 0.0.0.0:6666 --upstream 172.28.1.1:6379
```

```
toxiproxy-cli list
```

Test connection via proxy using redis-cli:

```
redis-cli -p 6666
```

```
get key
set var1 test
get var1
```

## Example with adding latency

```
docker-compose up -d
node setup-proxy.js
toxiproxy-cli toxic add redis1 --type latency --attribute latency=2000
toxiproxy-cli inspect redis1
```


## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
