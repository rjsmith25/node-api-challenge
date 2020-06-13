import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/projects")
      .then(res => {
        setProjects(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <div className="container">
        <h1 className="title">Projects</h1>
        <div className="projects">
          {projects.map(project => {
            return (
              <div key={project.id} className="project">
                <p>{project.name}</p>
                <p>{project.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
