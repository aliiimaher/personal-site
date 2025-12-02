import { useEffect, useState } from "react";
import api from "../api";

export default function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    api
      .get("/profile/")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) {
    return <div className="card">Loading...</div>;
  }

  return (
    <section>
      <h1 className="section-title">About Me</h1>
      <div className="card card-muted">
        <p style={{ lineHeight: 1.7, direction:"rtl" }}>{profile.about_me}</p>
      </div>
    </section>
  );
}
