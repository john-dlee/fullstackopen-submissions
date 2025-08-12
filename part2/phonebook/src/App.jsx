import { useState } from 'react'

const Filter = ({ handler }) => {
  return (
    <div>
      filter shown with <input onChange={handler}/>
    </div>
  )
}

const Form = ({ onSubmit, onNameChange, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        name: <input onChange={onNameChange}/>
      </div>
      <div>
        number: <input onChange={onNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Display = ({ visiblePersons }) => <ul>{visiblePersons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}</ul>

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

  const visiblePersons = persons.filter(person => 
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterName = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const exists = persons.some(person => person.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name : newName, number: newNumber}))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handler={handleFilterName}/>
      <h3>add a new</h3>
      <Form onSubmit={addPerson} onNameChange={handleNewName} onNumberChange={handleNewNumber}/>
      <h3>Numbers</h3>
      <div>debug: {newName} {newNumber}</div>
      <Display visiblePersons={visiblePersons}/>
    </div>
  )
}

export default App