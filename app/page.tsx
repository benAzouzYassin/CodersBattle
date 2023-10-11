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
import Loading from "@/components/Loading";

export default function Home() {
  const [selectedFilter, setSelectedFilter] = useState<"Most solved" | "Latest" | "Top Rated" | "Most difficult">("Most solved")
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  const [challenges, setChallenges] = useState<TChallenge[]>([])
  const getChallenges = async () => {
    const challengesRef = collection(db, "challenges")
    try {

      const challengesData = (await getDocs(challengesRef)).docs.map(d => d.data()) as TChallenge[]
      setChallenges(challengesData)
    } catch (error) {
      console.error(error)
    }
  }



  useEffect(() => {
    onAuthChange((user) => {
      setCurrentUser(user);
      if (user) {
        getUserData(user.uid)
          .then((data) => {
            setIsLoading(false)
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
  }, [currentUser, router]);

  useEffect(() => {
    if (challenges.length === 0) {
      setIsLoading(true)
    } else {
      setIsLoading(false)
    }
  }, [challenges])
  return (
    <main className="bg-gradient-to-bl   from-[#475c71] to-black">
      <Toaster
        richColors
        toastOptions={{
          style: { fontSize: "medium" },
        }}
      />
      {isLoading && <Loading bgColor="#293541" />}
      {currentUser === undefined && <Loading bgColor="#293541" />}
      {currentUser && (
        <Nav selected="Challenges" currentUser={currentUser} setIsLoading={setIsLoading} />
      )}
      <div className="w-full gap-10 flex flex-row min-h-[100vh]">
        <Ranking />
        <div className="w-full pl-20 pr-60">
          <FilterChallenges setChallenges={setChallenges} selected={selectedFilter} setSelected={setSelectedFilter} />
          <Challenges challenges={challenges} />
        </div>

      </div>
    </main>
  );
}
