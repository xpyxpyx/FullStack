import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return (
        <div>
            <p>
                Course: {props.course}
            </p>
        </div>
    )
}

const Part = (props) => {
    return (
        <div>
            <p>
                Part: {props.name}, exercises: {props.exercises}
            </p>
        </div>
    )
}

const Content = (props) => {
    return (
        <div>
            <Part name={props.parts[0].name} exercises={props.parts[0].exercises} />
            <Part name={props.parts[1].name} exercises={props.parts[1].exercises} />
            <Part name={props.parts[2].name} exercises ={props.parts[2].exercises} />
        </div>
    )

}

const Total = (props) => {
    return (
        <div>
            <p>
                Number of exercises: {props.total}
            </p>
        </div>
    )
}


const App = () => {
    const course = {
        name: 'Half Stack application development',
        parts: [
            {
                name: 'Fundamentals of React',
                exercises: 10
            },
            {
                name: 'Using props to pass data',
                exercises: 7
            },
            {
                name: 'State of a component',
                exercises: 14
            }
        ]
    }

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))