import { useState } from 'react'

const Button = ({ handleFunction, text }) => (
  <button onClick={handleFunction}>{text}</button>
)

const Display = ({ text, count }) => (
  <div>{text} {count}</div>
)

const Statistics = (props) => {
  if (props.total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <Display text='good' count={props.good}/>
      <Display text='neutral' count={props.neutral}/>
      <Display text='bad' count={props.bad}/>
      <Display text='all' count={props.total}/>
      <Display text='average' count={props.avg}/>
      <Display text='positive' count={props.positive}/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = good + neutral + bad
  const positive = good / (good + bad + neutral) * 100
  const avg = (good - bad) / total
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleFunction={() => {setGood(good + 1)}} text='good'/>
      <Button handleFunction={() => {setNeutral(neutral + 1)}} text='neutral'/>
      <Button handleFunction={() => {setBad(bad + 1)}} text='bad'/>
      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        avg={avg}
        positive={positive}
      />
    </div>
  )
}

export default App