const request = require("supertest");
const { Genre } = require("../../../models/genre");
const { User } = require("../../../models/user");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../../index");
  });
  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      // populate test genres
      await Genre.collection.insertMany([
        { name: "genre1" },
        { name: "genre2" },
      ]);
      const res = await request(server).get("/api/genres");

      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((g) => g.name === "genre1")).toBeTruthy();
      expect(res.body.some((g) => g.name === "genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("should return a genre with valid id", async () => {
      // populate test genres
      const genre = await Genre.collection.insertOne({ name: "genre1" });

      const res = await request(server).get("/api/genres/" + genre.insertedId);
      expect(res.status).toBe(200);
      expect(res.body.name).toBe("genre1");
    });
  });

  describe("GET /:id", () => {
    it("should return a genre with valid id", async () => {
      // populate test genres
      const res = await request(server).get("/api/genres/" + 1);
      expect(res.status).toBe(404);
    });
  });

  describe("POST /", () => {
    let token;
    let name;

    const exec = async () => {
      return await request(server)
        .post("/api/genres")
        .set("x-auth-token", token)
        .send({ name });
    };

    beforeEach(() => {
      token = new User().generateAuthToken();
      name = "validGenre";
    });

    it("should return 401 if client is not logged in", async () => {
      token = "";
      const res = await exec();
      expect(res.status).toBe(401);
    });

    it("should return 400 if data is invalid", async () => {
      name = "v";
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should return 400 if name string length is more than 24", async () => {
      token = new User().generateAuthToken();
      name = Array(50).join("a");
      const res = await exec();

      expect(res.status).toBe(400);
    });

    it("should save genre data if it's valid", async () => {
      await exec();

      const genre = await Genre.find({ name: "validGenre" });

      expect(genre).not.toBeNull();
    });

    it("should return genre data if it's valid", async () => {
      const res = await exec();

      expect(res.body).toHaveProperty("_id");
      expect(res.body).toHaveProperty("name", "validGenre");
    });
  });
});
