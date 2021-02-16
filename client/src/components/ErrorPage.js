import React from 'react'
import Header from './components/Header'
// import SolidHeader from './components/SolidHeader'
import Question from './components/Question'
import './styles/main.css'

function ErrorPage() {
  
  return (

    <div className='parent'>
      <div>
        <Header title='404 PAGE NOT FOUND' />
        <Header title='404 PAGE NOT FOUND' />
        <Header title='404 PAGE NOT FOUND' />
        <Question question="JEEZ IT'S NOT THE 404! REMEMBER TAKE THE 401 EAST AND EXIT AT MARKHAM ROAD IN THE EAST END WHERE ALL THE PRETTY GIRLS ARE SLEEPING 💃🏽💘" />
        <Header title='404 PAGE NOT FOUND' />
        <Header title='404 PAGE NOT FOUND' />
        <Header title='404 PAGE NOT FOUND' />
      </div>
    </div>

  )
}

export default ErrorPage;
