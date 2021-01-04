FROM node:12

ENV NODE_ENV=development
ENV NODE_PATH /usr/local/lib/node_modules

RUN npm install -g express-generator
# sequelizeコマンドを実行するため
RUN npm install -g sequelize-cli
# sequelize db:migrateを実行するためにグローバルインストール
RUN npm install -g mysql2 

WORKDIR /app

EXPOSE 3000