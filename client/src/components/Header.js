import React from 'react'
import '../styles/main.css'

const Header = ({ title }) => {
  return (
    <h1 className='outlineText'><i>{title}</i></h1>
  )
}

export default Header