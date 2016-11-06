#!/bin/sh
cd ../../frontend
echo "Construyendo el proyecto SaberCompartir frontend"
sudo grunt clean
sudo grunt build
if [ $? -ne 0 ];
    then exit 1
fi
sudo cp -rf dist ../docker/frontend
cd ../docker/frontend
echo "Construyendo la imagen matiasdg/sabercompartir_frontend"
sudo docker build --no-cache --rm=true -t matiasdg/sabercompartir_frontend .
echo "Publicando la imagen matiasdg/sabercompartir_frontend"
sudo docker push matiasdg/sabercompartir_frontend