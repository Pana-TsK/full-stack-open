import { useState } from 'react'

const Button = ({text, action}) => {
  return (<button onClick={() => action()}>{text}</button>)
}

const MostVoted = ({text, votes}) => {

}

const InfoBlock = ({text, votes}) => {
  return(
    <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
    </div>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const randomIndex = ({length}) => {
    const rand = Math.floor(Math.random() * length)
    console.log("random number:" + rand)
    return rand
  }

  const newVotes = ({index}) => {
    const newVoteArray = [...votes]
    newVoteArray[index] += 1

    setVotes(newVoteArray)
  }

  const highestRatedIndex = ({arr}) => {
    let maxIndex = 0
    for (let i =0 ; i < arr.length ; i++) {
      if (arr[i] > arr[maxIndex]){
        maxIndex = i
      }
    }
    return maxIndex
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <InfoBlock text = {anecdotes[selected]} votes = {votes[selected]} />
      <Button text="next anecdote" action={() => setSelected(randomIndex({length: anecdotes.length}))} />
      <Button text="vote" action = {() => newVotes({index: selected})} />
      <h1>Anecdote with most votes</h1>
      <InfoBlock text = {anecdotes[highestRatedIndex({arr: votes})]} votes = {votes[highestRatedIndex({arr: votes})]} />
    </div>
  )
}

export default App



