import express from "express";
const app = express();
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload"; 
import dotenv from "dotenv";

import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import product from "./routes/productRoute.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoute.js";
import payment from "./routes/paymentRoute.js";
import { errorMiddleware } from "./middleware/Error.js";




app.use(express.json());

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use(fileUpload());


//config
if (process.env.NODE_ENV!=="PRODUCTION") {// WE WILL NOT NEED THIS IN PRODUCTION BECAUSE WE WILL UPLOAD IT THERE
  dotenv.config({ path: "backend/config/config.env" });// this is to tell config file to server.js
}



//Importing routes
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
  });

  
//Middleware for errors

app.use(errorMiddleware);

export default app;
