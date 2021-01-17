/**
 * Seeder実行ファイル
 */
require("module-alias/register"); // 絶対パスを使う場合はこの記載が必要
import { createConnection } from "typeorm";
import { User } from "@Models/User";
import { UserSeed } from "@Seeders/user.seed";

(async () => {
  console.log("============================");
  console.log("seeder start");
  // MySQLと接続
  const connection = await createConnection("default");

  // データを挿入
  await connection.manager.save(User, UserSeed);

  await connection.close();
  console.log("seeder end");
  console.log("============================");
})().catch((e) => console.log(e));
