import CoursePart from "../types";

interface Props {
    content: CoursePart;
}

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const Part = ({ content }: Props) => {
    switch (content.kind) {
        case "basic":
            return <>
                <p><strong>{content.name} {content.exerciseCount}</strong></p>
                <p>{content.description}</p>
                <br></br>
            </>;
        case "group":
            return <>
                <p><strong>{content.name} {content.exerciseCount}</strong></p>
                <p>projecte exercises {content.groupProjectCount}</p>
                <br></br>
            </>;
        case "background":
            return <>
                <p><strong>{content.name} {content.exerciseCount}</strong></p>
                <p>{content.description}</p>
                <p>submit to {content.backgroundMaterial}</p>
                <br></br>
            </>;
        case "special":
            return <>
                <p><strong>{content.name} {content.exerciseCount}</strong></p>
                <p>{content.description}</p>
                <p>required skills: {content.requirements.join(', ')}</p>
                <br></br>
            </>;
        default:
            return assertNever(content);
    }
};

export default Part;