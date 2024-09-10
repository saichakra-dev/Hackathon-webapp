"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Page = () => {
  const [showFilters, setShowFilters] = useState(false);

  // const [challenges, setChallenges] = useState([]);

  // const [filter, setFilter] = useState("");

  // useEffect(() => {
  //   const fetchChallenges = async () => {
  //     try {
  //       const response = await axios.get("/api/challenge");
  //       setChallenges(response.data);
  //     } catch (error) {
  //       console.error("Error fetching challenges:", error);
  //     }
  //   };
  //   fetchChallenges();
  // }, []);

  const challenges = [
    {
      id: 1,
      name: "Data Science BootCamp-Graded Datathon",
      description: "Description of Challenge 1",
      StartDate: "2024-09-01",
      EndDate: "2025-06-30",
      level: "Easy",
      image: "/assets/cardimage/Group 1000002466.png",
    },
    {
      id: 2,
      name: "Data Science BootCamp-Graded Datathon",
      description: "Description of Challenge 1",
      StartDate: "2025-06-01",
      EndDate: "2025-06-30",
      level: "Easy",
      image: "/assets/cardimage/Group 1000002466.png",
    },
    {
      id: 3,
      name: "Data Science BootCamp-Graded Datathon",
      description: "Description of Challenge 1",
      StartDate: "2025-06-01",
      EndDate: "2025-06-30",
      level: "Easy",
      image: "/assets/cardimage/Group 1000002466.png",
    },
    {
      id: 4,
      name: "Data Science BootCamp-Graded Datathon",
      description: "Description of Challenge 1",
      StartDate: "2025-06-01",
      EndDate: "2025-06-30",
      level: "Easy",
      image: "/assets/cardimage/Group 1000002466.png",
    },
    {
      id: 5,
      name: "Data Science BootCamp-Graded Datathon",
      description: "Description of Challenge 1",
      StartDate: "2025-06-01",
      EndDate: "2025-06-30",
      level: "Easy",
      image: "/assets/cardimage/Group 1000002466.png",
    },
    {
      id: 6,
      name: "Data Science BootCamp-Graded Datathon",
      description: "Description of Challenge 1",
      StartDate: "2025-06-01",
      EndDate: "2025-06-30",
      level: "Easy",
      image: "/assets/cardimage/Group 1000002466.png",
    },
  ];

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div>
      <div className="w-full flex bg-cyan-950 h-60vh ">
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
          <img className="" src={"./assets/icons/PicsArt_04-14-04.42 1.svg"} />
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
              <div>🔎</div>
            </span>
            <input
              type="text"
              className="w-full block border-collapse border-2 border-slate-300 bg-white rounded-lg p-5 pl-10"
              placeholder="Search"
            />
          </div>
          <div className={`relative ${showFilters ? "w-1/6" : "w-auto"}`}>
            <button
              className={`w-full  border-collapse border-2 border-slate-300 rounded-lg p-5 bg-white flex items-center justify-between ${
                showFilters ? "rounded-lg" : ""
              }`}
              onClick={toggleFilters}
            >
              Filter
              <span className="ml-2">
                <div>▽</div>
              </span>
            </button>
            {showFilters && (
              <div className="absolute bg-white border-slate-300 rounded-md p-2 w-full flex-col">
                <div className="flex flex-col items-start p-5">
                  <p>Status</p>
                  <label>
                    <input type="checkbox" value="All" /> All
                  </label>
                  <label>
                    <input type="checkbox" value="Active" /> Active
                  </label>
                  <label>
                    <input type="checkbox" value="Upcoming" /> Upcoming
                  </label>
                  <label>
                    <input type="checkbox" value="Past" /> Past
                  </label>
                </div>
                <div className="flex flex-col items-start p-5 m-5">
                  <p>Level</p>
                  <label>
                    <input type="checkbox" value="Easy" /> Easy
                  </label>
                  <label>
                    <input type="checkbox" value="Medium" /> Medium
                  </label>
                  <label>
                    <input type="checkbox" value="Hard" /> Hard
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 p-20 bg-cyan-950">
        {challenges.map((challenge, index) => {
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center rounded-3xl bg-white"
            >
              <img className="w-full" src={challenge.image} />
              <div className="p-2 bg-orange-100 text-green-950 rounded-md pl-5 pr-5 m-3 text-sm">
                {new Date().getTime() >=
                  new Date(challenge.StartDate).getTime() &&
                new Date().getTime() <= new Date(challenge.EndDate).getTime()
                  ? "Active"
                  : "Upcoming"}
              </div>

              <div className="text-xl font-bold p-1 text-center flex-wrap w-3/4">
                {challenge.name}
              </div>
              <div className="text-0.5 font-bold text-slate-800 pt-5">
                Starts in
              </div>
              <div className="text-xl font-bold p-2">{challenge.StartDate}</div>
              <div className="text-0.2">Days : Hours : Mins</div>
              <div className="flex gap-5 p-5 justify-center items-center">
                <Link href={`/participateChallenge/${index}`}>
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
