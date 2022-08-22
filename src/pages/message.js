import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Timer from './../components/Timer/Timer'
import MessageBox from './../components/MessageBox/MessageBox'
import Header from './../components/Header/Header'
import Footer from './../components/Footer/Footer'
import Loader from './../components/Loader/Loader'
import crypto from './../crypto'

const Message = () => {
  const [messageIsDestroyed, setMessageIsDestroyed] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messageData, setMessageData] = useState({})
  const location = useLocation()

  useEffect(() => {
    ;(async () => {
      const secret = location.pathname.split('/').pop()
      const key = location.hash.slice(1)

      setMessageData({})
      setError(false)

      try {
        if (secret.length === 6 && key.length === 16) {
          setIsLoading(true)

          const url =
            process.env.NODE_ENV === 'production'
              ? '/api/message'
              : 'http://localhost:5000/api/message'

          const message = await fetch(`${url}/${secret}`)
          const messageJson = await message.json()

          if (messageJson.success) {
            const { textContent, timeLeft, options, name } = messageJson.item
            const decryptedTextContent = crypto.decrypt(textContent, key)

            if (!decryptedTextContent) {
              const errorMessage = options.killOnFirstReq
                ? 'Invalid decryption key, the message has been deleted :('
                : 'Invalid decryption key'

              setTimeout(() => {
                setError(errorMessage)
                setIsLoading(false)
              }, 2000)

              return
            }

            const data = {
              name,
              message: decryptedTextContent,
              timeLeft,
              isPrivateMessage: options.killOnFirstReq
            }

            setTimeout(() => {
              setMessageData(data)
              setIsLoading(false)
            }, 2000)
          } else {
            setTimeout(() => {
              setError(messageJson.message)
              setIsLoading(false)
            }, 2000)
          }
        } else {
          setError('Invalid link')
        }
      } catch (e) {
        setError('Critical error')
        setIsLoading(false)
        console.error(e)
      }
    })()
  }, [location])

  return (
    <div className="container message-page">
      <div className="pageWrapper centerComponent centerComponentVertically">
        {isLoading ? <Loader /> : <Header />}
        {messageData.message && (
          <MessageBox
            message={messageData.message}
            messageIsDestroyed={messageIsDestroyed}
            name={messageData.name}
          />
        )}
        {messageData.timeLeft && (
          <Timer
            isPrivateMessage={messageData.isPrivateMessage}
            milliseconds={messageData.timeLeft}
            setMessageIsDestroyed={setMessageIsDestroyed}
            messageData={messageData}
            messageIsDestroyed={messageIsDestroyed}
          />
        )}
        {error && <h3 className="error">{error}</h3>}
        <br />
        <Footer
          footerMessage={
            !error && !isLoading
              ? [
                  <div key="footer content">
                    This message is brought to you by&nbsp;
                    <a
                      href="/"
                      aria-label="Back to homepage"
                      className="link-styled"
                    >
                      privtext.me
                    </a>
                  </div>
                ]
              : [
                  <div key="footer content">
                    Back to&nbsp;
                    <a
                      href="/"
                      aria-label="Back to homepage"
                      className="link-styled"
                    >
                      privtext.me
                    </a>
                  </div>
                ]
          }
        />
      </div>
    </div>
  )
}

export default Message
