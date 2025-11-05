FROM node:22-alpine
LABEL authors="wiktor"

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "start"]