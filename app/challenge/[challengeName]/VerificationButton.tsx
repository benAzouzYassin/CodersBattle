"use client"
import { toast, Toaster } from "sonner"
import { getCurrentUser } from "@/firbaseService"
import { useRouter } from "next/navigation"

export default function VerificationButton({ challengeName }: { challengeName: string }) {
    const router = useRouter()
    const handleVerification = () => {
        const user = getCurrentUser()
        console.log("aaa")
        fetch("http://localhost:3000/api/verifyChallenge", { method: "POST", body: JSON.stringify({ userId: user?.uid, challenge: challengeName }) })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    toast.success(data.message)
                    setTimeout(() => router.push("/"), 1000)
                } else {
                    toast.error(data.message)
                }
            })
            .catch(err => console.error(err))
    }
    return <>
        <Toaster richColors toastOptions={{
            style: { fontSize: "16px", fontWeight: "600" },
        }} />
        <button onClick={handleVerification} className=" rounded-md font-semibold bg-white hover:bg-black hover:text-white transition-colors duration-200 text-black border-2 border-black p-2  text-center">Verify Challenge</button>
    </>

}