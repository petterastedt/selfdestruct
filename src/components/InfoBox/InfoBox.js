import React from 'react'

const InfoBox = () => (
  <div className="infoBox">
    <div className="infoBox-textRow">
      <span>About privtext.me</span>
    </div>
    <div className="infoBox-container">
      <div className="infoBox-about">
        <u><h3>About</h3></u>
        <p>
          The idea for this project was born in November 2020. I spent a weekend writing the first version of the API and the frontend. Since then new features, security improvement and code refactoring has made the project into what you see in front of you.
          <strong> This is a side project where the main goal is for me to learn, I'm not a security expert in any way and can't leave any guarantees regarding the functionality of this website.</strong>
          <br />
          <br />
          Written in: React, Node.js, Express, MongoDb, SCSS
        </p>
      </div>
      <div className="infoBox-security">
        <u><h3>Security</h3></u>
        <p>All messages are temporarily stored in a remote database using <strong>AES-256 encryption</strong>. This means that <strong>for anyone trying to access the database the messages are unreadable, a message can only be decrypted using the unique url</strong>. Below is a more detailed explaination of how the different message types work:</p>
        <ul>
          <li>
            <strong>Private message</strong>
            <p>Will be stored in the database until someone views the message. Once the message is opened it gets deleted instantly. The receiver can see the message until the timer runs out. The message can't be opened again.</p>
          </li>
          <li>
            <strong>Public message</strong>
            <p>Anyone with the url can see the message until the timer runs out. The timer starts when the message is created. The message is only visible for receivers until the timer runs out and can't be opened after that. It will remain in the database for a maximum of 24h after the timer has run out.</p>
          </li>
          <li>
            <strong>Triggered public message</strong>
            <p>Anyone with the url can see the message until the timer runs out. The timer starts when the first person opens the message. The message is only visible for receivers until the timer runs out and can't be opened after that. It will remain in the database for a maximum of 24h after the timer has run out.</p>
          </li>
        </ul>
        <p>
          The encryption is done with <a className="link-styled" href="https://www.npmjs.com/package/mongoose-encryption" aria-label="Mongoose Encryption NPM package" alt="Mongoose Encryption NPM package" target="_blank" rel="noopener noreferrer">mongoose-encryption</a>.
          <br />
          <br />
          If you have any feedback (please, go easy one me 😊), feel free to reach out to: <a className="link-styled" href="mailto:info@privtext.me" aria-label="email info@privtext.me">info@privtext.me</a>
        </p>
        <br />
        <i>/ Petter</i>
      </div>
      <div className="infoBox-features">
        {/* <h3>Features</h3>
        <ul>
          <li>Add sender name (NEW)</li>
          <li>AES-256 encrypted message content (NEW)</li>
          <li>Full emoji support</li>
          <li>Auto generated anchorlinks when a url is detected</li>
        </ul> */}
      </div>
    </div>
  </div>
)

export default InfoBox