FROM node:latest AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Copia o restante do código e o .env gerado pelo workflow
COPY . .
COPY .env .env

# Passa a variável do build
ARG VITE_URL_API
ENV VITE_URL_API=$VITE_URL_API

RUN npm run build

FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
