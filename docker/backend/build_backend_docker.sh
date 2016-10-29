#!/bin/sh
cd ../backend
echo "Construyendo el proyecto SaberCompartir backend"
gradle clean
gradle build
echo "Construyendo la imagen matiasdg/sabercompartir_backend"
docker build --no-cache --rm=true -t matiasdg/sabercompartir_backend .
echo "Publicando la imagen matiasdg/sabercompartir_backend"
docker push matiasdg/sabercompartir_backend