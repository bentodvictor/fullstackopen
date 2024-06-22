import { useState } from 'react'

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
      <h2>Phonebook</h2>
      Name filter: <input value={filter} onChange={handleFilter}/>
      <h3>Add new</h3>
      <form onSubmit={handleSubmit}>
        <div>
          Name: <input value={newName} onChange={handleName} />
        </div>
        <div>
          Number: <input value={newNumber} onChange={{ handleNumber }} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      {filteredPersons.map((p, idx) => (
        <p key={idx}>{p.name} {p.number}</p>
      ))}
    </div>
  )
}

export default App