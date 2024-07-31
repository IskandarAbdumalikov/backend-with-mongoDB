import React, { useState } from "react";
import "./createModule.scss";

const CreateModule = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    username: "",
    password: "",
    age: "",
    url: "",
    gender: "",
    isActive: true,
    budget: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreate(formData);
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="fname"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lname"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="url"
            placeholder="Profile Image URL"
            onChange={handleChange}
          />
          <select name="gender" onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <input
            type="number"
            name="budget"
            placeholder="Budget"
            onChange={handleChange}
            required
          />
          <button type="submit">Create</button>
          <button style={{ background: "red" }} onClick={onClose} type="button">
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateModule;
