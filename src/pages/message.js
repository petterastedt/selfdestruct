import React, { useState, useEffect } from 'react'
import Timer from './../components/Timer/Timer'
import Header from './../components/Header/Header'
import MessageBox from './../components/MessageBox/MessageBox'
import Footer from './../components/Footer/Footer'

const Message = () => {
  const [message, setMessage] = useState("")
  const [name, setName] = useState("")
  const [messageOption, setMessageOption] = useState("")
  const [isFirstRequest, setIsFirstRequest] = useState("")
  const [messageIsDestroyed, setMessageIsDestroyed] = useState(false)
  const [timeLeft, setTimeLeft] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    (async () => {
      try {
        const pathName = window.location.pathname
        const messageSecret = pathName.substring(pathName.lastIndexOf('/') + 1)

        if (messageSecret.length > 16) {
          const message = await fetch(`/api/message/?secret=${messageSecret}`, {
            method: 'POST'
          })

          const messageJson = await message.json()

          if (messageJson.success) {
            const { textContent, timeLeft, options, isFirstReq, name } = messageJson.item
            let messageOptionIs

            if (options.startImmediately || options.startTimerOnFirstReq) {
              messageOptionIs = "startImmediately"
            } else if (options.killOnFirstReq) {
              messageOptionIs = "killOnFirstReq"
            }

            setIsFirstRequest(isFirstReq)
            setMessage(textContent)
            setMessageOption(messageOptionIs)
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
        { error && <h2>{ error } </h2> }
        <br />
        <Footer
          footerMessage={!error ? ["This message was brought to you by ", <a href="/" className="link-styled">privtext.me</a>] : ["Back to ", <a href="/" className="link-styled">privtext.me</a>]}
        />
      </div>
    </div>
  )
}

export default Message