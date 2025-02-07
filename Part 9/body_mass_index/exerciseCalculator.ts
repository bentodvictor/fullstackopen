import { parseExerciseArguments } from "./helper";

export interface Exercises {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number
}

interface Rating {
    value: number;
    description: string;
}

const calculateRating = (averageTime: number, target: number): Rating => {
    const percent = averageTime / target;

    if (percent >= 1)
        return { value: 3, description: 'good work' };
    else if (percent >= 0.5)
        return { value: 2, description: 'not too bad but could be better' };
    else
        return { value: 1, description: 'bad work' };
};

export const calculateExercises = (dailyHours: number[], originalTarget: number): Exercises => {
    const avrg = dailyHours.reduce((acc, value, _idx, array) => {
        return acc + value / array.length;
    }, 0);
    const { value, description } = calculateRating(avrg, originalTarget);

    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter(d => d !== 0).length,
        success: value === 3 ? true : false,
        rating: value,
        ratingDescription: description,
        target: originalTarget,
        average: avrg
    };
};

try {
    const { dailyHours, originalTarget } = parseExerciseArguments(process.argv);
    const result = calculateExercises(dailyHours, originalTarget);

    console.log(result);
} catch (err: unknown) {
    let errorMessage = 'Something hanppened.';
    if (err instanceof Error) {
        errorMessage += ` Error: ${err.message}`;
    }
    console.error(errorMessage);
}