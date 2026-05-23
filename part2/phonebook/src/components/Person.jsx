const Person = ({filteredPersons, toggleDeletePerson}) => {

    return (
        <div>
            <h3>Filtered People</h3>
            {filteredPersons.map(person => 
                <div key={person.id}>
                <div >{person.name} {person.number}</div>
                    <button onClick={() => toggleDeletePerson(person.id)}>Delete</button>
                </div>
            )}
        </div>
    )
}

export default Person