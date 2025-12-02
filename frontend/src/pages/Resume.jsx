import { useEffect, useState } from "react";
import api from "../api";

export default function Resume() {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    api
      .get("/skills/")
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err));

    api
      .get("/experiences/")
      .then((res) => setExperiences(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section>
      <h1 className="section-title">Resume</h1>

      <div className="card" style={{ marginBottom: "1.8rem" }}>
        <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.1rem" }}>
          Skills
        </h2>
        <div className="grid-skills">
          {skills.map((skill, index) => (
            <div key={index} className="skill-pill">
              <span>
                {skill.name}
                {skill.category ? ` · ${skill.category}` : ""}
              </span>
              <div className="skill-level-bar">
                <div
                  className="skill-level-fill"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginTop: 0, marginBottom: "1rem", fontSize: "1.1rem" }}>
          Experience
        </h2>
        <div className="timeline">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-item-title">
                {exp.position} @ {exp.company}
              </div>
              <div className="timeline-item-meta">
                {exp.start_date} - {exp.is_current ? "Present" : exp.end_date}
              </div>
              {exp.description && (
                <div style={{ fontSize: "0.9rem", direction: "rtl" }}>{exp.description}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
