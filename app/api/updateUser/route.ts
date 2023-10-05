//this api will get userId and useName and use leetCodeid
import { db } from "@/firbaseService";
import { Console } from "console";
import { doc, updateDoc } from "firebase/firestore";
import { type } from "os";
import { z } from "zod"



function verifyUserData(userData: any) {
    const Schema = z.object({
        userName: z.string().min(1),
        userId: z.string().min(5),
        leetcodeId: z.string().min(1),
    });
    try {
        const data = Schema.parse({
            userName: userData.userName,
            leetcodeId: userData.leetcodeId,
            userId: userData.userId
        });
        return true;
    } catch (error) {
        return false;
    }
}
async function verifyLeetcodeId(leetcodeId: string) {
    const leetcodeProfile = `https://leetcode.com/${leetcodeId}/`;
    const res = await fetch(leetcodeProfile, { method: "GET" });
    return res.status === 200;
}

type UserData = {
    userName: string;
    leetcodeId: string;
    userId: string | undefined;
}

export async function POST(req: Request) {
    const userData: UserData = await req.json()
    const isValidRequest = verifyUserData(userData)
    if (!isValidRequest) {
        return Response.json({ "success": false, "message": "Invalid data " }, { status: 400 })
    }
    const isValidLeetcodeId = await verifyLeetcodeId(userData.leetcodeId ?? "")
    if (!isValidLeetcodeId) {
        return Response.json({ "success": false, "message": "Could not validate your leetcode id ! " }, { status: 400 })
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