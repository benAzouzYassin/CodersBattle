"use client";

import { getUserData, onAuthChange, signOut } from "@/firbaseService";
import { Toaster, toast } from "sonner";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  useEffect(() => {
    onAuthChange((user) => {
      setCurrentUser(user);
      if (user) {
        getUserData(user.uid)
          .then((data) => {
            if (!data?.isVerified)
              toast.error("Please verify your leecode ID ");
          })
          .catch((err) => console.error(err));
      }
    });
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      router.replace("/login");
    }
  }, [currentUser]);
  return (
    <>
      <Toaster
        richColors
        toastOptions={{
          style: { fontSize: "medium" },
        }}
      />
      {isLoading && <h1 className="text-4xl">Loading</h1>}
      {currentUser === undefined && <h1>Loading .....</h1>}
      {currentUser && (
        <p>
          welcome {currentUser.email}{" "}
          <Link
            href={`/user/${currentUser.uid}`}
            className="border-2 p-4 mx-4 text-xl  bg-green-200"
          >
            settings page
          </Link>
          <Link
            onClick={() => setIsLoading(true)}
            href={`/update/${currentUser.uid}`}
            className="border-2 p-4 mx-4 text-xl  bg-green-200"
          >
            update page
          </Link>
          <button className="border-2 border-black" onClick={signOut}>
            SignOut?
          </button>
        </p>
      )}
    </>
  );
}
