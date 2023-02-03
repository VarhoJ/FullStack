import { useState, useEffect } from 'react'

import peopleService from './services/people'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Filter from './components/Filter'
import Message from './components/Notification'

 
const App = () => {
  const [persons, setPersons] = useState([])
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNewNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    peopleService 
      .getAll()
      .then(initialPeople => {
        console.log(initialPeople)
        setPersons(initialPeople)
      })
  }, [])

  const handleNewFilter = (event) => {
    setNewFilter(event.target.value)
  }

  const addToServer = person => {
    console.log("adding to server ...")
    
    peopleService
      .create(person)
      .then(returnedPerson => {
        console.log("palautettu persoona: " , returnedPerson)
        setPersons(persons.concat(returnedPerson))
    })
    setNewNotification(`Added ${person.name}`)
    setTimeout(() => {
      setNewNotification(null)
    }, 2000)
    
  }


  const updateServer = person => { 
    const confirmation = window.confirm(`${person.name} is already added to phonebook, replace the old number with a new one?`)
    
    // first find the person in db
    const n = persons.find(n => JSON.stringify(n.name) === JSON.stringify(person.name))
    
    console.log("person: ", person)
    console.log("new number ", person.number)
    console.log("n is ", n)


    if(confirmation) {
      peopleService
        .update(n.id,person)
        .then(response => {
          console.log(response)
          setNewNotification(`Updated the number of ${person.name}`)
        })
        .catch(error => setErrorMessage(`Information on ${person.name} has already been removed from server`))

      
      setTimeout(() => {
        setErrorMessage(null)
        setNewNotification(null)
      }, 2000)

      peopleService  // Toistoa
        .getAll()
        .then(initialPeople => {
          console.log(initialPeople)
          setPersons(initialPeople)
        })
    }

    }

  const removeFromServer = person => {
    console.log("remove nappia klikattu ja persoona on ", person)
    const confirmation = window.confirm(`Delete ${person.name} ?`)
    
    if(confirmation) { 
      peopleService
        .remove(person.id)
        .then(response => {
          setNewNotification(`${person.name} succesfully removed`)
        })
        .catch(error => {
          setErrorMessage(`Information of  ${person.name} has already been removed from server`)
        })

      peopleService  // Toistoa
        .getAll()
        .then(initialPeople => {
          console.log("Nyt päivitetään henkilöt")
          setPersons(initialPeople)
          setTimeout(() => {
            setErrorMessage(null)
            setNewNotification(null)
        }, 2000)
        })

        


    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Message.Error message={errorMessage} />
      <Message.Notification message={notification} />

      <Filter 
        newFilter={newFilter}
        handleNewFilter={handleNewFilter}
      />

      <h2>add a new</h2>

      <PersonForm
        persons={persons}
        add = {addToServer}
        update = {updateServer}
      />

      <h3>Numbers</h3>
      <Persons 
        filter={newFilter}
        persons={persons}     
        remove = {removeFromServer} 
      />
    </div>
  )
}

export default App