import { useState, useCallback } from 'react'
import Clock from './Clock'

function App() {
  const [workTimer, setWorkTimer] = useState(25)
  const [breakTimer, setBreakTimer] = useState(5)
  const [isWorking, setIsWorking] = useState(true)
  const [isRunning, setisRunnning] = useState(false)
  const [inputValues, setInputValues] = useState({
    workTimer: workTimer,
    breakTimer: breakTimer,
  })
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const handleInputs = (e) => {
    const value =
      e.target.value < 1 ? 1 : e.target.value > 60 ? 60 : e.target.value
    setInputValues({ ...inputValues, [e.target.name]: value })
    if (e.target.name === 'workTimer') setWorkTimer(value)
    if (e.target.name === 'breakTimer') setBreakTimer(value)
    forceUpdate()
  }
  const handleIsWorking = () => {
    setIsWorking((prev) => !prev)
  }
  const handleIsRunning = (value) => {
    setisRunnning(value)
  }
  return (
    <div className="App">
      <header>
        <h1>Pomodoro Clock</h1>
      </header>
      <div className="container">
        {isWorking && (
          <Clock
            value={workTimer}
            handleIsWorking={handleIsWorking}
            handleIsRunning={handleIsRunning}
            isRunning={isRunning}
            message="Time to start working"
          />
        )}
        {!isWorking && (
          <Clock
            value={breakTimer}
            handleIsWorking={handleIsWorking}
            handleIsRunning={handleIsRunning}
            isRunning={isRunning}
            message="Time to take a break"
          />
        )}
        <hr />
        <div className="countInput">
          <label htmlFor="workTimer">
            Work time
            <input
              type="number"
              name="workTimer"
              id="workTime"
              min="1"
              max="60"
              value={inputValues.workTimer}
              onChange={handleInputs}
            />
          </label>
          <label htmlFor="breakTimer">
            Break time
            <input
              type="number"
              name="breakTimer"
              id="breakTime"
              min="1"
              max="60"
              value={inputValues.breakTimer}
              onChange={handleInputs}
            />
          </label>
        </div>
      </div>
      <footer>Designed and developed with ♥ by Ginner Zapata</footer>
    </div>
  )
}

export default App
