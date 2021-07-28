import React from "react";
import { isEmpty, startCase } from 'lodash';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ReplayIcon from '@material-ui/icons/Replay';

const ResultsContainer = ({
  submitted,
  selectedAnswer,
  feedback,
  takeAgain
}) => {
  const isCorrectText = selectedAnswer?.isCorrect ? 'correct' : 'incorrect'

  return (
    <>
      {submitted && (
        <div className='results-container'>
          <div className='result-box'>
            {selectedAnswer?.isCorrect ?
              <div>
                <CheckCircleOutlineIcon style={{ fontSize: 100 }}/>
                <p><strong>{startCase(isCorrectText)}</strong></p>
              </div> :
              <div>
                <HighlightOffIcon style={{ fontSize: 100 }}/>
                <p><strong>{startCase(isCorrectText)}</strong></p>
              </div>
            }
            <p className='feedback'>{feedback}</p>
          </div>
          <div>
            <p><strong>Take Again</strong></p>
            <a onClick={takeAgain}>
              <ReplayIcon style={{ fontSize: 50 }}/>
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultsContainer;