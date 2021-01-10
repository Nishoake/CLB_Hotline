import React from 'react'
import CForm from './components/CForm'
import Header from './components/Header'
import Question from './components/Question'
import Blurb from './components/Blurb'
// import Blurb from './components/Blurb'
import './styles/main.css'

function App() {
  return (
    // <div className="parent">
    //   <CForm className='conversational-form'/>
    // </div>
    <div className='parent'>
      <div className='logo'>
        <Header title='C.L.B. HOTLINE' />
      </div>
      <div className="pitch">
        <Question question="Growing impatient for the release of Drake's Certified Lover Boy?"/>
        <Blurb blurb='C.L.B. Hotline is an app built to solve this very problem. The app will send subscribers a SMS text to their mobile number once the album is available on streaming platforms. Currently only Canadian and U.S. mobile numbers are supported 🇨🇦 ➕ 🇺🇸' />
        <Blurb blurb='If you are still on the fence like Mr. Feeny please check how it all works by cliking here.' />
        <Blurb blurb='Otherwise feel free to subscribe with the interactice onboarding procees below 👇🏾' />
        {/* <Subheading title="In the meantime there will be notifications for Playboi Carti' s Whole Lotta Red 💉"/> */}
      </div>
      <div className='nocta'>
        <CForm />
      </div>
      <div className="footer">
        <Blurb blurb='Designed and Built by Nishoake 👨🏾‍💻' />
      </div>
    </div>
  )
}

export default App;
