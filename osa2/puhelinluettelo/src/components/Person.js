import React from 'react'

const Person = ({ person, toggleDelete }) => {
  return (
    <li>
      Name: {person.name}, number: {person.number} <button onClick={toggleDelete}>delete</button>
    </li>
  )
}

export default Person