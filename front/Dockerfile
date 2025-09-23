# Étape 1 : build
FROM node:18 AS builder

WORKDIR /app

# Copie des fichiers
COPY package*.json ./

# Installe les dépendances
RUN npm install

COPY . .

# Build React pour production
RUN npm run build

# Étape 2 : image finale
FROM docker.io/library/nginx:alpine

# Copie du build dans le répertoire nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Supprime la configuration par défaut de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie ta propre config nginx (facultatif si nécessaire)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
