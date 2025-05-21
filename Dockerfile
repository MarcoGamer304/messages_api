FROM node:22 AS build

WORKDIR /myapp

COPY package*.json ./

RUN npm install

COPY . .

RUN npm test

FROM node:22

WORKDIR /myapp

COPY --from=build /myapp ./

CMD ["npm", "start"]