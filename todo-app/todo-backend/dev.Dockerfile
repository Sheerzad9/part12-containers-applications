FROM node:16

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm dev is the command to dev the application in development mode
CMD ["npm", "run", "dev"]