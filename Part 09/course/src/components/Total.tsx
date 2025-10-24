interface Props {
    totalExercises: number;
};

const Total = ({ totalExercises }: Props) => {
    return (
        <>
            <p>Number of Exercises {totalExercises}</p>
        </>
    );
};

export default Total;