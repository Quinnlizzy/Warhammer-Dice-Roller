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
  const [targetRoll, setTargetRoll] = useState(null); // 'No Target' option

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
        <h1>Dice Roller App</h1>
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
        <button onClick={rollDice}>Roll Dice</button>
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
