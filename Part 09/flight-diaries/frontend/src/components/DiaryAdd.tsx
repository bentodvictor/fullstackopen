import { FormEvent } from "react";

interface Props {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

const DiaryAdd = ({ onSubmit }: Props) => {
    return (
        <>
            <fieldset>
                <legend><h1>Add new entry</h1> </legend>
                <form onSubmit={onSubmit}>
                    <label>Add a date</label>
                    <div>
                        <input id="date" name="date" type="date" />
                    </div>
                    <br />
                    <label>Visibility</label>
                    <div>
                        {/* great, good, ok, poor */}
                        <input type="radio" id="great" name="visibility" value="great" />
                        <label htmlFor="great">Great</label>
                        <input type="radio" id="good" name="visibility" value="good" />
                        <label htmlFor="good">Good</label>
                        <input type="radio" id="ok" name="visibility" value="ok" />
                        <label htmlFor="ok">Ok</label>
                        <input type="radio" id="poor" name="visibility" value="poor" />
                        <label htmlFor="poor">Poor</label>
                    </div>
                    <br />
                    <label>Weather</label>
                    <div>
                        {/* sunny, rainy, cloudy, stormy, windy */}
                        <input type="radio" id="sunny" name="weather" value="sunny" />
                        <label htmlFor="sunny">Sunny</label>
                        <input type="radio" id="rainy" name="weather" value="rainy" />
                        <label htmlFor="rainy">Rainy</label>
                        <input type="radio" id="cloudy" name="weather" value="cloudy" />
                        <label htmlFor="cloudy">Cloudy</label>
                        <input type="radio" id="stormy" name="weather" value="stormy" />
                        <label htmlFor="stormy">Stormy</label>
                        <input type="radio" id="windy" name="weather" value="windy" />
                        <label htmlFor="windy">Windy</label>
                    </div>
                    <br />
                    <label>Add a comment</label>
                    <div>
                        <input id="comment" name="comment" />
                    </div>
                    <br />
                    <button id="add" name="add" type="submit">add</button>
                </form>
            </fieldset>
        </>
    );
};

export default DiaryAdd;