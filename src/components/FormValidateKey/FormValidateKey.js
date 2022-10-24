import React, { useState } from 'react'
import crypto from './../../crypto'

const FormValidateKey = ({ setTextContent, encryptedTextContent }) => {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const validateKey = () => {
    const key = url.split('#').pop()
    const decryptedTextContent = crypto.decrypt(encryptedTextContent, key)

    if (!decryptedTextContent) {
      setError('Invalid link!')

      setTimeout(() => setError(''), 2000)
      return
    }

    setTextContent(decryptedTextContent)
  }

  return (
    <div className="form-validate-key" data-testid="form-validate-key">
      <p>
        <strong>Warning!</strong>
        <br />
        Do not close or reload this page or the message will be lost forever!{' '}
        <span>😱</span>
      </p>
      <p>
        The link you're trying to access is incorrect. Make sure that all the
        characters after the # are entered correctly!
      </p>
      <form
        aria-label="Validate key"
        onSubmit={(e) => {
          e.preventDefault()
          validateKey()
        }}
      >
        <label htmlFor="form-validate-key-inputField">Confirm url:</label>
        <div className="form-validate-key-inputWrapper">
          <input
            className="form-validate-key-inputField"
            id="form-validate-key-inputField"
            name="form-validate-key-inputField"
            type="text"
            placeholder="Validate url"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="button-styled input-button">Validate</button>
        </div>
        {error && <p className="error blink">{error}</p>}
      </form>
    </div>
  )
}

export default FormValidateKey
