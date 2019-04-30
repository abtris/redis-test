# Using ToxiProxy with Redis to test clients

Testing redis client and his resilience.

## Getting Started

### Prerequisites

- [docker](https://docs.docker.com/install/overview/)
- [docker-compose](https://docs.docker.com/compose/install/)

```
docker pull shopify/toxiproxy
docker pull redis
```

### Run

You can run app and test

```
docker-compose up -d
```

and read the logs

```
docker-compose logs
```

## Running the tests

```
docker-compose run test
```

## Authors

- **Ladislav Prskavec** - _Initial work_ - [abtris](https://github.com/abtris)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

- [Toxi Proxy from Shopify](https://github.com/Shopify/toxiproxy)
- [NodeJS toxi proxy client](https://github.com/ihsw/toxiproxy-node-client)
- [Chaos Engineering: Testing known unknowns using ToxiProxy](https://medium.com/@ravindraprasad/testing-known-unknowns-using-toxiproxy-75dfc9d0dc1)
