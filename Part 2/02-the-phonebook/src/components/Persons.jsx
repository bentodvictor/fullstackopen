export const Persons = ({ filteredPersons }) => {
    return (
        <div>
            {filteredPersons.map((p, idx) => (
                <p key={idx}>{p.name} {p.number}</p>
            ))}
        </div>
    )
}