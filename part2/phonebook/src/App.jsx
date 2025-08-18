import { useState, useEffect } from 'react'
import personService from './services/persons'

const Notification = ({ notification }) => {
  if (notification === null) return null

  const baseNotiStyle = {
    background: 'lightgrey',
    borderStyle: 'solid',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '20px',
    marginBottom: '10px'
  }

  const notiStyle = {
    ...baseNotiStyle,
    color: notification.isError ? 'red' : 'green'
  }
  
  return (
    <div style={notiStyle}>
      {notification.message}
    </div>
  )
}

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

const Display = ({ visiblePersons, onDelete }) => {
  return (
    <ul>
      {visiblePersons.map(person => 
        <li key={person.name}>
          {person.name} {person.number} 
          <button onClick={() => onDelete(person.id)}>delete</button>
        </li>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notificationMessage, setNotiMessage] = useState(null)

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(personData => {
        setPersons(personData)
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

  const handleDelete = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Delete ${person.name}`)) {
      personService.deleteId(id)
      .then(() => setPersons(persons.filter(p => p.id !== id)))
      .catch(error => console.log(error))
    }
  }

  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
    if (existingPerson) {
      if (window.confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...existingPerson, number: newNumber}
        personService
          .update(existingPerson.id, updatedPerson)
          .then(personData => {
            setPersons(persons.map(p => p.id !== personData.id ? p : updatedPerson))
            setNotiMessage({ message: `Updated ${personData.name}`, isError: false})
            setTimeout(() => {
              setNotiMessage(null)
            }, 3000)
          })
          .catch(error => {
            setNotiMessage({ message: `Information of ${newName} has already been removed from server`, isError: true})
            setTimeout(() => {
              setNotiMessage(null)
            }, 3000)
          } )
      }
    } else {
      const newPerson = {name : newName, number: newNumber}
      personService
        .create(newPerson)
        .then(personData => {
          setPersons(persons.concat(personData))
          setNotiMessage({ message: `Added ${personData.name}`, isError: false})
          setTimeout(() => {
            setNotiMessage(null)
          }, 3000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notificationMessage} />
      <Filter handler={handleFilterName}/>
      <h3>add a new</h3>
      <Form onSubmit={addPerson} onNameChange={handleNewName} onNumberChange={handleNewNumber}/>
      <h3>Numbers</h3>
      <Display visiblePersons={visiblePersons} onDelete={handleDelete}/>
    </div>
  )
}

export default App