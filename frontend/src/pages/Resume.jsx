import { useEffect, useState } from "react";
import axios from "axios";

export default function Resume() {
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    // Fetch skills
    axios
      .get("http://127.0.0.1:8000/api/skills/")
      .then((res) => setSkills(res.data))
      .catch((err) => console.error(err));

    // Fetch experiences
    axios
      .get("http://127.0.0.1:8000/api/experiences/")
      .then((res) => setExperiences(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Resume</h1>

      <section>
        <h2>Skills</h2>
        <ul>
          {skills.map((skill, index) => (
            <li key={index}>
              {skill.name} - {skill.level}%
              {skill.category && ` (${skill.category})`}
            </li>
          ))}
        </ul>
      </section>

      <section style={{ marginTop: "2rem" }}>
        <h2>Experience</h2>
        <ul>
          {experiences.map((exp, index) => (
            <li key={index}>
              <strong>
                {exp.position} @ {exp.company}
              </strong>
              <br />
              <span>
                {exp.start_date} -{" "}
                {exp.is_current ? "Present" : exp.end_date || "N/A"}
              </span>
              <br />
              <span>{exp.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
