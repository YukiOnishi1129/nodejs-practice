/**
 * usersテーブルの初期値
 */
require("module-alias/register");
import { UserType } from "@Types/user";

export const UserSeed: Pick<UserType, "name">[] = [
  {
    name: "Taro",
  },
  {
    name: "Jiro",
  },
  {
    name: "Hanako",
  },
];
