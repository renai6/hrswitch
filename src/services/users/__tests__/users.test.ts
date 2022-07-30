import "dotenv/config";
import request from "supertest";
import server from "../../../main";

describe("User routes", () => {
  describe("GET all users", () => {
    it("should return status code 200", async () => {
      const response = await request(server).get(`/v1/users`);

      expect(response.status).toBe(200);
    });

    it("should return all users", async () => {
      const response = await request(server)
        .get(`/v1/users`)
        .expect("Content-Type", /json/);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            email: expect.any(String),
            name: expect.any(String),
            userName: expect.any(String),
            createdAt: expect.any(String),
            role: expect.any(String),
          }),
        ])
      );
    });
  });
});
