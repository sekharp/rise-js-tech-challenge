import React, { useState, useEffect } from "react";
import axios from "axios";

const KnowledgeCheckBlock = () => {
  const [knowledgeCheckData, setKnowledgeCheckData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/knowledge-check-blocks`)
      .then((res) => res.data)
      .then((res) => {
        setKnowledgeCheckData(res[0] as any)
      })
      .catch(console.error);
  }, []);

  console.log(knowledgeCheckData)

  return (
    <>
      <h3>Knowledge Check Block</h3>
      <div className='knowledge-check-block'>
        <p>What is this a picture of?</p>
        <img className="knowledge-check-image" alt="knowledge-check-img" src={(knowledgeCheckData as any)?.question?.media?.url} />
        {(knowledgeCheckData as any)?.answers?.map((a, i) => {
          return (<div className={`option ${a?.text}`} key={i}>
            <label>
              <input type="radio" checked={a?.text} />
              {a.text}
            </label>
          </div>)
        })}
      </div>
    </>
  );
};

export default KnowledgeCheckBlock;