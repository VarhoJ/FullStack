import CountryInformation from "./CountryInformation"
import ShowButton from "./ShowButton";


const ShowList = (props) => {
    const list = props.list
    const length = list.length 
  
    if (length === 0) {
      return (
        <p> No countries with this name</p>
      )
    }
    else if(length === 1) {
      return (
        <CountryInformation list={list} />
      )
    }
    else if(length <= 10) {
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

export default ShowList