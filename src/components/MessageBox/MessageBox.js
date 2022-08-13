import React from 'react'
import { Anchorme } from 'react-anchorme'

const MessageBox = ({ message, messageIsDestroyed, name }) => (
  <div className="messageBox">
    <div className="messageBox-textRow">
      <strong data-testid="senderName">{name ? name : 'Anonymous'}</strong>{' '}
      shared a secret message with you:
    </div>
    <div className="messageBox-container">
      <p
        className={`messageBox-content ${
          messageIsDestroyed ? 'messageBox-content--isDestroyed' : ''
        }`}
        data-testid="messageBox"
      >
        <Anchorme
          target="_blank"
          rel="noreferrer noopener"
          className="link-message"
        >
          {message}
        </Anchorme>
      </p>
      <div
        className={`messageBox-messageDestroyed ${
          messageIsDestroyed ? 'messageBox-messageDestroyed--isDestroyed' : ''
        }`}
      >
        <div className="messageBox-messageDestroyed-wrapper">
          <svg
            height="512pt"
            viewBox="0 0 512 512"
            width="512pt"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m369.164062 174.769531c7.8125 7.8125 7.8125 20.476563 0 28.285157l-134.171874 134.175781c-7.8125 7.808593-20.472657 7.808593-28.285157 0l-63.871093-63.875c-7.8125-7.808594-7.8125-20.472657 0-28.28125 7.808593-7.8125 20.472656-7.8125 28.28125 0l49.730468 49.730469 120.03125-120.035157c7.8125-7.808593 20.476563-7.808593 28.285156 0zm142.835938 81.230469c0 141.503906-114.515625 256-256 256-141.503906 0-256-114.515625-256-256 0-141.503906 114.515625-256 256-256 141.503906 0 256 114.515625 256 256zm-40 0c0-119.394531-96.621094-216-216-216-119.394531 0-216 96.621094-216 216 0 119.394531 96.621094 216 216 216 119.394531 0 216-96.621094 216-216zm0 0" />
          </svg>
          <span className="message">Message deleted</span>
        </div>
      </div>
    </div>
  </div>
)

export default MessageBox
