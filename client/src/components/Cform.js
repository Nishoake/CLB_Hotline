import React, { useEffect, useRef } from 'react'
import { ConversationalForm } from 'conversational-form'
import newUser from '../services/newUser'
import '../styles/main.css'

export default function MyForm() {
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
      'cf-questions': 'In case you were wondering, I\'m still making the final tweaks to CLB 🌹'
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'greeting_3',
      'cf-questions': 'But to make it up to you as a fan I will personally text you once I drop CLB 💽'
    },
    // {
    //   'tag': 'select',
    //   'name': 'continue',
    //   'cf-questions': 'How does that sound?',
    //   'children': [
    //     {
    //       'tag': 'option',
    //       'cf-label': 'Sounds good!',
    //       'value': 'yes'
    //     },
    //     {
    //       'tag': 'option',
    //       'cf-label': 'No thank you',
    //       'value': 'no'
    //     }
    //   ]
    // },
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
      // 'cf-conditional-continue': 'yes'
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
      'cf-questions': "So {firstname}, What is your phone number?",
      'cf-input-placeholder': "Eg. 4161234567",
      'cf-error': '10 digit number no dashes'
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'adding_Contact_Info_1',
      'cf-questions': "Alright {firstname} give me a minute to add you to my contacts ⏳"
    },
    // {
    //   'tag': 'cf-robot-message',
    //   'name': 'ending',
    //   'cf-conditional-continue': 'no',
    //   'cf-questions': 'No biggie ✌🏼'
    // },
  ]

  useEffect(function mount() {
    
    // Submitting the form
    async function submitCallback() {
      let newUserInfo = cf.getFormData(true)

      let response = await newUser.addUser(newUserInfo)

      if (response === "Invalid number"){
        cf.addRobotChatResponse("This is an invalid Canadian / American mobile number G 😂")
        cf.addRobotChatResponse("KMT ... I took a break from CLB, now it's back to that ✌🏼")
      } else if (response === "Non-unique number"){
        cf.addRobotChatResponse("You must love talking with me 😂")
        cf.addRobotChatResponse("Since you've already subscribed to the CLB Hotline ✍🏼")
        cf.addRobotChatResponse("I gotta get back to CLB, but until next time ✌🏼")
      } else{
        cf.addRobotChatResponse("Woi Oi! You've been subscribed!💘")
        cf.addRobotChatResponse(`My associate will send out a confirmation text from ${response.secret} shortly 📱`)
        // cf.addRobotChatResponse("Also expect a text from the same number once CLB drops 🔥")
        // cf.addRobotChatResponse("In the meantime there will be notifications for other album drops I'm excited for 🎶")
        // cf.addRobotChatResponse("Artists like Playboi Carti & Mariah the Scientist 🔥")
        cf.addRobotChatResponse("I gotta get back to CLB, but until next time Take Care✌🏼")
      }
    }

    let cf = ConversationalForm.startTheConversation({
      options: {
        theme: 'dark',
        submitCallback: submitCallback,
        userImage: 'https://pbs.twimg.com/profile_images/563843814725402624/Vb8k670S_400x400.png',
        robotImage: 'https://i.redd.it/moigifebc3341.jpg',
        userInterfaceOptions: {
          robot: {
            // robotResponseTime: 1000,
          },
          // user: {
          //   showThinking: true,
          // }
        },
        preventAutoFocus: false,
        loadExternalStyleSheet: true
      },
      tags: formFields,
    })

    ref.current.appendChild(cf.el);

    return function unMount() {
      cf.remove();
    }
  }, [formFields])


  return (
    <div className='experiment'>
      <div ref={ref}/>
    </div>
  )
}