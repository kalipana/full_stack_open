import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
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
  if (props.count == 0) {
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
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.count} />
        <StatisticLine text="average" value={props.sum / props.count} />
        <StatisticLine text="positive" value={(props.good / props.count) * 100 + '%'} />
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [sum, setSum] = useState(0)
  const [count, setCount] = useState(0)

  const handler = (rating) => () => {
    if (rating == 1) {
      setGood(good + 1)
    } else if (rating == 0) {
      setNeutral(neutral + 1)
    } else {
      setBad(bad + 1)
    }
    setSum(sum + rating)
    setCount(count + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handler(1)} text={'good'} />
      <Button handleClick={handler(0)} text={'neutral'} />
      <Button handleClick={handler(-1)} text={'bad'} />
      <Statistics good={good} neutral={neutral} bad={bad} sum={sum} count={count} />
    </div>
  )
}

export default App
