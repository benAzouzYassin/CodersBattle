
import Link from "next/link";

export default function LoadingPage() {
  return <main className=" bg-gradient-to-bl   from-[#475c71] to-black h-[100vh] w-[100vw] items-center justify-center">
    <nav className="gap-10 px-10 h-14 bg-transparent font-semibold  flex flex-row  items-center  text-gray-200 border-b-2 ">
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
    <div className="w-[100vw] h-[80vh] flex justify-center items-center bg-[#293541]">

      <div
        className="inline-block h-72 w-72 animate-spin rounded-full border-[15px] border-solid border-white bg-[#293541]  border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_200ms_linear_infinite]"
        role="status">

      </div>

    </div>
  </main>
}