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
    'cf-questions': 'I hope you enjoyed C.L.B. 🤰🏽'
  },
  {
    'tag': 'cf-robot-message',
    'type': 'text',
    'name': 'greeting_3',
    'cf-questions': 'C.L.B. Hotline was a fun experience, and I wanted to continue sending texts for future albums that I am personally anticipating like Travis Scott\'s Utopia 💽'
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

export default formFields