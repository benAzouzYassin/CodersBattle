"use client";

import { Inter } from "next/font/google";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  onAuthChange,
  saveNewUser,
  signInWithGithub,
  signInWithGoogle,
  singUp,
} from "@/firbaseService";
import Loading from "@/components/Loading";

const inter = Inter({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const [isLoggedIn, seIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    onAuthChange((user) => {
      if (user) {
        saveNewUser(user);
        router.replace("/");
      } else {
        seIsLoggedIn(false);
      }
    });
  }, []);
  useEffect(() => {
    if (isLoading) {
      setErrorMessage("");
    }
  }, [isLoading]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (password != verifyPassword) {
      setErrorMessage("Password and password verification should be the same");
      return;
    }
    if (password.length < 8) {
      setErrorMessage("Password length should be greater than 8");
      return;
    }

    if (email.length < 4) {
      setErrorMessage("Email length should be greater than 4");
      return;
    }

    setIsLoading(true);
    singUp(email, password)
      .then((user) => {
        seIsLoggedIn(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.message.split(":")[1]);
      });
  };

  const handleGoogleBtn = () => {
    setIsLoading(true);
    signInWithGoogle()
      .then((data) => setIsLoading(true))
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.message.split(":")[1]);
      });
  };

  const handleGithubBtn = () => {
    setIsLoading(true);
    signInWithGithub()
      .then((data) => {
        console.log(data);
        setIsLoading(true);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.message.split(":")[1]);
      });
  };
  return (
    <>
      {isLoggedIn === null && <Loading bgColor="#15131d" />}
      {isLoggedIn === false && (
        <main
          style={inter.style}
          className="bg-[#15131d] w-[100vw] h-[100vh] flex items-center justify-center  text-white"
        >
          <form
            onSubmit={handleSubmit}
            className="w-1/3 flex  flex-col border-2 border-white h-[80%] p-10 rounded-2xl"
          >
            <h1 className="font-medium text-center text-4xl ">
              Welcome Coders !
            </h1>
            <p className="text-center mt-2 text-sm text-gray-400">
              Challenge and battle other coders and show of your skills!
            </p>
            <div className="flex gap-3 justify-center mt-5">
              <button
                onClick={handleGoogleBtn}
                className="border-2 border-orange-300 p-2 rounded-md justify-center flex gap-1 hover:scale-105 transition-transform"
              >
                <img
                  src="https://cdn.simpleicons.org/Google/white"
                  width={20}
                  alt=""
                />
                Sigh up With Google
              </button>
              <button
                className="border-2 border-sky-400 flex justify-center gap-1 p-2 rounded-md hover:scale-105 transition-transform"
                onClick={handleGithubBtn}
              >
                <img
                  src="https://cdn.simpleicons.org/github/white"
                  width={20}
                  alt=""
                />
                Sign up With Github
              </button>
            </div>
            <div className="text-gray-400 mx-auto mt-4 flex gap-1 font-medium tracking-wider ">
              <hr className="w-9 my-auto border-gray-400 border-[0.5px] rounded-full opacity-50" />
              Or Register with
              <hr className="w-9  border-gray-400 my-auto border-[0.5px] rounded-full opacity-50" />
            </div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              name="email"
              className="h-11  focus:outline-none text-lg font-normal  mt-1 rounded-md  bg-[#252134] pl-2"
            />

            <label htmlFor="password" className="mt-3">
              Password
            </label>

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="h-11 focus:outline-none text-lg font-normal  rounded-md mt-1 bg-[#252134] pl-2"
              name="password"
              id="password"
            />
            <label htmlFor="password" className="mt-3">
              Verify Password
            </label>

            <input
              value={verifyPassword}
              onChange={(e) => setVerifyPassword(e.target.value)}
              type="password"
              className="h-11 focus:outline-none  font-normal text-gray-200  rounded-md mt-1 bg-[#252134] pl-2"
              name="verifyPassword"
              id="verifyPassword"
            />
            <div className="flex gap-2 mt-2">
              <input
                type="checkbox"
                className="accent-[#838383]   bg-gray-300  "
                name="rememberMe"
                defaultChecked={rememberMe}
                onClick={() => setRememberMe((prev) => !prev)}
                id="rememberMe"
              />
              <label htmlFor="rememberMe">Remember me</label>
            </div>
            {errorMessage && (
              <p className="font-normal text-red-400">{errorMessage}</p>
            )}
            <button
              onClick={handleSubmit}
              className="border-2 mt-5 hover:scale-105 transition-transform hover:bg-[#231d33] font-medium  border-white h-11 text-xl rounded-md"
            >
              {isLoading ? "Loading ..." : "Sign Up"}
            </button>
            <p className="mt-4">
              Don&apos;t have an accoun?{" "}
              <a
                href="/login"
                className="font-medium hover:underline underline-offset-4"
              >
                Login
              </a>
            </p>
          </form>
        </main>
      )}
    </>
  );
}
