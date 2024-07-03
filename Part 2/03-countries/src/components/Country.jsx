import { useState } from "react";
import { CountryDetails } from "./CountryDetail";

export const Country = ({ country }) => {
    const [show, setShow] = useState(null)

    return (
        <div>
            <p>{country.name.common} <button onClick={() => setShow(!show)}>{show ? 'Hide' : 'Show'}</button></p>
            {show && <CountryDetails country={country} />}
        </div>
    );
}