import { useEffect, useState } from "react";
import axios from "axios";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch projects
    axios
      .get("http://127.0.0.1:8000/api/projects/")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Portfolio</h1>
      <div
        style={{
          display: "grid",
          gap: "1.5rem",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "1rem",
            }}
          >
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <p>
              <strong>Technologies:</strong> {project.technologies}
            </p>
            {project.image_url && (
              <img
                src={`http://127.0.0.1:8000${project.image_url}`}
                alt={project.title}
                style={{ width: "100%", marginTop: "0.5rem" }}
              />
            )}
            {project.link && (
              <p>
                <a href={project.link} target="_blank" rel="noreferrer">
                  View project
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
