# Fase 1: Build y compilación limpia
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Ignoramos la auditoría pesada en builds continuos
RUN npm install --no-audit

COPY . .
RUN npm run build

# Fase 2: Servidor Web Ultraligero
FROM nginx:alpine
# Copiamos la carpeta compilada
COPY --from=builder /app/dist /usr/share/nginx/html

# Redireccionamiento de React Router para NGINX (SPA configuration)
RUN echo "server { \
    listen 80; \
    location / { \
        root /usr/share/nginx/html; \
        index index.html; \
        try_files \$uri \$uri/ /index.html; \
    } \
}" > /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
