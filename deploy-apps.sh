#!/bin/bash

oc new-project apps

VER=v1
sed -i 's/version: .*/version: '"$VER"'/' yaml/apps/inventory-deployment.yaml
sed -i '/name: VERSION/{n;s/value: .*/value: '"$VER"'/}' yaml/apps/inventory-deployment.yaml 
sed -i '/metadata:/{n;s/name: .*/name: 'inventory-"$VER"'/}' yaml/apps/inventory-deployment.yaml

oc create -f yaml/apps/inventory-deployment.yaml

VER=v2
sed -i 's/version: .*/version: '"$VER"'/' yaml/apps/inventory-deployment.yaml
sed -i '/name: VERSION/{n;s/value: .*/value: '"$VER"'/}' yaml/apps/inventory-deployment.yaml 
sed -i '/metadata:/{n;s/name: .*/name: 'inventory-"$VER"'/}' yaml/apps/inventory-deployment.yaml

oc create -f yaml/apps/inventory-deployment.yaml

oc create -f yaml/apps/inventory-svc.yaml


VER=v1
sed -i 's/version: .*/version: '"$VER"'/' yaml/apps/order-deployment.yaml
sed -i '/name: VERSION/{n;s/value: .*/value: '"$VER"'/}' yaml/apps/order-deployment.yaml 
sed -i '/metadata:/{n;s/name: .*/name: 'order-"$VER"'/}' yaml/apps/order-deployment.yaml

oc create -f yaml/apps/order-deployment.yaml

VER=v2
sed -i 's/version: .*/version: '"$VER"'/' yaml/apps/order-deployment.yaml
sed -i '/name: VERSION/{n;s/value: .*/value: '"$VER"'/}' yaml/apps/order-deployment.yaml 
sed -i '/metadata:/{n;s/name: .*/name: 'order-"$VER"'/}' yaml/apps/order-deployment.yaml

oc create -f yaml/apps/order-deployment.yaml

oc create -f yaml/apps/order-svc.yaml
