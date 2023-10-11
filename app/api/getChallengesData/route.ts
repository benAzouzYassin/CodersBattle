import { db } from "@/firbaseService"
import { doc, getDoc } from "firebase/firestore"



export async function POST(req: Request) {

    try {

        const body = await req.json()

        if (body && body.challengesIds) {


            const challenges = []
            for (let i = 0; i < body.challengesIds.length; i++) {
                const docRef = doc(db, "challenges", body.challengesIds[i])
                const data = await getDoc(docRef)
                const d = data.data()
                challenges.push(d)
            }

            return Response.json({ success: true, data: challenges })
        }
    } catch (error: any) {
        return Response.json({ success: false, data: error?.message })
    }
}