import { Router } from "express";
import { getDeshboardStats } from "../controllers/deshboard.controllers.js";

const deshboardRouter = Router()

deshboardRouter.get("/stats", getDeshboardStats)

export default deshboardRouter
