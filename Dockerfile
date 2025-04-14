# Utiliser l'image Node.js officielle
FROM node:16

# Définir le répertoire de travail dans le container
WORKDIR /usr/src/app

# Copier les fichiers de ton projet dans le container
COPY package*.json ./

# Installer les dépendances du backend
RUN npm install

# Copier le code source dans le container
COPY . .

# Compiler le projet (si nécessaire pour le backend)
RUN npm run build

# Exposer le port sur lequel le backend écoute
EXPOSE 3000

# Commande pour démarrer l'application
CMD ["npm", "run", "start:prod"]
