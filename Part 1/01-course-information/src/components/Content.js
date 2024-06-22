import { Part } from "./Part.js";

export const Content = ({ parts }) => {
    return parts.map((part, i) => (
        <Part key={i} part={part.name} exercises={part.exercises} />
    ))
};