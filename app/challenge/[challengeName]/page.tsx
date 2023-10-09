
import parse from "html-react-parser"
import Link from "next/link";

type Props = {
    params: { challengeName: string };
};


//there is five things : dificulty / stars / descrtiption verify and solve btn

export default async function ChallengePage({ params }: Props) {




    const res = await fetch(`https://leetcode.com/problems/${params.challengeName}/`)

    if (res.status !== 200) {
        return <div>no challenge named {params.challengeName}</div>
    }
    try {

        const query = { "query": "\n    query questionContent($titleSlug: String!) {\n  question(titleSlug: $titleSlug) {\n    content\n    mysqlSchemas\n    dataSchemas\n  }\n}\n    ", "variables": { "titleSlug": params.challengeName }, "operationName": "questionContent" }
        const questionRes = await fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query),
        })
        const questionData = await questionRes.json()
        const html = questionData.data.question.content
        const parsedData = parse(html.split("<p>&")[0])
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

                    href={`/addChallenge`}
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
                {/* {parsedData} */}
                <div className="bg-[#fff9e2] w-1/3 h-2/3 rounded-lg mt-20" >
                    az
                </div>
            </div>
        </main>



    } catch (error) {
        return <p>Server Error ! </p>
    }




}
