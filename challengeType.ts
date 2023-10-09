import { Timestamp } from "firebase/firestore"


type Comment = {
    text: string,
    user: string
}

type Ratings = {
    fiveStarCount: number
    fourStarCount: number
    threeStarCount: number
    twoStarCount: number
    oneStarCount: number
}

export type TChallenge = {
    tag: string,
    addedBy: string
    comments: Comment[]
    description: string
    difficulty: "Easy" | "Medium" | "Hard"
    link: string
    name: string
    ratings: Ratings
    solvedCount: number
    createdAt: Timestamp;

}