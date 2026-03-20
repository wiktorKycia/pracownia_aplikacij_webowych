FROM node:22.18

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

# ensure the node user owns the app files
RUN chown -R node:node /app

USER node

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]