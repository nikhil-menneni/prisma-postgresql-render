import * as dotenv from "dotenv";
dotenv.config();

import app from "./express/app";

app.listen(3001, () => {
  console.log("hello from server:http://localhost:3001");
});
