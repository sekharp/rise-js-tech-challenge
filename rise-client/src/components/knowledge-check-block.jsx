import React, { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty, startCase } from 'lodash';
import retakeIcon from './../images/retake-icon.png'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const KnowledgeCheckBlock = () => {
  const [knowledgeCheckData, setKnowledgeCheckData] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/knowledge-check-blocks`)
      .then((res) => res.data)
      .then((res) => {
        (res[0]).answers.map((a) => {
          if (a.isSelected) {
            setSelectedAnswer(a);
          }
          if (res[0].submitted) {
            setSubmitted(true);
          }
        })
        setKnowledgeCheckData(res[0])
      })
      .catch(console.error);
  }, []);

  const handleChange = (answer) => {
    setSelectedAnswer(answer);
    const data = { answerText: (answer)?.text };
    axios
      .put(
        `http://localhost:5000/knowledge-check-blocks/1`,
        {
            method: "PUT",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        }
      )
      .then((res) => res.data)
      .catch(error => console.log(error));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const data = {
      submitted: true,
      answerText: (selectedAnswer)?.text
    };
    axios
      .put(
          `http://localhost:5000/knowledge-check-blocks/1`,
          {
              method: "PUT",
              headers: {
                  'Content-type': 'application/json'
              },
              body: data
          }
      )
      .then((res) => res.data)
      .catch(error => console.log(error));
  }

  const takeAgain = () => {
    setSubmitted(false)
    setSelectedAnswer({})

    const data = {
      answerText: ''
    };
    axios
      .put(
          `http://localhost:5000/knowledge-check-blocks/1`,
          {
              method: "PUT",
              headers: {
                  'Content-type': 'application/json'
              },
              body: data
          }
      )
      .then((res) => res.data)
      .catch(error => console.log(error));
  }

  const isCorrectText = (selectedAnswer)?.isCorrect ? 'correct' : 'incorrect'

  console.log(isEmpty(selectedAnswer))

  return (
    <>
      <h3>Knowledge Check Block</h3>
      <div className='knowledge-check-block'>
        <p>{(knowledgeCheckData)?.question?.text}</p>
        <img className="knowledge-check-image" alt="knowledge-check-img" src={(knowledgeCheckData)?.question?.media?.url} />
        <div className="border"></div><br/>
        {(knowledgeCheckData)?.answers?.map((a, i) => {
          return (
            <div
              className={`selector select-answer-box ${a === selectedAnswer && 'selected'} ${submitted && (a?.isCorrect ? 'correct' : 'incorrect')}`}
              key={i}
              onClick={() => handleChange(a)}
            >
              <input type="radio" className='radio-custom' checked={a?.text === (selectedAnswer)?.text} disabled={submitted} />
              <label className='radio-custom-label'>
                {a.text}
              </label>
            </div>
            )
        })}<br/>
        <div className='btn-container'>
          <button className="btn" disabled={isEmpty(selectedAnswer) || submitted} type="submit" onClick={handleSubmit}>Submit</button><br/><br/>
        </div>
        {submitted && (
          <div className='results-container'>
            <div className='result-box'>
              {selectedAnswer?.isCorrect ?
                <div>
                  <CheckCircleOutlineIcon />
                  <p>{startCase(isCorrectText)}</p>
                </div> :
                <div>
                  <HighlightOffIcon />
                  <p>{startCase(isCorrectText)}</p>
                </div>
              }
              <p className='feedback'>{(knowledgeCheckData)?.feedback}</p>
            </div>
            <div>
              <p>Take Again</p>
              <a onClick={takeAgain}>
                <img src={retakeIcon} className='retake-icon' />
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default KnowledgeCheckBlock;