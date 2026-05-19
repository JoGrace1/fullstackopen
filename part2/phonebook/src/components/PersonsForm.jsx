  const PersonsForm =({newName, newNumber,setNewName, setNewNumber, persons, setPersons}) => {
  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length +1)
    }
    const exists = persons.some(person => person.name === newPerson.name)
      
    if(!exists) setPersons(persons.concat(newPerson))
    else alert(`${newName} is already added to phonebook`)
    console.log('button clicked', newName, newPerson.id)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange =(event) => {
    setNewNumber(event.target.value)
  }
  return (
    <div>
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
