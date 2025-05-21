import request from "supertest";
import express from "express";
import { UserController } from "../../entities/User/controllers/userController";
import { wrap } from "../../middlewares/httpErrorCatch";

describe("UserController Endpoints", () => {
  let app: express.Express;
  const controller = new UserController();

  const getExpectedResponse = {
    id: 1,
    name: "Carlos",
    last_name: "González",
    username: "cgonza",
    email: "carlos@example.com",
    online: false,
    last_seen: null,
    email_verified_at: null,
    password: "hashedpassword1",
    remember_token: null,
    createdAt: "2025-05-17T23:15:25.000Z",
    updatedAt: "2025-05-17T23:15:25.000Z",
  };

  const notFoundError = new Error("user not found");

  const dummyUseCases = {
    execute: jest.fn((id: number) =>
      id === 1
        ? Promise.resolve(getExpectedResponse)
        : Promise.reject(notFoundError)
    ),
  };

  beforeAll(() => {
    app = express();
    app.use(express.json());
    
    (controller as any).useCases = dummyUseCases;

    app.get("/api/users/:id", wrap(controller.get));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /users/:id debe retornar un usuario si existe", async () => {
    const response = await request(app).get("/api/users/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(getExpectedResponse);
    expect(dummyUseCases.execute).toHaveBeenCalledWith(1);
  });

  test("GET /users/:id debe retornar 404 si no existe", async () => {
    const response = await request(app).get("/api/users/999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "user not found");
    expect(dummyUseCases.execute).toHaveBeenCalledWith(999);
  });
});
