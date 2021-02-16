import React from 'react'
import '../styles/main.css'

const Question = ({ question }) => {
  return (
    <h2 className='contrast'><i>{question}</i></h2>
  )
}

export default Question