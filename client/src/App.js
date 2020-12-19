import React from 'react'
import CForm from './components/CForm'
import Header from './components/Header'
import Subheading from './components/Subheading'
import Blurb from './components/Blurb'
import './styles/main.css'

function App() {
  return (
    // <div className="parent">
    //   <CForm className='conversational-form'/>
    // </div>
    <div className='parent'>
      <div className='title'>
        <Header title='C.L.B. HOTLINE' />
      </div>
      <div className='hero'>
        <Subheading title='+1 647-372-5371' />
        <Blurb blurb='A messaging service that will notify you once CLB drops 🏹'
        />
      </div>
      <div className="icon">
        <Header title='C.L.B. HOTLINE' />
      </div>
    </div>
  )
}

export default App;
