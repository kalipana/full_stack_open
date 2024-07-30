const Persons = ({ persons, newSearch, handleDelete }) => {
    const filteredPersons = persons.filter(person => person.name.slice(0, newSearch.length).toLowerCase() === newSearch.toLowerCase())
    return (
        <div>
            {filteredPersons.map(person => (
                <div key={person.id}>
                    {person.name} {person.number}
                    <button onClick={handleDelete(person)}>delete</button>
                </div>
            ))}
        </div>
    )
}


export default Persons