  import personsService from '../services/personsService'
  import Notification from './Notification'
  import {useState} from 'react'

  const PersonsForm =({newName, newNumber,setNewName, setNewNumber, persons, setPersons}) => {
      const [notification, setNotification] = useState('')
    
    const addPerson = (event) => {
      event.preventDefault()
      const newPerson = {
        name: newName,
        number: newNumber,
        id: String(persons.length +1),
        importance: true
      }
    const exists = persons.some(person => person.name === newPerson.name)
      
    if(!exists) {
      console.log("person exists", exists)
      setPersons(persons.concat(newPerson))
      setNotification(`Added  ${newPerson.name}`)
      setTimeout(() => {
          setNotification(null)
        }, 5000)
    }
    else alert(`${newName} is already added to phonebook`)
    console.log('button clicked', newName, newPerson.id)
   personsService.create(newPerson)
    .then(response => {
      console.log("New Person added to db", response)
    })
    .catch(error => {
      console.error("Error adding person:", error)
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange =(event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
        <Notification message={notification} />    
        <h2>
          Add a new
        </h2>
          <form onSubmit = {addPerson}>
            <div>
            name: 
            <input value = {newName} onChange = {handleNameChange}/>
            </div>
            <div>
            number:
            <input value = {newNumber} onChange = {handleNumberChange}/>
            </div>
            <button type="submit">add</button>
          </form>
    </div>
  )
}

export default PersonsForm
