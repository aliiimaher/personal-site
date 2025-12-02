import { useEffect, useState } from "react";
import api, { API_BASE_URL } from "../api";

export default function Portfolio() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api
      .get("/projects/")
      .then((res) => setProjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section id="portfolio">
      <h1 className="section-title">Portfolio</h1>
      <div className="grid-projects">
        {projects.map((project, index) => (
          <article key={index} className="card">
            {project.image_url && (
              <div className="project-card-image">
                <img
                  src={`${API_BASE_URL}${project.image_url}`}
                  alt={project.title}
                />
              </div>
            )}
            <div className="project-tech">{project.technologies}</div>
            <h3 style={{ marginTop: "0.4rem" }}>{project.title}</h3>
            <p style={{ fontSize: "0.92rem", color: "#9ca3af", direction: "rtl" }}>
              {project.description}
            </p>
            {project.link && (
              <p style={{ marginTop: "0.7rem" }}>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  View project
                </a>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
