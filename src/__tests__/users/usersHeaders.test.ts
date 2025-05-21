import request from "supertest";
import app from "../../app/appConfig";

const headersRegex = /application\/json/;

test("GET /users/:id users are returned as json", async () => {
  const response = await request(app).get("/api/users/1");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});
