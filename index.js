const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");

const postRoute = require("./Routes/Posts.js");
const userRoute = require("./Routes/users.js");

const { MONGOURI } = require("./client/config/keys");

mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to mongoDB successfully");
});
mongoose.connection.on("error", (err) => {
  console.log("err connecting", err);
});

const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("Hello All");
});

// const CONNECTION_URL = `mongodb+srv://Nawaz:bashabanu@cluster0.8qpas.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 9000;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server running on port : ${PORT}`));
