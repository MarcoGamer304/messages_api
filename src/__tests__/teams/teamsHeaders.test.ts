import request from "supertest";
import app from "../../app/appConfig";

const headersRegex = /application\/json/;

test("GET /teams/:id messages are returned as json", async () => {
  const response = await request(app).get("/api/teams/1");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});

test("GET /teams/:id/all messages are returned as json", async () => {
  const response = await request(app).get("/api/teams/1/all");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});

test("GET /teams messages are returned as json", async () => {
  const response = await request(app).get("/api/teams");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});

test("POST /teams messages are returned as json", async () => {
  const response = await request(app).post("/api/teams");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});

test("DELETE /teams/:id messages are returned as json", async () => {
  const response = await request(app).delete("/api/teams/1");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});

test("PUT /teams/:id messages are returned as json", async () => {
  const response = await request(app).put("/api/teams/1");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});