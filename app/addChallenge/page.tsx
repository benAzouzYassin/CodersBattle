"use client";



import { useState } from "react";
import Select from "./Select";
import { getCurrentUser } from "@/firbaseService"
export default function AddChallenge() {
  const [challengeName, setChallengeName] = useState("");
  const [challengeLink, setChallengeLink] = useState("");
  const [challengeDescription, setChallengeDescription] = useState("");
  const [selectedDiff, setSelectedDiff] = useState("Easy")

  const onDifficultySelect = (difficulty: string) => {
    setSelectedDiff(difficulty)
  }
  const handleSubmit = (e: any) => {
    e.preventDefault()

    // make sure challenge does not exist ! 
    const userId = getCurrentUser()?.uid
    const challengeData = [challengeName, challengeLink, challengeDescription, selectedDiff, userId]
    fetch("/api/addChallenge", { method: "POST", body: JSON.stringify(challengeData) })
      .then(res => res.json())
      // instead of console logging u revalidate(/)
      .then(data => console.log(data))
      .catch(err => console.error(err))
  }

  const inputClassName =
    "h-12 rounded-md mt-[2px] placeholder:font-light  pl-2 shadow-sm border-2 border-b-4  border-black focus-within:outline-none focus-within:border-b-[5px] focus-within:border-r-[3px] focus-within:translate-x-[-3px] focus-within:translate-y-[-1px]   transition-transform w-[95%]";
  return (
    <main className="h-[100vh] w-[100vw] bg-gradient-to-bl  flex from-[#475c71] to-black ">
      <form
        action=""
        className="flex px-10 bg-white flex-col w-1/3 m-auto h-3/4 rounded-xl"
      >
        <h1 className="mt-5  drop-shadow-3xl w-[95%] text-center text-2xl font-extrabold">
          Adding New Challenge !
        </h1>
        <label htmlFor="challengeName" className="mt-8 font-medium ">
          Challenge name
        </label>
        <input
          className={inputClassName}
          type="text"
          value={challengeName}
          onChange={(e) => setChallengeName(e.target.value)}

          name="challengeName"
        />
        <label htmlFor="challengeLink" className="font-medium mt-1">
          challenge link
        </label>
        <input className={inputClassName} value={challengeLink} onChange={(e) => setChallengeLink(e.target.value)} type="text" name="challengeLink" />
        <label htmlFor="challengeDescription" className="font-medium mt-1">
          {" "}
          challenge description
        </label>
        <input
          type="text"
          className={inputClassName}
          name="challengeDescription"
          value={challengeDescription}
          onChange={(e) => setChallengeDescription(e.target.value)}
        />
        <Select updateDiffState={onDifficultySelect} />
        <button onClick={handleSubmit} className="border-4 flex justify-center items-center hover:bg-black hover:text-white transition-colors duration-150 ease-in border-black h-12 w-[95%] rounded-lg mt-7 text-xl font-black">
          ADD CHALLENGE
        </button>
      </form>
    </main>
  );
}
