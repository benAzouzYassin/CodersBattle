
import { db } from "@/firbaseService";
import { collection, doc, getDocs, or, query, updateDoc, where } from "firebase/firestore";
import { z } from "zod"
import { fromZodError } from "zod-validation-error"

type UserData = {
    userName: string;
    leetcodeId: string;
    userId: string | undefined;
}

type FunctionResponse = {
    success: boolean
    message: string
}

export async function POST(req: Request) {

    const userData: UserData = await req.json()

    const { message, success } = await verifyUser(userData)
    if (!success) {
        return Response.json({ "success": false, "message": message }, { status: 500 })
    }

    const targetUserRef = doc(db, "users", userData.userId ?? "")
    try {

        const updateRes = await updateDoc(targetUserRef, {
            isVerified: true,
            leetCodeId: userData.leetcodeId,
            name: userData.userName
        })
        return Response.json({ "success": true, "message": "" }, { status: 200 })
    } catch (error) {
        return Response.json({ "success": false, "message": "Error when updating the user" }, { status: 500 })

    }
}



async function verifyUser(user: UserData): Promise<FunctionResponse> {
    try {

        //verify user shape
        const Schema = z.object({
            userName: z.string().min(1, { message: "/user name is required !/" }),
            userId: z.string().min(5, { message: "/invalid user id/" }),
            leetcodeId: z.string().min(1, { message: "/leetcode name is required !/" }),
        });
        const validationResult = Schema.safeParse({
            userName: user.userName,
            leetcodeId: user.leetcodeId,
            userId: user.userId
        });
        if (!validationResult.success) {
            const errorMessage = fromZodError(validationResult.error).message.split("/")[1]
            return { "success": false, "message": errorMessage }
        }

        //check if leetcode name is real 
        const leetcodeProfile = `https://leetcode.com/${user.leetcodeId}/`;
        const leetcodeResponse = await fetch(leetcodeProfile, { method: "GET" });
        if (leetcodeResponse.status != 200) return { success: false, message: "Invalid leetcode name !" }

        //trying to query a user with same credentials
        const usersInDB = collection(db, "users")
        const q = query(usersInDB, or(where("name", "==", user.userName), where("leetCodeId", "==", user.leetcodeId)))
        const res = (await getDocs(q)).size
        if (res > 0) return { "success": false, message: "There is other user with the same user name / leetcode id please change one of them" }

        return { success: true, message: "User was verified successfully !" }
    } catch (error: any) {
        console.error(error)
        return { success: false, message: "Server error please try again later." }
    }
}