const express = require("express");
const router = express.Router();
const Animals = require("../models/animals");

/* Path returning all animals in the database */
router.get("/", async (req, res) => {
  try {
    const animals = await Animals.find();
    res.status(200).json(animals);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* Path that returns an animal sought by ID SENASA */
router.get("/:id", async (req, res) => {
  const filter = { idSenasa: req.params.id };
  try {
    const animal = await Animals.findOne(filter);
    if (!animal) {
      return res
        .status(404)
        .json({ message: "Animal not found, check SENASA number" });
    }
    return res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* Path to load an animal into the database */
router.post("/", async (req, res) => {
  const {
    idSenasa,
    typeOfAnimal,
    animalWeight,
    pastureName,
    deviceType,
    deviceNumber,
  } = req.body;

  const animal = new Animals({
    idSenasa,
    typeOfAnimal,
    animalWeight,
    pastureName,
    deviceType,
    deviceNumber,
  });

  try {

    if (!idSenasa) {
      return res.status(500).json({
        message: "SENASA ID is mandatory.",
      });
    }

    const filter = { idSenasa: idSenasa };
    const animalFound = await Animals.findOne(filter);

    if (animalFound) {
      return res.status(409).json({
        message: "The SENASA ID is already registered for another animal.",
      });
    }

    if (idSenasa.length > 16) {
      return res.status(400).json({
        message: "SENASA ID is too long.",
      });
    }

    if (deviceNumber.length > 8) {
      return res.status(400).json({
        message: "Device number is too long.",
      });
    }

    if (pastureName.length > 200) {
      return res.status(400).json({
        message: "The name of the pasture is too long.",
      });
    }

    await animal.save();
    res.status(200).json({ message: "Animal saved correctly" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* Path to update an animal by SENASA ID */
router.put("/:id", async (req, res) => {
  const { typeOfAnimal, animalWeight, pastureName, deviceType, deviceNumber, idSenasa } =
    req.body;

  const newAnimal = {
    idSenasa,
    typeOfAnimal,
    animalWeight,
    pastureName,
    deviceType,
    deviceNumber,
  };

  const filter = { idSenasa: req.params.id };

  try {
    const animalFound = await Animals.findOne(filter);
    if (!animalFound) {
      return res
        .status(404)
        .json({ message: "Animal not found, check SENASA number" });
    }
    await Animals.findOneAndUpdate(filter, newAnimal);
    res.status(200).json({ status: "Animal Updated" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

/* Path to dispose of an animal by SENASA ID */
router.delete("/:id", async (req, res) => {
  const filter = { idSenasa: req.params.id };
  try {
    const animalFound = await Animals.findOne(filter);
    if (!animalFound) {
      return res
        .status(404)
        .json({ message: "Animal not found, check SENASA number" });
    }
    await Animals.findOneAndDelete(filter);
    res.status(200).json({ message: "Animal Successfully Removed" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
