export default function Ranking() {

    //TODO implement an api fetch the top 5 players

    const topPlayers = [
        { name: "Radhi", rank: 1, id: "azezaeea", isFalling: true, solvedCount: 250 },
        { name: "yahya", rank: 2, id: "qds", isFalling: false, solvedCount: 101 },
        { name: "Rayen", rank: 3, id: "dq", isFalling: false, solvedCount: 99 },
        { name: "Yassine", rank: 4, id: "sqd", isFalling: false, solvedCount: 90 },
        { name: "Houssem", rank: 5, id: "dq", isFalling: true, solvedCount: 50 },
        { name: "Ahmed", rank: 6, id: "dq", isFalling: false, solvedCount: 40 },
        { name: "Aziz", rank: 7, id: "dq", isFalling: true, solvedCount: 20 },
        { name: "Youssef", rank: 8, id: "dq", isFalling: false, solvedCount: 18 },
        { name: "Houssem", rank: 9, id: "dq", isFalling: true, solvedCount: 10 },
        { name: "Monsef", rank: 10, id: "dq", isFalling: true, solvedCount: 7 },
    ]


    return <div className="w-1/4 border-2 shadow-2xl h-[75vh] mt-20 ml-5 rounded-md ">
        <h3 className="text-2xl mt-7 font-semibold text-center text-white">Top players !</h3>
        <div className="mt-10 flex flex-col gap-2">
            {topPlayers.map(player => <TopPlayer key={player.id} {...player} />)}

        </div>

    </div>
}


type Props = {
    name: string;
    rank: number;
    id: string;
    isFalling: boolean;
    solvedCount: number;
}
function TopPlayer(props: Props) {
    return <div className="flex items-center h-7 w-[90%] mx-auto border-b-[1px]">
        {props.isFalling ? <img src="/redArrow.png" alt="" /> : <img src="/greenArrow.png" alt="" />}
        <p className=" font-medium  text-white ml-2">{props.rank} {props.name}</p>
        <p className=" text-sm text-white ml-auto">{props.solvedCount} Challenge</p>
    </div>

}