FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install 

COPY . .

ENV port=9090

EXPOSE 9090

CMD ["npm", "start"]

