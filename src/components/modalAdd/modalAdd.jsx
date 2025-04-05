import React, { useState } from "react";

const ModalAdd = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({ name: "", quantity: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onAdd(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <h2>Add Stock Item</h2>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
      />
      <button onClick={handleSubmit}>Add</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ModalAdd;
