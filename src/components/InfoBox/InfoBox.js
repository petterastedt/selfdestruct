import React from 'react'

const InfoBox = () => (
  <div className="infoBox">
    <div className="infoBox-textRow">
      <span>About privtext.me</span>
    </div>
    <div className="infoBox-container">
      <div className="infoBox-about">
        <p>
          ⚠️ This is a side project where the main goal is for me to learn and
          having fun doing so. I'm not a security expert in any way and can't
          leave any guarantees regarding the functionality of this website. That
          being said:
          <br />
          <br />
          Privtext.me offers strong end-to-end encryption using{' '}
          <strong>AES-256</strong>
          <strong>
            . No one, not even someone with database access, can read your
            messages. A message can only be decrypted using the hash inside the
            unique url and is never shown to anyone but the message creator
          </strong>
          .
          <br />
        </p>
      </div>
      {/* Features: * End-to-end encryption * Emoji support * Image support */}
      <div className="infoBox-security">
        <strong>Message types:</strong>
        <ul>
          <li>
            <strong>Private message</strong>
            <p>
              Will be stored in the database until someone views the message by
              opening the shared url. Once the message is opened it gets deleted
              instantly. The receiver can see the message until the timer runs
              out. The message can't be opened again.
            </p>
          </li>
          <li>
            <strong>Public message</strong>
            <p>
              Anyone with the url can see the message until the timer runs out.
              The timer is set by the message creator and starts the moment the
              message is created. It will remain in the database for maximum 24h
              after the timer has run out.
            </p>
          </li>
          <li>
            <strong>Triggered public message</strong>
            <p>
              Same as public message but the timer starts when the first person
              opens the url.
            </p>
          </li>
        </ul>
        <div className="infoBox-features">
          <strong>Features:</strong>
          <ul>
            <li>
              Support for image urls <span className="infoBox-new">(new!)</span>
            </li>
            <li>Support for emojis 🥳</li>
            <li>
              Generates anchor links when urls are detected in the message
            </li>
            <li>End-to-end encryption</li>
            <li>Optimized for mobile</li>
          </ul>
        </div>
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
      </div>
    </div>
  </div>
)

export default InfoBox
