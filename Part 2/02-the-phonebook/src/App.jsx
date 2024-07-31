import axios from 'axios';
import { useEffect, useState } from 'react'
import { PersonForm } from './components/PersonForm'
import { Persons } from './components/Persons'
import { Filter } from './components/Filter'
import { create, list, remove, update } from './services/persons';
import { Notification } from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notiMessage, setNotiMessage] = useState('');
  const [notiType, setNotiType] = useState('');


  // return condition
  if (!persons) return;

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
        .then(data => {
          setPersons(persons.concat(data))
          handleNotiMessage(`Successfully added user ${data.name}`, 'success')
        })
        .catch(e => console.error(e));
    }
    // Update user
    else if (person.number !== newNumber)
      update(person.id, newPerson)
        .then(data => {
          setPersons(persons.filter(p => p.id !== person.id).concat(data))
          handleNotiMessage(`Successfully updated user ${data.name} with number ${data.number}`, 'warning')
        })
        .catch(e => console.error(e));
    else
      alert(`${newName} is already added to phonebook`);

    setNewName('');
    setNewNumber('');
  }

  const handleDelete = (personDeleted) => {
    if (window.confirm(`Do you really want to delete ${personDeleted.name}?`)) {
      remove(personDeleted.id)
        .then(_ => {
          setPersons(persons.filter(p => p.id !== personDeleted.id))
          handleNotiMessage(`Successfully deleted user ${personDeleted.name}`, 'success')
        })
        .catch(e => {
          console.error('error', e);
          if (e.response.statusText == "Not Found")
            handleNotiMessage(`Information of ${personDeleted.name} has already been removed from server`, 'error')
        });

      filteredPersons = persons;
      setFilter('');
    }
  }

  const handleNotiMessage = (message, status) => {
    setNotiMessage(message);
    setNotiType(status)
    setTimeout(() => {
      setNotiType('')
      setNotiMessage('');
    }, 3000);
  }

  return (
    <div>
      <Notification message={notiMessage} status={notiType} />
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