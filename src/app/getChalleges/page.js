"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const GetChallenges = () => {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get("/api/challenge");
        setChallenges(response.data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };

    fetchChallenges();
  }, []);

  return (
    <div>
      <h1>Challenges</h1>
      {challenges.length > 0 ? (
        <ul>
          {challenges.map((challenge) => (
            <li key={challenge._id}>
              <h2>{challenge.name}</h2>
              <p>{challenge.description}</p>
              <p>Start Date: {challenge.StartData}</p>
              <p>End Date: {challenge.EndDate}</p>
              <p>Level: {challenge.level}</p>
              {challenge.image && (
                <img src={challenge.image} alt={challenge.name} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No challenges found.</p>
      )}
    </div>
  );
};

export default GetChallenges;
