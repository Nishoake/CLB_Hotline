import React from 'react'
import '../styles/main.css'

const Footer = ({ icon, link, label }) => {
  return (
    <div className='icon'>
      <i class={icon}><a href={link}></a></i>
      <p>{label}</p>
    </div>
  )
}

export default Footer