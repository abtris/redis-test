FROM node:8-alpine
COPY ./src /var/www/app
COPY ./package*.json /var/www/app/
WORKDIR /var/www/app
RUN npm install

