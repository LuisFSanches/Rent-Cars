FROM node

WORKDIR /usr/app

COPY package.json ./

Run npm install

COPY . .

EXPOSE 3333

CMD ["npm","run","dev"]