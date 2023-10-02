"use client";

import { onAuthChange, signOut } from "@/firbaseService";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  useEffect(() => {
    onAuthChange((user) => setCurrentUser(user));
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      console.log("no logged in user");
      router.push("/login");
    }
  }, [currentUser]);

  return (
    <>
      {!currentUser && <h1>Loading .....</h1>}
      {currentUser && (
        <p>
          welcome {currentUser.displayName}{" "}
          <button className="border-2 border-black" onClick={signOut}>
            SignOut?
          </button>
        </p>
      )}
    </>
  );
}
