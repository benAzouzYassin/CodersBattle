import { TChallenge } from "@/challengeType"
import ChallengeCard from "./ChallengeCard"

type Props = {
    challenges: TChallenge[]
}

export default function Challenges(props: Props) {

    return <div className="flex flex-col  h-fit mt-14 gap-x-5 gap-y-2  w-full  ">{props.challenges.map(challenge => <ChallengeCard key={challenge.name} {...challenge} />)}</div>
}