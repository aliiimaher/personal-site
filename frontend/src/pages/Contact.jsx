import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      await axios.post("http://127.0.0.1:8000/api/contact/", form, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setStatus("Your message has been sent.");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      console.error(error);
      setStatus("Failed to send message.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Contact Me</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Your email"
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your message"
          rows={5}
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">Send</button>
      </form>
      {status && <p style={{ marginTop: "1rem" }}>{status}</p>}
    </div>
  );
}
