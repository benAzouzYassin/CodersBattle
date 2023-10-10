
import { TChallenge } from "@/challengeType";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Difficulty from "./Difficulty";



function calculateRating(five: number, four: number, three: number, two: number, one: number) {
    const totalRatings = (5 * five) + (4 * four) + (3 * three) + (2 * two) + (1 * one);
    const numberOfRatings = five + four + three + two + one

    return Math.ceil(totalRatings / numberOfRatings)

}



export default function ChallengeCard(props: TChallenge) {
    const [rating, setRating] = useState(0)

    const [stars, setStars] = useState<any>([])
    const router = useRouter()
    useEffect(() => {
        const s = []
        for (let i = 0; i < rating; i++) {
            s.push(<img key={i} width="20px" src="/star.png" />)
        }
        setStars(s)
    }, [rating])

    useEffect(() => {
        if (props.ratings) {
            const { fiveStarCount, fourStarCount, threeStarCount, twoStarCount, oneStarCount } = props.ratings
            const calculatedRating = calculateRating(fiveStarCount, fourStarCount, threeStarCount, twoStarCount, oneStarCount)
            if (calculatedRating) {
                setRating(calculatedRating)
            }
        }
    }, [props.ratings])

    return <div onClick={() => router.push(`/challenge/${props.name}`)} className={` bg-[#222b34]  border-2 flex flex-col hover:cursor-pointer hover:scale-[101%] transition-transform shadow-inner  h-14 w-full  rounded-sm `}>
        <div className="  flex flex-row">

            <div className="flex mt-1 ml-1 ">
                <p className="font-semibold text-white ml-2 drop-shadow-md tracking-wide    h-fit">{props.name.split("-").join(" ")}</p>
                <span className="  text-xs  ml-[4px] mt-[7px] text-white ">#{props.tag}</span>
            </div>
            <Difficulty difficulty={props.difficulty} />
        </div>
        <div className="flex mt-[-15px] ml-4 gap-[1px]   ">
            {stars}
        </div>
    </div>
}