import { useState, useEffect } from 'react'
import axios from 'axios'

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
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fufilled')
        setPersons(response.data)
      })
  }, [])
  
  console.log('render', persons.length, 'persons')

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
      
      const newPerson = {name : newName, number: newNumber}
      axios
        .post('http://localhost:3001/persons', newPerson)
        .then(response => {
          console.log(response.data)
          setPersons(persons.concat(response.data))
        })
      console.log('add button clicked', event.target)
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