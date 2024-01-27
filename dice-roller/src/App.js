import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const diceIcons = [faDiceOne, faDiceTwo, faDiceThree, faDiceFour, faDiceFive, faDiceSix];

function App() {
  const [numberOfDice, setNumberOfDice] = useState(1);
  const [diceResults, setDiceResults] = useState([]);
  const [rolling, setRolling] = useState(false);
  const [key, setKey] = useState(0);
  const [targetRoll, setTargetRoll] = useState(3); // New state variable for the target roll


  const rollDice = () => {
    setRolling(true);
    setDiceResults([]); // Clear the previous dice results
    setTimeout(() => {
      const results = [];
      for (let i = 0; i < numberOfDice; i++) {
        const result = Math.floor(Math.random() * 6) + 1;
        results.push({ 
          value: result, 
          meetsTarget: targetRoll ? result >= targetRoll : true 
        });
      }
      setDiceResults(results);
      setNumberOfDice(results.filter(dice => dice.meetsTarget).length);
      setRolling(false);
      setKey(prevKey => prevKey + 1);
    }, 1000);
  };


  useEffect(() => {
    let lastShakeTimestamp = 0;
    const shakeThreshold = 25;

    const handleDeviceMotion = (event) => {
      const { accelerationIncludingGravity } = event;
      const acceleration = Math.sqrt(
        accelerationIncludingGravity.x ** 2 +
        accelerationIncludingGravity.y ** 2 +
        accelerationIncludingGravity.z ** 2
      );

      const now = Date.now();
      if (acceleration > shakeThreshold && now - lastShakeTimestamp > 1000) {
        rollDice();
        lastShakeTimestamp = now;
      }
    };

    window.addEventListener('devicemotion', handleDeviceMotion);

    return () => {
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, [rollDice]);

  return (
      <div className="App">
        <h1>In the Grim, Dark Future...</h1>
        <h2>There is only WAR!</h2>
        <h3>May the Warp take pity on you...</h3>
        <div>
            <button onClick={() => {
  setNumberOfDice(1);
  setTargetRoll(1);
  setDiceResults([]); // Remove all dice from the board
}}>
  Clear the Board
</button>
              </div>
        <label>
          Number of 6-sided dice:
          <input
            type="number"
            value={numberOfDice}
            onChange={(e) => setNumberOfDice(Math.max(1, parseInt(e.target.value, 10)))}
          />
        </label>
        <label>
  Target roll (1-6):
  <input
    type="number"
    value={targetRoll}
    onChange={(e) => setTargetRoll(Math.min(6, Math.max(1, parseInt(e.target.value, 10))))}
  />
</label>
<div>
        <button onClick={rollDice}>Throw. And may the Warp take pity on you...</button>
        </div>
        {diceResults.length > 0 && (
          <div>
            <h2>Results:</h2>
            <div key={key} className={`dice-container ${rolling ? 'rolling' : ''}`}>
            {diceResults.map((result, index) => (
  <FontAwesomeIcon key={index} icon={diceIcons[result.value - 1]} size="3x" className={result.meetsTarget ? 'meets-target' : 'does-not-meet-target'} />
))}
            </div>
          </div>
        )}
      </div>
    );
}

export default App;
