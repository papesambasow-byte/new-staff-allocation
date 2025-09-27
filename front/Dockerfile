# Étape 1 : build (React avec Node.js)
FROM node:18-alpine AS builder

WORKDIR /app

# Copie des fichiers nécessaires
COPY package*.json ./
RUN npm install

# Copie du reste du code
COPY . .

# Build React pour production
RUN npm run build

# Étape 2 : image finale (Nginx pour servir le build)
FROM nginx:stable-alpine

# Copie du build généré depuis le stage builder
COPY --from=builder /app/build /usr/share/nginx/html

# Supprime la config par défaut de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copie ta propre config nginx si nécessaire
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
