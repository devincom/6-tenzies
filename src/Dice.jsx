import React from 'react'

export default function Dice({ dice, holdDie }) {

    const styles = {
        backgroundColor: dice.isHeld ? "#59E391" : "white"
    }

  return (
    <div className='dice' style={styles}
        onClick={(e) => holdDie(dice.id)}
    >
        <h3>{dice.value}</h3>
    </div>
  )
}
