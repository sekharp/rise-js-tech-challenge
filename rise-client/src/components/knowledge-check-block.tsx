import React, { useState, useEffect } from "react";
import axios from "axios";
import { isEmpty, startCase } from 'lodash';
import retakeIcon from './../images/retake-icon.png'

const KnowledgeCheckBlock = () => {
  const [knowledgeCheckData, setKnowledgeCheckData] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/knowledge-check-blocks`)
      .then((res) => res.data)
      .then((res) => {
        (res[0] as any).answers.map((a: any) => {
          if (a.isSelected) {
            setSelectedAnswer(a);
          }
          if (res[0].submitted) {
            setSubmitted(true);
          }
        })
        setKnowledgeCheckData(res[0] as any)
      })
      .catch(console.error);
  }, []);

  const handleChange = (answer: any) => {
    setSelectedAnswer(answer);
    const data = { answerText: (answer as any)?.text };
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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);

    const data = {
      submitted: true,
      answerText: (selectedAnswer as any)?.text
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
    setSubmitted(false) as any
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

  const isCorrect = (selectedAnswer as any)?.isCorrect ? 'correct' : 'incorrect'

  console.log(knowledgeCheckData)

  return (
    <>
      <h3>Knowledge Check Block</h3>
      <div className='knowledge-check-block'>
        <p>{(knowledgeCheckData as any)?.question?.text}</p>
        <img className="knowledge-check-image" alt="knowledge-check-img" src={(knowledgeCheckData as any)?.question?.media?.url} />
        <div className="border"></div><br/>
        {(knowledgeCheckData as any)?.answers?.map((a: any, i: any) => {
          return (
            <div className={`selector select-answer-box ${submitted && (a?.isCorrect ? 'correct' : 'incorrect')}`} key={i} onClick={() => handleChange(a)}>
              <input type="radio" className='radio-custom' checked={a?.text === (selectedAnswer as any)?.text} />
              <label className='radio-custom-label'>
                {a.text}
              </label>
            </div>
            )
        })}<br/>
        <div className='btn-container'>
          <button className="btn" disabled={!isEmpty(selectedAnswer) && submitted} type="submit" onClick={handleSubmit}>Submit</button><br/><br/>
        </div>
        {submitted && (
          <div className='results-container'>
            {startCase(isCorrect)}<br/><br/>
            {(knowledgeCheckData as any)?.feedback}<br/><br/>
            Take Again<br/><br/>
            <a onClick={takeAgain}>
              <img src={retakeIcon} className='retake-icon' />
            </a>
          </div>
        )}
      </div>
    </>
  );
};

export default KnowledgeCheckBlock;