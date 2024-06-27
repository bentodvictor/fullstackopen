import axios from 'axios';
import { useEffect, useState } from 'react'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Filter } from './components/Filter'
import { create, list, remove, update } from './services/persons';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    list()
      .then(data => {
        setPersons(data)
      })
      .catch(e => console.error(e));
  }, []);

  let filteredPersons = filter === ''
    ? persons
    : persons.filter(p => p.name.includes(filter));

  // On change handlers
  const handleName = (e) => setNewName(e.target.value);
  const handleNumber = (e) => setNewNumber(e.target.value);
  const handleFilter = (e) => setFilter(e.target.value);


  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if person is already in array
    let person = persons.find(p => p.name === newName);
    const newPerson = { name: newName, number: newNumber };

    if (!person) {
      create(newPerson)
        .then(data => setPersons(persons.concat(data)))
        .catch(e => console.error(e));
    }
    else if (person.number !== newNumber)
      update(person.id, newPerson)
        .then(data => {
          setPersons(persons.filter(p => p.id !== person.id).concat(data))
        })
        .catch(e => console.error(e));
    else
      alert(`${newName} is already added to phonebook`);

    setNewName('');
    setNewNumber('');
  }

  const handleDelete = (p) => {
    if (window.confirm(`Do you really want to delete ${p.name}?`)) {
      remove(p.id)
        .then(personDeleted => {
          setPersons(persons.filter(p => p.id !== personDeleted.id))
        })
        .catch(e => console.error(e));

      filteredPersons = persons;
      setFilter('');
    }
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  )
}

export default App