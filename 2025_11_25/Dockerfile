FROM node:22-alpine
LABEL authors="Wiktor Kycia"

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]