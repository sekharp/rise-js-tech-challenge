import React, { useState, useEffect } from "react";
import axios from "axios";

const KnowledgeCheckBlock = () => {
  const [knowledgeCheckData, setKnowledgeCheckData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/knowledge-check-blocks`)
      .then((res) => res.data)
      .then((res) => {
        setKnowledgeCheckData(res)
      })
      .catch(console.error);
  }, []);

  console.log(knowledgeCheckData)

  return (
    <>
      <h3>Knowledge Check Block</h3>
      <div className='knowledge-check-block'>
        {JSON.stringify(knowledgeCheckData)}
      </div>
    </>
  );
};

export default KnowledgeCheckBlock;