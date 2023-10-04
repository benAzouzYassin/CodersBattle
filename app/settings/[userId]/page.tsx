import { AppUser, db } from "@/firbaseService";
import { doc, getDoc } from "firebase/firestore";

//bch na3ml notif tgoul lel user yvalidi el leetcod
//lpage li 3al isar bch naamlha show up khw
// bch na3ml el page eymin li 3la jnab tnajm tbadl feha el user
//lpage li 3la jnab eymin bch ykoun fiha zouz routes 1 is stats and one is update profile

export default async function Settings({
  params,
}: {
  params: { userId: string };
}) {
  const target = doc(db, "users", params.userId);

  const snapshot = await getDoc(target);
  const currentUser = snapshot.data() as AppUser;

  return (
    <main className="flex w-[100vw] h-[100vh]  bg-[#000000]">
      <div className="w-[20%] my-auto shadow-xl h-[85%]   bg-[#fafafa] opacity-95  flex flex-col rounded-l-2xl ml-auto">
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
      <div className=" bg-[#fafafa] my-auto  w-[60%] h-[85%] opacity-95 rounded-r-xl mr-auto">
        <input type="text" className="border-2 bg-red-500" />
        <input type="text" className="border-2" />
        <input type="text" className="border-2" />
      </div>
    </main>
  );
}
