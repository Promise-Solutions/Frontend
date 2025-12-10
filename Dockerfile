# Stage 1: Build do React/Vite
FROM node:22 AS build
WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm ci

# Copia o restante do código
COPY . .

# Passa variável de build do VITE
ARG VITE_URL_API
ENV VITE_URL_API=$VITE_URL_API

# Cria arquivo .env para Vite
RUN echo "VITE_URL_API=$VITE_URL_API" > .env

# Build da aplicação
RUN npm run build

# Stage 2: Nginx para servir o build
FROM nginx:latest
WORKDIR /usr/share/nginx/html

# Copia build do React
COPY --from=build /app/dist /usr/share/nginx/html

# # Copia configuração customizada do Nginx (SPA fallback)
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expõe porta 80
EXPOSE 80

# Comando padrão do Nginx
CMD ["nginx", "-g", "daemon off;"]
