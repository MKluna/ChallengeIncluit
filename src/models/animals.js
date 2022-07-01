const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;

const AnimalSchema = new Schema({
  idSenasa: { type: String, max: 16 },
  typeOfAnimal: { type: String },
  animalWeight: { type: String },
  pastureName: { type: String, max: 200 },
  deviceType: { type: String },
  deviceNumber: { type: String, max: 8 }
})

module.exports = mongoose.model('Animal', AnimalSchema)