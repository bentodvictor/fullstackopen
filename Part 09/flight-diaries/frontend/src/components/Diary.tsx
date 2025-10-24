interface Props {
    date: string;
    weather: string;
    visibility: string;
};

const Diary = ({ date, weather, visibility }: Props) => {
    return (
        <>
            <h1>{date}</h1>
            <p>weather: {weather} </p>
            <p>visibility: {visibility} </p>
        </>
    );
};

export default Diary;