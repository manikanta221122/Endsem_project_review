import React, { useState } from "react";

function AddItem({ addItem }) {
  const [form, setForm] = useState({
    name: "",
    quantity: "",
    price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.quantity || !form.price) {
      alert("Please fill all fields");
      return;
    }

    addItem({
      name: form.name,
      quantity: Number(form.quantity),
      price: Number(form.price),
    });

    setForm({ name: "", quantity: "", price: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />

      <input
        type="number"
        placeholder="Quantity"
        value={form.quantity}
        onChange={(e) => setForm({ ...form, quantity: e.target.value })}
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
      />

      <button type="submit">Add</button>
    </form>
  );
}

export default AddItem;