#!/bin/bash
ng build --prod 
docker build  -f Dockerfile -t TGP-aboutus-content-service .
docker tag frontend tgpregistry.azurecr.io/TGP-aboutus-content-service:Latest
docker push tgpregistry.azurecr.io/TGP-aboutus-content-service:Latest
