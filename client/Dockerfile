FROM node:alpine
WORKDIR /app
COPY ./package.json ./
RUN npm ci -qy
COPY . .
EXPOSE 4473
CMD ["npm", "run", "start"]