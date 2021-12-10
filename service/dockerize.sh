#!/bin/bash
ng build --prod 
docker build  -f Dockerfile -t minecraftPage .
docker tag frontend tgpregistry.azurecr.io/minecraftPage:Latest
docker push tgpregistry.azurecr.io/minecraftPage:Latest
