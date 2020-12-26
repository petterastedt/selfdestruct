import React, { useState, useEffect } from 'react'
import Timer from './../components/Timer/Timer'
import MessageBox from './../components/MessageBox/MessageBox'
import Footer from './../components/Footer/Footer'

const Message = () => {
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [messageOption, setMessageOption] = useState("")
  // const [isFirstRequest, setIsFirstRequest] = useState("")
  const [messageIsDestroyed, setMessageIsDestroyed] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const pathName = window.location.pathname
        const messageSecret = pathName.substring(pathName.lastIndexOf('/') + 1)

        if (messageSecret.length > 16) {
          const url = process.env.NODE_ENV === 'production' ? '/api/message' : 'http://localhost:5000/api/message'
          const message = await fetch(`${url}/?secret=${messageSecret}`, {
            method: 'POST'
          })

          const messageJson = await message.json()

          if (messageJson.success) {
            const { textContent, timeLeft, options, name } = messageJson.item

            if (options.startImmediately || options.startTimerOnFirstReq) {
              setMessageOption('startImmediately')
            } else if (options.killOnFirstReq) {
              setMessageOption('killOnFirstReq')
            }

            setMessage(textContent)
            setName(name)
            setTimeLeft(timeLeft)
          } else {
            setError(messageJson.message)
          }
        } else {
          setError("Invalid secret")
        }
      } catch(e) {
        setError("Critical error")
        console.log(e)
      }
    })()
  }, [])

  return (
    <div className="container message-page">
      <div className="pageWrapper centerComponent centerComponentVertically">
        { message &&
          <MessageBox
            message={message}
            messageIsDestroyed={messageIsDestroyed}
            name={name}
          />
        }
        { timeLeft &&
          <Timer
            messageOption={messageOption}
            milliseconds={timeLeft}
            setMessageIsDestroyed={setMessageIsDestroyed}
          />
        }
        { error && <h2>{ error }</h2> }
        <br />
        <Footer
          footerMessage={!error ? ["This message was brought to you by", <span>&nbsp;</span>, <a href="/" className="link-styled">privtext.me</a>] : ["Back to ", <span>&nbsp;</span>, <a href="/" aria-label="Back to homepage" alt="Back to homepage" className="link-styled">privtext.me</a>]}
        />
      </div>
    </div>
  )
}

export default Message