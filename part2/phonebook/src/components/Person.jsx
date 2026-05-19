const Person = ({filteredPersons}) => {

    return (
        <div>
            <h3>Filtered People</h3>
            {filteredPersons.map(person => 
                <div key={person.id}>{person.name} {person.number}</div>
            )}
        </div>
    )

}

export default Person