import React, { useState, useEffect } from 'react'

const Timer = ({ milliseconds, setMessageIsDestroyed, messageOption }) => {
  const [secondsRemainingGlobal, setSecondsRemainingGlobal] = useState(milliseconds / 1000)
  const [secondsRemainingGlobalNegative, setSecondsRemainingGlobalNegative] = useState(-1)
  const [time, setTime] = useState(new Date())
  const [countdown, setCountdown] = useState({
    min: '00',
    sec: '00'
  })

  useEffect(() => setTime(new Date()), [])

  useEffect(() => {
    if (secondsRemainingGlobal < 1 || secondsRemainingGlobalNegative > 1) {
      setMessageIsDestroyed(true)
    } else {
      const timeout = setTimeout(() => {
        const elapsedTime = (Date.now() - time) - milliseconds
        const secondsRemaining =  Math.round(Math.abs(elapsedTime / 1000))
        const secondsRemainingNegative =  Math.round(elapsedTime / 1000)

        let minutes = Math.floor(secondsRemaining / 60)
        let seconds = secondsRemaining - minutes * 60
        minutes = minutes < 10 ? "0" + minutes : minutes
        seconds = seconds < 10 ? "0" + seconds : seconds

        setSecondsRemainingGlobal(secondsRemaining)
        setSecondsRemainingGlobalNegative(secondsRemainingNegative)

        setCountdown({
          sec: seconds,
          min: minutes
        })
      }, 1000)

      return () => clearTimeout(timeout)
    }
  })

  return (
    <div className="timer">
      <div className="timer-wrapper">
        <span className="timer-message">
          { messageOption === "killOnFirstReq" ? "This message can't be opened again." : "Anyone with the link can see this message." }
        </span>
        <span>
          It will self-destruct in:<strong> {countdown.min}:{countdown.sec}</strong>
        </span>
      </div>
    </div>
  )
}

export default Timer
