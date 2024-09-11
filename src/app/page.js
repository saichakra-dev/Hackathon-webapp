"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";

const Page = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [filterStatus, setFilterStatus] = useState([]);
  const [filterLevel, setFilterLevel] = useState([]);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const response = await axios.get("/api/challenge");
        setChallenges(response.data.challenges);
        setFilteredChallenges(response.data.challenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    };
    fetchChallenges();
  }, []);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterStatus = (e) => {
    const { value, checked } = e.target;
    setFilterStatus((prev) =>
      checked ? [...prev, value] : prev.filter((status) => status !== value)
    );
  };

  const handleFilterLevel = (e) => {
    const { value, checked } = e.target;
    setFilterLevel((prev) =>
      checked ? [...prev, value] : prev.filter((level) => level !== value)
    );
  };

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = challenges.filter((challenge) =>
      challenge.name.toLowerCase().includes(searchTerm)
    );
    setFilteredChallenges(filtered);
  };

  useEffect(() => {
    let filtered = challenges;

    // Apply status filter
    if (filterStatus.length > 0) {
      filtered = filtered.filter((challenge) => {
        const now = new Date().getTime();
        const isActive =
          now >= new Date(challenge.StartDate).getTime() &&
          now <= new Date(challenge.EndDate).getTime();
        const isUpcoming = now < new Date(challenge.StartDate).getTime();
        const isPast = now > new Date(challenge.EndDate).getTime();

        return (
          (filterStatus.includes("Active") && isActive) ||
          (filterStatus.includes("Upcoming") && isUpcoming) ||
          (filterStatus.includes("Past") && isPast)
        );
      });
    }

    // Apply level filter
    if (filterLevel.length > 0) {
      filtered = filtered.filter((challenge) =>
        filterLevel.includes(challenge.level)
      );
    }

    setFilteredChallenges(filtered);
  }, [filterStatus, filterLevel, challenges]);

  // Timer logic for countdown
  const calculateTimeLeft = (startDate, endDate) => {
    const now = new Date().getTime();
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();

    if (now < start) {
      const difference = start - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      return { status: "Upcoming", days, hours, minutes };
    } else if (now >= start && now <= end) {
      const difference = end - now;
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      return { status: "Active", days, hours, minutes };
    } else {
      const endDateFormatted = new Date(endDate).toLocaleString("en-US", {
        day: "numeric",
        month: "short",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      return { status: "Past", endDateFormatted };
    }
  };

  setInterval(() => {
    calculateTimeLeft();
  }, 100000);

  return (
    <div>
      {/* Banner Section */}
      <div className="w-full flex bg-cyan-950 h-60vh">
        <div className="w-2/3">
          <div className="ml-20 m-20 mr-10">
            <div className="text-6xl text-white font-bold flex">
              <div className="border-l-yellow-400 border-l-8 pl-10"></div>
              <div>
                Accelerate Innovation <br /> with Global AI Challenges
              </div>
            </div>
            <div className="flex flex-wrap text-2xl text-white m-10">
              AI challenges at DPhi simulate real-world problems. It is a <br />
              great place to put your AI/Data Science skills to test on <br />
              diverse datasets allowing you to faster learning through <br />
              competitions.
            </div>
            <Link href="/createChallenge">
              <button className="block ml-10 text-cyan-950 text-2xl p-3 font-bold bg-white rounded-md">
                Create Challenge
              </button>
            </Link>
          </div>
        </div>
        <div className="w-1/3 m-20">
          <img src={"./assets/icons/PicsArt_04-14-04.42 1.svg"} />
        </div>
      </div>
      <div className="border-l-white-200 border-t-1.5 h-0.2 "></div>
      <div className="w-full bg-sky-950 h-35vh flex items-center justify-between p-20">
        <div className="ml-20 flex w-1/3">
          <img className="flex" src={"./assets/icons/Group 1000002515.svg"} />
          <div className="p-1 ml-2 bold text-white text-2xl font-bold">
            100k+ <br />
            <span className="text-xl text-white font-normal">
              AI model submissions
            </span>
          </div>
        </div>

        <div className="w-1/3 flex">
          <div className="border-l-white-200 border-l-2 p-12"></div>
          <img className="" src={"./assets/icons/Group 1000002516.svg"} />
          <div className="p-1 ml-2 bold text-white text-2xl font-bold">
            50k+ <br />
            <span className="text-xl text-white font-normal">
              Data Scientists
            </span>
          </div>
        </div>

        <div className="flex w-1/3 b">
          <div className="border-l-white-400 border-l-2 p-12"></div>
          <img className="flex" src={"./assets/icons/Group 1000002518.svg"} />
          <div className="p-1 ml-2 bold text-white text-2xl font-bold">
            100+ <br />
            <span className="text-xl text-white font-normal">
              AI Challenges hosted
            </span>
          </div>
        </div>
      </div>

      <div className="w-full bg-white h-1vh flex flex-col justify-center items-center">
        <div className="text-3xl font-bold align-center p-20 pb-0">
          Why Participate in{" "}
          <span className="text-green-700"> AI Challenges?</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full p-20">
          <div className="bg-slate-100 shadow-md rounded-md flex-col">
            <div className="p-12">
              <img src={"./assets/icons/carbon_notebook-reference.svg"} />
              <div className="text-2xl font-bold pt-5 pb-5">
                Prove your skills
              </div>
              <div className="text-xl text-slate-500">
                Gain substantial experience by solving real-world problems{" "}
                <br />
                and pit against others to come up with innovative solutions.
              </div>
            </div>
          </div>

          <div className="bg-slate-100 shadow-md rounded-md flex-col">
            <div className="p-12">
              <img src={"./assets/icons/Vector.svg"} />
              <div className="text-2xl font-bold pt-5 pb-5">
                Learn from community
              </div>
              <div className="text-xl text-slate-500">
                One can look and analyze the solutions submitted by the <br />
                other Data Scientists in the community and learn from them.
              </div>
            </div>
          </div>

          <div className="bg-slate-100 shadow-md rounded-md flex-col">
            <div className="p-12">
              <img src={"./assets/icons/Robot.svg"} />
              <div className="text-2xl font-bold pt-5 pb-5">
                Challenge yourself
              </div>
              <div className="text-xl text-slate-500">
                There is nothing for you to lose by participating in a <br />
                challenge. You can fail safe, learn out of the entire <br />
                experience and bounce back harder.
              </div>
            </div>
          </div>

          <div className="bg-slate-100 shadow-md rounded-md flex-col">
            <div className="p-12">
              <img src={"./assets/icons/IdentificationCard.svg"} />
              <div className="text-2xl font-bold pt-5 pb-5">
                Earn recognition
              </div>
              <div className="text-xl text-slate-500">
                You will stand out from the crowd if you do well in AI <br />
                challenge, it only helps you shine in the community but <br />
                also earns rewards.
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-sky-950 h-30vh p-20 flex-col justify-center items-center text-center">
        <div className="text-3xl text-white font-bold p-10">
          Explore Challenges
        </div>
        <div className="flex gap-5 p-5 justify-center items-center">
          <div className="relative w-2/3">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              🔎
            </span>
            <input
              type="text"
              className="w-full block border-collapse border-2 border-slate-300 bg-white rounded-lg p-5 pl-10"
              placeholder="Search"
              name="filter"
              onChange={handleFilter}
            />
          </div>
          <div className="relative">
            <button
              className="w-full border-collapse border-2 border-slate-300 rounded-lg p-5  bg-white flex items-center "
              onClick={toggleFilters}
            >
              Filter
              <span className="ml-2 px-6">▽</span>
            </button>
            {showFilters && (
              <div className="absolute bg-white border-slate-300 rounded-md p-2  w-20vw flex flex-col ">
                <div className="flex flex-col items-start p-5 w-full">
                  <p>Status</p>
                  <label>
                    <input
                      type="checkbox"
                      value="All"
                      onChange={handleFilterStatus}
                    />{" "}
                    All
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Active"
                      onChange={handleFilterStatus}
                    />{" "}
                    Active
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Upcoming"
                      onChange={handleFilterStatus}
                    />{" "}
                    Upcoming
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Past"
                      onChange={handleFilterStatus}
                    />{" "}
                    Past
                  </label>
                </div>
                <div className="flex flex-col items-start p-5">
                  <p>Level</p>
                  <label>
                    <input
                      type="checkbox"
                      value="Easy"
                      onChange={handleFilterLevel}
                    />{" "}
                    Easy
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Medium"
                      onChange={handleFilterLevel}
                    />{" "}
                    Medium
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      value="Hard"
                      onChange={handleFilterLevel}
                    />{" "}
                    Hard
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 p-20 bg-cyan-950">
        {filteredChallenges.map((challenge, index) => {
          const timeLeft = calculateTimeLeft(
            challenge.StartDate,
            challenge.EndDate
          );

          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-3xl bg-white"
            >
              <img
                className="w-full rounded-t-2xl"
                src={challenge.image}
                alt={challenge.name}
              />

              {timeLeft.status === "Active" ? (
                <div className="p-2 bg-green-200 text-green-950 rounded-md pl-5 pr-5 m-3 text-sm">
                  Active
                </div>
              ) : timeLeft.status === "Upcoming" ? (
                <div className="p-2 bg-orange-100 text-green-950 rounded-md pl-5 pr-5 m-3 text-sm">
                  Upcoming
                </div>
              ) : (
                <div className="p-5 bg-orange-100 text-green-950 rounded-md pl-5 pr-5 m-3 text-sm">
                  Past
                </div>
              )}

              <div className="text-xl font-bold p-1 text-center flex-wrap w-3/4">
                {challenge.name}
              </div>

              {timeLeft.status === "Upcoming" ? (
                <div>
                  <div className="text-0.5 font-bold text-slate- pt-5 text-center flex justify-center items-center">
                    Starts in
                  </div>
                  <div className="text-xl font-bold p-2 text-center">{`${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes}`}</div>
                  <div className="text-xs text-slate-800">
                    Days : Hours : Minutes
                  </div>
                </div>
              ) : timeLeft.status === "Active" ? (
                <div>
                  <div className="text-0.5 font-bold text-slate- pt-5 text-center flex justify-center items-center">
                    Ends in
                  </div>
                  <div className="text-xl font-bold p-2 text-center">{`${timeLeft.days} : ${timeLeft.hours} : ${timeLeft.minutes}`}</div>
                  <div className="text-xs text-slate-800">
                    Days : Hours : Minutes
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-0.5 font-bold text-slate- pt-5 text-center flex justify-center items-center">
                    Ended on
                  </div>
                  <div className="text-xl font-bold p-2 text-center">
                    {timeLeft.endDateFormatted}
                  </div>
                </>
              )}

              <div className="flex gap-5 p-5 justify-center items-center">
                <Link href={`/participateChallenge/${challenge._id}`}>
                  <button className="p-3 text-white bg-green-600 rounded-2xl pl-10 pr-10 font-bold">
                    Participate Now
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Page;
