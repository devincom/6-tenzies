import React, { useEffect } from 'react';
import './App.css';
import Dice from './Dice'
import {nanoid} from 'nanoid'
import Confetti from 'react-confetti'

function App() {
  const [allDices, setAllDices] = React.useState(generateDices());
  const [tenzies, setTenzies] = React.useState(false);

  useEffect(() => {
    const firstValue = allDices[0].value
    const allSame = allDices.every(die => die.value === firstValue)
    const allHeld = allDices.every(die => die.isHeld)
    if (allHeld && allSame){
      console.log("You Won")
      setTenzies(true)
    }
  }, [allDices])

  function randomDieNum() {
    return Math.ceil(Math.random() * 10)
  }

  function generateDices() {
    const dices = [];
    for (let i = 0; i < 10; i++) {
      dices.push(
        {
          id : nanoid(),
          value: randomDieNum(),
          isHeld: false
        }
      )
    }
    return dices;
  }

  function holdDie(diceId) {
    setAllDices(prevDices => prevDices.map(die => {
      return die.id === diceId ?
       {...die, isHeld: !die.isHeld} :
       die
    }))
  }

  function roll() {
    if (tenzies) {
      setAllDices(generateDices())
      setTenzies(false)
    } else {
      setAllDices(prevDices => prevDices.map(die => {
        return die.isHeld ? die : {...die, value: randomDieNum()}
      }))
    }
  }


  const allDicesElement = allDices.map(dice => <Dice dice={dice} holdDie={holdDie} />)

  return (
   <main>
    {tenzies && <Confetti className='celeb'/>}
    <h1>Tenzies</h1>
    <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
    <div className='die-container'>{allDicesElement}</div>
    <button className='roll-dice'
      onClick={roll}
    >{tenzies ? "New Game" : "Roll"}</button>
   </main>
  );
}

export default App;
