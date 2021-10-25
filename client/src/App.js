import React from 'react'
import {useSpring, animated} from 'react-spring'

import CForm from './components/CForm'
import Header from './components/Header'
import SolidHeader from './components/SolidHeader'
import Question from './components/Question'
import Blurb from './components/Blurb'
import Footer from './components/Footer'

import './styles/main.css'

function App() {
  // Define springs for animation
  const propsTop = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 500 } })
  const propsBottom = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } })
  
  // Render Components
  return (
    <div className='parent'>

      {/* Div for the header */}
      <animated.div style={propsTop} className='logo'>
        <Header title='C.L.B. HOTLINE' />
        <Header title='C.L.B. HOTLINE' />
        <SolidHeader title='C.L.B. HOTLINE' />
        <Header title='C.L.B. HOTLINE' />
        <Header title='C.L.B. HOTLINE' />
      </animated.div>

      {/* Div for the Text portion of the App */}
      <animated.div style={propsTop} className="pitch">
        <div className="ms-word-center">
          <Question question="Growing impatient for the release of your favourite artist's next album?" />
        </div>
        <div className="ms-word-center">
          <Blurb blurb='Look no further, C.L.B. Hotline is a web app built to solve this very problem. The app will send subscribers an SMS text mesage to their phone once highly anticipated albums are available on streaming platforms. Currently only Canadian and U.S. mobile numbers are supported 🇨🇦 & 🇺🇸' />
        </div>
        <div className="ms-word-center bottom">
          <Blurb blurb='Feel free to subscribe with the interactive onboarding process below 👇🏾' />
        </div>
        <div className="ms-word-center right">
          <Blurb blurb='Feel free to subscribe with the interactive onboarding process to the right 👉🏾' />
        </div>
      </animated.div>

      {/* Div for the form input */}
      <animated.div style={propsBottom} className='form'>
          <CForm />
      </animated.div>

      {/* Div for the footer */}
      <div className="footer">
        <Blurb blurb='Designed and Built by Nish 👨🏾‍💻' />
        <div className="footerIcon">
          <Footer icon='fab fa-spotify' label='Spotify' link='https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4' />
          <Footer icon='fab fa-itunes-note' label='Apple Music' link='https://music.apple.com/us/artist/drake/271256' />
        </div>
      </div>

    </div>
  )
}

export default App;
