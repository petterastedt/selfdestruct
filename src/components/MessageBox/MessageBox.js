import React from 'react'
import { Anchorme } from 'react-anchorme'
import CustomLink from './../CustomLink/CustomLink'
import avatar from './../../assets/img/avatar.svg'
import checkMark from './../../assets/img/check-mark.svg'

const MessageBox = ({ message, messageIsDestroyed, name }) => (
  <div className="messageBox">
    <div className="messageBox-textRow">
      <img
        className="messageBox-avatar"
        src={avatar}
        alt="avatar"
        width="10"
        height="10"
      />
      <strong data-testid="senderName">{name || 'Anonymous'}</strong> shared a
      secret message with you:
    </div>
    <div
      className={`messageBox-container ${
        messageIsDestroyed && 'messageBox-container--isDestroyed'
      }`}
    >
      <p className="messageBox-content" data-testid="messageBox">
        <Anchorme
          linkComponent={CustomLink}
          target="_blank"
          rel="noreferrer noopener"
          className="link-message"
        >
          {message}
        </Anchorme>
      </p>
      <div className="messageBox-messageDestroyed">
        <div className="messageBox-messageDestroyed-wrapper">
          <img
            className="messageBox-messageDestroyed-checkmark"
            src={checkMark}
            alt="checkmark"
            width="15"
            height="15"
          />
          <span className="message">Message deleted</span>
        </div>
      </div>
    </div>
  </div>
)

export default MessageBox
