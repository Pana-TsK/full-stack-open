import { useState } from 'react'
import Filter from './components/filter'
import Form from './components/form'
import Phonebook from './components/phonebook'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [matchString, setMatchString] = useState('')

  // Handle the filtering of the data, in case there the filter is being applied
  const personsToShow = matchString == "" ? persons : persons.filter(person => person.name.includes(matchString))

  // Handle the adding the person to the phonebook

  const addPerson = (event) => {
    event.preventDefault()
    
    // Specify the data of the person to be added

    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
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

    setPersons(persons.concat(personObject))
    
    setNewName('')
    setNewNumber('')
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
      <Phonebook persons = {personsToShow} />
    
    </div>
  )
}

export default App