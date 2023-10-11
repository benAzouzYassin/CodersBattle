//TODO filter problems by most solved / latest / top rated / blind 75

import { useEffect } from "react";


type Props = {
    selected: "Most solved" | "Latest" | "Top Rated" | "Most difficult",
    setChallenges: any
    setSelected: any
}
export default function FilterChallenges({ selected, setChallenges, setSelected }: Props) {
    useEffect(() => {
        //TODO sort the challenges
    }, [selected])
    return <div className="border-b-2 border-b-white mt-20 w-full h-10 flex items-center justify-center gap-2 text-white font-bold">
        <span onClick={() => setSelected("Most solved")} style={{ backgroundColor: selected === "Most solved" ? "rgb(148 163 184)" : "" }} className=" hover:bg-slate-400 p-2 rounded-sm mb-3 hover:cursor-pointer">Most solved 🚀</span>
        <span onClick={() => setSelected("Latest")} style={{ backgroundColor: selected === "Latest" ? "rgb(148 163 184)" : "" }} className=" hover:bg-slate-400 p-2 rounded-sm mb-3 hover:cursor-pointer">Latest 🔮</span>
        <span onClick={() => setSelected("Top Rated")} style={{ backgroundColor: selected === "Top Rated" ? "rgb(148 163 184)" : "" }} className=" hover:bg-slate-400 p-2 rounded-sm mb-3 hover:cursor-pointer">Top Rated 📚 </span>
        <span onClick={() => setSelected("Most difficult")} style={{ backgroundColor: selected === "Most difficult" ? "rgb(148 163 184)" : "" }} className=" hover:bg-slate-400 p-2 rounded-sm mb-3 hover:cursor-pointer">Most difficult 🧠</span>
    </div>
}