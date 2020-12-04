import React, { useEffect, useRef } from 'react';
import { ConversationalForm } from 'conversational-form';
import '../styles/styles.css'

export default function MyForm() {
  const ref = useRef();

  // Defining the form inputs
  const formFields = [
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'greeting_1',
      'cf-questions': "Hey it's Drake 🦉"
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'greeting_2',
      'cf-questions': "In case you were wondering, I'm still making the final tweaks on CLB 🌹"
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'greeting_3',
      'cf-questions': "But to make it up to you as a fan I will personally text you once I drop CLB 💽"
    },
    {
      'tag': 'input',
      'type': 'text',
      'name': 'firstname',
      'id': 'firstname',
      'required': '',
      'minlength': '3',
      'maxlength': '10',
      'cf-questions': "First off, do you have name or nickname you go by?",
      'cf-input-placeholder': "Eg. The Boy"
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'greeting_4',
      'cf-questions': "Dope name! Nice to meet you {firstname} 🤝"
    },
    {
      'tag': 'input',
      'type': 'tel',
      'name': 'phone-number',
      'id': 'phone-number',
      'required': '',
      'minlength': '10',
      'maxlength': '10',
      'cf-questions': "So {firstname}, What is your phone number?",
      'cf-input-placeholder': "10 digit format Eg. 4161234567"
    },
    {
      'tag': 'cf-robot-message',
      'type': 'text',
      'name': 'adding_Contact_Info_1',
      'cf-questions': "Alright {firstname} give me a minute to add you to my contacts ⏳"
    },
  ]

  useEffect(function mount() {
    

    function submitCallback() {
      let formDataSerialized = cf.getFormData(true);
      console.log("Formdata, obj:", formDataSerialized);
      cf.addRobotChatResponse("You are done. Check the dev console for form data output.")
    }

    let cf = ConversationalForm.startTheConversation({
      options: {
        theme: 'blue',
        submitCallback: submitCallback,
        userImage: 'https://pbs.twimg.com/profile_images/563843814725402624/Vb8k670S_400x400.png',
        robotImage: 'https://scontent-lga3-1.cdninstagram.com/v/t51.2885-19/s150x150/91255903_2638479089705085_4943092648538800128_n.jpg?_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_ohc=e7GMB5Nn-xcAX-m8jJ9&tp=1&oh=2952fbc498b55c3e2cee78ddb27d2026&oe=5FF42677',
        userInterfaceOptions: {
          robot: {
            robotResponseTime: 1000,
          },
          user: {
            showThinking: true,
          }
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
    <div>
      <div ref={ref}/>
    </div>
  )
}