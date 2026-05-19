const AllPersons =({persons}) => {
    return (
        <>
        <h2>Numbers</h2>
            {persons.map(person => 
                <div key={person.id}>{person.name} {person.number}</div>
            )}
        </>
    )
}
export default AllPersons