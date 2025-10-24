export const Filter = ({ value, handleChange }) => {
    return (
        <div>
            <label htmlFor="filter-input">Find countries: </label>
            <input name="filter-input" value={value} onChange={handleChange} />
        </div>
    );
}