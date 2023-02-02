

const Person = ({person, remove}) => {
    return (
        <p>
            {person.name}  {person.number}
            <button onClick={remove}>Delete</button>
        </p>

    )
}
  
export default Person