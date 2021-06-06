import React from 'react'
import CForm from './components/CForm'
import {useSpring, animated} from 'react-spring'
import Header from './components/Header'
import SolidHeader from './components/SolidHeader'
import Question from './components/Question'
import Blurb from './components/Blurb'
import Footer from './components/Footer'
import './styles/main.css'

function App() {
  // define spring
  // const propsTop = useSpring({ opacity: 1, from: { opacity: 0 }, config: { mass: 25 } })
  const propsTop = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } })
  const propsMiddle = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } })
  const propsBottom = useSpring({ opacity: 1, from: { opacity: 0 }, config: { duration: 1000 } })
  
  return (
    // <div className="parent">
    //   <CForm className='conversational-form'/>
    // </div>
    <div className='parent'>
      <animated.div style={propsTop} className='logo'>
        <Header title='C.L.B. HOTLINE' />
        <Header title='C.L.B. HOTLINE' />
        <SolidHeader title='C.L.B. HOTLINE' />
        <Header title='C.L.B. HOTLINE' />
        <Header title='C.L.B. HOTLINE' />
      </animated.div>
      <animated.div style={propsMiddle} className="pitch">
        <div className="ms-word-center">
          <Question question="Growing impatient for the release of Drake's Certified Lover Boy?" />
        </div>
        <div className="ms-word-center">
          <Blurb blurb='C.L.B. Hotline is a simple web app built to solve this very problem. The app will send subscribers an SMS text mesage to their phone once the album is available on streaming platforms. Currently only Canadian and U.S. mobile numbers are supported 🇨🇦 & 🇺🇸' />
          {/* <Blurb blurb='If you are still on the fence like Mr. Feeny please check how it all works by cliking here 💡' /> */}
        </div>
        <div className="ms-word-center bottom">
          <Blurb blurb='Feel free to subscribe with the interactive onboarding process below 👇🏾' />
        </div>
        <div className="ms-word-center right">
          <Blurb blurb='Feel free to subscribe with the interactive onboarding process to the right 👉🏾' />
        </div>
      </animated.div>
      <animated.div style={propsBottom} className='nocta'>
          <CForm />
      </animated.div>
      <div className="footer">
        <Blurb blurb='Designed and Built by Nishoake Sribavan 👨🏾‍💻' />
        <div className="footerIcon">
          <Footer icon='fab fa-spotify' label='Spotify' link='https://open.spotify.com/artist/3TVXtAsR1Inumwj472S9r4' />
          <Footer icon='fab fa-github' label='GitHub' link='https://github.com/Nishoake/CLB_Hotline' />
          {/* <Footer icon='fab fa-instagram' label='Instagram' link='' /> */}
        </div>
      </div>
    </div>
  )
}

export default App;
