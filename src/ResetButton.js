import resetImg from './assets/ic-reset.svg';
import './ResetButton.css';

function ResetButton({ onClick }) {
  return <img className='resetButton' src={resetImg} onClick={onClick} />
}

export default ResetButton;