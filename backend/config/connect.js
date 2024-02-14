const mongoose = require("mongoose");
try {
  mongoose
    .connect(process.env.MONGO_URI)
    .then((con) => {
      console.log(`MongoDB connected success ${con.connection.host}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
} catch (error) {
  console.log(`Something went wrong while connecting to db`);
}
