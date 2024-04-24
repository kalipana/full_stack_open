import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistics = (props) => (
  <div>
    <h1>statistics</h1>
    <p>good {props.good}</p>
    <p>neutral {props.neutral}</p>
    <p>bad {props.bad}</p>
    <p>all {props.count}</p>
    <p>average {props.sum / props.count}</p>
    <p>positive {(props.good/props.count)*100}%</p>
  </div>
)

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
