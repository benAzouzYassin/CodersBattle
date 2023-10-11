
import parse from "html-react-parser"
import Link from "next/link";
import Difficulty from "@/components/Difficulty";
import { db, } from "@/firbaseService"
import { collection, getDocs, query, where } from "firebase/firestore";
import { TChallenge } from "@/challengeType";
import VerificationButton from "./VerificationButton";
import DaynamicButton from "@/components/DaynamicButton";
type Props = {
    params: { challengeName: string };
};



async function getChallengeData(name: string) {

    const challengesRef = collection(db, "challenges")
    const q = query(challengesRef, where("name", "==", name))
    const challengeData = (await getDocs(q)).docs[0].data()
    return challengeData as TChallenge

}
//there is five things : dificulty / stars / descrtiption verify and solve btn


export default async function ChallengePage({ params }: Props) {



    params.challengeName = params.challengeName.replace("/%20/g", "-").toLowerCase()

    try {


        const challengeData = await getChallengeData(params.challengeName)

        console.log(challengeData)

        if (!challengeData) {
            return <div>no challenge named {params.challengeName}</div>
        }
        const challengeLeetcodeName = "https://leetcode.com/problems/rotate-image/".split("/")[4]

        const query = { "query": "\n    query questionContent($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    content\n    mysqlSchemas\n    dataSchemas\n  }\n}\n    ", "variables": { "titleSlug": challengeLeetcodeName }, "operationName": "questionContent" }
        const questionRes = await fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query),
        })
        const questionData = await questionRes.json()
        const html = questionData.data.question.content
        const leetcodeDescription = parse(html.split("<p>&")[0])


        return <main className="overflow-x-hidden">

            <nav className="gap-10 px-10 h-14 bg-[#282828] font-semibold  flex flex-row  items-center  text-gray-200 border-b-2 ">
                <p className="text-4xl font-bold font-mono  ">Welcome !</p>


                <Link
                    href={`/`}
                    className="hover:bg-zinc-700 px-2  py-[12px] rounded-sm ml-12"
                >

                    Challenges
                </Link>




                <Link
                    href={`/addChallenge`}
                    className="hover:bg-zinc-700 px-2 py-[12px] rounded-sm"
                >
                    Add New Challenge
                </Link>

                <Link

                    href={`/solvedChallenges`}
                    className="hover:bg-zinc-700 px-2 py-[12px] rounded-sm"

                >
                    Solved challenges
                </Link>

                <Link
                    href={"/"}
                    className="hover:bg-zinc-700 px-2 py-[12px] rounded-sm"

                >
                    My Account
                </Link>


            </nav>
            <div className="w-[100vw] flex  justify-center h-[100vh] bg-[#292929]" >
                <div className="bg-[#E6E6E6] w-[28%] h-2/3 py-3 px-8 rounded-lg mt-20" >
                    <div className="flex items-center">
                        <p className="text-lg underline underline-offset-4 first-letter:uppercase font-bold">{challengeData.name.split("-").join(" ")}</p>
                        <Difficulty difficulty={challengeData.difficulty} />
                    </div>
                    <p className="font-semibold mt-5 text-lg">Description :</p>
                    <p className="text-md w-[90%] mt-5 ">
                        {leetcodeDescription}

                    </p>
                    <div className="flex mt-12  justify-center gap-4">


                        <DaynamicButton loading={false} text="Solve Now" link={challengeData.link} className=" px-7  border-2 py-[15px] rounded-md text-white hover:border-black bg-black font-bold hover:bg-white  hover:text-black transition-colors duration-200 text-center" />
                        <VerificationButton challengeName={challengeData.name} />
                    </div>
                </div>
            </div>
        </main >



    } catch (error) {
        console.log(error)
        return <p>Server Error ! </p>
    }




}
