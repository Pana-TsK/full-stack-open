const Filter = ({matchString, handleStringMatching}) => {
  return (
    <div>Filter shown with <input value = {matchString} onChange = {handleStringMatching}/></div>
  )
}
export default Filter