# Rise Developer Challenge - Knowledge Check Block

I implemented the `knowledge-check-blocks` interactive block, from the [Rise Developer Challenge Instructions](https://github.com/sekharp/rise-js-tech-challenge). The REST API persists the block's UI state via a PUT endpoint with a few additional database field changes. This is a React app that is mobile responsive and accommodates a wide-variety of end users and devices.

With more time, I would've focused on testing this application and accessibility to open this training tool up to a wider userbase.

## How To Run This App

In your terminal, you will need to run the server (available at `http://localhost:5000/knowledge-check-blocks`):

- `cd server`
- `npm install`
- `npm start`

And from another window in your terminal at the root directory you will need to run the frontend:

- `cd rise-client`
- `yarn start`

From there this app is available at: `http:localhost:3000/`

## App Demo

![GIF of Rise Knowledge Check Block App Demo](rise-knowledge-check-block-app.gif)

## Tech Stack Notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). [Material UI](https://material-ui.com/components/material-icons/) icons are also used. The project is a full-stack Javascript app. It uses [React](https://github.com/facebook/react) on the frontend, with a backend in Javascript via [Express](https://github.com/expressjs/express) with [Morgan](https://github.com/expressjs/morgan) for HTTP request logging middleware.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
