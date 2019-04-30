FROM node:8-alpine
COPY . /var/www/app
WORKDIR /var/www/app
RUN npm install

