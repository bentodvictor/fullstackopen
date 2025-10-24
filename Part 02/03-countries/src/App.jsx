import { useState } from 'react'
import { Filter } from './components/Filter'
import { useEffect } from 'react'
import { CountryList } from './components/CountryList';
import { CountryDetails } from './components/CountryDetail';
import axios from 'axios';
import { list } from './services/countries';

function App() {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([]);

  const filteredCountries = filter !== ''
    ? countries.filter(c => c.name.common.toLowerCase().includes(filter.toLowerCase()))
    : countries

  useEffect(() => {
    list()
      .then(countries => {
        setCountries(countries)
      })
      .catch(e => console.error(e))
  }, [])

  const handleFilter = (e) => {
    setFilter(e.target.value)
  }

  const displayCountries = filteredCountries.length === 1
    ? <CountryDetails country={filteredCountries[0]} />
    : filteredCountries.length <= 10
      ? <CountryList filteredCountries={filteredCountries} />
      : <p>Too many matches, specify another filter</p>;

  return (
    <div>
      <Filter value={filter} handleChange={handleFilter} />
      <br />
      {displayCountries}
    </div>
  )
}

export default App
