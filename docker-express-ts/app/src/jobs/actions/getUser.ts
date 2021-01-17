require("module-alias/register");
import { createConnection, getRepository } from "typeorm";
import { User } from "@Models/User";

export const getUser = async () => {
  try {
    console.log("============================");
    console.log("getuser start");
    // MySQLと接続
    const connection = await createConnection("default");
    const userRepository = await getRepository(User);

    // データ取得
    const user = await userRepository.findOne({ id: 2 });
    console.log("ユーザー：");
    console.log(user);

    await connection.close();
    console.log("getuser end");
    console.log("============================");
  } catch (err) {
    console.log(err);
  }
};
