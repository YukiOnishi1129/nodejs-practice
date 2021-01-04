FROM node:10.13-alpine

ENV NODE_ENV=development

RUN npm install -g express-generator
# sequelizeコマンドを実行するため
RUN npm install -g sequelize-cli
# sequelize db:migrateを実行するためにグローバルインストール
RUN npm install -g mysql2 

ENV NODE_PATH /usr/local/lib/node_modules

WORKDIR /app

EXPOSE 3000