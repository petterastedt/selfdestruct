import React, { useState, useEffect } from 'react'
import Timer from './../components/Timer/Timer'
import MessageBox from './../components/MessageBox/MessageBox'
import Footer from './../components/Footer/Footer'

const Message = () => {
  // const [isFirstRequest, setIsFirstRequest] = useState("")
  const [messageIsDestroyed, setMessageIsDestroyed] = useState(false)
  const [error, setError] = useState('')
  const [messageData, setMessageData] = useState({})

  useEffect(() => {
    ;(async () => {
      try {
        const pathName = window.location.pathname
        const messageSecret = pathName.substring(pathName.lastIndexOf('/') + 1)

        if (messageSecret.length > 16) {
          const url =
            process.env.NODE_ENV === 'production'
              ? '/api/message'
              : 'http://localhost:5000/api/message'
          const message = await fetch(`${url}/${messageSecret}`)
          const messageJson = await message.json()

          if (messageJson.success) {
            const { textContent, timeLeft, options, name } = messageJson.item

            const data = {
              name,
              message: textContent,
              timeLeft,
              isPrivateMessage: options.killOnFirstReq
            }

            setMessageData(data)
          } else {
            setError(messageJson.message)
          }
        } else {
          setError('Invalid secret')
        }
      } catch (e) {
        setError('Critical error')
        console.log(e)
      }
    })()
  }, [])

  return (
    <div className="container message-page">
      <div className="pageWrapper centerComponent centerComponentVertically">
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
        {error && <h2>{error}</h2>}
        <br />
        <Footer
          footerMessage={
            !error
              ? [
                  'This message is brought to you by',
                  <span>&nbsp;</span>,
                  <a
                    href="/"
                    aria-label="Back to homepage"
                    className="link-styled"
                  >
                    privtext.me
                  </a>
                ]
              : [
                  'Back to ',
                  <span>&nbsp;</span>,
                  <a
                    href="/"
                    aria-label="Back to homepage"
                    className="link-styled"
                  >
                    privtext.me
                  </a>
                ]
          }
        />
      </div>
    </div>
  )
}

export default Message
