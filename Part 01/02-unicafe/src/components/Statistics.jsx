export const Statistics = ({ good, neutral, bad }) => {
    if (!good && !neutral && !bad) {
        return (
            <>
                <h1>statics</h1>
                <p>No feedback given</p>
            </>);
    }

    const total = good + neutral + bad;
    const average = (good - bad) / total;
    const positive = (good / total) * 100;

    return (
        <>
            <h1>statics</h1>
            <p>good {good}</p>
            <p>neutral {neutral}</p>
            <p>bad {bad}</p>
            <p>all {total}</p>
            <p>average {average}</p>
            <p>positive {positive} %</p>
        </>
    )
}