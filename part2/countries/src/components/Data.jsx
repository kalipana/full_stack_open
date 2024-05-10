const Data = ({ filteredCountries, handleShow }) => {

    if (filteredCountries.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (filteredCountries.length > 1) {
        return (
            <div>
                {filteredCountries.map(country => (
                    <div key={country.name.common}>
                        {country.name.common}
                        <button onClick={handleShow(country)}>show</button>
                    </div>
                ))}
            </div>
        )
    } else if (filteredCountries.length > 0) {
        const country = filteredCountries[0]

        const languageKeys = Object.keys(country.languages)
        return (
            <div>
                <h1>{country.name.common}</h1>
                <b>Capital(s):</b> {country.capital.map(capital => <div key={capital}>{capital}</div>)}
                <br/>
                Area: {country.area}
                <br/><br/>
                <b>Languages:</b>
                <ul>
                    {languageKeys.map(languageKey => {
                        return <li key={languageKey}>{country.languages[languageKey]}</li>
                    })}
                </ul>
                <br/>
                
                <div>
                    <img src={country.flags.png} alt={country.flags.alt} />
                </div>
            </div>
        )
    } else {
        return (
            <div>No matches</div>
        )
    }
}


export default Data