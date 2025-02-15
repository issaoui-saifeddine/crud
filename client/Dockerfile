# Utilisation de l'image Node.js pour le développement
FROM node:18

# Définition du répertoire de travail
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du projet
COPY . .

# Exposition du port 3000 (React par défaut)
EXPOSE 3000

# Commande de lancement en mode développement
CMD ["npm", "start"]
