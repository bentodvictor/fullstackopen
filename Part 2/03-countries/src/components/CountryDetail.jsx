import { Weather } from "./Weather"

export const CountryDetails = ({ country }) => {
    return (
        <>
            <h1>{country.name.common}</h1>
            <p>capital {country.capital[[0]]}</p>
            <p>area {country.area}</p>
            <p><strong>languages</strong></p>
            <ul>
                {Object.values(country.languages).map((l, idx) => <li key={idx}>{l}</li>)}
            </ul>
            <img src={country.flags.png} alt={country.flags.alt}></img>
            <Weather capitalName={country.capital[0]} />
        </>
    )
}