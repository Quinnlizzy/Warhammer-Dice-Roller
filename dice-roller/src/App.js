// src/App.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons';
import './App.css';


const diceIcons = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix];

function App() {
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [diceResults, setDiceResults] = useState([]);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    setTimeout(() => {
    const results = [];
    for (let i = 0; i < numberOfDice; i++) {
      const result = Math.floor(Math.random() * 6) + 1;
      results.push(result);
    }
    setDiceResults(results);
    setRolling(false);
    }, 1000); 
  };

  return (
    <div className="App">
      <h1>Dice Roller App</h1>
      <label>
        Number of 6-sided dice:
        <input
          type="number"
          value={numberOfDice}
          onChange={(e) => setNumberOfDice(Math.max(1, parseInt(e.target.value, 10)))}
        />
      </label>
      <button onClick={rollDice}>Roll Dice</button>
      {diceResults.length > 0 && (
        <div>
          <h2>Results:</h2>
          <div className={`dice-container ${rolling ? 'rolling' : ''}`}>
            {diceResults.map((result, index) => (
              <FontAwesomeIcon key={index} icon={diceIcons[result - 1]} size="3x" />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

