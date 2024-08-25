import { useState } from 'react';
import Button from './Button';
import HandButton from './HandButton';
import { compareHand, generateRandomHand } from './utils';
import HandIcon from './HandIcon';

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

  const handleButtonClick = (nextHand) => {
    const nextOtherHand = generateRandomHand();
    const nextHistoryItem = getResult(nextHand, nextOtherHand);
    setHand(nextHand);
    setOtherHand(nextOtherHand);
    setGameHistory([...gameHistory, nextHistoryItem]);
  }

  const handleClearClick = () => {
    setHand(INITAL_VALUE);
    setOtherHand(INITAL_VALUE);
    setGameHistory([]);
  }

  return (
    <div>
      <Button onClick={handleClearClick}>처음부터</Button>
      <div>
        {score} : {otherScore}
      </div>
      <div>
        <HandIcon value={hand} />
        VS
        <HandIcon value={otherHand} />
      </div>
      <p>승부 기록: {gameHistory.join(', ')}</p>
      <div>
        <HandButton value="rock" onClick={handleButtonClick} />
        <HandButton value="scissor" onClick={handleButtonClick} />
        <HandButton value="paper" onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default App;
