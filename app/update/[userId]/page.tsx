"use client";

// @ts-ignore
import { AppUser, getCurrentUser, getUserData } from "@/firbaseService";
import { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import { useRouter } from "next/navigation";
import Nav from "@/components/Nav";

type Props = {
  params: { userId: string };
};

export default function UpdateUser({ params }: Props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<AppUser>();
  const [isLoading, setIsLoading] = useState(false);
  const [formUserName, setFormUserName] = useState("");
  const [formLeetcodeId, setFormLeetcodeId] = useState("");
  const router = useRouter();

  useEffect(() => {
    setFormUserName(currentUser?.name ?? "");
    setFormLeetcodeId(currentUser?.leetCodeId ?? "");
  }, [currentUser]);

  useEffect(() => {
    getUserData(params.userId).then((user) => setCurrentUser(user));
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const userDataForApi = {
      userName: formUserName,
      leetcodeId: formLeetcodeId,
      userId: getCurrentUser()?.uid,
    };
    setIsLoading(true);
    fetch("/api/updateUser", {
      method: "POST",
      body: JSON.stringify(userDataForApi),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false);

        if (!data.success) {
          setErrorMessage(data.message);
        } else {
          setErrorMessage("");
          router.replace("/");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err.message);
        setErrorMessage("server error");
        console.error(err);
      });
  };

  return (
    <main className=" w-[100vw] h-[100vh] bg-gradient-to-bl from-[#475c71] to-black  ">
      <Nav currentUser={getCurrentUser()} selected="My Account" setIsLoading={setIsLoading} />


      <form
        onSubmit={handleSubmit}
        className=" mt-20 relative bg-white  m-auto py-10  w-[30%]  pr-20  flex flex-col h-[70%]  rounded-2xl shadow-lg  px-20 "
      >
        <h1 className=" mt-10 text-center absolute top-0 left-[3%] w-[95%] font-bold  text-2xl">
          Update your informations
        </h1>
        <label htmlFor="Email" className="mt-16 font-semibold mb-1">
          Email :
        </label>
        <div className="flex gap-2">
          <input
            defaultValue={currentUser?.email}
            type="text"
            name="Email"
            disabled
            className="h-12 rounded-md placeholder:font-light bg-gray-200 pl-2 shadow-sm border-2 border-b-4  border-black focus-within:outline-none focus-within:border-b-[5px] focus-within:border-r-[3px] focus-within:translate-x-[-3px] focus-within:translate-y-[-1px]   transition-transform w-[95%]"
          />{" "}
        </div>
        <label htmlFor="userName" className="mt-5 font-semibold mb-1 ">
          User Name :
        </label>
        <div className="flex gap-2">
          <input
            onChange={(e) => setFormUserName(e.target.value)}
            value={formUserName}
            type="text"
            name="UserName"
            placeholder={
              currentUser?.name === "" ? "Your Name !" : currentUser?.name
            }
            className="h-12 rounded-md placeholder:font-light pl-2 shadow-sm border-2 border-b-4 focus-within:outline-none border-black focus-within:border-b-[5px] focus-within:border-r-[3px] focus-within:translate-x-[-3px] focus-within:translate-y-[-1px]   transition-transform w-[95%]"
          />
          <span className="text-2xl text-red-600 font-semibold">*</span>
        </div>
        <label htmlFor="LeetcodeId" className="mt-5 font-semibold mb-1 ">
          Leetcode Name :
        </label>
        <div className="flex gap-2">
          <input
            placeholder={
              currentUser?.isVerified === false
                ? "Leetcode Name !"
                : currentUser?.leetCodeId
            }
            type="text"
            name="LeetcodeId"
            value={formLeetcodeId}
            onChange={(e) => setFormLeetcodeId(e.target.value)}
            className="h-12 w-[95%] rounded-md placeholder:font-light pl-2 shadow-sm border-2 border-b-4  border-black focus-within:outline-none focus-within:border-b-[5px] focus-within:border-r-[3px] focus-within:translate-x-[-3px] focus-within:translate-y-[-1px]   transition-transform"
          />
          <span className="text-2xl text-red-600 font-semibold">*</span>
        </div>

        {errorMessage && (
          <p className="text-red-500 my-1 font-semibold">{errorMessage}</p>
        )}
        <p className=" text-sm">
          <span className="font-bold">Note : </span>{" "}
          <span className=" text-red-600 font-semibold">*</span> means a
          required field
        </p>
        <SubmitButton loading={isLoading} />
      </form>
    </main>
  );
}
