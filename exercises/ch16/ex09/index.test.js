import { describe } from "node:test";
import { app } from "./index.cjs";
import request from "supertest";

// 完成していない
describe("netモジュールを使ったサーバーのテスト", () => {
  test("GET /test/mirror", async () => {
    const response = await request(app).get("/test/mirror");
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/GET \/test\/mirror HTTP\/1.1/);
  });
  test("GET /sample.png", async () => {
    const response = await request(app).get("/sample.png");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/image\/png/);
  });
});
