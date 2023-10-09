//TODO filter problems by most solved / latest / top rated / blind 75


type Props = {
    selected: "Most solved" | "Latest" | "Top Rated" | "Most difficult"
}
export default function FilterChallenges({ selected }: Props) {

    return <div className="border-b-2 border-b-white mt-20 w-full h-10 flex items-center justify-center gap-2 text-white font-bold">
        <span style={{ backgroundColor: selected === "Most solved" ? "rgb(148 163 184)" : "" }} className=" hover:bg-slate-400 p-2 rounded-sm mb-3 hover:cursor-pointer">Most solved 🚀</span>
        <span style={{ backgroundColor: selected === "Latest" ? "rgb(148 163 184)" : "" }} className=" hover:bg-slate-400 p-2 rounded-sm mb-3 hover:cursor-pointer">Latest 🔮</span>
        <span style={{ backgroundColor: selected === "Top Rated" ? "rgb(148 163 184)" : "" }} className=" hover:bg-slate-400 p-2 rounded-sm mb-3 hover:cursor-pointer">Top Rated 📚 </span>
        <span style={{ backgroundColor: selected === "Most difficult" ? "rgb(148 163 184)" : "" }} className=" hover:bg-slate-400 p-2 rounded-sm mb-3 hover:cursor-pointer">Most difficult 🧠</span>
    </div>
}