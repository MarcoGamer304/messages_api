import request from "supertest";
import express from "express";
import { TeamsController } from "../../entities/Teams/controllers/teamsController";
import { wrap } from "../../middlewares/httpErrorCatch";

describe("TeamsController Endpoints", () => {
  let app: express.Express;
  let controller: TeamsController;

  const getAllExpectedResponse = [
    {
      id: 2,
      sender_id: 2,
      recipient_id: 1,
      content: "hola",
      status: "sent",
      createdAt: "2025-05-20T16:53:43.000Z",
      updatedAt: "2025-05-20T16:53:43.000Z",
      recipient: {
        id: 1,
        username: "juanp",
        email: "juan.perez@example.com",
        online: true,
        last_seen: "2024-05-01T10:00:00.000Z",
      },
    },
  ];

  const getExpectedResponse = {
    id: 2,
    sender_id: 2,
    recipient_id: 1,
    content: "hola",
    status: "sent",
    createdAt: "2025-05-20T16:53:43.000Z",
    updatedAt: "2025-05-20T16:53:43.000Z",
  };

  const getTeamsExpectedResponse = [
    {
      content: "hola",
      createdAt: "2025-05-20T16:53:43.000Z",
      id: 2,
      recipient: {
        email: "juan.perez@example.com",
        id: 1,
        last_seen: "2024-05-01T10:00:00.000Z",
        online: true,
        username: "juanp",
      },
      recipient_id: 1,
      sender_id: 2,
      status: "sent",
      updatedAt: "2025-05-20T16:53:43.000Z",
    },
  ];

  const deleteExpectedResponse = {
    id: 3,
    sender_id: 2,
    recipient_id: 1,
    content: "adios",
    status: "sent",
    createdAt: "2025-05-20T16:57:25.000Z",
    updatedAt: "2025-05-20T16:57:25.000Z",
  };

  const notFoundError = new Error("teams not found");

  const dummyUseCases = {
    get: {
      execute: jest.fn((id: number) =>
        id === 1
          ? Promise.resolve(getExpectedResponse)
          : Promise.reject(notFoundError)
      ),
    },
    getByUser: {
      execute: jest.fn((id: number) =>
        id === 1
          ? Promise.resolve(getAllExpectedResponse)
          : Promise.reject(notFoundError)
      ),
    },
    getAll: {
      execute: jest.fn(() => Promise.resolve(getAllExpectedResponse)),
    },
    save: {
      execute: jest.fn((data: any) =>
        Promise.resolve({ id: 2, name: "New Team" })
      ),
    },
    delete: {
      execute: jest.fn((id: number) =>
        id === 1
          ? Promise.resolve(deleteExpectedResponse)
          : Promise.reject(notFoundError)
      ),
    },
    put: {
      execute: jest.fn((id: number, data: any) =>
        id === 1
          ? Promise.resolve({ id: 1, name: "Updated Team" })
          : Promise.reject(notFoundError)
      ),
    },
  };

  beforeAll(() => {
    app = express();
    app.use(express.json());
    controller = TeamsController.getInstance();

    (controller as any).useCases = dummyUseCases;

    app.get("/api/teams/:id", wrap(controller.get));
    app.get("/api/teams/:id/all", wrap(controller.getByUser));
    app.get("/api/teams", wrap(controller.getAll));
    app.post("/api/teams", wrap(controller.save));
    app.delete("/api/teams/:id", wrap(controller.delete));
    app.put("/api/teams/:id", wrap(controller.put));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /teams/:id debe retornar un equipo si existe", async () => {
    const response = await request(app).get("/api/teams/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(getExpectedResponse);
    expect(dummyUseCases.get.execute).toHaveBeenCalledWith(1);
  });

  test("GET /teams/:id debe retornar 404 si no existe", async () => {
    const response = await request(app).get("/api/teams/999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "teams not found");
    expect(dummyUseCases.get.execute).toHaveBeenCalledWith(999);
  });

  test("GET /teams/:id/all debe retornar equipos del usuario si existe", async () => {
    const response = await request(app).get("/api/teams/1/all");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(getAllExpectedResponse);
    expect(dummyUseCases.getByUser.execute).toHaveBeenCalledWith(1);
  });

  test("GET /teams debe retornar un equipo si existe", async () => {
    const response = await request(app).get("/api/teams");
    console.log("response get", response.body);
    console.log("response status", response.status);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(getTeamsExpectedResponse);
    expect(dummyUseCases.getAll.execute).toHaveBeenCalled();
  });

  test("GET /teams debe retornar 404 si no existe", async () => {
    const response = await request(app).get("/api/teams");
    expect(response.status).toBe(200);
    expect(response.body).toBeTruthy();
    expect(dummyUseCases.getAll.execute).toHaveBeenCalled();
  });

  test("POST /teams debe guardar un nuevo equipo", async () => {
    const teamData = { name: "New Team" };
    const response = await request(app).post("/api/teams").send(teamData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 2, name: "New Team" });
    expect(dummyUseCases.save.execute).toHaveBeenCalledWith(teamData);
  });

  test("DELETE /teams/:id debe eliminar un equipo si existe", async () => {
    const response = await request(app).delete("/api/teams/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(deleteExpectedResponse);
    expect(dummyUseCases.delete.execute).toHaveBeenCalledWith(1);
  });

  test("DELETE /teams/:id debe retornar 404 si equipo no existe", async () => {
    const response = await request(app).delete("/api/teams/999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "teams not found");
    expect(dummyUseCases.delete.execute).toHaveBeenCalledWith(999);
  });

  test("PUT /teams/:id debe actualizar un equipo si existe", async () => {
    const updateData = { name: "Updated Team" };
    const response = await request(app).put("/api/teams/1").send(updateData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, name: "Updated Team" });
    expect(dummyUseCases.put.execute).toHaveBeenCalledWith(1, updateData);
  });

  test("PUT /teams/:id debe retornar 404 si equipo no existe", async () => {
    const updateData = { name: "Updated Team" };
    const response = await request(app)
      .put("/api/teams/99999")
      .send(updateData);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "teams not found");
    expect(dummyUseCases.put.execute).toHaveBeenCalledWith(99999, updateData);
  });
});
