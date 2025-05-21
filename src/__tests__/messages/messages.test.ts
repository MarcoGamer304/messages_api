import request from "supertest";
import express from "express";
import { MessageController } from "../../entities/Messages/controllers/messagesController";

describe("MessageController Endpoints", () => {
  let app: express.Express;
  let controller: MessageController;

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

  const deleteExpectedResponse = {
    id: 3,
    sender_id: 2,
    recipient_id: 1,
    content: "adios",
    status: "sent",
    createdAt: "2025-05-20T16:57:25.000Z",
    updatedAt: "2025-05-20T16:57:25.000Z",
  };

  const notFoundError = new Error("message not found");

  const dummyUseCases = {
    get: {
      execute: jest.fn((id: number) =>
        id === 1 ? Promise.resolve(getExpectedResponse) : Promise.reject(notFoundError)
      ),
    },
    getAll: {
      execute: jest.fn((id: number) =>
        id === 1 ? Promise.resolve(getAllExpectedResponse) : Promise.reject(notFoundError)
      ),
    },
    save: {
      execute: jest.fn((data: any) => Promise.resolve({ id: 2, text: "Saved message" })),
    },
    delete: {
      execute: jest.fn((id: number) =>
        id === 1 ? Promise.resolve(deleteExpectedResponse) : Promise.reject(notFoundError)
      ),
    },
    put: {
      execute: jest.fn((id: number, data: any) =>
        id === 1 ? Promise.resolve({ id: 1, text: "Updated message" }) : Promise.reject(notFoundError)
      ),
    },
  };

  beforeAll(() => {
    app = express();
    app.use(express.json());
    controller = MessageController.getInstance();

    // Reemplazamos los useCases por nuestros mocks
    (controller as any).useCases = dummyUseCases;

    // Middleware que captura errores y responde 404
    const wrap = (fn: any) => (req: any, res: any) => {
      fn(req, res).catch((e: Error) => {
        res.status(404).json({ error: e.message });
      });
    };

    // Registro rutas con manejo de errores
    app.get("/api/messages/:id", wrap(controller.get));
    app.get("/api/messages/:id/all", wrap(controller.getByUser));
    app.post("/api/messages", wrap(controller.save));
    app.delete("/api/messages/:id", wrap(controller.delete));
    app.put("/api/messages/:id", wrap(controller.put));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("GET /messages/:id debe retornar un mensaje si existe", async () => {
    const response = await request(app).get("/api/messages/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(getExpectedResponse);
    expect(dummyUseCases.get.execute).toHaveBeenCalledWith(1);
  });

  test("GET /messages/:id debe retornar 404 si no existe", async () => {
    const response = await request(app).get("/api/messages/999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "message not found");
    expect(dummyUseCases.get.execute).toHaveBeenCalledWith(999);
  });

  test("GET /messages/:id/all debe retornar mensajes del usuario si existe", async () => {
    const response = await request(app).get("/api/messages/1/all");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(getAllExpectedResponse);
    expect(dummyUseCases.getAll.execute).toHaveBeenCalledWith(1);
  });

  test("GET /messages/:id/all debe retornar 404 si usuario no existe", async () => {
    const response = await request(app).get("/api/messages/999/all");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "message not found");
    expect(dummyUseCases.getAll.execute).toHaveBeenCalledWith(999);
  });

  test("POST /messages debe guardar un nuevo mensaje", async () => {
    const messageData = { text: "New message" };
    const response = await request(app).post("/api/messages").send(messageData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 2, text: "Saved message" });
    expect(dummyUseCases.save.execute).toHaveBeenCalledWith(messageData);
  });

  test("DELETE /messages/:id debe eliminar un mensaje si existe", async () => {
    const response = await request(app).delete("/api/messages/1");
    expect(response.status).toBe(200);
    expect(response.body).toEqual(deleteExpectedResponse);
    expect(dummyUseCases.delete.execute).toHaveBeenCalledWith(1);
  });

  test("DELETE /messages/:id debe retornar 404 si mensaje no existe", async () => {
    const response = await request(app).delete("/api/messages/999");
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "message not found");
    expect(dummyUseCases.delete.execute).toHaveBeenCalledWith(999);
  });

  test("PUT /messages/:id debe actualizar un mensaje si existe", async () => {
    const updateData = { text: "Updated message" };
    const response = await request(app).put("/api/messages/1").send(updateData);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: 1, text: "Updated message" });
    expect(dummyUseCases.put.execute).toHaveBeenCalledWith(1, updateData);
  });

  test("PUT /messages/:id debe retornar 404 si mensaje no existe", async () => {
    const updateData = { text: "Updated message" };
    const response = await request(app).put("/api/messages/99999").send(updateData);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error", "message not found");
    expect(dummyUseCases.put.execute).toHaveBeenCalledWith(99999, updateData);
  });
});
