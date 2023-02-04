import { useEffect, useState } from "react";
import axios from 'axios'


const CountryInformation = (props) => {
  const country = props.list[0]

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
    </div>
  )
}

const ShowButton = (props) => {

  return (
    <button onClick={ () => props.setCountry(props.country.name.common)}>show</button>
  )
}


const ShowList = (props) => {
  const list = props.list
  const length = list.length 
  console.log("rendering list again")

  if (length === 0) {
    return (
      <p> No countries with this name</p>
    )
  }
  else if(length === 1) {
    console.log("vain yksi")
    return (
      <CountryInformation list={list} />
    )
  }
  else if(length <= 10) {
    console.log("alle kymmenen")

    return (
      list.map(country =>
          <p 
          key={country.name.official}> {country.name.common} 
          <ShowButton country={country} setCountry={props.setCountry} />
          </p>

          )
    )
  }
  else {
    return (
      <p> Too many matches, specify another filter </p>
    )
  }
} 

function App() {
  const baseurl = "https://restcountries.com/v3.1/all"

  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
    console.log("filter text changed to ", country)
  }

  useEffect(() => {
    console.log('fetching country data once')

    axios
      .get(baseurl)
      .then(response => { 
        setCountries(response.data)
      })
      .catch(error => console.log("something wrong with get"))

  }, [])


  // const filterCountries = () => {
  //   console.log("filter text is : ", country)
  //   // const officialNames = countries.map(n => n.name.official)
  //   const filter = countries.filter((n) => (JSON.stringify((n.name.common).toLowerCase())).includes(country.toLowerCase()))

  //   setFiltered(filter)
  // }

  
  useEffect(() => {
    console.log("Text has been changed to", country," filtering now")
    const filter = countries.filter((n) => (JSON.stringify((n.name.common).toLowerCase())).includes(country.toLowerCase()))
    setFiltered(filter)
  }, [country, countries])



  return (
    <div>
      find countries
      <input value={country} onChange={handleNameChange} />
      <ShowList list={filtered} setCountry={setCountry} />
    </div> 
  )
}

export default App
