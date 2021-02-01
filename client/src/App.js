import React from 'react'
import CForm from './components/CForm'
import Header from './components/Header'
import SolidHeader from './components/SolidHeader'
import Question from './components/Question'
import Blurb from './components/Blurb'
// import FooterBlurb from './components/FooterBlurb'
import Footer from './components/Footer'
// import Logo from './components/Logo'
import './styles/main.css'

function App() {
  return (
    // <div className="parent">
    //   <CForm className='conversational-form'/>
    // </div>
    <div className='parent'>
      <div className='logo'>
        <Header title='C.L.B. HOTLINE' />
        <Header title='C.L.B. HOTLINE' />
        <SolidHeader title='C.L.B. HOTLINE' />
        <Header title='C.L.B. HOTLINE' />
        <Header title='C.L.B. HOTLINE' />
      </div>
      <div className="pitch">
        <div className="ms-word-center">
          <Question question="Growing impatient for the release of Drake's Certified Lover Boy?" />
        </div>
        <div className="ms-word-center">
          <Blurb blurb='C.L.B. Hotline is a simple web app built to solve this very problem. The app will send subscribers an SMS text mesage to their phone once the album is available on streaming platforms. Currently only Canadian and U.S. mobile numbers are supported 🇨🇦 & 🇺🇸' />
          {/* <Blurb blurb='If you are still on the fence like Mr. Feeny please check how it all works by cliking here 💡' /> */}
          {/* <Blurb blurb='Feel free to subscribe with the interactive onboarding procees below 👇🏾' /> */}
        </div>
        <div className="ms-word-center">
          <Blurb blurb='Feel free to subscribe with the interactive onboarding procees below 👇🏾' />
        </div>
         </div>
      <div className='nocta'>
          <CForm />
      </div>
      <div className="footer">
        <Blurb blurb='Designed and Built by Nishoake 👨🏾‍💻' />
        <div className="footerIcon">
          <Footer icon='fab fa-spotify' label='Spotify' link='https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4' />
          <Footer icon='fab fa-github' label='GitHub' link='https://github.com/Nishoake/CLB_Hotline' />
          <Footer icon='fab fa-linkedin-in' label='LinkedIn' link='https://www.linkedin.com/in/nishoake-sribavan-421240139/' />
        </div>
      </div>
    </div>
  )
}

export default App;
