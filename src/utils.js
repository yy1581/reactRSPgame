const HANDS = ['rock', 'scissor', 'paper'];

const WINS = {
  rock: 'scissor',
  scissor: 'paper',
  paper: 'rock',
};


function compareHand(a, b) {
  if (WINS[a] === b) return 1;
  else if (WINS[b] === a) return -1;
  else return 0;
}

function random(n) {
  return Math.floor(Math.random() * n);
}

function generateRandomHand() {
  const idx = random(HANDS.length);
  return HANDS[idx];
}

export { compareHand, generateRandomHand};