import { useEffect, useState } from "react"
import { list } from "../services/countries"

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)

    useEffect(() => {
        if (name !== '') {
            list(name)
                .then(countries => {
                    setCountry({
                        ...countries,
                        found: true,
                    })
                })
                .catch(e => {
                    console.error(e)
                    setCountry({
                        found: false
                    })
                })
        }
    }, [name])

    return country
}