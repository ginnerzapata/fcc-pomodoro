import React from 'react'
import play from './img/play.svg'
import next from './img/next.svg'
import pause from './img/pause.svg'
import { useState, useRef } from 'react'

export default function Clock(props) {
  function padTime(time) {
    return time.toString().padStart(2, '0')
  }

  let intervalRef = useRef(null)

  const [title, setTitle] = useState(props.message)
  const [timeLeft, setTimeLeft] = useState(props.value * 60)

  const minutes = padTime(Math.floor(timeLeft / 60))
  const seconds = padTime(timeLeft - minutes * 60)

  function startTimer() {
    if (intervalRef.current !== null) return

    setTitle(`You're doing great!`)
    props.handleIsRunning(true)
    intervalRef.current = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft >= 1) return timeLeft - 1
        resetTimer()
        return 0
      })
    }, 1000)
  }

  function stopTimer() {
    if (intervalRef.current === null) return

    clearInterval(intervalRef.current)
    intervalRef.current = null
    props.handleIsRunning(false)
    setTitle('Keep it up!')
  }

  function resetTimer() {
    clearInterval(intervalRef.current)
    intervalRef.current = null
    setTimeLeft(props.value * 60)
    props.handleIsRunning(false)
    props.handleIsWorking()
  }
  return (
    <>
      <p id="timer">
        {minutes}:{seconds}
      </p>

      <p id="message">{title}</p>
      <div className="controllers">
        {!props.isRunning && <img src={play} alt="play" onClick={startTimer} />}
        {props.isRunning && <img src={pause} alt="pause" onClick={stopTimer} />}
        <img src={next} alt="next" onClick={resetTimer} />
      </div>
    </>
  )
}
