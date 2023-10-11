"use client"
import { toast, Toaster } from "sonner"
import { getCurrentUser } from "@/firbaseService"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function VerificationButton({ challengeName }: { challengeName: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const handleVerification = () => {
        const user = getCurrentUser()
        setIsLoading(true)
        fetch("http://localhost:3000/api/verifyChallenge", { method: "POST", body: JSON.stringify({ userId: user?.uid, challenge: challengeName }) })
            .then(res => res.json())
            .then(data => {
                setIsLoading(false)

                console.log(data)
                if (data.success) {
                    toast.success(data.message)
                    setTimeout(() => router.push("/"), 1000)
                } else {
                    toast.error(data.message)
                }
            })
            .catch(err => {
                setIsLoading(false)
                console.error(err)
            })
    }
    return <>
        <Toaster richColors toastOptions={{
            style: { fontSize: "16px", fontWeight: "600" },
        }} />
        {!isLoading && <button onClick={handleVerification} className=" rounded-md font-semibold bg-white hover:bg-black hover:text-white transition-colors duration-200 text-black border-2 border-black p-2  text-center">Verify Challenge</button>}
        {isLoading && <button
            disabled
            className="flex items-center px-12 rounded-md font-semibold bg-white   text-black border-2 border-black p-2  text-center"
        >
            <svg
                className="h-10 w-[95%] rounded-2xl animate-spin text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
            >
                <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="3"
                ></circle>
                <path
                    className="opacity-70"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
            </svg>
        </button>}
    </>

}