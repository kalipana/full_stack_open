const Persons = ({ persons, newSearch }) => {
    const filteredPersons = persons.filter(person => person.name.slice(0, newSearch.length).toLowerCase() === newSearch.toLowerCase())
    return (
        <ul>
            {filteredPersons.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
        </ul>
    )
}


export default Persons