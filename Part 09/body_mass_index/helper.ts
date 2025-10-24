interface bmiInputs {
    height: number;
    weight: number;
}

interface exerciseInputs {
    dailyHours: number[];
    originalTarget: number;
}

export const parseArguments = (args: string[]): bmiInputs => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');

    const [, , _height, _weight] = args;
    if (isNaN(Number(_height)) && isNaN(Number(_weight))) {
        throw new Error('Provided values were not numbers!');
    }

    return {
        height: Number(_height),
        weight: Number(_weight)
    };
};

export const parseExerciseArguments = (args: string[]): exerciseInputs => {
    if (args.length < 4) throw new Error('Not enough arguments');

    const usedArgs = args.slice(3);
    const target = args.at(2);

    if (!Array.isArray(usedArgs) || usedArgs.length <= 0) throw new Error('Not enough arguments, needed to be and array');
    if (usedArgs.some(a => isNaN(Number(a)))) throw new Error('Bad arguments type, needed to be and array of numbers');
    if (isNaN(Number(target))) throw new Error('Bad arguments type, the target should be a number');


    const inputs: number[] = usedArgs.map(ua => Number(ua));
    return {
        dailyHours: inputs,
        originalTarget: Number(target)
    };
};