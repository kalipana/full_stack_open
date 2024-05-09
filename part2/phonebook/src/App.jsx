import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  useEffect(() => {
    personService.getAll().then(response => {
      setPersons(response.data)
    })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    //find if there is the same name in the persons list
    var duplicate = false
    for (var i = 0; i < persons.length; i++) {
      if (newName === persons[i].name) {        //if there is duplicate
        duplicate = true
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)){
          const personObject = {
            name: newName,
            number: newNumber
          }
    
          //change persons number to new number
          personService.update(persons[i].id, personObject).then(response => {
            const newPersons = [...persons]
            newPersons[i].number = response.data.number
            setPersons(newPersons)
            setNewName('')
            setNewNumber('')
            console.log(newPersons)
          })
        }

        break
      }
    }
    if (!duplicate) {
      const personObject = {
        name: newName,
        number: newNumber,
      }

      //add person to database first then change state
      personService.create(personObject).then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  const handleDelete = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(response => {
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>Add new entry</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} handleDelete={handleDelete}/>
    </div>
  )
}

export default App