# Etapa 1: Construcción
FROM node:20-slim AS build

WORKDIR /app
COPY package*.json ./
# npm ci Ideal para entornos de integración continua y producción, donde se requiere una instalación rápida y reproducible de las dependencias
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: Servidor Nginx
FROM nginx:alpine

# Copia los archivos compilados desde la etapa de construcción (build) al directorio donde Nginx sirve archivos estáticos.
COPY --from=build /app/dist /usr/share/nginx/html
# Copia el archivo de configuración personalizado de Nginx del host al contenedor.
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]