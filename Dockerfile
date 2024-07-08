FROM node:20.15-alpine3.19

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3500

CMD ["npm", "start"]
