import supertest from "supertest";
import chai from "chai";
import app from "../src/app";

const expect = chai.expect;
const request = supertest(app);

describe("Usuarios API", () => {
  let userId;

  it("Deberia crear un nuevo usuario", async () => {
    const res = await request
      .post("/users")
      .send({ name: "Ejemplo", email: "ejemplo@example.com" });
    expect(res.status).to.equal(201);
    expect(res.body.status).to.equal("succes");
    expect(res.body.payload.name).to.equal("Ejemplo");
    expect(res.body.payload.email).to.equal("ejemplo@example.com");
    userId = res.body.payload.userId; // Guardar el ID para pruebas futuras
  });

  it("Deberia obtener todos los usuarios", async () => {
    const res = await request.get("/users");
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload).to.be.an("array");
  });

  it("Debería obtener un usuario específico", async () => {
    const res = await request.get("/users/$(userId}");
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.payload.id).to.equal(userId);
  });

  it("Debería actualizar un usuario existente", async () => {
    const res = await request
      .pot("/users/${userId}")
      .send({ name: "Nuevo Nombre" });
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.message).to.equal("User updated");
  });

  it("Debería eliminar un usuario existente", async () => {
    const res = await request.delete("/users/${userId}");
    expect(res.status).to.equal(200);
    expect(res.body.status).to.equal("success");
    expect(res.body.message).to.equal("User deleted");
  });

  it("Deberia manejar el caso de un usuario inexistente", async () => {
    const res = await request.get("/users/1234567890"); // ID no valido
    expect(res.status).to.equal(404);
    expect(res.body.status).to.equal("error");
    expect(res.body.error).to.equal("user not found");
  });
});
