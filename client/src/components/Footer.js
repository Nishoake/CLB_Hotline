import React from 'react'
import '../styles/main.css'

const Footer = ({ icon, link, label }) => {
  return (
    <div className='icon'>
      <a href={link}><i className={icon}></i></a>
      <p>{label}</p>
    </div>
  )
}

export default Footer