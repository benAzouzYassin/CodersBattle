//TODO design and implement the challenge card

import { TChallenge } from "@/challengeType";
import { useEffect, useState } from "react";


//TODO finish styling the card

//TODO finish working on the rating
function calculateRating(five: number, four: number, three: number, two: number, one: number) {
    const totalRatings = (5 * five) + (4 * four) + (3 * three) + (2 * two) + (1 * one);
    const numberOfRatings = five + four + three + two + one

    return Math.ceil(totalRatings / numberOfRatings)

}



export default function ChallengeCard(props: TChallenge) {
    const [difficultyColor, setDifficultyColor] = useState("#ffffff")
    const [rating, setRating] = useState(0)

    const [stars, setStars] = useState<any>([])

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


        switch (props.difficulty) {
            case "Easy":
                setDifficultyColor("#16DB7C")
                break;
            case "Medium":
                setDifficultyColor("#e9c308")

                break;
            case "Hard":

                setDifficultyColor("#E46464")
                break;

            default:
                setDifficultyColor("#ffffff")
                break;
        }

    }, [])
    console.log(rating)
    return <div className={` bg-[#222b34]  border-2 flex flex-col hover:cursor-pointer hover:scale-[101%] transition-transform shadow-inner  h-14 w-full  rounded-sm `}>
        <div className="  flex flex-row">

            <div className="flex mt-1 ml-1 ">
                <p className="font-semibold text-white ml-2 drop-shadow-md tracking-wide    h-fit">{props.name}</p>
                <span className="text-[#2b2b2b]  text-xs  ml-[4px] mt-[7px]  ">#{props.tag}</span>
            </div>
            <div style={{ backgroundColor: difficultyColor, }} className="ml-auto h-fit w-fit mr-2 mt-2 rounded-md px-3 tracking-wide py-1 drop-shadow-md border-transparent font-semibold">{props.difficulty}</div>
        </div>
        <div className="flex mt-[-15px] ml-4 gap-[1px]   ">
            {stars}
        </div>
    </div>
}