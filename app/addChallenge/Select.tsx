"use client";
import { useEffect, useState } from "react";


type Props = {
  updateDiffState: (difficulty: string) => void
}

export default function SelectComponent(props: Props) {
  const [bgClass, setBgClass] = useState("bg-green-400");

  const updateBg = (option: string) => {
    if (option === "Easy") setBgClass("bg-green-400")
    if (option === "Medium") setBgClass("bg-amber-400")
    if (option === "Hard") setBgClass("bg-red-500")
  }
  return (
    <select
      onChange={(e) => {
        const difficulty = e.target.selectedOptions[0].innerText
        props.updateDiffState(difficulty)
        updateBg(difficulty)
      }}
      defaultValue="Easy"
      className={`${bgClass}  font-sans font-semibold hover:cursor-pointer  h-12 rounded-md placeholder:font-light mt-5 after:bg-white before:bg-white  pl-2 shadow-sm border-2 border-b-4  border-black  hover:border-b-[5px] hover:border-r-[3px] hover:translate-x-[-1px] hover:translate-y-[-1px]   transition-transform w-[95%] `}
    >
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
  );
}
