export const Filter = ({ value, handleFilter }) => {
    return (
        <div>
            Filter by name: <input value={value} onChange={handleFilter} />
        </div>
    )
}