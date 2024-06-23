export const PersonForm = ({ newName, newNumber, handleSubmit, handleName, handleNumber }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    Name: <input value={newName} onChange={handleName} />
                </div>
                <div>
                    Number: <input value={newNumber} onChange={handleNumber} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </div>
    );
}
