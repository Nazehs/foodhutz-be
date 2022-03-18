const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(
      process.env.MONGO_DB_URI ||
        "mongodb://localhost:27017/foodhutz?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
      {
        useNewUrlParser: true,
      }
    );
    console.log("Connection successful!");
  } catch (error) {
    console.log("Connection failed!", error.message);
  }
};
db();
