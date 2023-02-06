import { useEffect, useState } from "react";
import axios from 'axios'
import ShowList from './Components/ShowList'



function App() {
  const baseurl = "https://restcountries.com/v3.1/all"

  const [country, setCountry] = useState('')
  const [countries, setCountries] = useState([])
  const [filtered, setFiltered] = useState('')

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setCountry(event.target.value)
  }

  useEffect(() => {

    axios
      .get(baseurl)
      .then(response => { 
        setCountries(response.data)
      })
      .catch(error => console.log("something wrong with get"))

  }, [])


  
  useEffect(() => {
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
