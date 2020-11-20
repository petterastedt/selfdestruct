import React, { useState, useEffect } from 'react'
import Timer from './../components/Timer/Timer'
import MessageBox from './../components/MessageBox/MessageBox'
import Footer from './../components/Footer/Footer'

const Message = () => {
  const [message, setMessage] = useState("")
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
          console.log(messageJson)

          if (messageJson.success) {
            const { textContent, timeLeft, options, isFirstReq } = messageJson.item
            let messageOptionIs

            if (options.startImmediately || options.startTimerOnFirstReq) {
              messageOptionIs = "startImmediately"
            } else if (options.killOnFirstReq) {
              messageOptionIs = "killOnFirstReq"
            }

            setIsFirstRequest(isFirstReq)
            console.log(options)
            console.log(isFirstRequest)

            setMessage(textContent)
            setMessageOption(messageOptionIs)
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
    <div className="container">
      <div className="pageWrapper centerComponent centerComponentVertically">
        { message &&
          <MessageBox
            message={message}
            messageIsDestroyed={messageIsDestroyed}
          />
        }

        { timeLeft &&
          <Timer
            milliseconds={timeLeft}
            setMessageIsDestroyed={setMessageIsDestroyed}
          />
        }
        { error && <h2>{ error } </h2> }
        <br />
        <div className="feedbackMessage">
          <p className="feedbackMessage-text">{ messageOption === "killOnFirstReq" ? "Only you can see this message, it can't be opened again" : "" }</p>
          <p className="feedbackMessage-text">{ messageOption === "startImmediately" &&  "startTimerOnFirstReq" ? "Anyone with the link can see the message until the timer runs out" : "" }</p>
        </div>
        <Footer footerMessage={["This message was brought to you by ", <a href="/" className="link-styled">selfdestructth.is</a>]}/>
      </div>
    </div>
  )
}
export default Message
