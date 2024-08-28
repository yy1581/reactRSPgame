import { useState } from 'react';
import ResetButton from './ResetButton';
import HandButton from './HandButton';
import { compareHand, generateRandomHand } from './utils';
import HandIcon from './HandIcon';
import './App.css';

const INITAL_VALUE = 'rock';

function getResult(me, other) {
  const comparison = compareHand(me, other);
  if (comparison > 0) return '승리';
  else if (comparison < 0) return '패배';
  else return '무승부';
}

function App() {
  const [hand, setHand] = useState(INITAL_VALUE);
  const [otherHand, setOtherHand] = useState(INITAL_VALUE);
  const [gameHistory, setGameHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [otherScore, setOtherScore] = useState(0);
  const [bet, setBet] = useState(1);

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    const comparison = compareHand(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
    if (comparison > 0) setScore(score + bet);
    else if (comparison < 0) setOtherScore(otherScore + bet); 
  }

  const handleClearClick = () => {
    setHand(INITAL_VALUE);
    setOtherHand(INITAL_VALUE);
    setGameHistory([]);
    setScore(0);
    setOtherScore(0);
    setBet(1);
  }

  const handleBetChange = (e) => {
    let num = Number(e.target.value);
    if (num > 9) num %= 10;
    if (num < 1) num = 1;
    num = Math.floor(num);
    setBet(num);
  }

  return (
    <div className="App">
      <h1>가위바위보</h1>
      <ResetButton onClick={handleClearClick} />
      <div className='App-scores'>
        <div className='score'>
          <div className='score-num'>
            {score}
          </div>
          <div className='score-name'>
            나
          </div>
        </div>
        <div className='vs'>:</div>
        <div className='score'>
          <div className='score-num'>
            {otherScore}
          </div>
          <div className='score-name'>
            상대
          </div>
        </div>
      </div>
      <div className='App-output'>
        <div className='App-output-inner'>
          <div className='output-hands'>
            <div className='output-hand'>
              <HandIcon className='hand' value={hand} />
            </div>
            <div className='output-vs'>
              VS
            </div>
            <div className='output-hand'>
              <HandIcon className='hand' value={otherHand} />
            </div>
          </div>
          <div className='multi-box'>
            배점
            <input className='multi' type='number' value={bet} min={1} max={9} onChange={handleBetChange}></input>
            배
          </div>
          <div className='history-box'>
            승부 기록
            <div className='history'>{gameHistory.join(', ')}</div>
          </div>
        </div>
      </div>
      <div className='handbtn-box'>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
