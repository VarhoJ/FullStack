import ShowWeather from "./ShowWeather";

const CountryInformation = (props) => {
    const country = props.list[0]
    console.log(country)
    let languages = []

    for (let key in country.languages) {languages = languages.concat(country.languages[key])}
    return (
        <div> 
        <h2> {country.name.official} </h2>
        <p>
            capital {country.capital}
        </p>  
        <p>
            area {country.area}
        </p>
        <b> languages: </b>
        <ul>
            {languages.map ((item, key) => (
            <li key={key}>{item}</li>
            ))
            }
        </ul>
        <img 
            src={country.flags.png} 
            alt=""
        />
        <ShowWeather country={country} />
        </div>
    )
}

export default CountryInformation