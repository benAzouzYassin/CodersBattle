"use client";

import { onAuthChange, signOut } from "@/firbaseService";
import { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null | undefined>();
  useEffect(() => {
    onAuthChange((user) => setCurrentUser(user));
  }, []);

  useEffect(() => {
    if (currentUser === null) {
      router.replace("/login");
    }
  }, [currentUser]);

  return (
    <>
      {!currentUser && <h1>Loading .....</h1>}
      {currentUser && (
        <p>
          welcome {currentUser.email}{" "}
          <Link href={`/settings/${currentUser.uid}`}>settings page</Link>
          <button className="border-2 border-black" onClick={signOut}>
            SignOut?
          </button>
        </p>
      )}
    </>
  );
}
