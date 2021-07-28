import React, { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty } from 'lodash';
import ResultsContainer from './results-container'

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
          if (a?.isSelected) {
            setSelectedAnswer(a);
          }
          if (res[0]?.submitted) {
            setSubmitted(true);
          }
        })
        setKnowledgeCheckData(res[0])
      })
      .catch(console.error);
  }, []);

  const handleChange = (answer) => {
    setSelectedAnswer(answer);
    const data = { answerText: answer?.text };
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
      answerText: selectedAnswer?.text
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

  return (
    <>
      <h3>Knowledge Check Block</h3>
      <div className='knowledge-check-block'>
        <p>{knowledgeCheckData?.question?.text}</p>
        <img className="knowledge-check-image" alt="knowledge-check-img" src={knowledgeCheckData?.question?.media?.url} />
        <div className="border"></div><br/>
        {knowledgeCheckData?.answers?.map((a, i) => {
          return (
            <div
              className={`selector select-answer-box ${a === selectedAnswer && 'selected'} ${submitted && (a?.isCorrect ? 'correct' : 'incorrect')}`}
              key={i}
              onClick={() => !submitted && (handleChange(a))}
            >
              <input type="radio" className='radio-custom' checked={a?.text === selectedAnswer?.text} disabled={submitted} />
              <label className='radio-custom-label'>
                {a.text}
              </label>
            </div>
            )
        })}<br/>
        <div className='btn-container'>
          <button className="btn" disabled={isEmpty(selectedAnswer) || submitted} type="submit" onClick={handleSubmit}>Submit</button><br/><br/>
        </div>
        <ResultsContainer
          submitted={submitted}
          selectedAnswer={selectedAnswer}
          feedback={knowledgeCheckData?.feedback}
          takeAgain={takeAgain}
        />
      </div>
    </>
  );
};

export default KnowledgeCheckBlock;