export default function Loading(props: { bgColor: string }) {
    return <div style={{ backgroundColor: props.bgColor }} className="z-20 flex items-center justify-center absolute h-[100vh] overflow-hidden w-[100vw] ">

        <div
            style={{ backgroundColor: props.bgColor }}
            className="inline-block h-72 w-72 animate-spin rounded-full border-[15px] border-solid border-white    border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_200ms_linear_infinite]"
            role="status">

        </div>
    </div>
}