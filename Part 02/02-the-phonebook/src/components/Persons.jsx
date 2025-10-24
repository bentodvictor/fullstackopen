export const Persons = ({ filteredPersons, handleDelete }) => {
    return (
        <div>
            {filteredPersons.map(p => (
                <div style={{ padding: "0.3rem" }} key={p.id}>
                    <p style={{ display: "inline" }}>{p.name} {p.number} </p>
                    <button onClick={() => handleDelete(p)}>delete</button>
                </div>
            ))}
        </div>
    )
}