import ReactDOM from 'react-dom';
import React, { useState } from 'react'

const History = (props) => {
    if (props.allClicks.length === 0) {
        return (
            <div>
                No feedback given
        </div>
        )
    }

    return (
        <div>
            Feedback given
        </div>
    )
}

const StatisticLine = (props) => {
    return (
        <tr>
            <td>{props.text} </td>
            <td> {props.value} </td>
        </tr>
    )
}

const Statistics = (props) => {
    return (
        <table>
            <tbody>
                <StatisticLine text="good" value={props.neutral} />
                <StatisticLine text="neutral" value={props.neutral} />
                <StatisticLine text="bad" value={props.bad} />
                <StatisticLine text="all" value={props.all} />
                <StatisticLine text="average" value={props.value / props.all} />
                <StatisticLine text="positive" value={((props.good / props.all)*100) + " %"} />
            </tbody>
        </table >
    )
}

const Button = ({ onClick, text }) => (
    <button onClick={onClick}>
        {text}
    </button>
)


const App = () => {
    const [clicks, setClicks] = useState({
        good: 0, bad: 0, neutral: 0, pos: 0, value: 0, all: 0
    })

    const [allClicks, setAll] = useState([])


    const handleGoodClick = () => {
        setClicks({ ...clicks, good: clicks.good + 1, all: clicks.all + 1, value: clicks.value + 1, pos: clicks.pos + 1 })
        setAll(allClicks.concat('G'))
    }

    const handleNeutralClick = () => {
        setClicks({ ...clicks, neutral: clicks.neutral + 1, all: clicks.all + 1 })
        setAll(allClicks.concat('N'))
    }

    const handleBadClick = () => {
        setClicks({ ...clicks, bad: clicks.bad + 1, all: clicks.all + 1, value: clicks.value - 1 })
        setAll(allClicks.concat('B'))
    }

    return (
        <div>
            <h1> give feedback</h1>
            <Button onClick={handleGoodClick} text='good' />
            <Button onClick={handleNeutralClick} text='neutral' />
            <Button onClick={handleBadClick} text='bad' />

            <History allClicks={allClicks} />
            <h1>statistics</h1>
            <Statistics neutral={clicks.neutral} good={clicks.good} bad={clicks.bad} all={clicks.all} pos={clicks.pos} value={clicks.value} />
        </div >

    )
}

ReactDOM.render(<App />, document.getElementById('root'));