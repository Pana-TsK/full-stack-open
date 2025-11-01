const Phonebook = ({persons}) => {
  return(
    <div>
    {persons.map((person) => (
      <PersonLine key = {person.id} name = {person.name} number = {person.number} />
    ))}
    </div>
  )
  }

const PersonLine = ({id, name, number}) => {
  return (
  <p>{name} {number}</p>
  )}


export default Phonebook