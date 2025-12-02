import { useState } from "react";
import api from "../api";

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
      await api.post("/contact/", form, {
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
    <section id="contact">
      <h1 className="section-title">Contact Me</h1>
      <div className="card">
        <form className="form" onSubmit={handleSubmit}>
          <input
            className="input"
            type="text"
            name="name"
            placeholder="Your name"
            value={form.name}
            onChange={handleChange}
          />
          <input
            className="input"
            type="email"
            name="email"
            placeholder="Your email"
            value={form.email}
            onChange={handleChange}
          />
          <textarea
            className="textarea"
            name="message"
            placeholder="Your message"
            rows={5}
            value={form.message}
            onChange={handleChange}
          />
          <button type="submit" className="btn-primary">
            Send message
          </button>
        </form>
        {status && <div className="status">{status}</div>}
      </div>
    </section>
  );
}
