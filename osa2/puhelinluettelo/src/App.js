import React, { useState, useEffect } from 'react'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import personService from './services/persons'
import ErrorNotification from './components/ErrorNotification'
import SuccessNotification from './components/SuccessNotification'

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newName, setNewName] = useState('a new person...')
  const [newNumber, setNewNumber] = useState('a new number...')
  const [filterName, setFilterName] = useState('a new filter...')
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)


  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const person = persons.find(p => p.name === newName)
    if (person !== undefined) {
      window.alert(`${person.name} is already added to phonebook, replace the old number with a new one?`)
      const changedPerson = { ...person, number: newNumber }
      personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
          setSuccessMessage(`Updated ${returnedPerson.name} in the phonebook`)
          setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
          setNewNumber('')
          setNewName('')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    } else {
      const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personService
        .create(personObject)
        .then(returnedPerson => {
          setSuccessMessage(`Added ${returnedPerson.name} to the phonebook`)
          setPersons(persons.concat(returnedPerson))
          setNewNumber('')
          setNewName('')
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
        })
    }
  }

  const removePerson = (Rperson) => {
    window.confirm(`Delete ${Rperson.name}?`)
    personService
      .remove(Rperson.id)
      .then(_responseData => {
        setSuccessMessage(`Removed a contact from the phonebook`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
      .catch(error => {
        setErrorMessage(
          `Contact '${Rperson.name}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const showPersons =
    showAll
      ? props.persons
      : props.persons.filter(person => person.name.includes(filterName))

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterName(event.target.value)
  }


  return (
    <div>
      <h1>Phonebook</h1>

      <h2> Filter shown contacts with a name </h2>

      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />

      <FilterForm handleFilterChange={handleFilterChange} filterName={filterName} showAll={showAll} setShowAll={setShowAll} />

      <h2>Add a new contact</h2>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} handleNumberChange={handleNumberChange} newNumber={newNumber} />

      <h2>Contacts</h2>

      <ul>
        {showPersons.map((person, id) =>
          <Person
            key={id}
            person={person}
            toggleDelete={() => removePerson(person)} />)}
      </ul>
    </div>
  )
}

export default App