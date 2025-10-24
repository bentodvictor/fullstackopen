import { DiaryEntry } from "../types";
import Diary from "./Diary";

interface Props {
    diaries: DiaryEntry[];
};

const DiaryList = ({ diaries }: Props) => {
    return (
        <>
            {diaries.map(d => <Diary key={d.id} date={d.date} visibility={d.visibility} weather={d.weather} />)}
        </>
    );
};

export default DiaryList;