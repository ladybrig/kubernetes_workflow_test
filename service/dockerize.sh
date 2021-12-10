#!/bin/bash
ng build --prod 
docker build  -f Dockerfile -t tgp-poppichu .
docker tag frontend tgpregistry.azurecr.io/tgp-poppichu:Latest
docker push tgpregistry.azurecr.io/tgp-poppichu:Latest
