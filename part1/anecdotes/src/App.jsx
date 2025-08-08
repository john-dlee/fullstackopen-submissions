import { useState } from 'react'

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
  const [votes, setVotes] = useState(new Array(8).fill(0))

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <DisplayQuotes anecdotes={anecdotes} selected={selected} />
      <DisplayVotes votes={votes[selected]} />
      <button onClick={() => {
        const copy = [...votes]
        copy[selected] += 1
        setVotes(copy)
      }}>
        vote
      </button>
      <button onClick={() => setSelected(getRandomInt(0, anecdotes.length))}>next anecdote</button>
      <DisplayMostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

const DisplayMostVotes = (props) => {
  let max = 0, maxIndex = 0
  for (let i = 0; i < props.votes.length; i++) {
    if (props.votes[i] > max) {
      max = props.votes[i]
      maxIndex = i
    }
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <DisplayQuotes anecdotes={props.anecdotes} selected={maxIndex} />
      <DisplayVotes votes={max}/>

    </div>
  )
}

const DisplayQuotes = (props) => (
  <div>
    {props.anecdotes[props.selected]}
  </div>
)

const DisplayVotes = (props) => <p>has {props.votes} votes</p>

function getRandomInt(min, max) {
  const minCeiled = Math.ceil(min)
  const maxFloored = Math.floor(max)
  const rand = Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled)
  return rand
}
  
export default App
