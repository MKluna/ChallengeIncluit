const request = require("supertest");
const { app, server } = require("../index");
const mongoose = require("mongoose");
const Animals = require("../models/animals");

beforeEach(async () => {
  const animal = new Animals({
    idSenasa: "S8IJ8axPdA95dzMk",
    typeOfAnimal: "test",
    animalWeight: "00",
    pastureName: "test",
    deviceType: "test",
    deviceNumber: "2Ob2imOJ",
  });

  const animalDelete = new Animals({
    idSenasa: "S8IJ8axPdA95dbOW",
    typeOfAnimal: "test",
    animalWeight: "00",
    pastureName: "test",
    deviceType: "test",
    deviceNumber: "2Ob2imOJ",
  });

  const updateAnimal = new Animals({
    idSenasa: "S8IJ8axPdA95dmIT",
    typeOfAnimal: "test",
    animalWeight: "0",
    pastureName: "test",
    deviceType: "test",
    deviceNumber: "2Ob2idYR",
  });

  await updateAnimal.save();
  await animalDelete.save();
  await animal.save();
});

describe("GET ANIMALS", () => {
  test("Should return the animals and a 200 status code.", async () => {
    const response = await request(app).get("/api/establishment/").send();
    expect(response.statusCode).toBe(200);
    expect(response.headers["content-type"]).toContain("json");
  });
});

describe("GET ANIMAL BY ID", () => {
  test("Should return the animal by id and a 200 status code", async () => {
    const response = await request(app)
      .get("/api/establishment/S8IJ8axPdA95dzMk")
      .send();
    expect(response.statusCode).toBe(200);
  });
});

describe("GET ANIMAL BY ID | ID NON-EXISTING ", () => {
  test("It should return a 404 status code since the ID does not exist.", async () => {
    const response = await request(app)
      .get("/api/establishment/S8IJ8axPdA95duUU")
      .send();
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE ANIMAL BY ID", () => {
  test("Should return 200 status code", async () => {
    const response = await request(app).get(
      "/api/establishment/S8IJ8axPdA95dbOW"
    );
    expect(response.statusCode).toBe(200);
  });
});

describe("DELETE ANIMAL BY ID | SENASA ID DOES NOT EXIST", () => {
  test("Should return 200 status code", async () => {
    const response = await request(app).get(
      "/api/establishment/S8IJ8axPdA95dbO2"
    );
    expect(response.statusCode).toBe(404);
  });
});

describe("UPDATE ANIMAL BY ID | SENASA ID DOES NOT EXIST", () => {
  test("Should return a 200 status code and update the pasture name", async () => {
    const updatePastureName = { pastureName: "pastureNameUpdated" };

    const response = await request(app)
      .put("/api/establishment/S8IJ8axPdA95dmIT")
      .send(updatePastureName);

    expect(response.statusCode).toBe(200);
  });
});

describe("UPDATE ANIMAL BY ID | SENASA ID ", () => {
  test("Should return a 200 status code and update the pasture name", async () => {
    const updatePastureName = { pastureName: "pastureNameUpdated" };

    const response = await request(app)
      .put("/api/establishment/S8IJ8axPdA95dmIg")
      .send(updatePastureName);

    expect(response.statusCode).toBe(404);
  });
});

describe("CREATE ANIMAL", () => {
  test("Should return a 200 status code", async () => {
    const newAnimalPOST = {
      idSenasa: "S8IJ8axPdA95dzZZ",
      typeOfAnimal: "test",
      animalWeight: "00",
      pastureName: "test",
      deviceType: "test",
      deviceNumber: "2Ob2imOJ",
    };

    const response = await request(app)
      .post("/api/establishment")
      .send(newAnimalPOST);
    expect(response.statusCode).toBe(200);
  });
});

describe("CREATE ANIMAL | SENASA ID MISSING ERROR", () => {
  test("It should return an error when creating an animal as it does not have a SENASA ID.", async () => {
    const newAnimalPOST = {
      typeOfAnimal: "test",
      animalWeight: "00",
      pastureName: "test",
      deviceType: "test",
      deviceNumber: "2Ob2imOJ",
    };

    const response = await request(app)
      .post("/api/establishment")
      .send(newAnimalPOST);
    expect(response.statusCode).toBe(500);
  });
});

describe('CREATE ANIMAL | SENASA ID DOES NOT EXIST ERROR', () => {
  test('It should return an error since the SENASA ID exists.', async () => {
    const newAnimalPOST = {
      idSenasa: "S8IJ8axPdA95dzZZ",
      typeOfAnimal: "test",
      animalWeight: "00",
      pastureName: "test",
      deviceType: "test",
      deviceNumber: "2Ob2imOJ",
    };

    const response = await request(app)
      .post("/api/establishment")
      .send(newAnimalPOST);
    expect(response.statusCode).toBe(409);
  });
});

describe('CREATE ANIMAL | SENASA ID TOO LONG', () => {
  test('It should return an error since the SENASA ID exists.', async () => {
    const newAnimalPOST = {
      idSenasa: "S8IJ8axPdA95duUU234234234234234234234324234234324324324",
      typeOfAnimal: "test",
      animalWeight: "00",
      pastureName: "test",
      deviceType: "test",
      deviceNumber: "2Ob2imOJ",
    };

    const response = await request(app)
      .post("/api/establishment")
      .send(newAnimalPOST);
    expect(response.statusCode).toBe(400);
  });
});

describe('CREATE ANIMAL | DEVICE NUMBER TOO LONG', () => {
  test('It should return an error since the SENASA ID exists.', async () => {
    const newAnimalPOST = {
      idSenasa: "S8IJ8axPdA95dmNN",
      typeOfAnimal: "test",
      animalWeight: "00",
      pastureName: "test",
      deviceType: "test",
      deviceNumber: "2Ob2imOASASASASASASSAJ",
    };

    const response = await request(app)
      .post("/api/establishment")
      .send(newAnimalPOST);
    expect(response.statusCode).toBe(400);
  });
});

describe('CREATE ANIMAL | PASTURE NAME TOO LONG', () => {
  test('It should return an error since the SENASA ID exists.', async () => {
    const newAnimalPOST = {
      idSenasa: "S8IJ8axPdA95dmNN",
      typeOfAnimal: "test",
      animalWeight: "00",
      pastureName: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      deviceType: "test",
      deviceNumber: "2Ob2imLo",
    };

    const response = await request(app)
      .post("/api/establishment")
      .send(newAnimalPOST);
    expect(response.statusCode).toBe(400);
  });
});

afterAll(async () => {
  await Animals.findOneAndDelete({ idSenasa: "S8IJ8axPdA95dzMk" });
  await Animals.findOneAndDelete({ idSenasa: "S8IJ8axPdA95dmIT" });
  await Animals.findOneAndDelete({ idSenasa: "S8IJ8axPdA95dzZZ" });
  await Animals.deleteMany({})
  await mongoose.connection.close();
  server.close();
});
