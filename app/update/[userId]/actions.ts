"use server";
import { z } from "zod";

async function verifyUser(leetcodeId: string) {
  const leetcodeProfile = `https://leetcode.com/${leetcodeId}/`;
  const res = await fetch(leetcodeProfile, { method: "GET" });
  return res.status === 200;
}

export async function updateAction(prevState: any, userData: FormData) {
  const Schema = z.object({
    email: z.string().email(),
    userName: z.string().min(1),
    leetcodeId: z.string().min(1),
  });
  try {
    const data = Schema.parse({
      email: userData.get("Email"),
      userName: userData.get("UserName"),
      leetcodeId: userData.get("LeetcodeId"),
    });
    const isValidLeetcodeId = await verifyUser(data.leetcodeId);
    if (isValidLeetcodeId) {
      //push the updates to firestore
      return { message: "updated user succussfuly!", success: true };
    }
    return { message: "Not valid leedcode name !", success: false };
  } catch (error: any) {
    console.log(error.message);
    return { message: "Enter a valid data please !", success: false };
  }
}
