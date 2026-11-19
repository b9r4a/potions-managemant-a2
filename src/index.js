require("dotenv").config();


const potionsRouter = require("./routes/potions");
const express = require("express");
const usersRouter = require("./routes/users");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/api/potions", potionsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
