import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'

const Hello = (props) => {
   console.log(props)
  return (
    <div>
      {!props.age && <p>Hello {props.name} </p>}
      {props.age && <p>Hello {props.name}, you are {props.age} years old</p>}
    </div>
  )
}

const App = () => {
  const name = 'Peter'
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name="Alice" age={25} />
      <Hello name="Bob" age={age+5} />
      <Hello name="Charlie" />
    </div>
  )
}

export default App
