const Filter = ({persons, setFilter, newFilter, filteredPersons, setFilteredPersons}) => {

    const searchFilter =(event)=> {
        event.preventDefault()
        setFilteredPersons(persons.filter(person => 
            person.name.toLowerCase().includes(newFilter.toLowerCase())
        ))
        console.log("Filtered Person: ", filteredPersons)
    }
    const handleFilter =(event) => {
        setFilter(event.target.value)
    }
    return (
        <form onSubmit={searchFilter}>
            filter shown with
            <input value = {newFilter} onChange = {handleFilter}/>
        </form>
    )
}

export default Filter