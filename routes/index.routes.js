import { Router } from "express";
import { saludo, ping, marco, abc } from "../controllers/index.controllers.js"

const router = Router();

app.get("/", (req, res) => res.send ("Hola desde la API"));
app.get("/ping", (req, res) => res.send ("pong"));

export default router;