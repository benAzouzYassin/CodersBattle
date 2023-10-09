"use client";

import { db, getUserData, onAuthChange } from "@/firbaseService";
import { Toaster, toast } from "sonner";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";
import { collection, getDocs, } from "firebase/firestore";
import { TChallenge } from "@/challengeType";
import Challenges from "@/components/Challenges";
import Ranking from "@/components/Ranking";
import FilterChallenges from "@/components/Filter";

export default function Home() {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const [challenges, setChallenges] = useState<TChallenge[]>([])
  //TODO implement loading and errors for challenges
  const getChallenges = async () => {
    const challengesRef = collection(db, "challenges")
    try {

      const challengesData = (await getDocs(challengesRef)).docs.map(d => d.data()) as TChallenge[]
      setChallenges(challengesData)
    } catch (error) {
      console.log(error)
    }
  }

  console.log("reload")


  useEffect(() => {
    onAuthChange((user) => {
      setCurrentUser(user);
      if (user) {
        getUserData(user.uid)
          .then((data) => {
            if (!data?.isVerified)
              toast.error("Please verify your leecode ID ");
          })
          .catch((err) => console.error(err));
      }
    });
    getChallenges()

  }, []);


  useEffect(() => {
    if (currentUser === null) {
      router.replace("/login");
    }
  }, [currentUser]);


  return (
    <main className="bg-gradient-to-bl   from-[#475c71] to-black">
      <Toaster
        richColors
        toastOptions={{
          style: { fontSize: "medium" },
        }}
      />
      {isLoading && <h1 className="text-4xl">Loading</h1>}
      {currentUser === undefined && <h1>Loading .....</h1>}
      {currentUser && (
        <Nav selected="Challenges" currentUser={currentUser} setIsLoading={setIsLoading} />
      )}
      <div className="w-full gap-10 flex flex-row min-h-[100vh]">
        <Ranking />
        <div className="w-full pl-20 pr-60">
          <FilterChallenges selected="Most solved" />
          <Challenges challenges={challenges} />
        </div>

      </div>
    </main>
  );
}
