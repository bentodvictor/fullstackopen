import express, { Response } from "express";
import { NonSensitivePatients } from "../types";
import patientsService from "../services/patientsService";
import { toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
    res.status(200).send(patientsService.getPatients());
});

router.post("/", (req, res) => {
    const parsedData = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(parsedData);

    res.status(201).send(newPatient);
});

export default router;