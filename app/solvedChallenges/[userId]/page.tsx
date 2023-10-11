"use client"


import { TChallenge } from "@/challengeType"
import ChallengeCard from "@/components/ChallengeCard"
import Nav from "@/components/Nav"
import { AppUser, getCurrentUser, getUserData } from "@/firbaseService"
import { useEffect, useState } from "react"

export default async function SolvedChallenges({ params }: { params: { userId: string } }) {
    const [user, setUser] = useState<AppUser>()
    const [challenges, setChallenges] = useState<TChallenge[]>([])
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        getUserData(params.userId)
            .then(data => setUser(data))
            .catch(err => console.log(err))

    }, [])
    useEffect(() => {
        if (user && user.solvedProblems) {
            fetch("http://localhost:3000/api/getChallengesData", { method: "POST", body: JSON.stringify({ challengesIds: user?.solvedProblems }) })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setChallenges(data.data)
                    }
                })
                .catch(err => console.error(err))
        }

    }, [user])


    return <div className="h-[100vh] w-[100vw] bg-[#282828] overflow-x-hidden">
        {user && <Nav currentUser={getCurrentUser()} selected="Solved challenges" setIsLoading={setIsLoading} />}
        <div className="flex flex-col gap-2 px-56 mt-32">
            {challenges.map(challenge => <ChallengeCard key={challenge.link} {...challenge} />)}

        </div>
    </div>

}
