/**
 * サンプル
 * ユーザー情報取得
 */
require("module-alias/register");
import { createConnection, getRepository } from "typeorm";
import { User } from "@Models/User";

export const getUser = async () => {
  // MySQLと接続
  const connection = await createConnection("default");
  // クエリーランナーインスタンスを用いてトランザクション処理を実行
  const queryRunner = connection.createQueryRunner();

  // トランザクション開始
  // トランザクション処理をする場合、「queryRunner」を用いてDB操作をする必要がある
  // queryRunnerでコミット、ロールバックなどの処理を実施するため
  await queryRunner.startTransaction();

  try {
    console.log("============================");
    console.log("getuser start");

    // データ取得
    const user = await queryRunner.manager.findOne(User, { id: 2 });
    console.log("ユーザー：");
    console.log(user);

    // コミット
    await queryRunner.commitTransaction();
  } catch (err) {
    console.log(err);
    // ロールバック
    await queryRunner.rollbackTransaction();
  } finally {
    // query runner開放
    await queryRunner.release();
    await connection.close();
    console.log("getuser end");
    console.log("============================");
  }
};
