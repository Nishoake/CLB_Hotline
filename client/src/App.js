import React from 'react'
import CForm from './components/CForm'
import Header from './components/Header'
import Subheading from './components/Subheading'
// import Blurb from './components/Blurb'
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
      <div className="hero">
        <Subheading title='A messaging service that will notify you once Certified Lover Boy drops 🏹'/>
        {/* <Subheading title="In the meantime there will be notifications for Playboi Carti' s Whole Lotta Red 💉"/> */}
      </div>
      <div className='nocta'>
        <CForm />
      </div>
      <div className="footer">
        <Subheading title='Designed and Built by Nishoake 👨🏾‍💻🔨' />
      </div>
    </div>
  )
}

export default App;
