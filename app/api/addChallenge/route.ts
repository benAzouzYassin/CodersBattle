
import { db } from "@/firbaseService"
import { Timestamp, addDoc, collection, getDocs, query, where } from "firebase/firestore"


export async function POST(req: Request) {
    const [name, link, description, difficulty, userId] = await req.json()



    if (!name || !link || !difficulty || !userId) {
        return Response.json({ "message": "One of the fields is empty !", success: false }, { status: 400 })
    }

    const probVerification = await verifyProblem(link)
    if (!probVerification.success) {

        return Response.json({ "message": probVerification.message, success: false }, { status: 404 })
    }
    try {


        const challengesRef = collection(db, "challenges")

        const newChallengeRef = await addDoc(challengesRef, {
            addedBy: userId,
            comments: [],
            difficulty: difficulty,
            link: link,
            name: name.split(" ").join("-").toLowerCase(),
            ratings: {
                "fiveStarCount": 1,
                "fourStarCount": 0,
                "threeStarCount": 0,
                "twoStarCount": 0,
                "oneStarCount": 0,
            },
            description: description,
            solvedCount: 0,
            createdAt: Timestamp.fromDate(new Date()),
            tag: ""

        });

        return Response.json({ message: "Added successfully !", success: true, challengeId: newChallengeRef.id }, { status: 201 })

    } catch (error: any) {
        return Response.json({ "message": "could not add document to firestore", error: error.message }, { status: 500 })

    }

}


async function verifyProblem(problemLink: string) {

    try {

        const challengesRef = collection(db, "challenges")
        const q = query(challengesRef, where("link", "==", problemLink))
        const challengesWithSameLink = (await getDocs(q))
        if (challengesWithSameLink.size) return { success: false, message: `Problem was already uploaded under the name ${challengesWithSameLink.docs[0].data().name}` }

        const res = await fetch(problemLink)
        if (res.status != 200) return { success: false, message: "Problem was not found in leet code please verify the link..." }

        return { success: true, message: "problem is valid ! " }

    } catch (error: any) {
        console.log(error.message)
        return { success: false, message: "Server error please try again later . " }
    }

}
