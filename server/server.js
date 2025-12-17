const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");

dotenv.config();
connectDB();

const app = express();

//middleware
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

//routes
const petRoutes = require("./routes/pet.routes");
const recordRoutes = require("./routes/record.routes");

app.use("/pets", petRoutes);
app.use("/records", recordRoutes);

app.get("/", (req, res) => {
  res.send("Pet Medical Records API is running");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
