import "dotenv/config";
import request from "supertest";
import server from "../../../main";

describe("Employee routes", () => {
  describe("GET all employees", () => {
    it("should return status code 200", async () => {
      const response = await request(server).get(`/v1/employees`);

      expect(response.status).toBe(200);
    });

    it("should return all employees", async () => {
      const response = await request(server)
        .get(`/v1/employees`)
        .expect("Content-Type", /json/);

      expect(response.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            businessUnitId: expect.any(String),
            name: expect.any(String),
            address: expect.any(String),
            phone: expect.any(String),
            SSSNumber: expect.any(String),
            PhilHealthNumber: expect.any(String),
            TaxIdNumber: expect.any(String),
            createdAt: expect.any(String),
          }),
        ])
      );
    });

    // it("should create an employee", async () => {
    //   const response = await request(server)
    //     .post("/v1/employees")
    //     .send({
    //       businessUnitId: "9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d",
    //       name: "Raffi Muloc",
    //       address: "Soutcom Village",
    //       phone: "09569303690",
    //       SSSNumber: "E11",
    //       PhilHealthNumber: "W22",
    //       TaxIdNumber: "E22",
    //     })
    //     .expect("Content-Type", /json/)
    //     .expect(201);
    //   expect(response.body).toEqual(
    //     expect.objectContaining({
    //       id: expect.any(String),
    //       businessUnitId: expect.any(String),
    //       name: expect.any(String),
    //       address: expect.any(String),
    //       phone: expect.any(String),
    //       SSSNumber: expect.any(String),
    //       PhilHealthNumber: expect.any(String),
    //       TaxIdNumber: expect.any(String),
    //       createdAt: expect.any(String),
    //     })
    //   );
    // });
  });
});
