export const Total = ({ parts }) => (
    <p>
        Number of exercises {parts.reduce((accumulator, currentObj) => accumulator + currentObj.exercises, 0)}
    </p>
)