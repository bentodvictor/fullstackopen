import { Header } from "./Header";
import { Content } from "./Content";

export const Course = ({ course }) => {
    const total = course.parts.reduce((acc, part) => acc + part.exercises, 0);

    return (
        <>
            <Header name={course.name} />
            <Content parts={course.parts} />
            <p><strong>total of {total} exercises</strong></p>
        </>
    )
};