import React, { useEffect, useRef } from 'react'
import { ConversationalForm } from 'conversational-form'
import newUser from '../services/newUser'
import '../styles/main.css'
import DP from '../assets/CLB_DP.jpg'
import formFields from '../assets/formFields'

export default function CForm() {
  // Create a reference object for the form component to append to
  // Allows form component to persist throughout multiple renders
  const ref = useRef();

  // Lifecycle methods of the form component
  useEffect(function mount() {
    
    // Callback function for submitting the form
    async function submitCallback() {
      // Collect form data
      let newUserInfo = cf.getFormData(true)

      // Send Form data as POST request to API
      let response = await newUser.addUser(newUserInfo)

      // Reneder closing form text message based on response from API
      if (response === "Invalid number"){
        
        cf.addRobotChatResponse(
          `This is an invalid Canadian 🇨🇦 / American 🇺🇸 cell phone number, {firstname} 😂`
        )
        cf.addRobotChatResponse(
          `KMT ... my time is precious like a Patek Philippe, {firstname} ✌🏼`
        )

      } else if (response === "Non-unique number"){
        
        cf.addRobotChatResponse(
          `{firstname}, you must love talking with me 😂`
        )
        cf.addRobotChatResponse(
          `You've already subscribed to the C.L.B. Hotline ✍🏼`
        )
        cf.addRobotChatResponse(
          `Until next time {firstname} ✌🏼`
        )

      } else{

        cf.addRobotChatResponse(
          `Woi Oi! You've been subscribed! 💘`
        )
        cf.addRobotChatResponse(
          `I'll send out a confirmation text from ${response.secret} shortly 📱`
        )
        cf.addRobotChatResponse(
          `If you change your mind just text 'TAKECARE' to ${response.secret} to unsubscribe`
        )
        cf.addRobotChatResponse(
          `Until next time {firstname} ✌🏼`
        )

      }
    }

    // componentDidMount() equivalent
    let cf = ConversationalForm.startTheConversation({
      options: {
        theme: 'dark',
        // append Form component to DOM via the ref object created by the useRef hook
        context: ref.current,
        preventAutoFocus: false,
        submitCallback: () => {submitCallback()},
        userImage: 'https://pbs.twimg.com/profile_images/563843814725402624/Vb8k670S_400x400.png',
        robotImage: DP,
        loadExternalStyleSheet: true
      },
      tags: formFields,
    })

    // componentWillUnmount() equivalent
    return function unMount() {
      cf.remove();
    }

  }, [])

  // Render the form by creating a div with the ref attribute assigined to the ref object created via the useRef hook above
  return (
      <div className='CForm' ref={ref}/>
  )
}