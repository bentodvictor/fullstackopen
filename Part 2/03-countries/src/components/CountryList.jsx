import { Country } from "./Country";

export const CountryList = ({ filteredCountries }) => {
    return (
        <div>
            {filteredCountries.map((fc, idx) => <Country key={idx} country={fc} />)}
        </div>
    )
}