import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    // Fetch profile data from Django API
    axios
      .get("http://127.0.0.1:8000/api/profile/")
      .then((res) => setProfile(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (!profile) {
    return <div style={{ padding: "2rem" }}>Loading...</div>;
  }

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{profile.full_name}</h1>
      <h2>{profile.job_title}</h2>
      <p>{profile.short_bio}</p>
      {profile.avatar_url && (
        <img
          src={`http://127.0.0.1:8000${profile.avatar_url}`}
          alt="Avatar"
          style={{ width: "150px", borderRadius: "50%", marginTop: "1rem" }}
        />
      )}
    </div>
  );
}
