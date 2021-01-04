1. docer-sample 直下で、express ディレクトリ「app」を作成

- express -e app

2. app ディレクトリ直下で、yarn 実行(node_modules 作成)

3. docker-sample ディレクトリへ移動し、docker-compose build と docker-compose up を実行

4. localhost:3000 でアクセスできる

### docker コマンド早見表

- https://qiita.com/okyk/items/a374ddb3f853d1688820

```
docker-compose build

// backgroundで実行
docker-compose up -d

// backgroundで実行しているコンテナを停止
docker-compose stop

// 再起動 (backgroundで実行している場合)
// 実装変更を反映させたりする場合に使用したり
docker-compose restart

// appサーバにアクセス
docker exec -it express_app sh
// mysqlにアクセス
docker exec -it express_db mysql -u root -p
npm install
```

### 参考

- https://github.com/Yota-K/docker-express-mysql
- - https://qiita.com/art_porokyu/items/8363334c358c67adb61a

#### mysql 接続

- https://www.366service.com/jp/qa/9eea7b49daf3a83d62d311b832ceb3e1

##### SQL 直書きのやり方はこちら

- https://reffect.co.jp/node-js/express-js-connect-mysql

##### sequelize

- https://qiita.com/y4u0t2a1r0/items/fb7a879cdd2a187bad29

##### Express + TypeScript

- https://neos21.hatenablog.com/entry/2020/06/13/080000

  - github
  - https://github.com/Neos21/boilerplate-typescript-express

- ⏫ は削除されて、こっちに移行されるみたい

  - https://neos21.net/

- "esModuleInterop": true, について
  - https://chaika.hatenablog.com/entry/2020/09/29/083000