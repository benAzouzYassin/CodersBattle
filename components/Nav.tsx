import { signOut } from "@/firbaseService"
import { User } from "firebase/auth"
import Link from "next/link"


type Props = {
    currentUser: User | null
    setIsLoading?: any
    selected: "Challenges" | "Add New Challenge" | "Solved challenges" | "My Account"
}

export default function Nav(props: Props) {
    return <nav className="gap-10 px-10 h-14 font-semibold  flex flex-row  items-center  text-gray-200 border-b-2 ">
        <p className="text-4xl font-bold font-mono  ">Welcome !</p>



        <Link
            onClick={() => props.setIsLoading(true)}
            href={`/`}
            className="hover:bg-gray-500 px-2  py-[12px] rounded-sm ml-12"
            style={{ backgroundColor: props.selected === "Challenges" ? "rgb(148 163 184)" : "" }}
        >

            Challenges
        </Link>




        <Link
            style={{ backgroundColor: props.selected === "Add New Challenge" ? "rgb(148 163 184)" : "" }}
            onClick={() => props.setIsLoading(true)}
            href={`/addChallenge`}
            className="hover:bg-gray-500 px-2 py-[12px] rounded-sm"
        >
            Add New Challenge
        </Link>

        <Link

            onClick={() => props.setIsLoading(true)}
            href={`/solvedChallenges/${props.currentUser?.uid}`}
            className="hover:bg-gray-500 px-2 py-[12px] rounded-sm"
            style={{ backgroundColor: props.selected === "Solved challenges" ? "rgb(148 163 184)" : "" }}

        >
            Solved challenges
        </Link>

        <Link

            onClick={() => props.setIsLoading(true)}
            href={`/update/${props.currentUser?.uid}`}
            className="hover:bg-gray-500 px-2 py-[12px] rounded-sm"
            style={{ backgroundColor: props.selected === "My Account" ? "rgb(148 163 184)" : "" }}

        >
            Update Account
        </Link>

        <Link onClick={() => props.setIsLoading(true)} href={`/update/${props.currentUser?.uid}`} className="ml-auto flex items-center gap-3">
            <p className="ml-auto justify-self-center font-medium ">{props.currentUser?.email}</p>
            <img src={props.currentUser?.photoURL ?? null} alt="" className=" w-12 h-12 rounded-full hover:cursor-pointer hover:scale-105 mr-3 shadow-md" />
        </Link>
    </nav>
}