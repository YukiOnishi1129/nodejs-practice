/**
 * バッチ処理
 */
import * as schedule from "node-schedule";

export const JobAction = () => {
  schedule.scheduleJob("* * * * *", () => {
    console.log("running a task every minute");
  });
};
