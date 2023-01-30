import { useState, useEffect } from 'react'
import axios from 'axios'



const Person = ({person}) => {
  return (
    <p>{person.name}  {person.number}</p>
  )
}

const Persons = (props) => { 

  console.log("persoonat " , props.persons)

  const filteredPersons = props.persons.filter((person) => (JSON.stringify(person.name)).includes(props.filter))
  console.log("filtteröidyt", filteredPersons)

  return (
  filteredPersons.map(person => <Person key={person.id} person = {person} />) 
  )
}

const Filter = (props) => {
  return (
    <p>
      filter shown with
      <input
        value={props.newFilter}
        onChange={props.handleNewFilter}
      />
    </p>
  )
}

const PersonForm = (props) => {

  const handleNewName = (event) => { 
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const sameName = () => {
    alert(`${props.name} is already added to phonebook`)
  }


  const submitNewObject = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
      id: props.persons.length +1
    }

    const stringyfiendPersons = props.persons.map(person => JSON.stringify(person.name))   
    const contains = stringyfiendPersons.includes(JSON.stringify(personObject.name))

    contains ? sameName() : props.setPersons(props.persons.concat(personObject)) 
  }
 
  return (
    <form onSubmit={submitNewObject}>
          <div>
            name: 
            <input 
              value={newName}
              onChange={handleNewName}
              />
          </div>
          <div> number: 
            <input
              value =  {newNumber}
              onChange={handleNewNumber}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
      </form>
  )

}

 
const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfillled', response)
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilter={handleNewFilter}/>
      <h2>add a new</h2>
      <PersonForm
        persons={persons}
        setPersons = {setPersons}
        />
      <h3>Numbers</h3>
      <Persons 
        filter={newFilter}
        persons={persons}      
      />
    </div>
  )
}

export default App