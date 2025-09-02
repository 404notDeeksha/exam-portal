import dotenv from "dotenv";
dotenv.config();

import app from "./server.js";
import dbConnection from "./config/dbConnection.js";

dbConnection();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
