import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";
const app = express();
app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/users", userRoute);
app.get("/", (req, res) => {
 res.send("Hello from the server");
});
export default app;
