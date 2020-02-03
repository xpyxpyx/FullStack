import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total total={course.parts} />
        </div>
    )
}

const Header = (props) => {
    return (
        <h1>
            Course: {props.course}
        </h1>
    )
}

const Part = (props) => {
    return (
        <li>
            Part: {props.name}, exercises: {props.exercises}
        </li>
    )
}

const Content = (props) => {
    return (
        props.parts.map(part =>
            <ul key={part.id}> <Part name={part.name} exercises={part.exercises} />
            </ul>
        )
    )
}

const Total = (props) => {
    const total = props.total.map(item => item.exercises).reduce((s, p) => s + p);
    return (
        <p>

            <b> Total of exercises: {total} </b>
        </p>
    )
}

export default Course