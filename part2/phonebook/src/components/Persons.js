import Person from './Person'

const Persons = (props) => { 

    console.log("persoonat " , props.persons)
  
    const filteredPersons = props.persons.filter((person) => (JSON.stringify(person.name)).includes(props.filter))
    console.log("filtteröidyt", filteredPersons)
  
    return (
        filteredPersons.map(person => <Person key={person.id} person = {person}  remove={() => props.remove(person) } />) 
    )
}
  
export default Persons