import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function NodePython() {
  const [response, setResponse] = useState("");
  const { user } = useSelector((state) => state.auth);

  const runPythonScript = async () => {
    const token = localStorage.getItem("token");
    const authHeader = `Bearer ${token}`;
    try {
      const res = await axios.get("http://172.25.160.235:2402/runPython",{
          headers: {
            Authorization: authHeader,
          },
      });
      setResponse(res.data);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Error occurred");
    }
  };

  return (
    <div className="field mt-5">
      <button
        onClick={runPythonScript}
        className="button is-success is-fullwidth border-primary"
        style={{ background: "rgba(227, 102, 12, 0.65)", borderRadius: "20px" }}
      >
        Run Python Script
      </button>
      <p>{response}</p>
    </div>
  );
}

export default NodePython;
