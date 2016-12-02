# Parto de una imagen base, solo con NGINX
FROM nginx

# Version para la app minificada
COPY dist /usr/share/nginx/html/

# Copio la configuracion del nginx con el proxy para el backend y los certificados
COPY ~/certs/mati_demo.crt /etc/nginx/certs/
COPY ~/certs/mati_demo.key /etc/nginx/certs/
COPY default.conf /etc/nginx/conf.d/