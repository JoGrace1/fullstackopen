import {useState} from 'react'

const Header = (props) => {
  return (<h1>{props.text}</h1>)
}
const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
const Statistics = (props) => {
  const avg = (props.good - props.bad) / (props.good + props.neutral + props.bad)
  const positive = (props.good / (props.good + props.neutral + props.bad)) * 100
  const all = props.good + props.neutral + props.bad
  if(all === 0) {
    return (<div>No feedback given</div>)
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.good} />
        <StatisticLine text='neutral' value={props.neutral} />
        <StatisticLine text='bad' value={props.bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={Math.round(avg * 100) / 100} />
        <StatisticLine text='positive' value={Math.round(positive * 100) / 100} />
      </tbody>
    </table>

  )
}
const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Anecdote = ({selected, setSelected}) => {
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
  const [votes, setVotes] = useState(new Map(anecdotes.map(a => [a, 0])))
  const handleNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
  }
  const handleVote = () => {
    const currentAnecdote = anecdotes[selected]
    const newVotes = new Map(votes)
    const currentCount = newVotes.get(currentAnecdote)
    newVotes.set(currentAnecdote, currentCount + 1)

    setVotes(newVotes)
  }
  const maxVotes = Math.max(...votes.values())
  const mostVoted = [...votes.entries()].find(([_, v]) => v === maxVotes)
  return (
  <div>
    <h2>Anecdote of the day</h2>
    <div>{anecdotes[selected]}</div>
    <div>has votes {votes.get(anecdotes[selected])}</div>
    <Button handleClick={handleVote} text='vote' />
    <Button handleClick={handleNext} text='next Anecdote' />
    <h2>Anecdote with most votes</h2>
    <div>{mostVoted[0]}</div>
    <div>has votes {maxVotes}</div>
  </div>
   )
}

const App = () => {

  const [selected, setSelected] = useState(0)
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='Unicafe' />
      <Button handleClick={() => setGood(good + 1)} text='good' />
      <Button handleClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button handleClick={() => setBad(bad + 1)} text='bad' />
      <div>Statistics </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <Anecdote selected={selected} setSelected={setSelected}>
        
      </Anecdote>
    </div>
  )
}

export default App
