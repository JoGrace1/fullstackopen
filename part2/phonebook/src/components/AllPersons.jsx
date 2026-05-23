const AllPersons =({persons, toggleDeletePerson}) => {
    return (
        <>
        <h2>Numbers</h2>
            {persons.map(person => 
                <div key={person.id}>
                    <div >{person.name} {person.number}</div>
                    <button onClick={() => toggleDeletePerson(person.id)}>Delete</button>
                </div>
            )}
        </>
    )
}
export default AllPersons