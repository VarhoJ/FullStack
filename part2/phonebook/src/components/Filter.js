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

export default Filter