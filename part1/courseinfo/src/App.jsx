const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  )
}

const Header = (props) => {
  return (
  <>
    <h1>{props.course}</h1>
  </>
  )
}

const Content = (props) => {
  return (
    <>
    <Part part={props.parts[0].part} exercises={props.parts[0].exercise_count} />
    <Part part={props.parts[1].part} exercises={props.parts[1].exercise_count} />
    <Part part={props.parts[2].part} exercises={props.parts[2].exercise_count} />
    </>
  )
}

const Total = (props) => {
  return (
    <>
    <p>Number of exercises {props.parts[0].exercise_count + props.parts[1].exercise_count + props.parts[2].exercise_count}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {part: 'Fundamentals of React', exercise_count: 10},
    {part: 'Using props to pass data', exercise_count: 7},
    {part: 'State of a component', exercise_count: 14}
  ]

  return (
    <div>
      <Header course = {course}/>
      <Content parts= {parts}/>
      <Total parts = {parts}/>
    </div>
  )
}

export default App