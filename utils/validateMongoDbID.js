const mongoose = require("mongoose");

const validateMongoDbID = (id) => {
  const isValid = mongoose.Types.ObjectId.isValid(id);
  if (!isValid) {
    throw new Error(`This ID: ${id}, is not Valid or not Found.`);
  }
  // console.log(`From ValidateMongoDB ID Validator, the ID is Valid.`)
};
module.exports = validateMongoDbID;
