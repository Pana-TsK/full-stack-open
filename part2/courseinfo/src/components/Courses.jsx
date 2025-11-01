const Part = ({name, exercises}) => {
  return(
  <p>
    {name} {exercises}
  </p>)
 }

const Total = ({exercises}) => {
  return(
  <p>Number of exercises {exercises}</p>
  )}

const Header = ({name}) => {
  console.log("Header component is correctly called", name)
  return (
  <h2>{name}</h2>
  )}

const Content = ({parts}) => {
  const sum = parts.reduce((sum, parts) => sum + parts.exercises, 0)
  console.log("actual sum of exercises", sum)
  
  return (
  <div>
    {parts.map(part => <Part key = {part.id} name = {part.name} exercises = {part.exercises} />)}
    <Total exercises = {sum} />
  </div>
  )}

const Course = ({course}) => {
  console.log("Course component is correctly loaded")
  return(
  <div>
  <Header name = {course.name} />
  <Content parts = {course.parts} />
  </div>
  )}

export default Course