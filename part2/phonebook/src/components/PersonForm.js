import { useState } from "react"


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
  
    const sameName = person => {
        props.update(person)
    }

  
    const submitNewObject = (event) => {
      event.preventDefault()
  
      const personObject = {
        "name": newName,
        "number": newNumber
      }
  
      const stringyfiendPersons = props.persons.map(person => JSON.stringify(person.name))   
      const contains = stringyfiendPersons.includes(JSON.stringify(personObject.name))
  
      console.log("still in PersonForm -file, trying now to add person: ", personObject)
      contains ? sameName(personObject) : props.add(personObject) 
      setNewName('')
      setNewNumber('')

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

export default PersonForm