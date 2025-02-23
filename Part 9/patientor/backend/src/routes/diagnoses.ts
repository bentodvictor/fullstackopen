import express, { Response } from "express";
import diagnosesService from "../services/diagnosesService";
import { Diagnoses } from "../types";

const router = express.Router();

router.get("/", (_req, res: Response<Diagnoses[]>) => {
    res.status(200).send(diagnosesService.getDiagnoses());
});

export default router;