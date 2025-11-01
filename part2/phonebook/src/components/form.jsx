const Form = ({ addPerson, newName, handleNameAdded, newNumber, handleNumberAdded }) => {
  return(
  <form onSubmit={addPerson}>
    <div>name: <input value = {newName} onChange = {handleNameAdded} /></div>
    <div>number: <input value = {newNumber} onChange = {handleNumberAdded}/></div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default Form