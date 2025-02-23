import express, { Response } from 'express';
import diaryService from '../services/diaryService';
import { toNewDiaryEntry } from '../utils';
import { NonSensitiveDiaryEntry } from '../types';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitiveDiaryEntry[]>) => {
    res.send(diaryService.getNonSensitiveEntries());
});

router.post('/', (_req, res) => {
    res.send('Saving a diary!');
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const diary = diaryService.findById(Number(id));

    if (diary) res.status(200).send(diary);
    else res.status(404).send();
});

router.post('/', (req, res) => {
    try {
        const newDiaryEntry = toNewDiaryEntry(req.body);

        const addedEntry = diaryService.addDiary(newDiaryEntry);
        res.json(addedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage);
    }

});
export default router;