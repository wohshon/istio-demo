
## simple services to test out istio 

### Order
```
export VERSION=v2 # specify version number of order service
export BACKEND_URL=<service name> # of inventory service
export BACKEND_PORT=<port number> # of inventory service
```

### Inventory
```
export TIMEOUT=3500 # simulate timeout
export VERSION=v2 # specify version number of inventory service
```
`curl -X POST -H 'Content-type: application/json' http://order-mesh.apps.cluster-sgp-75d2.sgp-75d2.example.opentlc.com/submit -d '{"id": "123","status":"new", "product": "apple", "qty":500}'`

