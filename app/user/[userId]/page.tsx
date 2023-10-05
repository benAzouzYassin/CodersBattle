import { getUserData } from "@/firbaseService";

export default async function Settings({
  params,
}: {
  params: { userId: string };
}) {
  const currentUser = await getUserData(params.userId);
  return (
    <main className="flex w-[100vw] h-[100vh]   bg-gradient-to-bl   from-[#192735] to-black">
      <div className="w-[20%] my-auto shadow-xl h-[85%]   bg-white   flex flex-col rounded-l-2xl ml-auto">
        <img
          className="rounded-full mt-5 ml-5"
          src={
            currentUser.userImg != ""
              ? currentUser.userImg
              : "https://cdn.discordapp.com/attachments/735181387858182204/1159033831572119633/default-avatar.webp?ex=651e69df&is=651d185f&hm=228e05855549ec87c0fbbc2b42114f86aaba7c21bda118d4967d95860e2b64fa&"
          }
          alt=""
          width="200px"
          height="200px"
        />
        <div className="text-2xl mt-5 font-bold ml-5 text-black text-opacity-90 flex">
          @<p className="first-letter:uppercase">{currentUser.name}</p>
        </div>
      </div>

      <div className=" bg-white my-auto py-10  w-[60%]  pr-20 gap- flex flex-col h-[85%]  rounded-r-xl mr-auto">
        here will be the user stats
      </div>
    </main>
  );
}
