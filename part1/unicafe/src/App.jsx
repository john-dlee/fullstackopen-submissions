import { useState } from 'react'

const Button = ({ handleFunction, text }) => (
  <button onClick={handleFunction}>{text}</button>
)

const StatisticLine = (props) => (
  <tbody>
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  </tbody>
  
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
      <table>
        <StatisticLine text='good' value={props.good}/>
        <StatisticLine text='neutral' value={props.neutral}/>
        <StatisticLine text='bad' value={props.bad}/>
        <StatisticLine text='all' value={props.total}/>
        <StatisticLine text='average' value={props.avg}/>
        <StatisticLine text='positive' value={props.positive + '%'}/>
      </table>
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