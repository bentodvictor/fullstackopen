import CoursePart from "../types";
import Part from "./Part";

interface Props {
    courseParts: CoursePart[]
};

const Content = ({ courseParts }: Props) => {
    return (
        <>
            {courseParts.map(c => <Part content={c}></Part>)}
        </>
    );
};

export default Content;