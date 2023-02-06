const ShowButton = (props) => {  
    return (
      <button onClick={ () => props.setCountry(props.country.name.common)}>show</button>
    )
}

export default ShowButton
  