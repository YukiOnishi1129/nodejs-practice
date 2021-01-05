import supertest from "supertest";
import app from "../src/index";

describe("テスト", () => {
  it("サンプル", () => {
    const data = 1;
    expect(data).toEqual(1);
  });
  it("Path [/] のテスト", async () => {
    const res = await supertest(app).get("/");
    expect(res.text).toBe("Hello, World!");
  });
});
