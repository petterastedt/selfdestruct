import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Timer from './../components/Timer/Timer'
import MessageBox from './../components/MessageBox/MessageBox'
import Header from './../components/Header/Header'
import FormValidateKey from './../components/FormValidateKey/FormValidateKey'
import Footer from './../components/Footer/Footer'
import Loader from './../components/Loader/Loader'
import crypto from './../crypto'
import endpoints from './../endpoints'

const Message = () => {
  const [messageIsDestroyed, setMessageIsDestroyed] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [messageData, setMessageData] = useState(null)
  const { pathname, hash } = useLocation()
  const secret = pathname.split('/').pop()
  const key = hash.slice(1)

  useEffect(() => {
    ;(async () => {
      setMessageData(null)
      setError(false)

      if (secret.length !== 6 || key.length !== 16) {
        setError('Invalid link')
        return
      }

      try {
        const message = await fetch(`${endpoints.getMessage}/${secret}`)

        const messageJson = await message.json()

        if (messageJson.success) {
          const { textContent, timeLeft, options, name } = messageJson.item
          const decryptedTextContent = crypto.decrypt(textContent, key)

          const data = {
            name,
            message: decryptedTextContent ? decryptedTextContent : textContent,
            timeLeft,
            isPrivateMessage: options.killOnFirstReq
          }

          setTimeout(() => {
            setMessageData(data)

            if (!decryptedTextContent) {
              setError('Invalid decryption key')
            }

            setIsLoading(false)
          }, 2000)
        } else {
          setTimeout(() => {
            setError(messageJson.message)
            setIsLoading(false)
          }, 2000)
        }
      } catch (e) {
        setError('Critical error')
        setIsLoading(false)
        console.error(e)
      }
    })()
  }, [key, secret])

  const setTextContent = (decrytedMessage) => {
    setMessageData({ ...messageData, message: decrytedMessage })
    setError(false)
  }

  return (
    <>
      <div className="pageWrapper centerComponentVertically">
        {isLoading ? <Loader /> : <Header />}
        {!error && messageData && (
          <>
            <MessageBox
              message={messageData.message}
              messageIsDestroyed={messageIsDestroyed}
              name={messageData.name}
            />
            <Timer
              setMessageIsDestroyed={setMessageIsDestroyed}
              messageData={messageData}
              messageIsDestroyed={messageIsDestroyed}
            />
          </>
        )}
        {error && <h3 className="error">{error}</h3>}
        {error === 'Invalid decryption key' && (
          <FormValidateKey
            setTextContent={setTextContent}
            encryptedTextContent={messageData.message}
          />
        )}
        <br />
      </div>
      <Footer
        footerText={
          !error && !isLoading && 'This message is brought to you by '
        }
      />
    </>
  )
}

export default Message
