import React, { useState, useRef } from 'react'
import checkMark from './../../assets/img/check-mark.svg'
import refresh from './../../assets/img/refresh.svg'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import crypto from './../../crypto'
import endpoints from './../../endpoints'

const Form = () => {
  const [error, setError] = useState('')
  const [url, setUrl] = useState('')
  const [urlCopied, setUrlCopied] = useState(false)
  const [optionsAreExpanded, setOptionsAreHidden] = useState(true)
  const [isSubmitting, setIsSumbitting] = useState(false)
  const [selectedType, setSelectedType] = useState('killOnFirstReq')
  const [disableCreateMessage, setDisableCreateMessage] = useState(false)
  const [isAnonMessage, setIsAnonMessage] = useState(true)
  const [charsLeft, setCharsLeft] = useState(3000)
  const [inputData, setInputData] = useState({
    textContent: '',
    name: '',
    aliveFor: {
      hrs: 0,
      min: 2,
      sec: 0
    },
    options: {
      killOnFirstReq: true,
      startTimerOnFirstReq: false,
      startImmediately: false
    }
  })
  const textInputRef = useRef(null)

  const handleSubmit = async () => {
    try {
      setUrl('')
      setIsSumbitting(true)
      const encrypted = crypto.encrypt(inputData.textContent)

      const messageBody = JSON.stringify({
        ...inputData,
        textContent: encrypted.message
      })

      const createMessage = await fetch(endpoints.createMessage, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: messageBody
      })

      const response = await createMessage.json()

      if (response.success) {
        setUrl(`${response.item.url}#${encrypted.key}`)
        setError('')
        setDisableCreateMessage(true)
        resetForm()
      } else {
        setError(response.message)
      }

      setIsSumbitting(false)
    } catch (error) {
      setError('Something went wrong when creating your message')
      setIsSumbitting(false)
      console.error(error)
    }
  }

  const handleTypeChange = (e) => {
    const selectedMessageType = e.target.value
    setSelectedType(selectedMessageType)

    setInputData({
      ...inputData,
      options: {
        killOnFirstReq: selectedMessageType === 'killOnFirstReq',
        startTimerOnFirstReq: selectedMessageType === 'startTimerOnFirstReq',
        startImmediately: selectedMessageType === 'startImmediately'
      }
    })
  }

  const handleTimeChange = (e) => {
    const timeUnit = e.target.getAttribute('name').slice(-3)

    setInputData({
      ...inputData,
      aliveFor: {
        ...inputData.aliveFor,
        [timeUnit]: Number(e.target.value)
      }
    })
  }

  const handleTextInput = (e) => {
    setInputData({
      ...inputData,
      textContent: e.currentTarget.textContent
    })
    setError('')
    setCharsLeft(3000 - e.currentTarget.textContent.length)
  }

  const resetForm = () => {
    textInputRef.current.innerHTML = ''

    setInputData({
      ...inputData,
      textContent: ''
    })

    setIsAnonMessage(true)
    setCharsLeft(3000)
  }

  const textFieldIsValid = () => {
    if (charsLeft === 3000) {
      setError("Text field can't be empty!")
      return false
    }

    if (charsLeft < 0) {
      setError('Your message is too long!')
      return false
    }

    return true
  }

  return (
    <form
      aria-label="Create message"
      className="form"
      onSubmit={(e) => {
        e.preventDefault()

        if (textFieldIsValid()) {
          handleSubmit(e)
        }
      }}
    >
      <div className="form-section">
        <label htmlFor="input-textContent" className="messageLabel">
          Message:
        </label>
        <div className="input-textContentWrapper">
          <span
            ref={textInputRef}
            contentEditable={true}
            className="input-textContent"
            type="text"
            role="textbox"
            id="input-textContent"
            aria-label="Message textbox"
            onPaste={(e) => {
              e.preventDefault()
              const text = e.clipboardData.getData('text/plain')
              document.execCommand('insertHTML', false, text)

              handleTextInput(e)
            }}
            onInput={(e) => handleTextInput(e)}
          ></span>
          <span className="input-charsleft">{charsLeft} / 3000</span>
        </div>
        <p className="form-settingsFeedback">
          <i>
            The message will self-destruct after:{' '}
            <strong>
              {inputData.aliveFor.hrs > 0 &&
                `${inputData.aliveFor.hrs} hour(s)`}
              {inputData.aliveFor.hrs > 0 && inputData.aliveFor.min ? ', ' : ''}
              {inputData.aliveFor.min > 0 &&
                `${inputData.aliveFor.min} minute(s)`}
              {inputData.aliveFor.min > 0 && inputData.aliveFor.sec ? ', ' : ''}
              {inputData.aliveFor.sec > 0 &&
                `${inputData.aliveFor.sec} second(s)`}
            </strong>{' '}
            Message type:{' '}
            <strong>
              {inputData.options.killOnFirstReq
                ? 'Private Message'
                : inputData.options.startTimerOnFirstReq
                ? 'Triggered Public Message'
                : inputData.options.startImmediately && 'Public Message'}
            </strong>
          </i>
        </p>
      </div>

      <div className="form-anonymous" aria-expanded={!isAnonMessage}>
        <div className="form-checkboxWrapper">
          <input
            className="form-checkbox"
            type="checkbox"
            id="anonymous"
            name="anonymous"
            checked={isAnonMessage}
            onChange={() => setIsAnonMessage(!isAnonMessage)}
          />
          <label htmlFor="anonymous">Anonymous message</label>
        </div>
        <input
          className="form-nameField"
          type="text"
          placeholder="Enter a name.."
          onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
        />
      </div>

      <button
        className="button-styled input-button"
        onClick={(e) => {
          e.preventDefault()
          setOptionsAreHidden(!optionsAreExpanded)
        }}
        disabled={isSubmitting || disableCreateMessage}
      >
        Message options
      </button>

      <div className="form-options" aria-expanded={optionsAreExpanded}>
        <div className="form-section">
          <label htmlFor="input-timeSelect" className="input-timeSelect-label">
            Self-destruct after:
          </label>
          <div className="input-timeSelect-wrapper">
            <select
              name="input-timeSelect-hrs"
              className="input-timeSelect hours"
              defaultValue={inputData.aliveFor.hrs}
              onChange={(e) => handleTimeChange(e)}
            >
              {[...Array(24)].map((_, i) => (
                <option key={`hours-${i}`} value={i}>
                  {i} hours
                </option>
              ))}
            </select>

            <select
              name="input-timeSelect-min"
              className="input-timeSelect"
              defaultValue={inputData.aliveFor.min}
              onChange={(e) => handleTimeChange(e)}
            >
              {[...Array(60)].map((_, i) => (
                <option key={`minutes-${i}`} value={i}>
                  {i} min
                </option>
              ))}
            </select>

            <select
              name="input-timeSelect-sec"
              className="input-timeSelect"
              defaultValue={inputData.aliveFor.sec}
              onChange={(e) => handleTimeChange(e)}
            >
              {[...Array(60)].map((_, i) => (
                <option key={`seconds-${i}`} value={i}>
                  {i} sec
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-section form-section-radio">
          <label htmlFor="input-typeSelect" className="input-typeSelect-label">
            Message type:
          </label>

          <div className="form-radio-item">
            <input
              type="radio"
              className="form-radio"
              id="form-radio-secret"
              name="secret message"
              value="killOnFirstReq"
              checked={selectedType === 'killOnFirstReq'}
              onChange={(e) => handleTypeChange(e)}
            />
            <label htmlFor="form-radio-secret">
              Private Message (can be opened once, and only once)
            </label>
          </div>

          <div className="form-radio-item">
            <input
              type="radio"
              className="form-radio"
              id="form-radio-countdown"
              name="Public message"
              value="startImmediately"
              checked={selectedType === 'startImmediately'}
              onChange={(e) => handleTypeChange(e)}
            />
            <label htmlFor="form-radio-countdown">
              Public Message (visible to anyone with the unique url, timer
              starts immediately)
            </label>
          </div>

          <div className="form-radio-item">
            <input
              type="radio"
              className="form-radio"
              id="form-radio-triggered"
              name="Triggered Message"
              value="startTimerOnFirstReq"
              checked={selectedType === 'startTimerOnFirstReq'}
              onChange={(e) => handleTypeChange(e)}
            />
            <label htmlFor="form-radio-triggered">
              Triggered Public Message (visible to anyone with the unique url,
              timer starts when the first person opens the message)
            </label>
          </div>
        </div>
      </div>
      <div className="input-buttonWrapper">
        <button
          type="submit"
          className="button-styled input-button"
          disabled={isSubmitting || disableCreateMessage}
        >
          Create message
        </button>
        {disableCreateMessage && (
          <img
            alt="Create another message"
            className="refresh"
            decoding="async"
            src={refresh}
            onClick={() => window.location.reload()}
          />
        )}
      </div>
      <div className="form-feedback">
        {error && <span data-testid="form-feedback-error">{error}</span>}
        {url && (
          <div className="form-feedback-success">
            <div className="form-feedback-success-top">
              <img
                className="form-feedback-checkmark"
                src={checkMark}
                alt="checkmark"
                height="15"
                width="15"
              />
              {!urlCopied ? (
                <span data-testid="form-feedback-success">
                  Message created! <strong>(click to copy share link)</strong>
                </span>
              ) : (
                <span className="blink">Link copied!</span>
              )}
            </div>
            <CopyToClipboard text={url} onCopy={() => setUrlCopied(true)}>
              <span
                className="form-feedback-success-bottom"
                data-testid="form-feedback-url"
              >
                {url}
              </span>
            </CopyToClipboard>
          </div>
        )}
        {isSubmitting && (
          <div className="form-feedback-submitting">Creating message..</div>
        )}
      </div>
    </form>
  )
}

export default Form
