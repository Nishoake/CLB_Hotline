# CLB Hotline

Service that will alert subscribers of highly anticipated albums once they are available on streaming platforms via SMS.

Was originally created for the release of Drake's Certified Lover Boy, but now will track future major album releases including: Travis Scott's Utopia and Frank Ocean's forthcoming album.

Check the project out at: <https://clb-hotline.herokuapp.com>

![CLB Hotline Landing Page](/images/CLB_RM_1.png?raw=true "CLB Hotline Landing Page")
![CLB Hotline Form](/images/CLB_RM_2.png?raw=true "CLB Hotline Form")

## How I worked on this project

- Created a Kanban board with Trello
- Sketched mockups of the UI

## How to navigate the project highlights

- Conversational Form Component: client/src/components/CForm.js
- Detection Algorithm: server/services/detection.js
- Webhook handling incoming SMS: server/app.js

## Why I built this project this way

- To apply my knowledge of the MERN stack
- Become comfortable writing recursive algorithms
- Work with third-party APIS: Twilio and Spotify
- Write integration tests
- Provide a solution for a real-life usecase that could handle +100 useers

## If I had more time I would change this

- Mock the Spotify API to write a test for the detect function
- Add end-to-end tests with Cypress
- Set up continuous integration to run the tests on future Pull Requests

## Available Scripts

In the project directory, you can run:

### `npm start`
