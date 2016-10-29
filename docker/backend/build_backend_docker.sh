#!/bin/sh
cd ../../backend
echo "Construyendo el proyecto SaberCompartir backend"
gradle clean
gradle build
sudo cp build/libs/saberCompartir-0.0.1-SNAPSHOT.jar ../docker/backend/saberCompartir-0.0.1-SNAPSHOT.jar
cd ../docker/backend
echo "Construyendo la imagen matiasdg/sabercompartir_backend"
sudo docker build --no-cache --rm=true -t matiasdg/sabercompartir_backend .
echo "Publicando la imagen matiasdg/sabercompartir_backend"
sudo docker push matiasdg/sabercompartir_backend