FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm i
RUN npm i express
COPY . .
EXPOSE 3578
CMD ["npm", "start"]