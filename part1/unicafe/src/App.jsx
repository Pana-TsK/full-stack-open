import { useState } from 'react'

const Button = ({ text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
    }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="all" value={props.all} />
        <StatisticsLine text="average" value={props.average} />
        <StatisticsLine text="positive rate" value={props.positiverate} /> 
      </tbody>
    </table>
  )
}



const App = () => {
  const [clicks, setClicks] = useState({
    good: 0,
    neutral: 0,
    bad: 0
  })
  const [totalClicks, setTotalClicks] = useState(0)
  const [average, setAverage] = useState(0)
  const [positiverate, setPositiveRate] = useState(0)

  const handleGoodClick = () => {
    const newClicks = {
    ...clicks,
    good: clicks.good + 1
    }
    setClicks(newClicks)
    setTotalClicks(totalClicks + 1)
    setAverage(((clicks.good + 1) * 1 + clicks.neutral * 0 + clicks.bad * -1) / (totalClicks + 1))
    setPositiveRate(((clicks.good + 1) / (totalClicks + 1)) * 100)
  }

  const handleNeutralClick = () => {
    const newClicks = {
    ...clicks,
    neutral: clicks.neutral + 1
    }
    setClicks(newClicks)
    setTotalClicks(totalClicks + 1)
    setAverage(((clicks.good) * 1 + (clicks.neutral + 1) * 0 + clicks.bad * -1) / (totalClicks + 1))
    setPositiveRate(((clicks.good) / (totalClicks + 1)) * 100)
  }
  
  const handleBadClick = () => {
    const newClicks = {
    ...clicks,
    bad: clicks.bad + 1
    }
    setClicks(newClicks)
    setTotalClicks(totalClicks + 1)
    setAverage(((clicks.good) * 1 + clicks.neutral * 0 + (clicks.bad + 1) * -1) / (totalClicks + 1))
    setPositiveRate(((clicks.good) / (totalClicks + 1)) * 100)
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />
      <h1>Statistics</h1>
      <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} all={totalClicks} average={average} positiverate={positiverate + " %"} />
    </div>)
}

export default App
