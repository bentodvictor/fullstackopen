import { useState } from 'react'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Filter } from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPersons = filter === ''
    ? persons
    : persons.filter(p => p.name.includes(filter));

  // On change handlers
  const handleName = (e) => setNewName(e.target.value);
  const handleNumber = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setFilter(e.target.value);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if name is already in array
    let person = persons.find(p => p.name === newName);

    if (!person)
      setPersons([...persons,
      { name: newName },
      { number: newNumber }
      ]);
    else
      alert(`${newName} is already added to phonebook`);

    setNewName('');
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter value={filter} handleFilter={handleFilter} />
      <br />
      <h2>Add new</h2>
      <PersonForm newName={newName} newNumber={newNumber} handleSubmit={handleSubmit} handleName={handleName} handleNumber={handleNumber} />
      <br />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App