# Parto de una imagen base, solo con NGINX
FROM nginx

# Version para la app minificada
COPY dist /usr/share/nginx/html/

# Copio la configuracion del nginx con el proxy para el backend
COPY default.conf /etc/nginx/conf.d/