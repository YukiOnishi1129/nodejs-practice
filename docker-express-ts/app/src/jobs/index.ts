/**
 * バッチ処理
 */
require("module-alias/register");
import * as schedule from "node-schedule";
import { getUser } from "@Jobs/actions/getUser";

export const jobAction = () => {
  schedule.scheduleJob("* * * * *", () => {
    console.log("running a task every minute");
    getUser();
  });
};
