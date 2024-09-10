"use client";
import React, { useState } from "react";

const ChallengeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    StartDate: "",
    EndDate: "",
    level: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description); // Added description to form data
    form.append("StartDate", formData.StartDate);
    form.append("EndDate", formData.EndDate);
    form.append("level", formData.level);
    form.append("image", formData.image);

    try {
      let result = await fetch("/api/challenge", {
        method: "POST",
        body: form,
      });
      result = await result.json();
      if (result.success) {
        alert("Product Added Successfully");
      } else {
        alert("Failed to Add Product");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <div className="w-full text-2xl font-bold bg-slate-200 flex justify-center p-10">
        Challenge Details
      </div>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="w-full max-w-lg p-5"
      >
        <div className="flex flex-col text-xl">
          <label className="pt-5 pb-2">Challenge Name</label>
          <input
            className="w-full border-2 border-black p-2"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <label className="pt-5 pb-2">Start Date</label>
          <input
            className="w-full border-2 border-black p-2"
            type="date"
            name="StartDate"
            value={formData.StartDate}
            onChange={handleChange}
          />
          <label className="pt-5 pb-2">End Date</label>
          <input
            className="w-full border-2 border-black p-2"
            type="date"
            name="EndDate"
            value={formData.EndDate}
            onChange={handleChange}
          />
          <label className="pt-5 pb-2">Description</label>{" "}
          {/* Added description input */}
          <textarea
            className="w-full border-2 border-black p-2"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <label className="pt-5 pb-2">Image</label>
          <input
            className="w-full border-2 border-black p-2"
            type="file"
            name="image"
            onChange={handleChange}
          />
          <label className="pt-5 pb-2">Level</label>
          <select
            className="w-full border-2 border-black p-2"
            name="level"
            value={formData.level}
            onChange={handleChange}
          >
            <option value="">Select Level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
          <button
            type="submit"
            className="mt-5 bg-blue-500 text-white p-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChallengeForm;
