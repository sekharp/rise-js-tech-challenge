import React, { useState, useEffect } from "react";
import axios from "axios";

const KnowledgeCheckBlock = () => {
  const [knowledgeCheckData, setKnowledgeCheckData] = useState({});
  const [selectedAnswer, setSelectedAnswer] = useState({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:5000/knowledge-check-blocks`)
      .then((res) => res.data)
      .then((res) => {
        setKnowledgeCheckData(res[0] as any)
      })
      .catch(console.error);
  }, []);

  const handleChange = (answer: any) => {
    setSelectedAnswer(answer);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmitted(true);
  }

  console.log(selectedAnswer)

  return (
    <>
      <h3>Knowledge Check Block</h3>
      <div className='knowledge-check-block'>
        <p>{(knowledgeCheckData as any)?.question?.text}</p>
        <img className="knowledge-check-image" alt="knowledge-check-img" src={(knowledgeCheckData as any)?.question?.media?.url} />
        {(knowledgeCheckData as any)?.answers?.map((a: any, i: any) => {
          return (<div className={`option ${a?.text}`} key={i}>
            <label>
              <input type="radio" checked={a?.text === (selectedAnswer as any)?.text} onChange={() => handleChange(a)}/>
              {a.text}
            </label>
          </div>)
        })}
        <button className="btn" disabled={false} type="submit" onClick={handleSubmit}>Submit</button>
        {submitted && (
          <div>
            {(selectedAnswer as any)?.isCorrect ? 'Correct' : 'Incorrect'}<br/>
            {(knowledgeCheckData as any)?.feedback}
          </div>
        )}
      </div>
    </>
  );
};

export default KnowledgeCheckBlock;