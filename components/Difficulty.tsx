"use client"

import { useEffect, useState } from "react"

type Props = {
    difficulty: "Easy" | "Medium" | "Hard"
}


export default function Difficulty(props: Props) {
    const [difficultyColor, setDifficultyColor] = useState("#ffffff")
    useEffect(() => {

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

    }, [props.difficulty])


    return <div style={{ backgroundColor: difficultyColor, }} className="ml-auto h-fit w-fit mr-2 mt-2 rounded-md px-3 tracking-wide py-1 drop-shadow-md border-transparent font-semibold">{props.difficulty}</div>

}