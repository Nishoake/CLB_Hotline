import React from "react"
import '../styles/main.css'
import logo from '../assets/logo.svg'

const Logo = () => {
  return <object type="image/svg+xml" data={logo} className='nish'> Nishoake </object>

  {/* <img src={logo} alt='Nishoake' classname='nish'></img> */}
}

export default Logo