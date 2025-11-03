import { useState, useEffect } from 'react'

import Filter from './components/filter'
import Form from './components/form'
import Phonebook from './components/phonebook'
import phoneService from './services/phone_numbers'

const App = (props) => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [matchString, setMatchString] = useState('')

  // handle the fetching of data from the server
  useEffect(() => {
    console.log("useEffect is being called")
    phoneService
    .getAll()
    .then(response => {
        console.log("promise fulfilled")
        setPersons(response)
        console.log("reponse has been gathered:", response)
      })
  }, [])

  // Handle the filtering of the data, in case there the filter is being applied
  const personsToShow = matchString == "" ? persons : persons.filter(person => person.name.includes(matchString))

  // Handle adding the person to the phonebook
  const addPerson = (event) => {
    event.preventDefault()
    
    // Specify the data of the person to be added
    const personObject = {
      name: newName,
      number: newNumber,
    }

    // Check if the name is already in the list.
    const nameExists = (
      persons.some(person => person.name === newName)
    )
    if (nameExists){
      alert(`${newName} is already added to phonebook`)
      return
    }
    // Add the value to the persons array, which is also portrayed,
    // and reset the values of the hooks.
  
    
    // add this new person also to the server
    phoneService
      .create(personObject)
      .then(returnedNote => {        
        setPersons(persons.concat(returnedNote))
        console.log("called setPersons setter succesfully")
        setNewName('')
        setNewNumber('')
      })
  }

  // Handle deleting the person from the phonebook
  const deletePerson = (id, name) => {
    console.log("delete button has been pressed for person", id, name)

    if (window.confirm(`delete ${name}?`) ) {

      // call the setPersons to remove the id correctly
      phoneService
        .remove(id)
        .then(() => {
          setPersons(currentPersons => 
          currentPersons.filter(person => person.id !== id)
        )
        console.log("deleted person with id", id)
      })
    }
  }

  // Handle the event of writing more text
  const handleNameAdded = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberAdded = (event) => {
    setNewNumber(event.target.value)
  }
  // Handle the event of writing matched text
  const handleStringMatching = (event) => {
    setMatchString(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter matchString={matchString}
              handleStringMatching = {handleStringMatching}
              />

      <h2>Add a new person</h2>
      <Form addPerson={addPerson}
            newName={newName}
            handleNameAdded={handleNameAdded}
            newNumber={newNumber}
            handleNumberAdded={handleNumberAdded}
            />

      <h2>Numbers</h2>
      <Phonebook 
        persons={personsToShow}
        deleteHandler={deletePerson} />
    
    </div>
  )
}

export default App