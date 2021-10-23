import React, { useEffect, useRef } from 'react'
import { ConversationalForm } from 'conversational-form'
import newUser from '../services/newUser'
import '../styles/main.css'
import DP from '../assets/CLB_DP.jpg'

export default function CForm() {
  // Create a reference object for the form component to append to
  // Allows form component to persist throughout multiple renders
  const ref = useRef();

  // Defining the form inputs
  const formFields = [
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'greeting_1',
      'cf-questions': 'Yo what\'s going on? It\'s The Boy, a.k.a. Drake 🌎'
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'greeting_2',
      'cf-questions': 'In case you were wondering, I\'m still making the final tweaks to C.L.B. 🌹'
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'greeting_3',
      'cf-questions': 'But to make it up to you as a fan, I will personally text you once I drop C.L.B. 💽'
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'firstname',
      'id': 'firstname',
      'required': '',
      'minlength': '3',
      'maxlength': '15',
      'cf-questions': "First off, do you have name or nickname you go by?",
      'cf-input-placeholder': "Eg. The Boy",
      'cf-error': '3 - 15 characters',
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'greeting_4',
      'cf-questions': "Nice to meet you {firstname}! 🤝",
      'cf-conditional-continue': 'yes'
    },
    {
      'tag': 'input',
      'type': 'tel',
      'pattern': "[0-9]{10}",
      'name': 'phoneNumber',
      'id': 'phoneNumber',
      'required': '',
      'minlength': '10',
      'maxlength': '10',
      'cf-questions': "So {firstname}, what is your cell phone number?",
      'cf-input-placeholder': "10 digit Eg. 4161234567",
      'cf-error': '10 digit number no dashes'
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'adding_Contact_Info_1',
      'cf-questions': "Alright {firstname}! Give me a minute to verify and add you to my contacts ⏳"
    },
  ]

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
          `This is an invalid Canadian 🇨🇦 / American 🇺🇸 cell phone number {firstname} 😂`
        )
        cf.addRobotChatResponse(
          `KMT ... I took a break from C.L.B., now it's back to that, {firstname} ✌🏼`
        )

      } else if (response === "Non-unique number"){
        
        cf.addRobotChatResponse(
          `You must love talking with me {firstname} 😂`
        )
        cf.addRobotChatResponse(
          `You've already subscribed to the C.L.B. Hotline ✍🏼`
        )
        cf.addRobotChatResponse(
          `I gotta get back to C.L.B., but until next time {firstname} ✌🏼`
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
          `In the meantime there will be notifications for other album drops I'm excited for like Travis Scott's Utopia🎶`
        )
        cf.addRobotChatResponse(
          `I gotta get back to C.L.B., but until next time {firstname} ✌🏼`
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

  }, [formFields])

  // Render the form by creating a div with the ref attribute assigined to the ref object created via the useRef hook above
  return (
      <div className='CForm' ref={ref}/>
  )
}