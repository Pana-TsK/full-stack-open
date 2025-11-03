const Phonebook = ({persons, deleteHandler}) => {
  return(
    <div>
    {persons.map((person) => (
      <PersonLine 
        key = {person.id}
        id = {person.id}
        name = {person.name} 
        number = {person.number}
        deleteHandler = {deleteHandler} />
    ))}
    </div>
  )
  }

const PersonLine = ({id, name, number, deleteHandler}) => {
  return (
  <p>
    {name} {number}
    <DeleteButton id={id} name={name} deleteHandler={deleteHandler}/>
  </p>

  )}

const DeleteButton = ({id, name, deleteHandler}) => {
  return (
    <button onClick={() => deleteHandler(id, name)} type='windowButton'>Delete</button>
  )
}


export default Phonebook