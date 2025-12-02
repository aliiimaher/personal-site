import { useEffect, useState } from "react";
import api, { API_BASE_URL } from "../api";

export default function Home() {
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
    <section className="hero">
      <div className="hero-main">
        <div className="hero-kicker">Portfolio</div>
        <h1 className="hero-name">{profile.full_name}</h1>
        <div className="hero-role">{profile.job_title}</div>
        <p className="hero-bio" style={{ direction: "rtl" }}>{profile.short_bio}</p>

        <div className="hero-actions">
          <a href="#contact" className="btn-primary">
            Contact me
          </a>
          <a href="#portfolio" className="btn-ghost">
            View projects
          </a>
        </div>
      </div>

      <div className="hero-avatar-card">
        <div className="hero-avatar-inner">
          {profile.avatar_url && (
            <img
              src={`${API_BASE_URL}${profile.avatar_url}`}
              alt={profile.full_name}
            />
          )}
        </div>
      </div>
    </section>
  );
}
