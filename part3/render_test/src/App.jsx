import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/notes'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

            //update message when number is updated
            setMessage(`Updated number for ${response.data.name}`)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
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

        //update message if person is added
        setMessage(`Added ${response.data.name}`)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  const handleDelete = (person) => () => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.remove(person.id).then(response => {
        setPersons(persons.filter(p => p.id !== response.data.id))

        //update message for person deleted
        console.log(response)
        setMessage(`Removed ${response.data.name}`)
          setTimeout(() => {
            setMessage(null)
        }, 3000)
      }).catch(e => {
        setErrorMessage(`Information of ${person.name} has already been removed from the server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error message={errorMessage} />
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>Add new entry</h2>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} handleDelete={handleDelete}/>
    </div>
  )
}

export default App