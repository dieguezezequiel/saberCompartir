#!/bin/sh
echo "Desplegando Saber Compartir"
echo "IMPORTANTE: Ejecutar build_backend_docker.sh para crear una nueva imagen"
echo "IMPORTANTE: Ejecutar build_frontend_docker.sh para crear una nueva imagen"
echo "Deteniendo el compose"
docker-compose stop
echo "Eliminando el compose anterior"
docker-compose rm --force
echo "Eliminando las imagenes anteriores"
docker rmi matiasdg/sabercompartir_frontend
docker rmi matiasdg/sabercompartir_backend
echo "Levantando el compose"
docker-compose up -d
echo "Listo!"