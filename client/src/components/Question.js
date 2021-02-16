import React from 'react'
import '../styles/main.css'

const Question = ({ question }) => {
  return (
    <h2 className='contrast'>{question}</h2>
  )
}

export default Question