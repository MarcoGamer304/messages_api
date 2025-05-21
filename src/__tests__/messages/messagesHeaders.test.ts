import request from "supertest";
import app from "../../app/appConfig";

const headersRegex = /application\/json/;

test("GET /messages/:id messages are returned as json", async () => {
  const response = await request(app).get("/api/messages/1");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});

test("GET /messages/:id/all messages are returned as json", async () => {
  const response = await request(app).get("/api/messages/1/all");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});

test("POST /messages messages are returned as json", async () => {
  const response = await request(app).post("/api/messages");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});

test("DELETE /messages/:id messages are returned as json", async () => {
  const response = await request(app).delete("/api/messages/1");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});

test("PUT /messages/:id messages are returned as json", async () => {
  const response = await request(app).put("/api/messages/1");
  expect(response.status).toBeLessThan(500);
  expect(response.headers["content-type"]).toMatch(headersRegex);
});