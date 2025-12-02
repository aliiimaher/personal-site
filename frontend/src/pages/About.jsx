import { useEffect, useState } from "react";
import axios from "axios";

export default function About() {
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
      <h1>About Me</h1>
      <p>{profile.about_me}</p>
    </div>
  );
}
