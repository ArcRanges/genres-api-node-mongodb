const request = require("supertest");
const { Genre } = require("../../../models/genre");
const { User } = require("../../../models/user");

let server;

describe("Auth Middleware", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  let token;

  const exec = () => {
    return request(server)
      .post("/api/genres")
      .set("x-auth-token", token)
      .send({ name: "genre1" });
  };

  beforeEach(() => {
    token = new User().generateAuthToken();
  });

  it("should return 401 for invalid token", async () => {
    token = "";

    const res = await exec();

    expect(res.status).toBe(401);
  });

  it("should return 200 for valid data", async () => {
    const res = await exec();

    expect(res.status).toBe(200);
  });
});
