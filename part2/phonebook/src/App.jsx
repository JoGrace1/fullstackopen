import { useState } from 'react'
import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Person from './components/Person'
import AllPersons from './components/AllPersons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' ,number: '12345678', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setFilter] = useState("")
  const [filteredPersons, setFilteredPersons] = useState([])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        persons = {persons}
        setFilter = {setFilter}
        newFilter = {newFilter}
        filteredPersons = {filteredPersons}
        setFilteredPersons = {setFilteredPersons}
      />
      <PersonsForm 
        newName = {newName} 
        newNumber = {newNumber} 
        setNewName = {setNewName} 
        setNewNumber = {setNewNumber}
        persons = {persons}
        setPersons = {setPersons}
      />
      <AllPersons
        persons= {persons}
      />
      {filteredPersons.length >0 ?  
      <Person 
        filteredPersons = {filteredPersons}
      /> : 
      <></>
      }
     
    </div>
  )
}

export default App
