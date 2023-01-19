import { useState } from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <div> 
      <h1>
        {props.text}
      </h1>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const StatisticsLine = (props) => {
  return (
    <tr> 
      <td> {props.text} </td>
      <td>{props.value}</td>
    </tr>
  )
}
const Statistics = (props) => {
  const all = props.good +props.bad +props.neutral
  console.log(props)
  if (all === 0) {
    return (
      <div> 
        <p>
          No feedback given
        </p>
      </div>
    )
  }
  return (
    <table> 
      <tbody> 
        <StatisticsLine text="good" value={props.good} />
        <StatisticsLine text="neutral" value={props.neutral} />
        <StatisticsLine text="bad" value={props.bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={(props.good-props.bad)/all} />
        <StatisticsLine text="positive" value = {props.good/all *100 + "%"} />
      </tbody>
    </table>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text="give feedback"/>
      <Button onClick={() => setGood(good + 1)} text="good" /> 
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" /> 
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Header text="statistics" />
      
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>

  )
}

export default App