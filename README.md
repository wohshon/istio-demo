

## simple services to test out istio or any generic rest api test case

- Order Service calls Inventory Service

- to deploy sample apps

    deploy-apps.sh

- create ingress gateway for order service

        oc create -f yaml/istio/apps-apps-gateway.yaml 

- create virtual service to point to generic order service

        oc create -f yaml/istio/apps-virtualservice.yaml 

- test the basic service via ingress gateway route (assume istio components are installed in `istio-system` project)

        export GATEWAY_URL=$(oc -n istio-system get route istio-ingressgateway -o jsonpath='{.spec.host}')

        curl -X POST -H 'Content-type: application/json' http://$GATEWAY_URL/submit -d '{"id": "123","status":"new", "product": "apple", "qty":500}'

- expect results of the following, note that `order-version` and `inventory-version` will toggle between v1 and v2 as the service selectors do not differeniate the versions, in other words, they are load balanced 

        {"id":"123","status":"submitted","product":"apple","qty":500,"order-version":"v2","inventory-version":"v1"}

## To deploy using s2i for other generic usecases

```
oc new-app registry.redhat.io/rhscl/nodejs-12-rhel7~https://github.com/wohshon/istio-demo --context-dir=/inventory --name=inventory --env=TIMEOUT=0 --env=VERSION=1.0 --env=PORT=8080 --labels='app=inventory,version=1.0'
```

OR via builds

```
oc new-build nodejs:12~https://github.com/wohshon/istio-demo --context-dir=/order --name=order --env=BACKEND_URL=inventory.apps.svc.cluster.local --env=BACKEND_PORT=8080 --env=PORT=8080 --env=VERSION=1.0 --labels='app=order,version=1.0'

oc new-app image-stream=order
```

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

