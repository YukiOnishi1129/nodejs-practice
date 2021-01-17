/**
 * Seeder用ファイル
 */
import { createConnection } from "typeorm";
import { User } from "../../entities/User";
import { UserSeed } from "./init/user.seed";

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
