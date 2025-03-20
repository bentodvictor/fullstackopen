import express, { Response } from "express";
import { NonSensitivePatients } from "../types";
import patientsService from "../services/patientsService";
import { toNewEntry, toNewPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res: Response<NonSensitivePatients[]>) => {
    res.status(200).send(patientsService.getPatients());
});

router.post("/", (req, res) => {
    const parsedData = toNewPatient(req.body);
    const newPatient = patientsService.addPatient(parsedData);

    res.status(201).send(newPatient);
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    const patienDetails = patientsService.getPatient(id);

    res.status(200).send(patienDetails);
});

router.post("/:id/entries", (req, res) => {
    const { id } = req.params;
    const patient = patientsService.addEntry(id, toNewEntry(req.body));
    res.status(200).send(patient);
});

export default router;