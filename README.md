### Pong Game

A starter project for a basic pong game using SVGs. Background, logo, and music belong to SEGA's Out Run (1986).

## Setup

Ensure you have [Node.js](https://nodejs.org/en/) installed first.

**Install dependencies:**

`$ npm install`

**Run locally with the Parcel dev server:**

`$ npm start`

Once you run the start command you can access your project at http://localhost:3000.

Read more about the [Parcel web application bundler here](https://parceljs.org/).

## Technologies Used:

HTML, CSS, JavaScript, SVG.

## Personal Learnings

Learnt how to work with SVGs and developed JavaScript skills in order to perform basic animations for the game. Added a retro video game background using CSS and the music from the game using JavaScript to coincide with the retro theme of Pong.

## Deploy

To deploy your finished Pong project as a GitHub page, you must first **update the `predeploy` script in the `package.json` file with the name of your repo.**

For example, if your repo URL is:

https://github.com/bob/pong-project

Update the `predeploy` script as follows:

```json
"predeploy": "rm -rf dist && parcel build index.html --public-url /pong-project",
```

Once you have done this, you can run:

`$ npm run deploy`

Now check out your deployed site 🙂

Contributor: Christine Lyston
Date: 02.02.20
