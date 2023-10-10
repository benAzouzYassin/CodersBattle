import { getUserData } from "@/firbaseService";

export async function POST(req: Request) {
    const body = await req.json()
    const userData = await getUserData(body.userId)
    const userName = userData.leetCodeId
    const { message, problemId, success } = await isSolved(userName, body.challenge)
    if (success) {
        //TODO here u will add the problem to list of solvedChallenges of the user
        return Response.json({ success: true, message: "Problem was verified successfully ! " })
    }
    return Response.json({ success: false, message: message })
}


async function isSolved(userName: string, problemName: string) {
    problemName = problemName.toUpperCase();
    try {
        const query = {
            query:
                "\n    query recentAcSubmissions($username: String!, $limit: Int!) {\n  recentAcSubmissionList(username: $username, limit: $limit) {\n    id\n    title\n    titleSlug\n    timestamp\n  }\n}\n    ",
            variables: { username: userName, limit: 20 },
            operationName: "recentAcSubmissions",
        };
        const response = await fetch("https://leetcode.com/graphql/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(query),
        });
        const data = await response.json();
        const solvedProblems = data.data.recentAcSubmissionList;
        for (const problem of solvedProblems) {
            if (problem.title.toUpperCase() === problemName) {
                return { success: true, problemId: problem.id, message: "" };
            }
        }
        return { success: false, problemId: null, message: "Problem is not solved." };
    } catch (err: any) {
        if (err.message == "solvedProblems is not iterable") {
            return {
                success: false,
                problemId: null,
                message:
                    "Could not validate the problem please verify your leetCode name.",
            };
        }
        return {
            success: false, problemId: null,
            message: `Internal server problem. (${err.message})`,
        };
    }
}
