const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
// Parse JSON bodies
app.use(express.json());

// för att ta emot forms
app.use(express.urlencoded({ extended: true }));

// Använder static files (i mappen public)
// app.use anropas varje gång applikationen får en Request
app.use(express.static("public"));
app.use(cors());

const databaseSql = require("./config/db");
const connectionMongoDB = require("./config/mongo");
connectionMongoDB();

//koppla ihop med routes som i sin tur kopplar ihop controllers
const categoryRoutes = require("./routes/categoryRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const savingGoalRoutes = require("./routes/savingGoalRoutes");

app.use("/categories", categoryRoutes);
app.use("/transactions", transactionRoutes);
app.use("/savingGoal", savingGoalRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
