"use client";

// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
import { AppUser, getUserData } from "@/firbaseService";
import { updateAction } from "./actions";
import { useEffect, useState } from "react";
import SubmitButton from "./SubmitButton";
import { redirect } from "next/navigation";

type Props = {
  params: { userId: string };
};

export default function UpdateUser({ params }: Props) {
  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState<AppUser>();
  const [submitState, formAction] = useFormState(updateAction, {
    message: "",
    success: false,
  });

  useEffect(() => {
    getUserData(params.userId).then((user) => setCurrentUser(user));
  }, []);
  useEffect(() => {
    if (submitState.success) {
      redirect("/");
    } else {
      setErrorMessage(submitState.message);
    }
  }, [submitState]);

  return (
    <main className="flex w-[100vw] h-[100vh]  bg-gradient-to-bl   from-[#192735] to-black  ">
      <form
        className=" bg-white  m-auto py-10  w-[30%]  pr-20  flex flex-col h-[70%]  rounded-2xl shadow-lg  px-20 "
        action={formAction}
      >
        <h1 className=" mt-5 text-center w-[95%] font-bold  text-2xl">
          Update your informations
        </h1>
        <label htmlFor="Email" className="mt-6 font-semibold mb-1">
          Email :
        </label>
        <div className="flex gap-2">
          <input
            defaultValue={currentUser?.email}
            type="text"
            name="Email"
            placeholder={
              currentUser?.email === "" ? "Your Email !" : currentUser?.email
            }
            className="h-12 rounded-md placeholder:font-light pl-2 shadow-sm border-2 border-b-4  border-black focus-within:border-b-[5px] focus-within:border-r-[3px] focus-within:translate-x-[-3px] focus-within:translate-y-[-1px]   transition-transform w-[95%]"
          />{" "}
          <span className="text-2xl text-red-600 font-semibold">*</span>
        </div>
        <label htmlFor="userName" className="mt-5 font-semibold mb-1 ">
          User Name :
        </label>
        <div className="flex gap-2">
          <input
            defaultValue={currentUser?.name}
            type="text"
            name="UserName"
            placeholder={
              currentUser?.name === "" ? "Your Name !" : currentUser?.name
            }
            className="h-12 rounded-md placeholder:font-light pl-2 shadow-sm border-2 border-b-4  border-black focus-within:border-b-[5px] focus-within:border-r-[3px] focus-within:translate-x-[-3px] focus-within:translate-y-[-1px]   transition-transform w-[95%]"
          />
          <span className="text-2xl text-red-600 font-semibold">*</span>
        </div>
        <label htmlFor="LeetcodeId" className="mt-5 font-semibold mb-1 ">
          Leetcode Name :
        </label>
        <div className="flex gap-2">
          <input
            defaultValue={currentUser?.leetCodeId}
            placeholder={
              currentUser?.isVerified === false
                ? "Leetcode Name !"
                : currentUser?.leetCodeId
            }
            type="text"
            name="LeetcodeId"
            className="h-12 w-[95%] rounded-md placeholder:font-light pl-2 shadow-sm border-2 border-b-4  border-black focus-within:border-b-[5px] focus-within:border-r-[3px] focus-within:translate-x-[-3px] focus-within:translate-y-[-1px]   transition-transform"
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
        <SubmitButton />
      </form>
    </main>
  );
}
