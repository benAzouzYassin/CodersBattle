"use client"

type Props = {
  link?: string,
  loading: boolean,
  text: string,
  className?: string
}


export default function DaynamicButton({ className, loading, text, link }: Props) {
  const styles = className ? className : "bg-black text-xl font-bold text-white w-[95%] rounded-2xl mt-3 h-12 hover:bg-[#313030] hover:scale-[98%] transition-transform"
  const handleCick = () => {
    if (link) {
      window.open(link, "_blank");
    }
  }
  return (
    <>
      {!loading ? (
        <button onClick={handleCick} className={styles}>
          {text}
        </button>
      ) : (
        <button
          disabled
          className="flex items-center w-[95%] mt-3 h-12 rounded-2xl bg-black text-white"
        >
          <svg
            className="h-10 w-[95%] rounded-2xl animate-spin text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="3"
            ></circle>
            <path
              className="opacity-70"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </button>
      )}
    </>
  );
}
