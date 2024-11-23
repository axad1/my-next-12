import Router from "next/router";
import { useState } from "react";

export default function New() {
  const [form, setForm] = useState({
    superHero: "",
    realName: "",
  });

  const handleFormChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/api/hero", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log("res => ", data);
    if (data.status) Router.push("/hero");
    else alert("error");
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="superHero">Super Hero</label>
        <input
          type="text"
          id="superHero"
          name="superHero"
          value={form.superHero}
          required
          onChange={handleFormChange}
        />
        <label htmlFor="realName">Real Name</label>
        <input
          type="text"
          id="realName"
          name="realName"
          value={form.realName}
          required
          onChange={handleFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
