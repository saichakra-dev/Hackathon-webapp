"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const EditChallenge = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    StartDate: "",
    EndDate: "",
    level: "",
    image: null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/challenge/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.success) {
          setFormData({
            name: result.challenge.name,
            description: result.challenge.description,
            StartDate: new Date(result.challenge.StartDate)
              .toISOString()
              .split("T")[0],
            EndDate: new Date(result.challenge.EndDate)
              .toISOString()
              .split("T")[0],
            level: result.challenge.level,
            image: null,
          });
        } else {
          console.error("Failed to fetch challenge data");
          setError("Failed to fetch challenge data");
        }
      } catch (error) {
        console.error("Error fetching challenge data", error);
        setError("Error fetching challenge data");
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const data = {
      name: formData.name,
      description: formData.description,
      StartDate: formData.StartDate,
      EndDate: formData.EndDate,
      level: formData.level,
    };

    try {
      const response = await fetch(`/api/challenge/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      if (result.success) {
        alert("Challenge Updated Successfully");
        router.push(`/`);
      } else {
        alert("Failed to Update Challenge");
      }
    } catch (error) {
      console.error("Error updating challenge", error);
      setError("Error updating challenge");
    }
  };

  return (
    <>
      <div className="min-h-screen w-full flex flex-col px-20 justify-start">
        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="w-full max-w-lg p-5"
        >
          {error && <div className="text-red-600 mb-4">{error}</div>}
          <div className="flex flex-col text-xl">
            <label className="pt-5 pb-2">Challenge Name</label>
            <input
              className="w-full border-2 border-slate-300 rounded-lg p-2"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <label className="pt-5 pb-2">Start Date</label>
            <input
              className="w-full border-2 border-slate-300 rounded-lg p-2"
              type="date"
              name="StartDate"
              value={formData.StartDate}
              onChange={handleChange}
              required
            />
            <label className="pt-5 pb-2">End Date</label>
            <input
              className="w-full border-2 border-slate-300 rounded-lg p-2"
              type="date"
              name="EndDate"
              value={formData.EndDate}
              onChange={handleChange}
              required
            />
            <label className="pt-5 pb-2">Description</label>
            <textarea
              className="w-full border-2 border-slate-300 rounded-lg p-2 h-50"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <label className="pt-5 pb-2">Image</label>
            <input
              className="w-full border-2 border-slate-300 rounded-lg p-2"
              type="file"
              name="image"
              onChange={handleChange}
            />
            <label className="pt-5 pb-2">Level</label>
            <select
              className="w-full border-2 border-slate-300 rounded-lg p-2"
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
            >
              <option value="">Select Level</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
            <button
              type="submit"
              className="mt-10 bg-green-600 font-bold text-white p-2 rounded-xl text-lg w-1/2"
            >
              Update Challenge
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditChallenge;
