FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm ci -qy
COPY . .
EXPOSE 3578
CMD ["npm", "run", "start"]