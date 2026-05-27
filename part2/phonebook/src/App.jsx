import Filter from './components/Filter'
import PersonsForm from './components/PersonsForm'
import Person from './components/Person'
import AllPersons from './components/AllPersons'
import { useState, useEffect } from 'react'
import personsService from './services/personsService'

const App = () => {

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [newFilter, setFilter] = useState("")
  const [notes, setNotes] = useState([])
  const [filteredPersons, setFilteredPersons] = useState([])
  const [persons, setPersons] = useState([])

  const toggleDeletePerson = (id) => {
      console.log('importance of ' + id + ' needs to be toggled')
      const person = persons.find(p => p.id === id)
      console.log("Person ID", person)
      //personsService.remove(id).then(()=>{setPersons(persons.filter(person => person.id !== id))})
  }

  useEffect(() => {
    console.log('effect')
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
      console.log("intitial Persons", initialPersons)
    })

  }, [])
  console.log('render', persons.length, 'notes')
  console.log('response: ', persons)

  return (
    <div>
      <h1>Phonebook</h1>
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
        toggleDeletePerson = {toggleDeletePerson}
      />
      {filteredPersons.length >0 ?  
      <Person 
        filteredPersons = {filteredPersons}
        toggleDeletePerson = {toggleDeletePerson}
      /> : 
      <></>
      }
     
    </div>
  )
}

export default App
