import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises, Exercises } from './exerciseCalculator';
const app = express();

app.get('/ping', (_req, res) => {
    res.send('pong');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(403).send("malformatted parameters");
    }

    const { bmi } = calculateBmi(Number(height), Number(weight));

    res.status(200).send({
        bmi,
        height: Number(height),
        weight: Number(weight)
    });
});

app.post('/exercises', (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target: originalTarget } = req.body;

    if (!daily_exercises || !origin) {
        res.status(401).send('parameters missing');
    }
    if (isNaN(Number(originalTarget)) || !Array.isArray(daily_exercises) || Number(originalTarget) <= 0 || daily_exercises.length <= 0) {
        res.status(401).send('malformatted parameters.');
    }

    const result: Exercises = calculateExercises(daily_exercises as number[], originalTarget as number);
    res.status(200).send({
        ...result
    });

});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});