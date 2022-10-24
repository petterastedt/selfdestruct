import React from 'react'

const InfoBox = () => (
  <div className="infoBox">
    <div className="infoBox-textRow">
      <span>About privtext.me</span>
    </div>
    <div className="infoBox-container">
      <div className="infoBox-about">
        <p>
          This is a side project where the main goal is for me to learn and have
          fun doing so. I'm not a security expert in any way and can't leave any
          guarantees regarding the functionality of this website.
          <br />
          <br />
          Privtext offers full end-to-end encryption using{' '}
          <strong>AES-256</strong>. The decryption key is only visible in the
          unique url so the user is always in control
          <strong>
            . No one, not even someone with database access, can read your
            messages. A message can only be decrypted using the unique url
          </strong>
          .
          <br />
        </p>
      </div>
      <div className="infoBox-security">
        <strong>Message types:</strong>
        <ul>
          <li>
            <strong>Private message</strong>
            <p>
              Will be stored in the database until someone views the message.
              Once the message is opened it gets deleted instantly. The receiver
              can see the message until the timer runs out. The message can't be
              opened again.
            </p>
          </li>
          <li>
            <strong>Public message</strong>
            <p>
              Anyone with the url can see the message until the timer runs out.
              The timer starts when the message is created. The message is only
              visible for receivers until the timer runs out and can't be opened
              after that. It will remain in the database for a maximum of 24h
              after the timer has run out.
            </p>
          </li>
          <li>
            <strong>Triggered public message</strong>
            <p>
              Same as public message but the timer starts when the first person
              opens the message.
            </p>
          </li>
        </ul>
        <strong>Technical stuff:</strong>
        <br />
        <br />
        <p>
          Written in React, Node.js, Express, MongoDb
          <br />
          <br />
          The encryption/decryption is done with{' '}
          <a
            className="link-styled"
            href="https://www.npmjs.com/package/string-crypto"
            aria-label="String crypto NPM package"
            alt="String crypto NPM package"
            target="_blank"
            rel="noopener noreferrer"
          >
            string-crypto
          </a>
          .
          <br />
          <br />
          If you want to get in touch feel free to send an email to{' '}
          <a
            className="link-styled"
            href="mailto:info@privtext.me"
            aria-label="email info@privtext.me"
          >
            info@privtext.me
          </a>{' '}
          {/* and if you like this project, please consider{' '}
          <a className="link-styled" href="/" aria-label="donate">
            buying me a coffee
          </a>{' '}
          ☕ */}
          {/* or visit my website at <a href="https://www.petterastedt.com" className="link-styled" aria-label="Petter Åstedt portfolio website" target="_blank" rel="noreferrer noopener">https://www.petterastedt.com</a>. */}
        </p>
        <br />
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
          <li>Image support. Image links are shown as images.</li>
        </ul> */}
      </div>
    </div>
  </div>
)

export default InfoBox
