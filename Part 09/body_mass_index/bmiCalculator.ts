import { parseArguments } from './helper';
/**
    BMI Categories:
    Underweight = <18.5
    Normal weight = 18.5–24.9
    Overweight = 25–29.9
    Obesity = BMI of 30 or greate

    Math:
    BMI = weight / height²
 */


interface bmiResult {
    bmi: 'Underweight' | 'Normal' | 'Overweight' | 'Obesity'
}

export const calculateBmi = (height: number, weight: number): bmiResult => {
    const metricHeight = height / 100;
    const bmi = weight / (metricHeight * metricHeight);

    if (bmi < 18.5) return { bmi: 'Underweight' };
    else if (bmi > 18.5 && bmi < 24.9) return { bmi: 'Normal' };
    else if (bmi > 255 && bmi < 29.9) return { bmi: 'Overweight' };
    else return { bmi: 'Obesity' };
};

try {
    if (require.main === module) {
        const { height, weight } = parseArguments(process.argv);
        const bmiResult = calculateBmi(height, weight);

        console.log(`${bmiResult.bmi} range`);
    }
} catch (err: unknown) {
    let errorMessage = 'Something hanppened.';
    if (err instanceof Error) {
        errorMessage += ` Error: ${err.message}`;
    }
    console.error(errorMessage);
}