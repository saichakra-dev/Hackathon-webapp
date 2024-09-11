"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Function to format the date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${day}${
    ["st", "nd", "rd"][((day % 10) - 1) % 3] || "th"
  } ${month}'${year} ${formattedHours}:${minutes}${period} (Indian Standard Time)`;
};

const ParticipateChallenge = ({ params }) => {
  const { id } = params;
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch challenge data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/challenge/${id}`);
        const result = await response.json();
        if (result.success) {
          setData(result.challenge);
        } else {
          setError("Failed to fetch challenge data");
        }
      } catch (error) {
        setError("Error fetching challenge data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Handle challenge deletion
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this challenge?")) {
      try {
        const response = await fetch(`/api/challenge/${id}`, {
          method: "DELETE",
        });
        const result = await response.json();
        if (result.success) {
          alert("Challenge deleted successfully!");
          router.push("/"); // Navigate to homepage after deletion
        } else {
          alert("Failed to delete challenge.");
        }
      } catch (error) {
        alert("Error deleting challenge");
        console.error("Error deleting challenge:", error);
      }
    }
  };

  // Navigate to edit page for this challenge
  const handleEdit = () => {
    router.push(`/editChallenge/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Challenge not found</div>;
  }

  return (
    <div>
      <div className="w-full h-40vh flex flex-col p-20 justify-center bg-cyan-950 relative">
        <div className="w-1/3 text-black font-bold bg-yellow-300 rounded-md text-center p-1 m-5">
          Starts on {formatDate(data.StartDate)}
        </div>
        <div className="w-full m-5 font-bold text-4xl text-white">
          {data.name}
        </div>
        <div className="m-5 font-bold text-white text-xl">
          {data.description?.slice(0, 100)}
        </div>
        <div className="w-1/12 m-5 font-bold text-slate-800 text-lg text-center p-2 bg-white rounded-lg">
          {data.level}
        </div>
      </div>

      <div className="w-full flex justify-between">
        <div className="font-bold text-2xl text-black border-b-lime-700 border-b-4 m-5 ml-24">
          Overview
        </div>
        <div className="flex gap-5 p-5 justify-center items-center mr-24">
          <button
            className="font-bold text-lg text-white p-1 px-5 rounded-lg bg-green-700"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="border-2 border-red-600 font-bold text-red-600 p-1 px-8 rounded-lg"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>

      <div className="w-full flex font-bold text-lg text-slate-700 justify-start ml-24 sm:pr-36">
        {data.description}
      </div>
    </div>
  );
};

export default ParticipateChallenge;
