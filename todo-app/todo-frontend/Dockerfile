# FROM node:16

# WORKDIR /usr/src/app

# COPY ./todo-frontend .

# # Change npm ci to npm install since we are going to be in development mode
# RUN npm install

# #ENV REACT_APP_BACKEND_URL=//localhost:3000

# # npm start is the command to start the application in development mode
# CMD ["npm", "start"]


FROM node:16

WORKDIR /usr/src/app

COPY ./todo-frontend .

RUN npm i

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]